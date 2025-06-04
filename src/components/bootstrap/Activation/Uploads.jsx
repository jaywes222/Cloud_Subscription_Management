import React from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { CircleCheckBig, Plus } from "lucide-react";

const Uploads = ({ handleFileUpload, disableFileUpload }) => {
  return (
    <div className="bs">
      {/* Upload File Button */}
      <Button
        variant="secondary"
        onClick={handleFileUpload}
        disabled={disableFileUpload}
        className="upload-file-btn mb-3"
      >
        <span className="d-flex align-items-center">
          <Plus className="me-1" size={14} style={{ color: "orange" }} />
          Upload File
        </span>
      </Button>

      {/* Hardcoded File List */}
      <ListGroup>
        {/* Training Sheet Example */}
        <ListGroupItem className="list-item">
          <span>SOP_Training_2025.xlsx</span>
          <span className="d-flex align-items-center">
            <CircleCheckBig className="text-success me-1" size={14} /> Uploaded
          </span>
        </ListGroupItem>

        {/* Master Doc Example */}
        <ListGroupItem className="list-item">
          <span>Master_Doc_Template_v2.pdf</span>
          <span className="d-flex align-items-center">
            <CircleCheckBig className="text-success me-1" size={14} /> Uploaded
          </span>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Uploads;
