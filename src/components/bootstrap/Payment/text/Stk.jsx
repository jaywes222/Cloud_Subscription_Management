import React from "react";
import { Container, Card, ListGroup, Form, Row, Col } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import { normalizePhone } from "../../../../utils/phone-utils";

const Stk = ({ phone, setPhone, amount, setAmount, accountNumber }) => {
  return (
    <div className="bs">
      <Container>
        <Card className="mpesa-card ">
          <ListGroup as="ul" className="mpesa-steps-1 ">
            <ListGroup.Item>
              Enter your Safaricom mobile phone number below and click{" "}
              <strong>Pay</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              When prompted, enter your <strong>MPESA PIN</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Click the <strong>'Complete'</strong> button once you receive the
              MPESA confirmation
            </ListGroup.Item>
          </ListGroup>

          <Form className="payment-form">
            <Row className="gy-1 ps-5">
              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
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
                  <Form.Label>Amount (KES)</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={1}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <Form.Group controlId="formAccountNumber">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control type="text" value={accountNumber} readOnly />
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
