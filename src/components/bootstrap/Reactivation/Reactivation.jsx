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
        style={{ overflowY: "auto" }}
      >
        <Card className="shadow px-4 py-5">
          <CardBody style={{ overflowY: "auto" }}>
            <DialogTitle
              className="text-start "
              style={{
                fontWeight: 500,
                padding: "5px 0",
                margin: 0,
                fontSize: "20px",
              }}
            >
              Reactivate Subscription
            </DialogTitle>
            <DialogDescription
              className="text-start  text-small"
              style={{ fontSize: "14px", color: "#6c757d" }}
            >
              Restore your phAMAcore Cloud Subscription with previous settings
              and data. Just confirm payment to continue.
            </DialogDescription>
            <hr />
            <LiveSubscription />
            <hr />
            <div className="second-row">
              <div className="form-column">
                <div className="payment-form-placeholder">
                  {" "}
                  <Payment />
                </div>
              </div>

              <div className="text-column">
                <div className="text-placeholder">
                  <OrderSummary />
                </div>
              </div>
            </div>

            <div className="d-grid gap-2 mt-3 bs">
              <Button variant="light" className="submit-button">
                Reactivate Now
              </Button>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
