import React from "react";
import Card2 from "./card2.jsx";
import Card3 from "./card3.jsx";
import Table from "../table/table.jsx";
import Hline from "../line/hline.jsx";
import Text from "../text/text.jsx";

import { Card, Container, Row, Col } from "react-bootstrap";
import PaymentForm from "../../workspace/payment-form.jsx";

const CardLayout = () => {
  return (
    <div className="bs">
      <Container fluid style={{ padding: "30px 0" }}>
        <div className="d-flex justify-content-center">
          <Card
            className="shadow"
            style={{ maxWidth: "1100px", width: "100%"}}
          >
            <Card.Body>
              <h5 className="p-1">Make Payment</h5>

              {/* First Row: Two equal columns */}
              <Row>
                <Col md={6}>
                  <Card2 />
                  <div style={{ height: 10 }} /> {/* spacer */}
                  <Card3 />
                </Col>
                <Col md={6}>
                  <Table />
                </Col>
              </Row>

              <Hline />

              {/* Second Row: Two equal columns */}
              <Row>
                <Col md={6}>
                  <PaymentForm />
                </Col>
                <Col
                  md={6}
                  style={{
                    borderLeft: "1px solid #ccc",
                    lineHeight: "2.0",
                  }}
                  className="ps-4"
                >
                  <Text />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default CardLayout;
