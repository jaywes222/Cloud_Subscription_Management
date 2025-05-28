import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../hooks/use-toast";
import { updateUserProfileQueryFn as updateUserProfile } from "../../../lib/api";
import { PenBoxIcon } from "lucide-react";

const schemas = {
    username: z.string().min(2, "Username must be at least 2 characters"),
    companyName: z.string().min(2, "Company name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Phone number must be at least 5 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
};

const fieldLabels = {
    username: "Username",
    companyName: "Company Name",
    email: "Email",
    phone: "Phone",
    password: "Password",
};

export default function EditProfileFieldForm({ field, initialValue, onClose }) {
    const { toast } = useToast();

    const schema = React.useMemo(() => {
        return schemas[field] || z.string().min(2, "Too short");
    }, [field]);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: { value: initialValue },
    });

    const onSubmit = async (data) => {
        try {
            await updateUserProfile({ [field]: data.value });
            toast({ title: `${fieldLabels[field] || field} updated`, variant: "success" });
            onClose();
        } catch (err) {
            toast({ title: "Failed to update", variant: "destructive" });
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-center space-x-3">
                <div className="p-1.5 rounded-md bg-gray-100 text-gray-500">
                    <PenBoxIcon className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">
                        Edit {fieldLabels[field] || field}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Make valid changes and click save to update.
                    </p>
                </div>
            </div>

            <div>
                <Input
                    id="value"
                    {...form.register("value")}
                    type={field === "password" ? "password" : "text"}
                    placeholder={fieldLabels[field]}
                />
                {form.formState.errors.value && (
                    <p className="text-sm text-red-500 mt-1">
                        {form.formState.errors.value.message}
                    </p>
                )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    Save
                </Button>
            </div>
        </form>
    );
}
