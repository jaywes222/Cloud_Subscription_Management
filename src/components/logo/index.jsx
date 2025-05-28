import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ url = "/" }) => {
  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link to={url}>
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <img src="" alt="Logo" className="size-4" />
        </div>
      </Link>
    </div>
  );
};

export default Logo;
