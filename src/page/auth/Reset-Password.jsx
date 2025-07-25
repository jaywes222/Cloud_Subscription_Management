import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "../../hooks/use-toast";
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
import { Eye, EyeOff, Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordMutationFn } from "../../lib/api";
import Logo from "../../components/logo";

const formSchema = z
    .object({
        newPassword: z.string().min(8, {
            message: "Password must be at least 8 characters",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const ResetPassword = () => {
    const navigate = useNavigate();
    const { token } = useParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: resetPasswordMutationFn,
        onSuccess: () => {
            toast({
                title: "Password Reset Successful",
                description: "You can now log in with your new password",
                variant: "success",
            });
            navigate("/");
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "An error occurred while resetting your password.",
                variant: "destructive",
            });
        },
    })

    const onSubmit = async (values) => {
        if (!token) {
            toast({
                title: "Invalid Link",
                description: "Reset token is missing or invalid.",
                variant: "destructive",
            });
            return;
        }

        mutate({
            token,
            newPassword: values.newPassword,
        });
    };

    return (
        <div className="flex min-h-svh items-center justify-center bg-muted px-4 py-10">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center">
                        <Link
                            to="/"
                            className="flex items-center gap-2 justify-center font-medium text-base"
                        >
                            <Logo />
                        </Link>
                        <CardTitle className="text-xl">Reset Password</CardTitle>
                        <CardDescription>Enter and confirm your new password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
                                                        type={showPassword ? "text" : "password"}
                                                        {...field}
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2"
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
                                                        type={showConfirm ? "text" : "password"}
                                                        {...field}
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                                        onClick={() => setShowConfirm((prev) => !prev)}
                                                    >
                                                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isPending}>
                                    {isPending && <Loader className="animate-spin mr-2 h-4 w-4" />}
                                    Reset Password
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ResetPassword;
