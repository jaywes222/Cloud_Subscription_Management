import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const PaymentForm = () => {
    const [selectedOption, setSelectedOption] = useState("mpesa");

    return (
        <div className="bs">
            <Container className="py-4">
                <h5 className="mb-4 text-center">Choose Your Payment Method</h5>

                <Form>
                    {/* Payment Method Radios */}
                    <Row className="justify-content-center mb-4">
                        <Col xs="auto">
                            <Form.Check
                                type="radio"
                                id="mpesa"
                                label="MPESA"
                                name="paymentMethod"
                                value="mpesa"
                                checked={selectedOption === "mpesa"}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="custom-radio"
                            />
                        </Col>
                        <Col xs="auto">
                            <Form.Check
                                type="radio"
                                id="bank"
                                label="BANK"
                                name="paymentMethod"
                                value="bank"
                                checked={selectedOption === "bank"}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="custom-radio"
                            />
                        </Col>
                    </Row>

                    {/* MPESA Fields */}
                    {selectedOption === "mpesa" && (
                        <>
                            <Form.Group controlId="mobileNumber" className="mb-3">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="mobileNumber"
                                    autoComplete="off"
                                    size="sm"
                                    placeholder="Enter your mobile number"
                                    className="custom-border"
                                />
                            </Form.Group>

                            <Form.Group controlId="amountPaidMpesa" className="mb-4">
                                <Form.Label>Amount Paid</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="amountPaid"
                                    autoComplete="off"
                                    size="sm"
                                    placeholder="Enter amount paid"
                                    className="custom-border"
                                    min={0}
                                />
                            </Form.Group>
                        </>
                    )}

                    {/* BANK Fields */}
                    {selectedOption === "bank" && (
                        <>
                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="bankName">
                                        <Form.Label>Bank Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="bankName"
                                            autoComplete="off"
                                            size="sm"
                                            placeholder="Enter bank name"
                                            className="custom-border"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="accountNumber">
                                        <Form.Label>Account Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="accountNumber"
                                            autoComplete="off"
                                            size="sm"
                                            placeholder="Enter account number"
                                            className="custom-border"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={6}>
                                    <Form.Group controlId="referenceNumber">
                                        <Form.Label>Reference Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="referenceNumber"
                                            autoComplete="off"
                                            size="sm"
                                            placeholder="Enter reference number"
                                            className="custom-border"
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="amountPaidBank">
                                        <Form.Label>Amount Paid</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="amountPaid"
                                            autoComplete="off"
                                            size="sm"
                                            placeholder="Enter amount paid"
                                            className="custom-border"
                                            min={0}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="paymentDate" className="mb-4">
                                <Form.Label>Payment Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="paymentDate"
                                    size="sm"
                                    className="custom-border"
                                />
                            </Form.Group>
                        </>
                    )}

                    {/* Submit Button */}
                    <div className="d-flex justify-content-center">
                        <Button
                            variant="success"
                            type="submit"
                            size="md"
                            className="px-5 py-2"
                            style={{
                                backgroundColor: "#ffffff",
                                border: "1px solid #b1b7c1",
                                color: "black",
                                fontWeight: 600,
                                fontSize: "14px",
                                lineHeight: 1.5,
                                minWidth: "120px",
                            }}
                        >
                            Pay Now
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default PaymentForm;
