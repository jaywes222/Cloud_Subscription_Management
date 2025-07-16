import React, { useState } from "react";

import { DialogHeader, DialogDescription, DialogTitle } from "../../ui/Dialog";
import MpesaInstructions from "../../bootstrap/Payment/text/MpesaInstructions";

import BankConfirmation from "../../bootstrap/Payment/pay/BankConfirmation";
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
            <span className="radio-label">Confirmation</span>
          </label>
          {showInstructions === "bank" && <BankConfirmation />}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
