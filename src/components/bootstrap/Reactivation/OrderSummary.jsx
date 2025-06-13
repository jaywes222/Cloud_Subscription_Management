import React from "react";

const Text = () => {
  return (
    <div className="bs">
      <div className="receipt-container">
        <h5 className="order-summary-title">Order Summary</h5>
        <h6 className="order-number">Order No:97XYrWE34</h6>

        <div className="thankyou-text">
          <p className="thankyou-message">Thank You For Your Purchase</p>

          <div className="thankyou-container">
            <div className="receipt-row">
              <p className="receipt-name">phAMACore Lite</p>
              <p className="receipt-price">KES 0</p>
            </div>

            <div className="receipt-row">
              <p className="receipt-name">eTims</p>
              <p className="receipt-price">KES 0</p>
            </div>

            <div className="receipt-row">
              <p className="receipt-name">Transaction Fee</p>
              <p className="receipt-price">KES 0</p>
            </div>

            <div className="receipt-row">
              <p className="receipt-name">Service Charge</p>
              <p className="receipt-price">KES 0</p>
            </div>

            <hr className="divider" />

            <div className="receipt-row total-row">
              <div className="receipt-name total-text">
                <p>Total</p>
              </div>
              <div className="receipt-price total-text">
                <p>KES 0</p>
              </div>
            </div>

            <p className="auto-note">**This is an auto-generated receipt**</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Text;
