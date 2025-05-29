import React from "react";
import useWorkspaceId from "../../hooks/use-workspace-id";
import { Button } from "../../components/ui/button";
import { Link, useLocation} from "react-router-dom";

const NotFound = () => {
  const workspaceId = useWorkspaceId();
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-muted-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn’t exist or has been moved. If you believe this is an
          error, please contact support.
        </p>
        <Button variant="default" asChild>
          <Link to={`/workspace/${workspaceId}`}
            className="!text-[15px]">
              Go To Dashboard
          </Link>
        </Button>
      </div>

      <div className="mt-10 opacity-80">
        <img
          src="/assets/pharmtech-logo.svg"
          alt="CoreBase Logo"
          className="h-12 mx-auto"
        />
        <p className="text-sm text-muted-foreground mt-2">CoreBase Solutions | Uncompromising Technology</p>
      </div>
    </div>
  );
};

export default NotFound;
