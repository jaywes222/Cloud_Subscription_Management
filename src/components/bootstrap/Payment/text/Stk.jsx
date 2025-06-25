import React, { useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  Form,
  InputGroup,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const Stk = () => {
  const [phone, setPhone] = useState("");
  return (
    <div className="bs">
      <Container>
        <Card className="mpesa-card p-4">
          <Card.Title className=" mpesa-card-title">
            Follow the Steps Below. Once you receive a successful reply from
            Mpesa, click the complete button below.
          </Card.Title>

          <ListGroup as="ul" className="mpesa-steps-1 mb-1">
            <ListGroup.Item as="li">
              Enter your Safaricom mobile phone number below and click{" "}
              <strong>Pay</strong>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              When prompted, enter your <strong>MPESA PIN</strong>
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Click the <strong>'Complete'</strong> button once you receive the
              MPESA confirmation
            </ListGroup.Item>
          </ListGroup>
          <Form className="payment-form">
            {" "}
            <Form.Group
              controlId="formPhoneNumber"
              className="mb-3"
              style={{ width: "300px" }}
            >
              <Form.Label htmlFor="phone">Phone Number</Form.Label>

              <PhoneInput
                country={"ke"}
                value={phone}
                onChange={setPhone}
                containerClass="phone-input"
                inputProps={{
                  name: "phone",
                  id: "phone",
                  required: true,
                }}
                inputStyle={{
                  width: "100%",
                  paddingLeft: "52px",
                  fontSize: "14px",
                  height: "38px",
                }}
              />
            </Form.Group>
            <Form.Group
              controlId="formAmount"
              style={{
                display: "inline-block",
                marginRight: "1rem",
                minWidth: "230px",
              }}
            >
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" />
            </Form.Group>
            <Form.Group
              controlId="formAccountNumber"
              style={{
                display: "inline-block",
                marginRight: "0.5rem",
                minWidth: "230px",
              }}
            >
              <Form.Label>Account Number</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Stk;
