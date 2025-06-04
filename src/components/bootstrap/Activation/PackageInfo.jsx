// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";

export default function PackageInfo({ packageInfo, setToast }) {
  useEffect(() => {
    if (!packageInfo) {
      setToast("Package Information not found!", "danger");
    }
  }, [packageInfo, setToast]);

  if (!packageInfo) {
    return <p>Loading package information...</p>;
  }

  return (
    <>
      <div className="bs">
        <div className="package-container">
          {/* <h2 className="fw-semibold text-center">{companyName}</h2> */}
          <h2 className="package-name">
            <p>{packageInfo.name || "Package: Loading..."}</p>
          </h2>

          <div className="package-items">
            <div className="text-center">
              <p className="small">
                <strong>Branches: </strong>
                {packageInfo.branches || "N/A"}
              </p>
            </div>
            <div className="text-center">
              <p className="small">
                <strong>Users: </strong>
                {packageInfo.users || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
