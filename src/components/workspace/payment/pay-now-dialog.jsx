import React from "react";
import usePayNowDialog from "../../../hooks/use-pay-now-dialog";
import CardLayout from './../../bootstrap/Payment/card/card';
import { Dialog, DialogContent} from "../../ui/dialog";

const PayNowDialog = () => {
    const { open, onClose } = usePayNowDialog();

    return (
        <Dialog modal={true} open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl border-0" style={{ minHeight: "700px" }}>
                <CardLayout />
            </DialogContent>
        </Dialog>
    );
};

export default PayNowDialog;
