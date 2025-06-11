import React from "react";
import { Form } from "react-bootstrap";

export default function Payment() {
  return (
    <div className="bs">
      <div className="pay-wrapper">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "14px" }}>
              Choose Payment Method
            </Form.Label>
            <div className="d-flex gap-3">
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
              className="bg-white border w-100"
              style={{
                fontSize: "14px",
                borderRadius: "0.25rem",
                padding: "0.375rem 0.375rem",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "14px" }}>
              Transaction Code:
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Transaction Code"
              className="bg-white border w-100"
              style={{
                fontSize: "14px",
                borderRadius: "0.25rem",
                padding: "0.375rem 0.375rem",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "14px" }}>Amount Paid:</Form.Label>
            <Form.Control
              type="text"
              placeholder="KES 0.00"
              className="bg-white border w-100"
              style={{
                fontSize: "14px",
                borderRadius: "0.25rem",
                padding: "0.375rem 0.375rem",
              }}
            />
          </Form.Group>
        </Form>
        <div className="mb-2 w-100" style={{ fontSize: "12px" }}>
          <div className="justify-content-between w-100 mb-1">
            <span className="ms-auto">Next Payment On: </span>
            <span className="me-auto">July 16 2025</span>
          </div>
          <div className="justify-content-between w-100 mb-1">
            <span className="ms-auto">Next Payment Amount: </span>
            <span className="me-auto">KES 250,000.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
