import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Col, Container, ListGroup, Row, Form } from "react-bootstrap";
import { stkPushMutationFn, confirmPaymentMutationFn } from "../../../../lib/api";
import Confirmation from "../text/confirmation";
import Stk from "../text/Stk";
import { toast } from "../../../../hooks/use-toast";
import { useAuthContext } from "../../../../context/auth-provider";
import { isValidLocalPhoneNumber, normalizePhone, denormalizePhone } from "../../../../utils/phone-utils";

const MpesaInstructions = () => {
  const { user } = useAuthContext();

  const [mode, setMode] = useState("mpesa");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [hasPaid, setHasPaid] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [isPushSuccessful, setIsPushSuccessful] = useState(false);

  const accountNumber = user?.psCusCode;

  useEffect(() => {
    if (user?.phone) setPhone(normalizePhone(user.phone));
    if (user?.amountDue) setAmount(user.amountDue.toString());
  }, [user]);

  const { mutate: pushSTK, isPending: isPushing } = useMutation({
    mutationFn: stkPushMutationFn,
    onSuccess: () => {
      toast({
        title: "STK Push Initiated",
        description: "Wait for MPESA prompt and enter your PIN.",
        variant: "success",
      });
      setIsPushSuccessful(true);
      setHasPaid(false);
      setPaymentStarted(true);
    },
    onError: (err) => {
      toast({
        title: "STK Push Failed",
        description: err.message || "Try again.",
        variant: "destructive",
      });
      setIsPushSuccessful(false);
    },
  });

  const { mutate: confirmPayment, isPending: isConfirming } = useMutation({
    mutationFn: confirmPaymentMutationFn,
    onSuccess: (data) => {
      if (data?.success) {
        toast({
          title: "Payment Confirmed 🎉",
          description: data.message,
          variant: "success",
        });
        setHasPaid(true);
        setPaymentStarted(false);
        setIsPushSuccessful(false);
      }
    },
    onError: (err) => {
      toast({
        title: "Confirmation Failed",
        description: err.message || "Transaction not found.",
        variant: "destructive",
      });
    },
  });

  const handlePushSTK = () => {
    const formattedPhone = denormalizePhone(phone);
    const parsedAmount = Number(amount);

    if (!formattedPhone || !isValidLocalPhoneNumber(formattedPhone)) {
      toast({
        title: "Invalid Phone",
        description: "Please enter a valid Safaricom number.",
        variant: "destructive",
      });
      return;
    }

    if (!parsedAmount || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Enter amount greater than zero.",
        variant: "destructive",
      });
      return;
    }

    pushSTK({ phoneOverride: formattedPhone, accountNumber, amountOverride: parsedAmount });
  };

  const handleConfirm = () => {
    confirmPayment({ accountNumber });
  };

  return (
    <div className="bs">
      <Container>
        <Card className="mpesa-card p-4">
          {mode === "mpesa" && (
            <>
              <Card.Title className="mpesa-card-title">
                Follow the Steps Below. Once you receive a successful reply from
                Mpesa, click the complete button below.
              </Card.Title>
              <ListGroup as="ul" className="mpesa-steps-1">
                <ListGroup.Item>Go to M-PESA on your phone</ListGroup.Item>
                <ListGroup.Item>Select <strong>Pay Bill</strong> option</ListGroup.Item>
                <ListGroup.Item>Enter Business Number: <strong>222222</strong></ListGroup.Item>
                <ListGroup.Item>Enter Account Number: <strong>{accountNumber}</strong></ListGroup.Item>
                <ListGroup.Item>
                  Enter the Amount:{" "}
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ width: "200px", display: "inline-block" }}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Enter your M-PESA PIN and press <strong>Send</strong></ListGroup.Item>
                <ListGroup.Item>You will receive a confirmation SMS from <strong>MPESA</strong></ListGroup.Item>
              </ListGroup>
              <Row className="mpesa-steps-3-footer mt-3">
                <Col xs="auto">
                  <Button className="custom-complete-button" onClick={handleConfirm}>
                    Complete
                  </Button>
                </Col>
              </Row>
            </>
          )}

          {mode === "STK" && (
            <>
              <Stk
                phone={phone}
                setPhone={setPhone}
                amount={amount}
                setAmount={setAmount}
                accountNumber={accountNumber}
              />
              <Row className="mpesa-steps-1-footer mt-3">
                <Col xs="auto">
                  <Button
                    className="custom-complete-button"
                    disabled={isPushing || hasPaid}
                    onClick={handlePushSTK}
                  >
                    {isPushing ? "Processing..." : "Pay"}
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    className="custom-complete-button"
                    disabled={!isPushSuccessful || isConfirming}
                    onClick={handleConfirm}
                  >
                    {isConfirming ? "Confirming..." : "Complete"}
                  </Button>
                </Col>
              </Row>
            </>
          )}

          {mode === "confirm" && <Confirmation />}

          <Row className="mpesa-steps-2-footer mt-4">
            {mode !== "mpesa" && (
              <Col xs="auto">
                <span className="link" onClick={() => setMode("mpesa")} role="button">
                  Pay via Paybill
                </span>
              </Col>
            )}
            {mode !== "STK" && (
              <Col xs="auto">
                <span className="link" onClick={() => setMode("STK")} role="button">
                  Pay via MPESA Express (STK Push)
                </span>
              </Col>
            )}
            {mode !== "confirm" && (
              <Col xs="auto">
                <span className="link" onClick={() => setMode("confirm")} role="button">
                  Confirm
                </span>
              </Col>
            )}
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default MpesaInstructions;
