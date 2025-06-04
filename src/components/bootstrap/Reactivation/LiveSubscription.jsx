import React from "react";
import { Col, Row } from "react-bootstrap";
import { Pencil } from "lucide-react";

const LiveSubscription = () => {
  return (
    <div className="bs">
      <div className="mb-3">
        <p className="live-title">Current Subscription</p>

        <Row className="mb-2">
          <Col xs={6}>
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
          <Col xs={6}>
            <div className="item-spacing">
              Last Payment On: <span>May 16 2025</span>
            </div>
            <div className="item-spacing">
              Expiry Date: <span>June 16 2025</span>
            </div>
            <div className="item-spacing">
              Pending Amount: <span className="text-danger">KES0.00</span>
            </div>
            <div className="item-spacing">
              Total Payment: <span>KES250,000.00</span>
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
