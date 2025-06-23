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
      <Card className="mpesa-card p-4">
        <Card.Title className=" mpesa-card-title">
          Follow the Steps Below. Once you receive a successful reply from
          Mpesa, click the complete button below.
        </Card.Title>

        <ListGroup as="ul" className="mpesa-steps-1 mb-1">
          <ListGroup.Item as="li">
            Open the text message you received from <strong>MPESA</strong>
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Enter the <strong>MPESA Transaction ID</strong> below (e.g.{" "}
            <code>RAT2G4W9QU</code>)
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Click the <strong>'Confirm'</strong> button
          </ListGroup.Item>
        </ListGroup>

        <Form className="payment-form">
          <Form.Group
            controlId="formTransactionId"
            style={{
              marginRight: "1rem",
              minWidth: "350px",
            }}
          >
            <Form.Label>Transaction ID</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Enter Mpesa Transaction ID"
                aria-label="MPESA Transaction ID"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default Confirmation;
