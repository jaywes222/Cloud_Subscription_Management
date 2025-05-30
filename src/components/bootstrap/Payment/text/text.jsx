import React from "react";

const Text = () => {
  return (
    <div className="bs p-4">
      <h5 className="text-lg font-medium leading-relaxed mb-1">
        Order Summary
      </h5>
      <h6 className="text-base font-medium leading-relaxed mb-1">
        Order No:97XYrWE34
      </h6>

      <div className="thankyou-text">
        <p className="mb-4 text-sm font-normal text-black leading-relaxed">
          Thank You For Your Purchase
        </p>

        <div className="thankyou-container max-h-72 overflow-y-auto p-4 text-sm">
          <div className="item-row flex justify-between items-center mb-0">
            <p className="item-name text-gray-500 font-normal leading-relaxed m-0">
              phAMACore Lite
            </p>
            <p className="item-price text-gray-500 font-normal leading-relaxed m-0">
              KES 0
            </p>
          </div>

          <div className="item-row flex justify-between items-center mb-0">
            <p className="item-name text-gray-500 font-normal leading-relaxed m-0">
              eTims
            </p>
            <p className="item-price text-gray-500 font-normal leading-relaxed m-0">
              KES 0
            </p>
          </div>

          <div className="item-row flex justify-between items-center mb-0">
            <p className="item-name text-gray-500 font-normal leading-relaxed m-0">
              Transaction Fee
            </p>
            <p className="item-price text-gray-500 font-normal leading-relaxed m-0">
              KES 0
            </p>
          </div>

          <div className="item-row flex justify-between items-center mb-0">
            <p className="item-name text-gray-500 font-normal leading-relaxed m-0">
              Service Charge
            </p>
            <p className="item-price text-gray-500 font-normal leading-relaxed m-0">
              KES 0
            </p>
          </div>

          <hr className="my-2 border-gray-300" />

          <div className="item-row total-row flex justify-between font-semibold">
            <div className="item-name total-text text-black text-sm leading-relaxed m-0">
              <p className="m-0">Total</p>
            </div>
            <div className="item-price total-text text-black text-sm leading-relaxed m-0">
              <p className="m-0">KES 0</p>
            </div>
          </div>

          <p className="text-center mt-2 text-sm text-gray-500">
            **This is an auto-generated receipt**
          </p>
        </div>
      </div>
    </div>
  );
};

export default Text;
