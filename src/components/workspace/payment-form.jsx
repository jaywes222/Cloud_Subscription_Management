import React, { useState } from "react";

const PaymentForm = () => {
  const [selectedOption, setSelectedOption] = useState("mpesa");

  return (
    <div className="bs p-4 max-w-3xl mx-auto">
      <h5 className="mb-4 text-center text-lg font-normal text-black leading-relaxed">
        Choose Your Payment Method
      </h5>

      <form>
        {/* Payment Method Radios */}
        <div className="flex justify-center space-x-12 mb-8">
          {/* MPESA */}
          <label className="custom-radio relative flex items-center cursor-pointer text-black text-sm font-normal leading-relaxed">
            <input
              type="radio"
              name="paymentMethod"
              value="mpesa"
              checked={selectedOption === "mpesa"}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="appearance-none border-2 border-gray-300 rounded-full w-5 h-5 cursor-pointer relative p-2
                checked:border-yellow-600 checked:bg-yellow-600
                focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span className="ml-3 select-none">MPESA</span>

            {/* Inner white dot - via ::after in CSS, but here add with sibling or pseudo styles */}
            <style>{`
              input[type="radio"].appearance-none:checked::after {
                content: "";
                position: absolute;
                top: 6px;
                left: 6px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: white;
                display: block;
              }
            `}</style>
          </label>

          {/* BANK */}
          <label className="custom-radio relative flex items-center cursor-pointer text-black text-sm font-normal leading-relaxed">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={selectedOption === "bank"}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="appearance-none border-2 border-gray-300 rounded-full w-5 h-5 cursor-pointer relative p-2
                checked:border-yellow-600 checked:bg-yellow-600
                focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <span className="ml-3 select-none">BANK</span>
          </label>
        </div>

        {/* MPESA Fields */}
        {selectedOption === "mpesa" && (
          <div className="form-container flex flex-col space-y-4 p-2">
            <div>
              <label
                htmlFor="mobileNumber"
                className="block mb-1 text-black text-sm font-normal leading-relaxed"
              >
                Mobile Number
              </label>
              <input
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                autoComplete="off"
                className="form-control custom-border w-full border border-gray-300 rounded px-3 py-2 text-sm text-black
                  focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
              />
            </div>

            <div>
              <label
                htmlFor="amountPaidMpesa"
                className="block mb-1 text-black text-sm font-normal leading-relaxed"
              >
                Amount Paid
              </label>
              <input
                type="number"
                id="amountPaidMpesa"
                name="amountPaid"
                autoComplete="off"
                min={0}
                className="form-control custom-border w-full border border-gray-300 rounded px-3 py-2 text-sm text-black
                  focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
              />
            </div>
          </div>
        )}

        {/* BANK Fields */}
        {selectedOption === "bank" && (
          <div className="form-container flex flex-col space-y-4 p-2">
            {/* Bank Name */}
            <div>
              <label
                htmlFor="bankName"
                className="block mb-1 text-black text-sm font-normal leading-relaxed"
              >
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                autoComplete="off"
                className="form-control custom-border w-full border border-gray-300 rounded px-3 py-2 text-sm text-black
          focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
              />
            </div>

            {/* Account Number */}
            <div>
              <label
                htmlFor="accountNumber"
                className="block mb-1 text-black text-sm font-normal leading-relaxed"
              >
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                autoComplete="off"
                className="form-control custom-border w-full border border-gray-300 rounded px-3 py-2 text-sm text-black
          focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
              />
            </div>

            {/* Reference Number */}
            <div>
              <label
                htmlFor="referenceNumber"
                className="block mb-1 text-black text-sm font-normal leading-relaxed"
              >
                Reference Number
              </label>
              <input
                type="text"
                id="referenceNumber"
                name="referenceNumber"
                autoComplete="off"
                className="form-control custom-border w-full border border-gray-300 rounded px-3 py-2 text-sm text-black
          focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
              />
            </div>

            {/* Amount Paid */}
            <div>
              <label
                htmlFor="amountPaidBank"
                className="block mb-1 text-black text-sm font-normal leading-relaxed"
              >
                Amount Paid
              </label>
              <input
                type="number"
                id="amountPaidBank"
                name="amountPaid"
                autoComplete="off"
                min={0}
                className="form-control custom-border w-full border border-gray-300 rounded px-3 py-2 text-sm text-black
          focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
              />
            </div>

            {/* Payment Date */}
            <div>
              <label
                htmlFor="paymentDate"
                className="block mb-1 text-black text-sm font-normal leading-relaxed"
              >
                Payment Date
              </label>
              <input
                type="date"
                id="paymentDate"
                name="paymentDate"
                className="form-control custom-border w-full border border-gray-300 rounded px-3 py-2 text-sm text-black
          focus:outline-none focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="min-w-[120px] px-12 py-2 font-semibold text-black bg-white border border-gray-300
              hover:border-yellow-600 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
