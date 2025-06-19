
  import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";
import Cheque from "../pay/cheque";
import BankConfirmation from "../pay/BankConfirmation";
const BankInstructions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("bank");
  return (
    /*<Container className="bs ">
      <Card className="mpesa-card p-4">
        {show === "bank" ? (
          <>
            <Card.Title className="mb-4 mpesa-card-title">
              Follow the steps below . Once you have successfully made the
              payment, click the Complete button below.
            </Card.Title>
            <ListGroup as="ul" className="mpesa-steps-1 mb-4">
              <ListGroup.Item as="li">
                Visit the nearest branch of your preferred bank (e.g.,{" "}
                <strong>Equity Bank</strong>, <strong>KCB</strong>, or{" "}
                <strong>Co-operative Bank</strong>)
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Go to the <strong>teller counter</strong> and request to make a{" "}
                <strong>cash bill payment</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Provide the <strong>Business Account Number:</strong>{" "}
                <strong>222222</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Provide the <strong>Account Reference Number:</strong>{" "}
                <strong>CUST001</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                State the <strong>Payment Amount:</strong>{" "}
                <strong>KES 250,000</strong>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Hand over the <strong>cash</strong> to the teller to process
                your payment
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Receive your official <strong>bank receipt</strong> as
                confirmation
              </ListGroup.Item>
              <ListGroup.Item as="li">
                Once payment is done, click the <strong>Complete</strong> button
                below
              </ListGroup.Item>
            </ListGroup>
          </>
        ) : show === "CHEQUE" ? (
          <Cheque />
        ) : (
          <BankConfirmation />
        )}

        <Row className="mpesa-steps-1-footer">
          {show !== "BankConfirmation" && (
            <Col xs={12} md="auto" className="mb-1">
              <Button
                className="custom-complete-button"
                onClick={() => navigate("/complete")}
              >
                Complete
              </Button>
            </Col>
          )}
          {show !== "CHEQUE" && show !== "BankConfirmation" && (
            <Col xs={12} md="auto" className="mb-1">
              <span
                className="link"
                onClick={() => setShow("CHEQUE")}
                role="button"
              >
                Pay via Cheque
              </span>
            </Col>
          )}
          {show !== "bank" && show !== "CHEQUE" && (
            <Col xs={12} md="auto" className="mb-1">
              <Button
                className="custom-complete-button"
                onClick={() => navigate("/complete")}
              >
                Confirm
              </Button>
            </Col>
          )}
          {show !== "bank" && (
            <Col xs={12} md="auto" className="mb-1">
              <span
                className="link"
                onClick={() => setShow("bank")}
                role="button"
              >
                Pay Via Cash
              </span>
            </Col>
          )}
        </Row>

        {show !== "BankConfirmation" && (
          <Row className="mpesa-steps-2-footer">
            <Col xs={12} className="text-center ">
              <span
                className="link link-confirm"
                onClick={() => setShow("BankConfirmation")}
                role="button"
              >
                Confirm My Payment
              </span>
            </Col>
          </Row>
        )}
      </Card>
    </Container>*/
  );
};

export default BankInstructions;
