import React from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { BiCheckCircle, BiPlus } from "react-icons/bi"; // Import the checkmark icon
import { FaPlus } from "react-icons/fa6";

const Uploads = ({ handleFileUpload, disableFileUpload }) => {
  return (
    <div className="bs">
      {/* Upload File Button */}
      <Button
        variant="secondary"
        onClick={handleFileUpload}
        disabled={disableFileUpload}
        className="mb-3"
        style={{
          backgroundColor: "white",
          color: "black",
          borderColor: "grey",
          fontSize: "14px",
        }}
      >
        <BiPlus className="plus-icon" />
        Upload File
      </Button>

      {/* Hardcoded File List */}
      <ListGroup>
        {/* Training Sheet Example */}
        <ListGroupItem className="list-item">
          <span>
            <BiCheckCircle className="uploaded-icon" /> Uploaded
          </span>
        </ListGroupItem>

        {/* Master Doc Example */}
        <ListGroupItem className="list-item">
          <span>Master_Doc_Template_v2.pdf</span>
          <span>
            <BiCheckCircle className="uploaded-icon" /> Uploaded
          </span>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Uploads;
