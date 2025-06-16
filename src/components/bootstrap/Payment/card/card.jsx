import React, { useState } from "react";
import Pay from "../pay/confirmation.jsx";
import PaymentForm from "../../../workspace/payment-form.jsx";
import Stk from "../bootstrap/Payment/text/Stk.jsx";
import Stk from "../text/Stk.jsx";

const CardLayout = () => {
  return (
    <div className="bs">
      <div className="container-fluid">
        <div className="center-content">
          <div className="payment-box">
            <PaymentForm />
            <Pay />
            <Stk />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
