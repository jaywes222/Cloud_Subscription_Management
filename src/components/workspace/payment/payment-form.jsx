import React, { useState } from "react";

import { DialogHeader, DialogDescription, DialogTitle } from "../../ui/Dialog";
import MpesaInstructions from "../../bootstrap/Payment/text/MpesaInstructions";

import BankInstructions from "../../bootstrap/Payment/pay/BankInstructions";
const PaymentForm = () => {
  const [selectedOption, setSelectedOption] = useState("mpesa");
  const [showInstructions, setShowInstructions] = useState("mpesa");

  const handleRadioClick = (value) => {
    if (selectedOption === value) {
      setShowInstructions(showInstructions === value ? null : value);
    } else {
      setSelectedOption(value);
      setShowInstructions(value);
    }
  };

  return (
    <div className="bs ">
      <div className="payment-container my-3">
        <DialogHeader className="form-title">
          <DialogTitle>
            <h4 className="text-start form-title">Payment Information</h4>
          </DialogTitle>
          <DialogDescription>
            <h5 className="form-title">Choose Payment method</h5>
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="radio-group">
            <label className="custom-radio">
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                checked={selectedOption === "mpesa"}
                onClick={() => handleRadioClick("mpesa")}
                readOnly
              />
              <span className="radio-label">MPESA</span>
            </label>
            {showInstructions === "mpesa" && <MpesaInstructions />}

            <label className="custom-radio">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={selectedOption === "bank"}
                onClick={() => handleRadioClick("bank")}
                readOnly
              />
              <span className="radio-label">BANK</span>
            </label>
            {showInstructions === "bank" && <BankInstructions />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
