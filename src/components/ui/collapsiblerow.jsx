import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const CollapsibleRow = ({ icon, label, children, isOpen, onToggle }) => (
    <div className="w-full">
        <div
            className="flex justify-between items-center border rounded px-4 py-3 hover:bg-accent cursor-pointer"
            onClick={onToggle}
        >
            <div className="flex items-center space-x-2 text-sm font-medium">
                {icon}
                <span>{label}</span>
            </div>
            <ChevronRight
                className={cn("w-4 h-4 transition-transform", {
                    "rotate-90": isOpen,
                })}
            />
        </div>

        {isOpen && (
            <div className="mt-2 rounded border px-0 py-3 text-sm bg-caramel-foreground overflow-visible w-full">
                <div className="w-full">{children}</div>
            </div>
        )}
    </div>
);

export default CollapsibleRow;
