import React, { useState } from "react";
import MpesaInstructions from "../../bootstrap/Payment/text/MpesaInstructions";
import Stk from "../../bootstrap/Payment/text/Stk";
import BankInstructions from "../../bootstrap/Payment/pay/BankInstructions";
const PaymentForm = () => {
  const [selectedOption, setSelectedOption] = useState("mpesa");

  const handleRadioClick = (value) => {
    setSelectedOption((prev) => (prev === value ? "" : value));
  };
  return (
    <div className="bs ">
      <div className="payment-container">
        <h6 className="form-title">Complete payment</h6>
        <h5 className="form-title">Choose Payment method</h5>
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
