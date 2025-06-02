import React from "react";

const TableComponent = () => {
  return (
    <div className="p-0 max-h-[700px] overflow-y-auto w-full shadow rounded">
      <table className="table-auto w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-center text-base font-semibold border px-2 py-1">
              Due Date
            </th>
            <th className="text-center text-base font-semibold border px-2 py-1">
              Amount (KES)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-0 text-center text-sm font-normal border">
              May 16th 2025
            </td>
            <td className="p-0 text-center text-sm font-normal border text-green-700">
              250,000.00
            </td>
          </tr>
          <tr>
            <td className="p-0 text-center text-sm font-normal border text-gray-500">
              Aug 16th 2025
            </td>
            <td className="p-0 text-center text-sm font-normal border text-red-800">
              250,000.00
            </td>
          </tr>
          <tr>
            <td className="p-0 text-center text-sm font-normal border text-gray-500">
              Nov 16th 2025
            </td>
            <td className="p-0 text-center text-sm font-normal border text-red-800">
              250,000.00
            </td>
          </tr>
          <tr>
            <td className="p-0 text-center text-sm font-normal border text-gray-500">
              Feb 16th 2025
            </td>
            <td className="p-0 text-center text-sm font-normal border text-red-800">
              250,000.00
            </td>
          </tr>
          <tr>
            <td className="p-0 text-center text-sm font-normal border text-gray-500">
              Aug 16th 2025
            </td>
            <td className="p-0 text-center text-sm font-normal border text-red-800">
              250,000.00
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
