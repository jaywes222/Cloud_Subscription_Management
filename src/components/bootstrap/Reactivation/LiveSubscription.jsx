import React from "react";
import { Col, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

const LiveSubscription = () => {
  return (
    <div className="bs">
      <div className="mb-3">
        <p className="live-title">Current Subscription</p>

        <Row className="mb-2">
          <Col xs={6}>
            <div className="mb-1 small">CUS005 - NILA PHARMACY</div>
            <div className="item-spacing">
              phAMACore Lite <FaEdit className="mx-1" />
            </div>
            <div className="item-spacing">
              Quarterly <FaEdit className="mx-1" />
            </div>
            <div className="item-spacing">
              5 Branches <FaEdit className="mx-1" />
            </div>
            <div className="item-spacing">
              3 Users <FaEdit className="mx-1" />
            </div>
          </Col>
          <Col xs={6}>
            <div className="item-spacing">
              Last Payment On: <strong>May 16 2025</strong>
            </div>
            <div className="item-spacing">
              Expiry Date: <strong>June 16 2025</strong>
            </div>
            <div className="item-spacing">
              Pending Amount: <span className="text-danger">KES0.00</span>
            </div>
            <div className="item-spacing">
              Total Payment: <strong>KES250,000.00</strong>
            </div>
            <div className="item-spacing">
              Mobile Number: <span>0758***306</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LiveSubscription;
