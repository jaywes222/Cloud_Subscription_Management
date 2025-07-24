import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex justify-center">
      <img
        src="/images/Cloud.jpg"
        alt="Logo"
        className="mx-auto block max-w-full h-auto"
        width={100}
        />
    </div>
  );
};

export default Logo;
