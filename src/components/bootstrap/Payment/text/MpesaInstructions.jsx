import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";

const MpesaInstructions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("mpesa");

  return (
    <Container className="bs ">
      <Card className="mpesa-card p-4">
        {show === "mpesa" ? (
          <>
            <Card.Title className="mb-4 mpesa-card-title">
              Follow the Steps Below. Once you receive a successful reply from
              Mpesa, click the complete button below.
            </Card.Title>
            <ListGroup as="ul" className="mpesa-steps-1 mb-4">
              <ListGroup.Item as="li">
                Go to M-PESA on your phone
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Select <strong>Pay Bill</strong> option
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Enter Business Number: <strong>222222</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Enter Account Number: <strong>CUST001</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Enter the Amount: <strong>KES 250,000</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Enter your M-PESA PIN and press <strong>Send</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                You will receive a confirmation SMS from <strong>MPESA</strong>
              </ListGroup.Item>
            </ListGroup>
          </>
        ) : show === "STK" ? (
          "STK"
        ) : (
          "confirm"
        )}

        <Row className="mpesa-steps-1-footer">
          <Col xs={12} md="auto" className="mb-2">
            <Button
              className="custom-complete-button"
              onClick={() => navigate("/complete")}
            >
              Complete
            </Button>
          </Col>
          <Col xs={12} md="auto" className="mb-2">
            <span
              className="link"
              // onClick={() => navigate("/stk")}
              onClick={() => setShow("mpesa")}
              role="button"
            >
              Pay via MPESA
            </span>
          </Col>
          <Col xs={12} md="auto" className="mb-2">
            <span
              className="link"
              // onClick={() => navigate("/stk")}
              onClick={() => setShow("STK")}
              role="button"
            >
              Pay via MPESA Express (STK Push)
            </span>
          </Col>
          <Col xs={12} md="auto">
            <span
              className="link"
              // onClick={() => navigate("/confirmation")}
              onClick={() => setShow("confirm")}
              role="button"
            >
              Confirm My Payment
            </span>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default MpesaInstructions;
