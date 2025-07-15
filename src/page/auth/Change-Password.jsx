import React from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
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
import { toast } from "../../hooks/use-toast";
import { Loader } from "lucide-react";
import { changePasswordMutationFn } from "../../lib/api";

const ChangePassword = () => {
  const navigate = useNavigate();
  const {cusCode} = useParams();
  const isFirstTime = !!cusCode;

  const { mutate, isPending } = useMutation({
    mutationFn: changePasswordMutationFn,
    onSuccess: (data) => {
      const {authToken, workspaceRedirectUrl, message} = data;

      if (token) {
        localStorage.setItem("token", token);
      }

      toast({
        title: "Password changed successfully.",
        description: message,
        variant: "success",
      });
      if (workspaceRedirectUrl) {
        navigate(workspaceRedirectUrl);
      } else {
        navigate("/profile");
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

  const formSchema = z
  .object({
    email: z.string().email("Enter a valid email address."),
    psCusCode: z.string().min(1, "CusCode (Sent Via Email) is required"),
    currentPassword: z.string().trim().min(6, {
    message: isFirstTime
      ? "OTP code (Sent Via Email) is required"
      : "Current Password is required",
    }),
    newPassword: z.string().trim().min(6, {
      message: "New Password is required",
    }),
    confirmPassword: z.string().trim().min(6, {
      message: "Confirm Password is required",
    }),
  })
      .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      psCusCode: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values) => {
  mutate({
    email: values.email,
    psCusCode: values.psCusCode,
    oldPassword: isFirstTime ? null : values.currentPassword,
    otpCode: isFirstTime ? values.currentPassword : null, 
    newPassword: values.newPassword,
    confirmPassword: values.confirmPassword,
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
              <CardTitle className="text-xl">
              {isFirstTime ? "Set Your Password" : "Change Password"}
              </CardTitle>
              <CardDescription>
                {isFirstTime
                  ? "This is your first time. Let's get started."
                  : "Update your password securely."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                    <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">Email</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  type="email"
                                  className="!h-[48px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="psCusCode"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">CusCode (sent to you via email)</FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="JR8XTV"
                                  className="!h-[48px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                   {isFirstTime ? "OTP Code (sent to you via email)" : "Current Password"}
                                </FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  type="password"
                                  className="!h-[48px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center">
                                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                  New Password
                                </FormLabel>
                              </div>
                              <FormControl>
                                <Input
                                  type="password"
                                  className="!h-[48px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                Confirm Password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  className="!h-[48px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                      >
                        {isPending && <Loader className="animate-spin" />}
                        {isFirstTime ? "Set Password" : "Change Password"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            By clicking change password, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
