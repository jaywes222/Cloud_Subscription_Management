import React from "react";
import { Dialog, DialogHeader, DialogTitle, DialogContent } from "../../ui/dialog";
import Activation from "../../bootstrap/Activation/Activation";
import useActivateNowDialog from "../../../hooks/use-activate-now-dialog";

const ActivateNowDialog = () => {
    const { open, onClose } = useActivateNowDialog();

    return (
        <Dialog modal={true} open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl border-0" style={{ minHeight: "700px" }}>
                <Activation />
            </DialogContent>
        </Dialog>
    );
};

export default ActivateNowDialog;
