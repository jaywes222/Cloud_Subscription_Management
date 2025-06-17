import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";
import Stk from "../text/Stk";
import Confirmation from "../pay/confirmation";

const MpesaInstructions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("mpesa");

  return (
    <div className="bs ">
      <Container>
        <Card className="mpesa-card p-4">
          {show === "mpesa" ? (
            <>
              <Card.Title className="mb-4 mpesa-card-title">
                Follow the Steps Below. Once you receive a successful reply from
                Mpesa, click the complete button below.
              </Card.Title>
              <ListGroup as="ul" className="mpesa-steps-1 mb-4">
                <ListGroup.Item>Go to M-PESA on your phone</ListGroup.Item>
                <ListGroup.Item>Select <strong>Pay Bill</strong> option</ListGroup.Item>
                <ListGroup.Item>Enter Business Number: <strong>222222</strong></ListGroup.Item>
                <ListGroup.Item>Enter Account Number: <strong>CUST001</strong></ListGroup.Item>
                <ListGroup.Item>Enter the Amount: <strong>KES 250,000</strong></ListGroup.Item>
                <ListGroup.Item>Enter your M-PESA PIN and press <strong>Send</strong></ListGroup.Item>
                <ListGroup.Item>You will receive a confirmation SMS from <strong>MPESA</strong></ListGroup.Item>
              </ListGroup>
            </>
          ) : show === "STK" ? (
            <Stk />
          ) : (
            <Confirmation />
          )}

          <Row className="mpesa-steps-1-footer">
            {show !== "mpesa" && show !== "confirm" && (
              <Col xs="auto">
                <Button
                  className="custom-complete-button"
                  onClick={() => {
                    console.log("Initiate Payment");
                  }}
                >
                  Pay
                </Button>
              </Col>
            )}
            {show !== "confirm" && (
              <Col xs="auto">
                <Button
                  className="custom-complete-button"
                  onClick={() => navigate("/complete")}
                >
                  Complete
                </Button>
              </Col>
            )}
            {show !== "mpesa" && show !== "STK" && (
              <Col xs="auto">
                <Button
                  className="custom-complete-button"
                  onClick={() => navigate("/confirm")}
                >
                  Confirm
                </Button>
              </Col>
            )}
            {show !== "mpesa" && show !== "STK" && show !== "confirm" && (
              <Col xs="auto">
                <Button
                  className="custom-complete-button"
                  onClick={() => {
                    // Add payment logic here if needed
                    console.log("Initiate Payment");
                  }}
                >
                  Pay
                </Button>
              </Col>
            )}
            {show !== "mpesa" && (
              <Col xs="auto">
                <span
                  className="link"
                  // onClick={() => navigate("/stk")}
                  onClick={() => setShow("mpesa")}
                  role="button"
                >
                  Pay via Paybill
                </span>
              </Col>
            )}
            {show !== "STK" && show !== "confirm" && (
              <Col xs="auto">
                <span
                  className="link"
                  // onClick={() => navigate("/stk")}
                  onClick={() => setShow("STK")}
                  role="button"
                >
                  Pay via MPESA Express (STK Push)
                </span>
              </Col>
            )}
          </Row>
          {show !== "confirm" && (
            <Row className="mpesa-steps-1-footer">
              <Col className="text-center ">
                <span
                  className="link"
                  onClick={() => setShow("confirm")}
                  role="button"
                >
                  Confirm My Payment
                </span>
              </Col>
            </Row>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default MpesaInstructions;
