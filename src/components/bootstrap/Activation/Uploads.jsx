import React from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { CircleCheckBig, Plus } from "lucide-react";
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
        <Plus className="me-1" size={14} style={{ color: "orange" }} />
        Upload File
      </Button>

      {/* Hardcoded File List */}
      <ListGroup>
        {/* Training Sheet Example */}
        <ListGroupItem className="list-item">
          <span>
            <CircleCheckBig className="text-success me-1" size={14} /> Uploaded
          </span>
        </ListGroupItem>

        {/* Master Doc Example */}
        <ListGroupItem className="list-item">
          <span>Master_Doc_Template_v2.pdf</span>
          <span>
            <CircleCheckBig className="text-success me-1" size={14} /> Uploaded
          </span>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
};

export default Uploads;
