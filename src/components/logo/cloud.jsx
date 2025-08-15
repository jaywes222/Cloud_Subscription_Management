import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 px-2 py-1 select-none"
    >
      <img
        src="/images/Cloud.jpg"
        alt="CoreBase Solutions Logo"
        className="block object-contain"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default Logo;
