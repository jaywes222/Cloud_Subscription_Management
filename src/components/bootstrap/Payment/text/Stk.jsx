import React from "react";
import { Container, Card, ListGroup, Form, InputGroup } from "react-bootstrap";

const Stk = ({ phone, setPhone }) => {
  return (
    <div className="bs">
      <Container>
        <Card className="mpesa-card p-4">
          <Card.Title className="mb-4 mpesa-card-title">
            Follow the Steps Below. Once you receive a successful reply from
            MPESA, click the button.
          </Card.Title>

          <ListGroup as="ul" className="mpesa-steps-1 mb-4">
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

          <Form className="  payment-form">
            <Form.Group controlId="formPhoneNumber" className="w-100">
              <Form.Label>Phone number</Form.Label>
              <InputGroup className="w-100">
                <Form.Control
                  type="tel"
                  placeholder="e.g. 254712345678"
                  aria-label="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-100 border border-dark p-2"
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Stk;
