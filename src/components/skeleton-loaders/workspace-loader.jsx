import * as React from "react";
import { Loader } from "../ui/loader";

export function WorkspaceLoader({ workspaceName }) {
    return (
        <div className="absolute inset-0 z-50 flex items-start pt-10 justify-center bg-[rgba(255,255,255,0.01)]">
            <div className="flex items-center space-x-2">
                <Loader size={25} className="text-gray-600" />
                <span className="text-sm font-medium">
                    {workspaceName ? `${workspaceName}...` : "Loading..."}
                </span>
            </div>
        </div>
    );
}
