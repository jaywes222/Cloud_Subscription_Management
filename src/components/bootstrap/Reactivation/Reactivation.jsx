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
        className="d-flex justify-content-center align-items-start"
        style={{ overflowY: "auto", minHeight: "630px" }}
      >
        <Card className="shadow px-4 py-2" style={{ maxWidth: "40rem" }}>
          <CardBody style={{ overflowY: "auto" }}>
            <DialogTitle className="text-start fs-5">
              Reactivate Subscription
            </DialogTitle>
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
            <Row className="d-flex justify-content-between">
              <Col md={6}>
                <Payment />
              </Col>
              <Col md={6} className="ps-3" style={{ borderLeft: "1px solid" }}>
                <OrderSummary />
              </Col>
            </Row>
            <div className="d-grid gap-2 mt-3">
              <Button
                variant="primary"
                className="reactivate-btn"
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
