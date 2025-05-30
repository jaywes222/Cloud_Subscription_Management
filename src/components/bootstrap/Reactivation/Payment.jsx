import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function Payment() {
  return (
    <div className="bs">
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="12">
            Choose Payment Method
          </Form.Label>
          <div className="d-flex gap-2">
            <Form.Check
              type="radio"
              label="M-PESA"
              name="paymentMethod"
              id="m-pesa"
              defaultChecked
              style={{ fontSize: "14px" }}
            />
            <Form.Check
              type="radio"
              label="BANK"
              name="paymentMethod"
              id="bank"
              style={{ fontSize: "14px" }}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "14px" }}>Mobile Number:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your mobile number"
            name="mobileNumber"
            id="mobileNumber"
            required
            style={{ fontSize: "14px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Transaction Code:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Transaction Code"
            style={{ fontSize: "14px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ fontSize: "14px" }}>Amount Paid:</Form.Label>
          <Form.Control
            type="text"
            placeholder="KES 0.00"
            style={{ fontSize: "14px" }}
          />
        </Form.Group>

        <div className="text-muted mb-2" style={{ fontSize: "14px" }}>
          <div>
            <span className="fs-6">Next Payment On:</span> July 16 2025
          </div>
          <div>
            <span className="fs-6">Next Payment Amount:</span>{" "}
            <span className="text-danger">KES 250,000.00</span>
          </div>
        </div>
      </Form>
    </div>
  );
}
