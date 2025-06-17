import React from "react";
import { Card, ListGroup } from "react-bootstrap"; // Make sure you import these components

const Cheque = () => {
  return (
    <div>
      <Card.Title className="mb-4 mpesa-card-title">
        Follow the steps below . Once you have submitted the cheque, click the
        Complete button below.
      </Card.Title>

      <ListGroup as="ul" className="mpesa-steps-1 mb-4">
        <ListGroup.Item as="li">
          Visit the nearest branch of your preferred bank (e.g.,{" "}
          <strong>Equity Bank</strong>, <strong>KCB</strong>, or{" "}
          <strong>Co-operative Bank</strong>)
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Proceed to the <strong>teller counter</strong> and request to make a{" "}
          <strong>cheque payment</strong>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Write a cheque payable to <strong>Business Name / Payee</strong>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Provide the <strong>Business Account Number:</strong>{" "}
          <strong>222222</strong>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          On the reverse side of the cheque, write the{" "}
          <strong>Account Reference Number:</strong> <strong>CUST001</strong>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Indicate the <strong>Amount:</strong> <strong>KES 250,000</strong>{" "}
          clearly on the cheque
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Hand the cheque to the teller for processing and obtain a{" "}
          <strong>deposit slip</strong> or <strong>bank receipt</strong>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Once you have submitted the cheque, click the{" "}
          <strong>Complete</strong> button below
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Cheque;
