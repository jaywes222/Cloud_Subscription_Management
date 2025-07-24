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

  const handleSTKSuccess = () => {
    setSelectedOption("bank");
    setShowInstructions("bank");

    setTimeout(() => {
      const el = document.getElementById("confirmation-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.style.transition = "background-color 0.6s ease";
        el.style.backgroundColor = "#e0ffe0";
        setTimeout(() => {
          el.style.backgroundColor = "transparent";
        }, 1200);
      }
    }, 100);
  };

  return (
    <div className="bs">
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
          {showInstructions === "mpesa" && (
            <MpesaInstructions onSTKSuccess={handleSTKSuccess} />
          )}

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
          {showInstructions === "bank" && (
            <div id="confirmation-section">
              <BankConfirmation />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
