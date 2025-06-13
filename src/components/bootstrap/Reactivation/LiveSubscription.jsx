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
            <div
              className="mb-1 small"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              CUS005 - NILA PHARMACY
            </div>
            <div
              className="d-flex align-items-center item-spacing"
              style={{ color: "#c58c4f" }}
            >
              <div style={{ minWidth: "150px" }}>phAMACore Lite</div>
              <Pencil style={{ marginLeft: "16px" }} />
            </div>

            <div className="d-flex align-items-center item-spacing">
              <div style={{ minWidth: "150px" }}>Quarterly</div>
              <Pencil style={{ marginLeft: "16px" }} />
            </div>

            <div className="d-flex align-items-center item-spacing">
              <div style={{ minWidth: "150px" }}>5 Branches</div>
              <Pencil style={{ marginLeft: "16px" }} />
            </div>

            <div className="d-flex align-items-center item-spacing">
              <div style={{ minWidth: "150px" }}>3 Users</div>
              <Pencil style={{ marginLeft: "16px" }} />
            </div>
          </Col>
          <Col md={6} className="ms-auto">
            <div
              className="item-spacing d-flex align-items-center"
              style={{ marginBottom: "5px" }}
            >
              <span className="item-label-col" style={{ minWidth: "150px" }}>
                Last Payment On:
              </span>
              <span>May 16 2025</span>
            </div>

            <div
              className="item-spacing d-flex align-items-center"
              style={{ marginBottom: "5px" }}
            >
              <span className="item-label-col" style={{ minWidth: "150px" }}>
                Expiry Date:
              </span>
              <span>June 16 2025</span>
            </div>

            <div
              className="item-spacing d-flex align-items-center"
              style={{ marginBottom: "5px" }}
            >
              <span className="item-label-col" style={{ minWidth: "150px" }}>
                Pending Amount:
              </span>
              <span className="text-danger">KES 0.00</span>
            </div>

            <div
              className="item-spacing d-flex align-items-center"
              style={{ marginBottom: "5px" }}
            >
              <span className="item-label-col" style={{ minWidth: "150px" }}>
                Total Payment:
              </span>
              <span className="text-danger">KES 250,000.00</span>
            </div>

            <div
              className="item-spacing d-flex align-items-center"
              style={{ marginBottom: "5px" }}
            >
              <span className="item-label-col" style={{ minWidth: "150px" }}>
                Mobile Number:
              </span>
              <span>0758***306</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LiveSubscription;
