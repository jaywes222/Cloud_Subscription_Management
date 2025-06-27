import React from "react";
import {
  Container,
  Card,
  ListGroup,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { normalizePhone } from "../../../../utils/phone-utils";

const Stk = ({ phone, setPhone, amount, accountNumber }) => {
  return (
    <div className="bs">
      <Container>
        <Card className="mpesa-card p-4">
          <Card.Title className="mpesa-card-title">
            Follow the Steps Below. Once you receive a successful reply from Mpesa, click the complete button below.
          </Card.Title>

          <ListGroup as="ul" className="mpesa-steps-1 mb-1">
            <ListGroup.Item>Enter your Safaricom mobile phone number below and click <strong>Pay</strong></ListGroup.Item>
            <ListGroup.Item>When prompted, enter your <strong>MPESA PIN</strong></ListGroup.Item>
            <ListGroup.Item>Click the <strong>'Complete'</strong> button once you receive the MPESA confirmation</ListGroup.Item>
          </ListGroup>

          <Form className="payment-form">
            <Row className="gy-3">
              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formPhoneNumber">
                  <PhoneInput
                    country={"ke"}
                    value={phone}
                    onChange={(value) => {
                      const normalized = normalizePhone(value);
                      setPhone(normalized);
                    }}
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
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formAccountNumber">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={accountNumber}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Stk;
