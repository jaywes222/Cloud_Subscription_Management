import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

const CollapsibleRow = ({ icon, label, children, isOpen, onToggle }) => (
    <div className="w-full">
        <div
            className="flex justify-between items-center border rounded-xl px-4 py-3 hover:bg-accent cursor-pointer"
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
            <div className="mt-2 max-h-48 overflow-y-auto rounded-md border px-4 py-3 text-sm bg-caramel-foreground">
                {children}
            </div>
        )}
    </div>
);

export default CollapsibleRow;
