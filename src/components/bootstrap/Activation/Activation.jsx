import React, { useRef } from "react";
import { Button, Card, Container } from "react-bootstrap";
import TermsSection from "./TermsSection";
import { DialogHeader, DialogTitle } from "../../ui/Dialog";


const Activation = ({
  termsChecked,
  setTermsChecked,
}) => {
  const formRef = useRef();


  return (
    <div className="bs">
      <Container className="mt-4">
        <Card className="px-4 w-100" style={{ maxWidth: "60rem", fontSize: "20px", }}>
          <Card.Body>
            <DialogHeader>
              <DialogTitle>Activate my Subscription</DialogTitle>
            </DialogHeader>


            {/* Terms Section and Activate Button */}

            <TermsSection
              termsChecked={termsChecked}
              setTermsChecked={(e) => setTermsChecked(e.target.value)}
              onClick={() =>
                formRef.current?.dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                )
              }
            />

            <div className="activate-btn">
              <Button
                type="submit"
                variant="secondary"
                disabled={!termsChecked}
                style={{
                  backgroundColor: "#c58c4f",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
                onClick={() =>
                  formRef.current?.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  )
                }
              >
                Activate Now
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Activation;
