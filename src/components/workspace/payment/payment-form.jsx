import React, { useState } from "react";

import { DialogHeader, DialogDescription, DialogTitle } from "../../ui/Dialog";
import MpesaInstructions from "../../bootstrap/Payment/text/MpesaInstructions";

import BankInstructions from "../../bootstrap/Payment/pay/BankInstructions";
const PaymentForm = () => {
  const [selectedOption, setSelectedOption] = useState("mpesa");

  const handleRadioClick = (value) => {
    setSelectedOption((prev) => (prev === value ? "" : value));
  };
  return (
    <div className="bs ">
      <div className="payment-container my-3">
        <DialogHeader className="form-title">
          <DialogTitle>
            <h5 className="text-start h5.form-title">Payment Information</h5>
          </DialogTitle>
          <DialogDescription>
            <h6 className="h6.form-title">Choose Payment method</h6>
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="radio-group">
            <label className="custom-radio">
              <input
                type="radio"
                value="mpesa"
                checked={selectedOption === "mpesa"}
                onClick={() => handleRadioClick("mpesa")}
                readOnly
              />
              <span className="radio-label">MPESA</span>
            </label>
            {selectedOption === "mpesa" && <MpesaInstructions />}
            {/* {selectedOption === "stk" && (
              <Stk setSelectedOption={setSelectedOption} />
            )} */}
            <label className="custom-radio">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={selectedOption === "bank"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="radio-label">BANK</span>
            </label>
            {selectedOption === "bank" && <BankInstructions />}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
