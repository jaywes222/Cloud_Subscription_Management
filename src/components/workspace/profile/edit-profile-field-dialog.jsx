import React from "react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import EditProfileFieldForm from "./edit-profile-field-form";

export default function EditProfileFieldDialog({ open, onClose, field, initialValue }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <EditProfileFieldForm field={field} initialValue={initialValue} onClose={onClose} />
            </DialogContent>
        </Dialog>
    );
}
