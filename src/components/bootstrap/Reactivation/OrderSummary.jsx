import React from "react";
import { ListGroup } from "react-bootstrap";

export default function OrderSummary() {
  return (
    <div className="bs">
      <div className="mt-2">
        <h6 className="fs-5">Order Summary</h6>
        <div className="text-muted small mb-1">Order No: 97XY-YWE34</div>
        <div className="mb-3 small">Thank you for your purchase!</div>
        <ListGroup variant="flush">
          <ListGroup.Item className="order-summary">
            phAMACore Lite <span> KES 0</span>
          </ListGroup.Item>
          <ListGroup.Item className="order-summary">
            eTims <span> KES 0</span>
          </ListGroup.Item>
          <ListGroup.Item className="order-summary">
            Transaction Fee <span> KES 0</span>
          </ListGroup.Item>
          <ListGroup.Item className="order-summary">
            Service Charge <span> KES 0</span>
          </ListGroup.Item>
          <ListGroup.Item className="order-summary">
            Total <span> KES 0</span>
          </ListGroup.Item>
        </ListGroup>
        <div className="order-receipt">
          ** This is an auto-generated receipt **
        </div>
      </div>
    </div>
  );
}
