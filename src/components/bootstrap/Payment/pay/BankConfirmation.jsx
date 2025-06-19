import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Form,
  InputGroup,
  Button,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";

const BankConfirmation = () => {
  const [selectedMode, setSelectedMode] = useState("Cash");

  const handleChange = (e) => {
    setSelectedMode(e.target.value);
  };

  return (
    <div className="bs">
      <Card className="mpesa-card p-4">
        <Card.Title className="mb-4 mpesa-card-title text-center">
          Follow the steps below. Once you have successfully made the bank
          payment, click the Complete button below.
        </Card.Title>
        <Form>
          <Form.Group controlId="payment-method" className="mb-1">
            <Form.Label className="fw-semibold px-2">
              Please Select Payment Mode
            </Form.Label>

            <Form.Select
              aria-label="Select Payment Mode"
              value={selectedMode}
              onChange={handleChange}
            >
              <option value="Cash">Cash Deposit</option>
              <option value="Cheque">Cheque Payment</option>
              <option value="Bank Transfer">Mpesa Paybill</option>
            </Form.Select>
          </Form.Group>

          <ListGroup as="ul" className="mpesa-steps-1 mb-1 mt-3">
            <ListGroup.Item as="li">
              Locate your official <strong>bank payment receipt</strong> from
              the teller
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Find the <strong>Transaction Reference Number</strong> on the
              receipt (e.g. <code>EQ123456789</code>)
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Note the <strong>date of payment</strong> from the receipt
            </ListGroup.Item>
            <ListGroup.Item as="li">
              You will enter the <strong>Reference Number</strong> and{" "}
              <strong>Payment Date</strong> in the fields below
            </ListGroup.Item>
            <ListGroup.Item as="li">
              Click the <strong>'Confirm'</strong> button
            </ListGroup.Item>
          </ListGroup>
          {selectedMode === "Cash" && (
            <Form.Group controlId="formMpesaId">
              <Form.Label>Transaction ID</Form.Label>
              <Form.Control type="text" placeholder="Enter M-PESA ID" />
            </Form.Group>
          )}

          {selectedMode === "Cheque" && (
            <Form.Group controlId="formChequeNumber">
              <Form.Label>Cheque Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Cheque Number" />
            </Form.Group>
          )}

          {selectedMode === "Bank Transfer" && (
            <Form.Group controlId="formTransactionRef">
              <Form.Label> Reference Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mpesa Transaction Reference"
              />
            </Form.Group>
          )}
          <Form.Group controlId="formTransactionDate">
            <Form.Label> Payment Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Mpesa Transaction Date"
            />
          </Form.Group>
          <Row className="mpesa-steps-1-footer py-2">
            <Col xs={12} md="auto" className="mb-1">
              <Button
                className="custom-complete-button"
                onClick={() => navigate("/confirm")}
              >
                Confirm
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default BankConfirmation;
