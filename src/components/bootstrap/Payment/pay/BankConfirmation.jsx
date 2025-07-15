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

const BankConfirmation = () => {
  const [selectedMode, setSelectedMode] = useState("Cash");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

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
        setReference("");
        setAmount("");
        setPaymentDate("");
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

  const handleConfirmBank = () => {
    if (!reference || !amount || !paymentDate) {
      toast({
        title: "Missing Fields",
        description: "Please fill all fields before confirming.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      bnkCode: selectedMode === "Bank Transfer" ? "MPESA" : selectedMode,
      reference: reference.trim(),
      amount: parseFloat(amount),
      theDate: new Date(paymentDate).toISOString(),
      cusCode,
    };

    confirmPayment(payload);
  };

  return (
    <div className="bs">
      <Card className="mpesa-card p-4">
        <Card.Title className="mpesa-card-title">
          Once you have successfully made the payment, follow the steps below.
          Then click the Confirm button.
        </Card.Title>

        <ListGroup as="ul" className="mpesa-steps-1 mb-1">
          <ListGroup.Item as="li">
            Select your preferred <strong>Mode of Payment.</strong>
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Enter the following details in the fields below:
            <ul className="centered-list">
              <li>
                <strong>Reference / Cheque Number</strong>
              </li>
              <li>
                <strong>Amount Paid</strong>
              </li>
              <li>
                <strong>Payment Date</strong>
              </li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Once done please click <strong>'Confirm'</strong> button to proceed.
          </ListGroup.Item>
        </ListGroup>

        <Form className="payment-form">
          <Form.Group controlId="payment-method" className="mb-3">
            <Form.Label>Select Payment Mode</Form.Label>
            <Form.Select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
            >
              <option value="Cash">Cash Deposit</option>
              <option value="Cheque">Cheque Payment</option>
              <option value="Bank Transfer">Mpesa Paybill</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex flex-wrap gap-3 mb-3 align-items-end">
            <Form.Group controlId="formReference" style={{ minWidth: "410px" }}>
              <Form.Label>
                {selectedMode === "Cheque"
                  ? "Cheque Number"
                  : "Reference Number"}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Enter Reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </div>

          <div className="mb-3 d-flex gap-4">
            <Form.Group controlId="formAmount" style={{ minWidth: "200px" }}>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDate" style={{ minWidth: "200px" }}>
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="DD/MM/YYYY"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </Form.Group>
          </div>

          <Row className="mpesa-steps-1-footer py-2">
            <Col xs={12} md="auto" className="mb-1">
              <Button
                className="custom-complete-button"
                onClick={handleConfirmBank}
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

export default BankConfirmation;
