import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Container, ListGroup, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { stkPushMutationFn, confirmPaymentQueryFn } from "../../../../lib/api";
import Confirmation from "../text/confirmation";
import Stk from "../text/Stk";
import { toast } from "../../../../hooks/use-toast";
import { useAuthContext } from "../../../../context/auth-provider";
import { isValidPhoneNumber, normalizePhone } from "../../../../utils/phone-utils";

const MpesaInstructions = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("mpesa");
  const { user } = useAuthContext();

  const [hasPaid, setHasPaid] = useState(false);
  const [pollingEnabled, setPollingEnabled] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);

  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const accountNumber = user?.psCusCode;

  useEffect(() => {
    if (user?.phone) setPhone(normalizePhone(user.phone));
    if (user?.amountDue) setAmount(user.amountDue.toString());
  }, [user]);

  const { mutate: pushSTK, isPending } = useMutation({
    mutationFn: stkPushMutationFn,
    onSuccess: () => {
      toast({
        title: "STK Push Initiated.",
        description: "Wait for MPESA prompt and enter your PIN.",
        variant: "success",
      });
      setPaymentStarted(true);
      setPollingEnabled(true);
      setHasPaid(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "STK push failed.",
        variant: "destructive",
      });
    },
  });

  useQuery({
    queryKey: ["confirm-payment"],
    queryFn: confirmPaymentQueryFn,
    enabled: show === "STK" && pollingEnabled && paymentStarted,
    refetchInterval: 5000,
    onSuccess: (data) => {
      if (data?.success) {
        toast({
          title: "Payment Confirmed 🎉",
          description: data.message,
          variant: "success",
        });
        setHasPaid(true);
        setPollingEnabled(false);
      }
    },
    onError: (error) => {
      toast({
        title: "Confirmation Error",
        description: error.message || "Could not confirm payment.",
        variant: "destructive",
      });
      setPollingEnabled(false);
    },
  });

  const handlePushSTK = () => {
    const formattedPhone = normalizePhone(phone);
    const parsedAmount = Number(amount);

    if (!formattedPhone || !isValidPhoneNumber(formattedPhone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Safaricom phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than zero.",
        variant: "destructive",
      });
      return;
    }

    setPhone(formattedPhone);
    pushSTK({ phone: formattedPhone, accountNumber, amount: parsedAmount });
  };

  const handleStopPolling = () => {
    setPollingEnabled(false);
    setPaymentStarted(false);
    toast({
      title: "Polling Stopped",
      description: "You have stopped checking payment status.",
      variant: "default",
    });
  };

  return (
    <div className="bs">
      <Container>
        <Card className="mpesa-card p-4">
          {show === "mpesa" ? (
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
                  <Button
                    className="custom-complete-button"
                    onClick={() =>
                      toast({
                        title: "Thank you!",
                        description: "Your payment has been recorded.",
                        variant: "success",
                      })
                    }
                  >
                    Complete
                  </Button>
                </Col>
              </Row>
            </>
          ) : show === "STK" ? (
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
                    disabled={isPending || hasPaid}
                    onClick={handlePushSTK}
                  >
                    {isPending ? "Processing..." : "Pay"}
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    className="custom-complete-button"
                    onClick={() =>
                      toast({
                        title: "Thank you!",
                        description: "Your payment has been recorded.",
                        variant: "success",
                      })
                    }
                    disabled={!hasPaid}
                  >
                    Complete
                  </Button>
                </Col>
                {pollingEnabled && (
                  <Col xs="auto">
                    <Button variant="outline-secondary" onClick={handleStopPolling}>
                      Stop Checking
                    </Button>
                  </Col>
                )}
              </Row>
            </>
          ) : (
            <Confirmation />
          )}

          <Row className="mpesa-steps-2-footer mt-4">
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
                <span className="link" onClick={() => setShow("STK")} role="button">
                  Pay via MPESA Express (STK Push)
                </span>
              </Col>
            )}
            {show !== "mpesa" && show !== "confirm" && (
              <Col xs="auto">
                <span className="link" onClick={() => setShow("mpesa")} role="button">
                  Pay via Paybill
                </span>
              </Col>
            )}
            {show !== "confirm" && (
              <Col xs="auto">
                <span
                  className="link"
                  onClick={() => setShow("confirm")}
                  role="button"
                >
                  Confirm My Payment
                </span>
              </Col>
            )}
          </Row>

          {show === "confirm" && (
            <Row className="mpesa-steps-2-footer mt-3">
              <Col xs="auto">
                <span className="link" onClick={() => setShow("mpesa")} role="button">
                  Pay via Paybill
                </span>
              </Col>
              <Col xs="auto">
                <span className="link" onClick={() => setShow("STK")} role="button">
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
