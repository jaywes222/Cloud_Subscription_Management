import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Form,
  InputGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { confirmPaymentMutationFn } from "../../../../lib/api";
import { toast } from "../../../../hooks/use-toast";
import { useAuthContext } from "../../../../context/auth-provider";

const Confirmation = () => {
  const [transId, setTransId] = useState("");

  const { user } = useAuthContext();
  const cusCode = user?.psCusCode;

  const { mutate: confirmPayment, isPending: isConfirming } = useMutation({
    mutationFn: confirmPaymentMutationFn,
    onSuccess: (data) => {
      if (data?.success) {
        toast({
          title: "Payment Confirmed 🎉",
          description: data.message,
          variant: "success",
        });
        setTransId("");
      } else {
        toast({
          title: "Payment Not Found",
          description: data.message || "Could not confirm payment.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  const handleConfirm = (e) => {
    if (!transId.trim()) {
      toast({
        title: "Missing Transaction ID",
        description: "Please enter a valid MPESA transaction ID.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      bnkCode: "MPESA",
      reference: transId.trim(),
      amount: user?.amountDue ?? 0,
      theDate: new Date().toISOString(),
      cusCode,
    }

    confirmPayment(payload);
  };

  return (
    <div className="bs">
      <Card className="mpesa-card p-4">
        <Card.Title className="mpesa-card-title">
          Once you receive a successful reply from MPESA, enter your Transaction ID below and confirm payment.
        </Card.Title>

        <ListGroup as="ul" className="mpesa-steps-1 mb-1">
          <ListGroup.Item>Open the SMS from <strong>MPESA</strong></ListGroup.Item>
          <ListGroup.Item>Copy the <strong>Transaction ID</strong> (e.g., QCR1XXXXXX)</ListGroup.Item>
          <ListGroup.Item>Paste it below and click <strong>'Confirm'</strong></ListGroup.Item>
        </ListGroup>

        <Form onSubmit={handleConfirm} className="payment-form">
          <Form.Group controlId="formTransactionId" style={{ minWidth: "280px" }}>
            <Form.Label>MPESA Transaction ID</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={transId}
                onChange={(e) => setTransId(e.target.value.toUpperCase())}
                placeholder="e.g., QCR1234567"
                required
                autoFocus
              />
            </InputGroup>
          </Form.Group>

          <Row className="mpesa-steps-1-footer mt-3">
            <Col xs={12} md="auto" className="mb-1">
              <Button
                className="custom-complete-button"
                onClick={handleConfirm}
                disabled={isConfirming}
              >
                {isConfirming ? "Confirming..." : "Confirm"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Confirmation;
