// components/workspace/profile/edit-profile-field-form.js
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../hooks/use-toast";
import { updateUserProfileFieldMutationFn } from "../../../lib/api";
import { PenBoxIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "../../../context/auth-provider";

const schemas = {
    fullname: z.string().min(2, "Full Name must be at least 2 characters"),
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Phone number must be at least 5 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
};

const fieldLabels = {
    fullname: "Full Name",
    companyName: "Company Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
};

export default function EditProfileFieldForm({ field, initialValue, onClose }) {
    const { toast } = useToast();
    const { refetchAuth } = useAuthContext();

    const schema = React.useMemo(() => {
        return schemas[field] || z.string().min(2, "Too short");
    }, [field]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(z.object({ value: schema })),
        defaultValues: { value: initialValue },
    });

    const { mutate: updateField } = useMutation({
        mutationFn: updateUserProfileFieldMutationFn,
        onSuccess: async () => {
            await refetchAuth();
            toast({
                title: `${fieldLabels[field] || field} updated successfully 🎉`,
                variant: "success",
            });
            onClose();
        },
        onError: (err) => {
            toast({
                title: "Failed to update",
                description: err?.response?.data?.message || err.message || "An error occurred while updating the field.",
                variant: "destructive",
            });
        },
    });

    const onSubmit = ({ value }) => {
        console.log("Submitting form with:", { field, value });
        updateField({ field, value });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center space-x-3">
                <div className="p-1.5 rounded-md bg-gray-100 text-gray-500">
                    <PenBoxIcon className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg text-caramel font-semibold">
                        Edit {fieldLabels[field] || field}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your updated {fieldLabels[field] || field.toLowerCase()} below and save changes.
                    </p>
                </div>
            </div>

            <div>
                <Input
                    id="value"
                    {...register("value")}
                    type={field === "password" ? "password" : "text"}
                    placeholder={fieldLabels[field]}
                />
                {errors.value && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.value.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button 
                type="submit" 
                variant="success"
                disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save"}
                </Button>
                <Button 
                type="button" 
                variant="dangerOutline"
                onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
