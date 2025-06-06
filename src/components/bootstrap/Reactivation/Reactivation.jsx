import React from "react";
import {
  Container,
  Card,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import Payment from "./Payment";
import OrderSummary from "./OrderSummary";
import LiveSubscription from "./LiveSubscription";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export default function Reactivation() {
  return (
    <div className="bs">
      <Container
        className="d-flex justify-content-center align-items-center py-4"
        style={{ minHeight: "100vh" }}
      >
        <Card className="shadow w-100" style={{ maxWidth: "40rem" }}>
          <CardBody>
            <DialogTitle className="text-start fs-5">Reactivate Subscription</DialogTitle>
            <DialogDescription
              className="text-start text-secondary text-small"
              style={{ fontSize: "12px" }}
            >
              Restore your phAMAcore Cloud Subscription with previous settings
              and data. Just confirm payment to continue.
            </DialogDescription>
            <hr />
            <LiveSubscription />
            <hr />
            <Row>
              <Col md={6}>
                <Payment />
              </Col>
              <Col md={6} className="border-start border-2 ps-3">
                <OrderSummary />
              </Col>
            </Row>
            <div className="g-grid gap-2 mt-3">
              <Button
                variant="primary"
                style={{ backgroundColor: "#c58c4f", border: "none" }}
              >
                Reactivate Now
              </Button>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
