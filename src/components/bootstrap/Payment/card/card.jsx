import React from "react";
import Card2 from "./card2.jsx";
import Card3 from "./card3.jsx";
import Table from "../table/table.jsx";
import Hline from "../line/hline.jsx";
import Text from "../text/text.jsx";
import PaymentForm from "../../../workspace/payment-form.jsx";

const CardLayout = () => {
  return (
    <div className="bs">
      <div className="container-fluid">
        <div className="center-content">
          <div className="payment-box section-scrollable">
            <div className="payment-header">
              <h5 className="payment-title">Make Payment</h5>
            </div>

            {/* First Row */}
            <div className="first-row">
              <div className="cards-column">
                <div className="card-placeholder">
                  <Card2 />
                </div>
                <div className="card-placeholder">
                  {" "}
                  <Card3 />
                </div>
              </div>

              <div className="table-column">
                <div className="table-placeholder">
                  {" "}
                  <Table />
                </div>
              </div>
            </div>

            <div className="line-container">
              <Hline />
            </div>

            {/* Second Row */}
            <div className="second-row">
              <div className="form-column">
                <div className="payment-form-placeholder">
                  {" "}
                  <PaymentForm />
                </div>
              </div>

              <div className="text-column">
                <div className="text-placeholder">
                  <Text />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
