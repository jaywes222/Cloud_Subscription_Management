import React from "react";
import { Table } from "react-bootstrap";

const TableComponent = () => {
    return (
        <div className="bs">
            <Table bordered size="sm">
                <thead>
                    <tr>
                        <th className="table-header">Due Date</th>
                        <th className="table-header">Amount(KES)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="table-cell">May 16th 2025</td>
                        <td className="table-cell text-green">250,000.00</td>
                    </tr>
                    <tr>
                        <td className="table-cell text-grey">Aug 16th 2025</td>
                        <td className="table-cell text-red">250,000.00</td>
                    </tr>
                    <tr>
                        <td className="table-cell text-grey">Nov 16th 2025</td>
                        <td className="table-cell text-red">250,000.00</td>
                    </tr>
                    <tr>
                        <td className="table-cell text-grey">Feb 16th 2025</td>
                        <td className="table-cell text-red">250,000.00</td>
                    </tr>
                    <tr>
                        <td className="table-cell text-grey">Aug 16th 2025</td>
                        <td className="table-cell text-red">250,000.00</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default TableComponent;
