import React, { useState } from "react";

import PaymentForm from "../../../workspace/payment/payment-form";

const CardLayout = () => {
  return (
    <div className="bs">
      <div className="container-fluid">
        <div className="center-content">
          <div className="payment-box">
            <PaymentForm />
            {/* <Pay /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
