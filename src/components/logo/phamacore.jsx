import React from "react";
import { Link } from "react-router-dom";

const Logo2 = ({ showText }) => {
  return (
    <Link to="/" className="flex items-center gap-2 select-none">
      <img
        src="/images/phamacore.png"
        alt="CoreBase Solutions Logo"
        className="object-contain"
        width={40}
        height={40}
      />
      {showText && (
        <div className="leading-tight">
          <span className="block font-semibold text-sm">CoreBase</span>
          <span className="block text-xs text-muted-foreground">Solutions</span>
        </div>
      )}
    </Link>
  );
};

export default Logo2;
