import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
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
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordMutationFn } from "../../lib/api";
import { Loader } from "lucide-react";
import Logo from "../../components/logo";

const formSchema = z.object({
    cusCode: z.string().min(1, { message: "Customer code is required" }),
});

const ForgotPassword = () => {
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cusCode: "",
        },
    });

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: forgotPasswordMutationFn,
        onSuccess: () => {
            toast({
                title: "Code accepted",
                description: "Please check your email for the reset instructions.",
                variant: "success",
            });
            form.reset(); // Clear the form after success
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message || "An error occurred while processing your request.",
                variant: "destructive",
            });
        },
    });

    const onSubmit = (values) => {
        if (isPending) return;

        const identifier = values.cusCode.trim();
        mutate({ identifier });
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
                        <CardTitle className="text-xl">Forgot Password</CardTitle>
                        <CardDescription>Enter your Customer Code to receive your new password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                                <FormField
                                    control={form.control}
                                    name="cusCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Customer Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="CX00123"
                                                    {...field}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-between gap-4">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="w-full"
                                        onClick={() => navigate("/")}
                                        disabled={isPending}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="w-full" disabled={isPending}>
                                        {isPending ? <Loader className="animate-spin mr-2 h-4 w-4" /> : null}
                                        Reset
                                    </Button>
                                </div>

                                {isSuccess && (
                                    <p className="text-sm text-muted-foreground text-center mt-4">
                                        📬 A reset link has been sent to your email. Click it to continue.
                                    </p>
                                )}
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPassword;
