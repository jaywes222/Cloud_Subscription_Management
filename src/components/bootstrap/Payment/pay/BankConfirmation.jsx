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
import DatePicker from "react-datepicker";
import { parse, format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { confirmPaymentMutationFn } from "../../../../lib/api";
import { toast } from "../../../../hooks/use-toast";
import { useAuthContext } from "../../../../context/auth-provider";

const BankConfirmation = () => {
  const [selectedMode, setSelectedMode] = useState("Cash");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(""); // string in dd/mm/yyyy
  const [selectedDate, setSelectedDate] = useState(null); // actual Date object

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
        setSelectedDate(null);
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

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    const parsedDate = parse(paymentDate, "dd/MM/yyyy", new Date());
    if (isNaN(parsedDate.getTime())) {
      toast({
        title: "Invalid Date",
        description: "Please select a valid payment date.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      bnkCode: selectedMode === "Mpesa STK" ? "MPESA" : "BANK",
      reference: reference.trim(),
      amount: parsedAmount,
      paymentDate: parsedDate.toISOString(),
      cusCode,
    };

    confirmPayment(payload);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPaymentDate(date ? format(date, "dd/MM/yyyy") : "");
  };

  return (
    <div className="bs">
      <Card className="mpesa-card p-4">
        <Card.Title className="mpesa-card-title">
          Once you have successfully made the payment, follow the steps. Then
          click the Confirm button.
        </Card.Title>

        <ListGroup as="ul" className="mpesa-steps-1 mb-3">
          <ListGroup.Item as="li">
            Select your preferred <strong>Mode of Payment</strong>.
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Enter the following details:
            <ul className="centered-list">
              <li><strong>Reference / Cheque Number / Transaction ID</strong></li>
              <li><strong>Amount Paid</strong></li>
              <li><strong>Payment Date</strong></li>
            </ul>
          </ListGroup.Item>
          <ListGroup.Item as="li">
            Click <strong>'Confirm'</strong> to complete.
          </ListGroup.Item>
        </ListGroup>

        <Form className="payment-form">
          <Form.Group controlId="payment-method" className="mb-3">
            <Form.Label style={{ fontWeight: "500", fontSize: "18px" }}>
              Select Payment Mode
            </Form.Label>
            <Form.Select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              style={{ width: "40%", fontSize: "16px" }}
            >
              <option value="Cash">Cash Deposit</option>
              <option value="Cheque">Cheque Payment</option>
              <option value="Bank Transfer">Mpesa Paybill</option>
              <option value="Mpesa STK">STK Push</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex flex-wrap gap-3 mb-3 align-items-end">
            <Form.Group controlId="formReference" style={{ minWidth: "410px" }}>
              <Form.Label>
                {selectedMode === "Cheque"
                  ? "Cheque Number"
                  : selectedMode === "Mpesa STK"
                    ? "MPESA Transaction ID"
                    : "Reference Number"}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder={
                    selectedMode === "Mpesa STK"
                      ? "TGO6A4WSNE"
                      : "Enter Reference"
                  }
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
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="23/07/2025"
                maxDate={new Date()}
                isClearable
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
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
