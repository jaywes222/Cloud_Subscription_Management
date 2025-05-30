import React from "react";
import { Card, Container } from "react-bootstrap";

const Card2 = () => {
    return (
        <div className="bs">
            <Container
                fluid
                className="d-flex justify-content-start"
                style={{ padding: "10px" }}
            >
                <Card
                    className="shadow"
                    style={{
                        width: "400px",
                        height: "40px",
                        overflow: "hidden",
                    }}
                >
                    <Card.Body style={{ padding: "10px" }}>
                        <p className="d-flex justify-content-center m-0">
                            CUS005 - Nila Pharmacy
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Card2;
