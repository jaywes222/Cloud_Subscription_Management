import React, { useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  Button,
  Row,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";

const Confirmation = () => {
  return (
    <div className="bs">
      <Card.Title className="mb-4 mpesa-card-title">
        Follow the Steps Below.
      </Card.Title>
      <ListGroup as="ul" className="mpesa-steps-1 mb-4">
        <ListGroup.Item as="li">
          Open the text you have received from <strong>MPESA</strong>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Enter <strong>MPESA transaction ID</strong> detail below e.g.{" "}
          <code>RAT2G4W9QU</code>
        </ListGroup.Item>
        <ListGroup.Item as="li">
          Click <strong>'Confirm'</strong> button
        </ListGroup.Item>
      </ListGroup>
      <Form className="mb-4 w-100">
        <Form.Group controlId="formTransactionId" className="w-100">
          <InputGroup className="w-100">
            <Form.Control
              type="text"
              placeholder="e.g. RAT2G4W9QU"
              aria-label="MPESA Transaction ID"
              className="w-100 border border-white p-2"
            />
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Confirmation;
