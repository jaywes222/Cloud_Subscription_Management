import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { stkPushMutationFn } from "../../../../lib/api";
import Confirmation from "../text/confirmation";
import Stk from "../text/Stk";

const MpesaInstructions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("mpesa");
  const [hasPaid, setHasPaid] = useState(false);
  const [phone, setPhone] = useState("");

  const { mutate: pushSTK, isPending } = useMutation({
    mutationFn: stkPushMutationFn,
    onSuccess: () => {
      toast({
        title: "STK Push Initiated.",
        description: "Wait for MPESA Prompt and dial in your PIN.",
        variant: "success",
      });
      console.log("STK Push Successful", data);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="bs ">
      <Container>
        <Card className="mpesa-card p-4">
          {show === "mpesa" ? (
            <>
              <Card.Title className=" mpesa-card-title">
                Follow the Steps Below. Once you receive a successful reply from
                Mpesa, click the complete button below.
              </Card.Title>
              <ListGroup as="ul" className="mpesa-steps-1 ">
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
                  You will receive a confirmation SMS from{" "}
                  <strong>MPESA</strong>
                </ListGroup.Item>
              </ListGroup>
            </>
          ) : show === "STK" ? (
            <Stk phone={phone} setPhone={setPhone} />
          ) : (
            <Confirmation />
          )}
          <Row className="mpesa-steps-3-footer">
            {show !== "confirm" && show !== "STK" && (
              <Col xs="auto">
                <Button
                  className="custom-complete-button"
                  onClick={() => navigate("/complete")}
                >
                  Complete
                </Button>
              </Col>
            )}
          </Row>
          <Row className="mpesa-steps-1-footer">
            {show !== "mpesa" && show !== "confirm" && (
              <Col xs="auto">
                <Button
                  className="custom-complete-button"
                  onClick={() => {
                    if (!phone) {
                      toast({
                        title: "Missing phone",
                        description: "Enter a phone number.",
                        variant: "destructive",
                      });
                      return;
                    }

                    pushSTK({ phone });
                    setHasPaid(true);
                  }}
                >
                  {isPending ? "Processing..." : "Pay"}
                </Button>
              </Col>
            )}
            {show !== "mpesa" && show !== "confirm" && (
              <Col xs="auto">
                <Button
                  className="custom-complete-button"
                  onClick={() => navigate("/complete")}
                  disabled={!hasPaid}
                >
                  Complete
                </Button>
              </Col>
            )}
          </Row>

          <Row className="mpesa-steps-2-footer">
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
            {show !== "STK" && show !== "confirm" && (
              <Col xs="auto">
                <span
                  className="link"
                  onClick={() => setShow("STK")}
                  role="button"
                >
                  Pay via MPESA Express (STK Push)
                </span>
              </Col>
            )}{" "}
            {show !== "mpesa" && show !== "confirm" && (
              <Col xs="auto">
                <span
                  className="link"
                  onClick={() => setShow("mpesa")}
                  role="button"
                >
                  Pay via Paybill
                </span>
              </Col>
            )}
            {show !== "confirm" && (
              <Col xs="auto">
                <span
                  className="link "
                  onClick={() => setShow("confirm")}
                  role="button"
                >
                  Confirm My Payment
                </span>
              </Col>
            )}
          </Row>
          {show === "confirm" && (
            <Row className="mpesa-steps-2-footer">
              <Col xs="auto">
                <span
                  className="link"
                  onClick={() => setShow("mpesa")}
                  role="button"
                >
                  Pay via Paybill
                </span>
              </Col>
              <Col xs="auto">
                <span
                  className="link"
                  onClick={() => setShow("STK")}
                  role="button"
                >
                  Pay via MPESA Express (STK Push)
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
