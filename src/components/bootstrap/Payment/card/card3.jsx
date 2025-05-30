import React from "react";

const Card3 = () => {
  return (
    <div className="p-2">
      <div className="max-w-[300px] w-full h-[100px] shadow rounded-md overflow-hidden bg-white">
        <div className="flex flex-col items-center justify-center px-0 py-0">
          <h6 className="text-[#C58C4F] text-center font-semibold">
            phAMACore Lite
          </h6>
          <div className="flex justify-between w-full mt-2 text-[14px]">
            <div className="text-center w-1/3">
              <p>
                Branches:{" "}
                <span className="font-semibold text-[#C58C4F]">5</span>
              </p>
            </div>

            <div className="text-center w-1/3">
              <p>
                Users: <span className="font-semibold text-[#C58C4F]">2</span>
              </p>
            </div>

            <div className="text-center w-1/3">
              <p>
                Cycle:{" "}
                <span className="font-semibold text-[#C58C4F]">quarterly</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card3;
