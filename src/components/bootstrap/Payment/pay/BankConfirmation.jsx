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
        <Card.Title className="mb-4 mpesa-card-title ">
          Once you have successfully made the payment,follow the steps below.
          Then click the Confirm button .
        </Card.Title>

        <ListGroup as="ul" className="mpesa-steps-1 mb-1 mt-3">
          <ListGroup.Item as="li">
            Select your preferred <strong>Mode of Payment.</strong>
          </ListGroup.Item>

          <ListGroup.Item as="li">
            Enter the following details in the fields below:
            <ul className="centered-list">
              <li>
                <strong>Transaction ID/ Reference Number/ Cheque Number</strong>
              </li>
              <li>
                <strong>Payment Amount</strong>
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
            <Form.Label
              style={{
                fontWeight: 500,

                fontSize: "14px",
                padding: "10px",
                color: " #000000",
                borderRadius: "10px",
                margin: "20px 0",
                minWidth: "100px",
                width: "180px",
                backgroundColor: "#dcb489",
                display: "block",
              }}
            >
              Select Payment Mode
            </Form.Label>
            <div className=" w-100 mb-3">
              <Form.Select
                className="custom-dropdown-button"
                value={selectedMode}
                onChange={handleChange}
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  border: "1px solid #a6a6a6 ",

                  padding: "8px",
                }}
              >
                <option value="Cash">Cash Deposit</option>
                <option value="Cheque">Cheque Payment</option>
                <option value="Bank Transfer">Mpesa Paybill</option>
              </Form.Select>
            </div>
          </Form.Group>

          {selectedMode === "Cash" && (
            <Form.Group
              controlId="formTransactionRef"
              style={{
                display: "inline-block",

                minWidth: "500px",
              }}
            >
              <InputGroup>
                {" "}
                <Form.Label>Reference Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter  Reference Number"
                />
              </InputGroup>
            </Form.Group>
          )}
          {selectedMode === "Cheque" && (
            <Form.Group
              controlId="formChequeNumber"
              style={{
                display: "inline-block",

                minWidth: "500px",
              }}
            >
              <InputGroup>
                <Form.Label>Cheque Number</Form.Label>
                <Form.Control type="text" placeholder="Enter  Cheque Number" />
              </InputGroup>
            </Form.Group>
          )}

          {selectedMode === "Bank Transfer" && (
            <Form.Group
              controlId="formTransactionRef"
              style={{
                display: "inline-block",

                minWidth: "420px",
              }}
            >
              <InputGroup>
                <Form.Label>Transaction ID</Form.Label>
                <Form.Control type="text" placeholder="Enter  Transaction ID" />
              </InputGroup>
            </Form.Group>
          )}
          <div className="mb-3">
            <Form.Group
              controlId="formAmount"
              style={{
                display: "inline-block",
                marginRight: "1rem",
                minWidth: "200px",
              }}
            >
              <Form.Label>Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter Payment Amount" />
            </Form.Group>

            <Form.Group
              controlId="formTransactionDate"
              style={{
                display: "inline-block",

                minWidth: "200px",
              }}
            >
              <Form.Label>Payment Date</Form.Label>
              <Form.Control type="date" placeholder="Select Payment Date" />
            </Form.Group>
          </div>

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
