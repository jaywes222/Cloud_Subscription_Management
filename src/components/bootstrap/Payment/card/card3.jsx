import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const Card3 = () => {
    return (
        <div className="bs">
            <Container
                className="d-flex justify-content-start"
                style={{ padding: "10px" }}
            >
                <Card
                    className="shadow mb-1"
                    style={{
                        maxWidth: "400px",
                        width: "100%",
                        margin: 0,
                        overflow: "hidden",
                    }}
                >
                    <Card.Body>
                        <Row className="g-0 justify-content-center">
                            <h6
                                className="d-flex justify-content-center p-0"
                                style={{ color: "#C58C4F" }}
                            >
                                phAMACore Lite
                            </h6>

                            <Col className="text-center mb-1">
                                <p>
                                    Branches:{" "}
                                    <span style={{ fontWeight: "500", color: "#C58C4F" }}>5</span>
                                </p>
                            </Col>

                            <Col className="text-center mb-1">
                                <p>
                                    Users:{" "}
                                    <span style={{ fontWeight: "500", color: "#C58C4F" }}>2</span>
                                </p>
                            </Col>

                            <Col className="text-center mb-1">
                                <p>
                                    Cycle:{" "}
                                    <span style={{ fontWeight: "500", color: "#C58C4F" }}>
                                        quarterly
                                    </span>
                                </p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Card3;
