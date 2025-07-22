import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../../hooks/use-toast";
import { changePasswordMutationFn } from "../../lib/api";
import { Loader, Eye, EyeOff } from "lucide-react";

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

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    psCusCode: z.string().min(1, { message: "CusCode is required" }),
    currentPassword: z.string().min(6, {
      message: "Current password is required",
    }),
    newPassword: z.string().min(6, {
      message: "New password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePassword = () => {
  const navigate = useNavigate();
  const { cuscode } = useParams();

  const storedEmail = localStorage.getItem("email") ?? "";
  const storedCusCode = localStorage.getItem("cusCode") ?? cuscode ?? "";

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: changePasswordMutationFn,
    onSuccess: () => {
      toast({
        title: "Password Updated",
        description: "You can now log in with your new password.",
        variant: "success",
      });
      localStorage.removeItem("token");
      navigate("/auth/login");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: storedEmail,
      psCusCode: storedCusCode,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values) => {
    if (isPending) return;
    mutate(values);
  };

  return (
    <div className="flex min-h-svh items-center justify-center bg-muted px-4 py-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Change Password</CardTitle>
            <CardDescription>
              Update your password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                {/* Email (disabled) */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="cursor-not-allowed" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* CusCode (disabled) */}
                <FormField
                  control={form.control}
                  name="psCusCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Code</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="cursor-not-allowed" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() =>
                              setShowCurrentPassword((prev) => !prev)
                            }
                          >
                            {showCurrentPassword ? (
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

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() =>
                              setShowNewPassword((prev) => !prev)
                            }
                          >
                            {showNewPassword ? (
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

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? (
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
                  {isPending && <Loader className="animate-spin mr-2 h-4 w-4" />}
                  Update Password
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;
