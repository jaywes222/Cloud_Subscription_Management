import React from "react";
import { Link } from "react-router-dom";

const Logo2 = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 px-2 py-1 select-none"
    >
      <img
        src="/images/phamacore.png"
        alt="CoreBase Solutions Logo"
        className="block object-contain"
        width={40}
        height={40}
      />

      <div className="leading-tight">
        <span className="block text-base font-bold">CoreBase</span>
        <span className="block text-xs text-muted-foreground">
          Solutions
        </span>
      </div>
    </Link>
  );
};

export default Logo2;
