import React from "react";
import { Card, ListGroup, Form, InputGroup, Button } from "react-bootstrap";

const BankConfirmation = () => {
  return (
    <div className="bs">
      <Card.Title className="mb-4 mpesa-card-title">
        Follow the steps below.
      </Card.Title>

      <ListGroup as="ul" className="mpesa-steps-1 mb-4">
        <ListGroup.Item as="li">
          Locate your official <strong>bank payment receipt</strong> from the
          teller
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Find the <strong>Transaction Reference Number</strong> on the receipt
          (e.g. <code>EQ123456789</code>)
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Note the <strong>date of payment</strong> from the receipt
        </ListGroup.Item>
        <ListGroup.Item as="li">
          You will enter the <strong>Reference Number</strong> and{" "}
          <strong>Payment Date</strong> in the fields below
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Click the <strong>'Confirm'</strong> button
        </ListGroup.Item>
      </ListGroup>

      {/* Input field after the list */}
      <Form className="mb-4 w-100">
        <Form.Group controlId="formTransactionId" className="mb-3 w-100">
          <InputGroup className="w-100">
            <Form.Control
              type="text"
              placeholder="e.g. EQ123456789"
              aria-label="Bank Transaction Reference"
              className="w-100 border border-dark p-2"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formTransactionDate" className="w-100">
          <Form.Label>Transaction Date</Form.Label>
          <Form.Control
            type="date"
            aria-label="Transaction Date"
            className="w-100 border border-dark p-2"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default BankConfirmation;
