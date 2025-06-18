import React, { useEffect, useState } from "react";
import Activation from "../../bootstrap/Activation/Activation";
import useActivateNowDialog from "../../../hooks/use-activate-now-dialog";

import { Dialog, DialogContent } from "../../ui/Dialog";

const ActivateNowDialog = () => {
  const { open, onClose } = useActivateNowDialog();
  const [termsChecked, setTermsChecked] = useState(false);

  useEffect(() => {
    if (!open) {
      setTermsChecked(false); // Clear checkbox when dialog is closed
    }
  }, [open]);

  return (
    <Dialog modal={true} open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-2xl border-0 !p-0 overflow-hidden"
        style={{ height: "auto", maxHeight: "90vh" }}
      >
        <Activation
          termsChecked={termsChecked}
          setTermsChecked={setTermsChecked}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ActivateNowDialog;
