<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
>>>>>>> b95835457ad88394f2c5db8a3a4f58274a3b7d66
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
<<<<<<< HEAD
      <Card className="mpesa-card p-4">
        <Card.Title className="mb-4 mpesa-card-title">
          Follow the steps below to confirm your MPESA payment.
        </Card.Title>

        <ListGroup as="ul" className="mpesa-steps-1 mb-4">
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

        <Form className="mb-4 w-100">
          <Form.Group controlId="formTransactionId" className="w-100">
            <Form.Label>Transaction ID</Form.Label>
            <InputGroup className="w-100">
              <Form.Control
                type="text"
                placeholder="e.g. RAT2G4W9QU"
                aria-label="MPESA Transaction ID"
                className="w-100 border border-dark p-2"
              />
            </InputGroup>
          </Form.Group>
        </Form>
      </Card>
=======
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
>>>>>>> b95835457ad88394f2c5db8a3a4f58274a3b7d66
    </div>
  );
};

export default Confirmation;
