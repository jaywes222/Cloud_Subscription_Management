import React from "react";
import usePayNowDialog from "../../../hooks/use-pay-now-dialog";
import { Dialog, DialogContent } from "../../ui/Dialog";
import CardLayout from "./../../bootstrap/Payment/card/card";

const PayNowDialog = () => {
    const { open, onClose } = usePayNowDialog();

    return (
        <Dialog modal={true} open={open} onOpenChange={onClose}>
            <DialogContent
                className="sm:max-w-xl border-0"
                style={{ minHeight: "600px" }}
            >
                <CardLayout />
            </DialogContent>
        </Dialog>
    );
};

export default PayNowDialog;
