import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "../../ui/dialog";
import Activation from "../../bootstrap/Activation/Activation";
import useActivateNowDialog from "../../../hooks/use-activate-now-dialog";

const ActivateNowDialog = () => {
  const { open, onClose } = useActivateNowDialog();

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-2xl border-0 !p-0 overflow-hidden"
        style={{ height: "auto", maxHeight: "90vh" }}
      >
        <Activation />
      </DialogContent>
    </Dialog>
  );
};

export default ActivateNowDialog;
