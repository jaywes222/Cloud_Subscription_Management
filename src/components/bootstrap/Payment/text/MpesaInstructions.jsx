import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Form,
} from "react-bootstrap";
import { stkPushMutationFn } from "../../../../lib/api";
import Stk from "../text/Stk";
import { toast } from "../../../../hooks/use-toast";
import { useAuthContext } from "../../../../context/auth-provider";
import {
  isValidLocalPhoneNumber,
  normalizePhone,
  denormalizePhone,
} from "../../../../utils/phone-utils";

const MpesaInstructions = ({ onSTKSuccess }) => {
  const { user } = useAuthContext();

  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentStarted, setPaymentStarted] = useState(false);

  const accountNumber = user?.psCusCode;

  useEffect(() => {
    if (user?.phone) setPhone(normalizePhone(user.phone));
    if (user?.amountDue) setAmount(user.amountDue.toString());
  }, [user]);

  const { mutate: pushSTK, isPending: isPushing } = useMutation({
    mutationFn: stkPushMutationFn,
    onSuccess: () => {
      toast({
        title: "STK Push Sent ✅",
        description: (
          <>
            Confirm the payment on your phone and{" "}
            <strong>log it below once done.</strong>
          </>
        ),
        variant: "success",
      });

      setPaymentStarted(true);

      // 🔥 Notify parent to switch tab + scroll to confirmation
      if (typeof onSTKSuccess === "function") {
        onSTKSuccess();
      }
    },
    onError: (err) => {
      toast({
        title: "STK Push Failed",
        description: err.message || "Try again.",
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

    pushSTK({
      phoneOverride: formattedPhone,
      accountNumber,
      amountOverride: parsedAmount,
    });
  };

  return (
    <div className="bs">
      <Container>
        <Card className="mpesa-card p-4">
          <Card.Title className="mpesa-card-title mb-4 text-center">
            Follow the Steps Below.
          </Card.Title>

          <Row className="d-flex align-items-start">
            <Col
              md={6}
              style={{ borderRight: "1px solid #ccc" }}
              className="justify-between"
            >
              <ListGroup as="ul" className="mpesa-steps-1">
                <ListGroup.Item>Go to M-PESA on your phone</ListGroup.Item>
                <ListGroup.Item>
                  Select <strong>Pay Bill</strong> option
                </ListGroup.Item>
                <ListGroup.Item>
                  Enter Business Number: <strong>222222</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Enter Account Number: <strong>{accountNumber}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Enter the Amount:{" "}
                  <Form className="payment-form">
                    <Form.Group controlId="formAmount">
                      <Form.Label>Amount (KES)</Form.Label>
                      <Form.Control
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min={1}
                      />
                    </Form.Group>
                  </Form>
                </ListGroup.Item>
                <ListGroup.Item>
                  Enter your M-PESA PIN and press <strong>Send</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  You will receive a confirmation SMS from{" "}
                  <strong>MPESA</strong>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={6}>
              <Stk
                phone={phone}
                setPhone={setPhone}
                amount={amount}
                setAmount={setAmount}
                accountNumber={accountNumber}
              />

              <div className="d-flex justify-content-center mt-4">
                <Button
                  className="custom-complete-button px-4 py-2"
                  disabled={isPushing}
                  onClick={handlePushSTK}
                  style={{ minWidth: "200px" }}
                >
                  {isPushing ? "Processing..." : "Pay"}
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default MpesaInstructions;
