import React, { useRef, useState } from "react";
import { Button, Card, Container, Form, Nav, Tab } from "react-bootstrap";
import TermsSection from "./TermsSection";
import Uploads from "./Uploads";
import PackageInfo from "./PackageInfo";
import { DialogHeader, DialogTitle } from "../../ui/dialog";

// const API_URL = "http://20.164.20.36:86";
// const API_HEADER = {
//   accesskey: "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9",
//   Authorization: `Bearer ${JSON.parse(localStorage.getItem("authToken"))}`,
//   // "Content-Type": "multipart/form-data",
// };
// const ACCESS_KEY =
//   "R0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9";

const Activation = ({
  cusCode,
  companyName,
  uploadedFiles,
  handleFileUpload,
  deleteUploadedFiles,
  disableFileUpload,
  handleSubmit,
  termsChecked,
  setTermsChecked,
}) => {
  const formRef = useRef();

  const packageInfo = useState({
    name: "",
    branches: "",
    users: "",
  });

  return (
    <div className="bs">
      <Container className="mt-4">
        <Card className="px-4 w-100" style={{ maxWidth: "60rem", fontSize: "20px", }}>
          <Card.Body>
            {/* <div className="card-title">
              <h5 className="fs-5">Activate Subscription</h5>
              <Button
                style={{
                  backgroundColor: "#c5843f",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  fontSize: "14px",
                }}
                onClick={onOpen}
              >
                Reactivate Now
              </Button>
            </div> */}
            <DialogHeader>
              <DialogTitle>Activate my Subscription</DialogTitle>
            </DialogHeader>

            <Form.Group className="mb-3">
              <Form.Control
                readOnly
                value={`${cusCode} - ${companyName}`}
                className="justify-content-center"
                style={{ fontSize: "14px" }}
              />
            </Form.Group>

            {/* Package Information Section*/}
            <div className="package-info">
              <PackageInfo packageInfo={packageInfo} />
            </div>

            {/* File Uploads Section */}
            <Tab.Container defaultActiveKey="trainingSheet">
              <Nav variant="tabs" className="nav-main">
                <Nav.Item className="small">
                  <Nav.Link eventKey="trainingSheet" className="custom-tab">
                    Signed Training Sheets
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="small">
                  <Nav.Link eventKey="masterDoc" className="custom-tab">
                    Approved Master Docs
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                {/* <Tab.Pane eventKey="trainingSheet">
                <p>Training Sheets Upload</p>
              </Tab.Pane>
              <Tab.Pane eventKey="masterDoc">
                <p>Master Documents Upload</p>
              </Tab.Pane> */}
                <Tab.Pane eventKey="uploads">
                  <Uploads
                    handleSubmit={handleSubmit}
                    handleFileUpload={handleFileUpload}
                    disableFileUpload={disableFileUpload}
                    deleteUploadedFiles={deleteUploadedFiles}
                    uploadedFiles={uploadedFiles}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

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
