import React, { useState } from "react";

const PaymentForm = () => {
  const [selectedOption, setSelectedOption] = useState("mpesa");

  return (
    <div className="bs ">
      <div className="payment-container">
        <h6 className="form-title">Choose Your Payment Method</h6>

        <form>
          <div className="radio-group">
            <label className="custom-radio">
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                checked={selectedOption === "mpesa"}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="radio-label">MPESA</span>
            </label>

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
          </div>

          {selectedOption === "mpesa" && (
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="mobileNumber ">Mobile Number</label>
                <input type="text" id="mobileNumber" name="mobileNumber" />
              </div>

              <div className="form-group">
                <label htmlFor="amountPaidMpesa">Amount Paid</label>
                <input
                  type="number"
                  id="amountPaidMpesa"
                  name="amountPaid"
                  min={0}
                />
              </div>
            </div>
          )}

          {selectedOption === "bank" && (
            <div className="form-section bank-scrollable">
              <div className="form-group">
                <label htmlFor="bankName">Bank Name</label>
                <input type="text" id="bankName" name="bankName" />
              </div>

              <div className="form-group">
                <label htmlFor="accountNumber">Account Number</label>
                <input type="text" id="accountNumber" name="accountNumber" />
              </div>

              <div className="form-group">
                <label htmlFor="referenceNumber">Reference Number</label>
                <input
                  type="text"
                  id="referenceNumber"
                  name="referenceNumber"
                />
              </div>

              <div className="form-group">
                <label htmlFor="amountPaidBank">Amount Paid</label>
                <input
                  type="number"
                  id="amountPaidBank"
                  name="amountPaid"
                  min={0}
                />
              </div>

              <div className="form-group">
                <label htmlFor="paymentDate">Payment Date</label>
                <input type="date" id="paymentDate" name="paymentDate" />
              </div>
            </div>
          )}

          <div className="submit-section">
            <button type="submit" className="submit-button">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
