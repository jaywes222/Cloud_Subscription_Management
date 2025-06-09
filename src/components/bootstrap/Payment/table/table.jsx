import React from "react";

const TableComponent = () => {
  return (
    <div className="bs">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Due Date</th>
              <th>Amount (KES)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>May 16th 2025</td>
              <td className="amount-green">250,000.00</td>
            </tr>
            <tr>
              <td className="muted">Aug 16th 2025</td>
              <td className="amount-red">250,000.00</td>
            </tr>
            <tr>
              <td className="muted">Nov 16th 2025</td>
              <td className="amount-red">250,000.00</td>
            </tr>
            <tr>
              <td className="muted">Feb 16th 2025</td>
              <td className="amount-red">250,000.00</td>
            </tr>
            <tr>
              <td className="muted">Aug 16th 2025</td>
              <td className="amount-red">250,000.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
