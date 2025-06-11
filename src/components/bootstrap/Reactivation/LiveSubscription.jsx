import React from "react";
import { Col, Row } from "react-bootstrap";
import { Pencil } from "lucide-react";

const LiveSubscription = () => {
  return (
    <div className="bs">
      <div className="mb-3">
        <p className="live-title">Current Subscription</p>

        <Row className="d-flex justify-content-between">
          <Col md={6} className="me-auto">
            <div className="mb-1 small">CUS005 - NILA PHARMACY</div>
            <div className="item-spacing">
              phAMACore Lite <Pencil className="mx-1" size={14} />
            </div>
            <div className="item-spacing">
              Quarterly <Pencil className="mx-1" size={14} />
            </div>
            <div className="item-spacing">
              5 Branches <Pencil className="mx-1" size={14} />
            </div>
            <div className="item-spacing">
              3 Users <Pencil className="mx-1" size={14} />
            </div>
          </Col>
          <Col md={6} className="ms-auto">
            <div className="item-spacing">
              <span className="item-label-col">Last Payment On: </span>
              <span>May 16 2025</span>
            </div>
            <div className="item-spacing">
              <span className="item-label-col">Expiry Date: </span>
              <span>June 16 2025</span>
            </div>
            <div className="item-spacing">
              <span className="item-label-col">Pending Amount: </span>
              <span className="text-danger">KES0.00</span>
            </div>
            <div className="item-spacing">
              <span className="item-label-col">Total Payment: </span>
              <span>KES250,000.00</span>
            </div>
            <div className="item-spacing">
              <span className="item-label-col">Mobile Number: </span>
              <span>0758***306</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LiveSubscription;
