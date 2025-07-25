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
import { Loader, Eye, EyeOff } from "lucide-react";

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
        const { token, email, cusCode, requirePasswordChange } = data;

        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        localStorage.setItem("cusCode", cusCode);

        if (requirePasswordChange) {
          toast({
            title: "Password Change Required",
            description: "Please change your password before proceeding.",
            variant: "warning",
          });
          navigate(`/change-password/${cusCode}`);
        } else {
          toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
            variant: "success",
          });
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
    <div className="flex min-h-svh items-center justify-center bg-muted px-6 py-12">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-md">
          <CardHeader className="text-center pb-2">
            <Link
              to="/"
              className="flex items-center gap-2 justify-center font-medium text-base"
            >
              <Logo />
            </Link>
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Login with your Customer Code</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="cuscode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Customer Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CX00123"
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
                        <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                          Password
                        </FormLabel>
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
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader className="animate-spin mr-2 h-4 w-4" />
                  ) : null}
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          By clicking login, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </div>

        <div className="flex flex-col items-center justify-center text-xs text-muted-foreground gap-1">
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
          <div>
            &copy; {new Date().getFullYear()} CoreBase Solutions. All rights
            reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
