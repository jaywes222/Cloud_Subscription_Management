import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import Logo from "../../components/logo";
import { useMutation } from "@tanstack/react-query";
import { loginMutationFn } from "../../lib/api";
import { toast } from "../../hooks/use-toast";
import { Loader, Eye, EyeOff  } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: loginMutationFn,
  });

  const formSchema = z.object({
    cuscode: z.string().trim().min(1, {
      message: "Cuscode is required",
    }),
    password: z.string().trim().min(6, {
      message: "Password is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuscode: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    if (isPending) return;

    mutate(values, {
      onSuccess: (data) => {
        const token = data.token;
        const email = data.email;
        const cusCode = data.cusCode;

        if (data.requirePasswordChange) {
          toast({
            title: "Password Change Required",
            description: "Please change your password before proceeding.",
            variant: "warning",
          });
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("cusCode", cusCode);
          navigate(`/change-password/${data.cusCode}`);
        } else {
          localStorage.setItem("token", token);
          toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
            variant: "success",
          });
          console.log("Login Successful", data);
          navigate(`/workspace/${data.workspaceRedirectUrl}`);
        }
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo />
          phAMAcore Cloud.
        </Link>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Login with your CusCode</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="cuscode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">CusCode</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="JR8XTV"
                            className="!h-[48px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="dark:text-[#f1f7feb5] text-sm">Password</FormLabel>
                          <Link
                            to="/forgot-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              className="!h-[48px] pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Loader className="animate-spin mr-2 h-4 w-4" /> : null}
                    Login
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking login, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>

          <div className="mt-12 flex flex-col items-center justify-center text-xs text-muted-foreground gap-1">
            <a
              href="https://corebase.co.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <span>Powered by</span>
              <img
                src="/images/corebaseLogo.png"
                alt="Company Logo"
                className="h-4 w-auto object-contain"
              />
            </a>
            <div>&copy; {new Date().getFullYear()} CoreBase Solutions. All rights reserved.</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
