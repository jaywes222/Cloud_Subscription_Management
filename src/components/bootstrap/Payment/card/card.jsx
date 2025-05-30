import React from "react";
import Card2 from "./card2.jsx";
import Card3 from "./card3.jsx";
import Table from "../table/table.jsx";
import Hline from "../line/hline.jsx";
import Text from "../text/text.jsx";
import PaymentForm from "../../../workspace/payment-form.jsx";

const CardLayout = () => {
  return (
    <div className="bs p-2">
      <div className="flex justify-center">
        <div
          className="shadow bg-white rounded-md w-full max-w-[1000px]"
          style={{ padding: "10px" }}
        >
          <div className="pb-2">
            <h5 className="p-1 text-lg font-semibold">Make Payment</h5>
          </div>

          {/* First Row: Two equal columns */}
          <div className="flex justify-between">
            <div className="flex flex-col space-y-1">
              <Card2 />
              <Card3 />
            </div>

            <div className="w-[48%]">
              <Table />
            </div>
          </div>

          <Hline />

          {/* Second Row: Two equal columns */}
          <div className="flex flex-row mt-4">
            <div className="w-1/2 pr-4">
              <PaymentForm />
            </div>

            <div
              className="w-1/2 pl-4 border-l border-gray-300 leading-relaxed"
              style={{ lineHeight: 2 }}
            >
              <Text />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardLayout;
