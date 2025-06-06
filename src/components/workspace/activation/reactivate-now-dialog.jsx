import React from "react";
import useReactivateNowDialog from "../../../hooks/use-reactivate-now-dialog";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import Reactivation from "../../bootstrap/Reactivation/Reactivation";

const ReactivateNowDialog = () => {
    const { open, onClose } = useReactivateNowDialog();

    return (
        <Dialog modal={true} open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-xl border-0" style={{ minHeight: "700px" }}>
                <Reactivation/>
            </DialogContent>
        </Dialog>
    );
};

export default ReactivateNowDialog;
