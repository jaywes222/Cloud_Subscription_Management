import React from "react";
import { Form } from "react-bootstrap";

export default function TermsSection({ termsChecked, onChange }) {
  return (
    <>
      <div className="bs">
        <div className="terms-container">
          {/* <h4 className="text-dark">Terms & Conditions</h4> */}
          <p style={{ fontSize: 12 }}>
            By Activating My Account, I agree to the CoreBase Solutions
            phAMACoreCloud Agreement.
            <br />
            <br />
            <br />
            <strong>My Subscription begins Today.</strong>
            <br />
            <br />
            <em>Check your confirmation email for details.</em>
          </p>
          <br />
          <p style={{ fontSize: 12 }}>
            I understand I am also creating a new phAMACoreCloud Account. By
            signing up to create an account and subsequent user accounts I
            accept phAMACoreCloud Terms of Use and Privacy Policy as shared in
            phAMACoreCloud contract, including the processing of my personal
            data.
          </p>
        </div>
        <div className="terms-checkbox">
          <div className="d-flex align-items-center">
            <div className="form-check me-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsChecked}
                onChange={onChange}
                style={{ fontSize: 14 }}
              />
            </div>
            <label className="form-check-label" htmlFor="terms">
              <span style={{ fontSize: 12 }}>
                By clicking Activate My Account, I agree to the
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-decoration-underline ms-1"
                  style={{ color: "#c69867" }}
                >
                  Terms & Conditions
                </a>{" "}
                and
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-decoration-underline ms-1"
                  style={{ color: "#c69867" }}
                >
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
