import React from "react";
import usePayNowDialog from "../../../hooks/use-pay-now-dialog";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "../../ui/Dialog";
import CardLayout from "./../../bootstrap/Payment/card/card";

const PayNowDialog = () => {
    const { open, onClose } = usePayNowDialog();

    return (
        <Dialog modal={true} open={open} onOpenChange={onClose}>
            <DialogContent
                className="w-full max-w-3xl p-0 border-0 overflow-visible"
                style={{ minHeight: "auto", maxHeight: "max-h-[90vh]" }}
            >
                <div className="p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-semibold">
                            Payment Information
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Choose your preferred payment method
                        </DialogDescription>
                    </DialogHeader>

                    <CardLayout />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PayNowDialog;
