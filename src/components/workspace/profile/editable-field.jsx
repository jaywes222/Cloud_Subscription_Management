import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { PenBoxIcon, LockIcon } from "lucide-react";
import { Button } from "../../ui/button";

export const EditableField = ({
    label,
    value,
    field,
    onEdit,
    isPassword,
    loading,
    fullWidth,
    readOnly = false,
}) => {
    const displayValue = isPassword ? "************" : value;

    return (
        <div className={`flex items-center justify-between ${fullWidth ? "w-full" : ""}`}>
            <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{label}</p>
                {loading ? (
                    <Skeleton className="h-4 w-[250px]" />
                ) : (
                    <p className="text-sm font-medium text-gray-900">{displayValue}</p>
                )}
            </div>

            {loading ? null : (
                readOnly ? (
                    <div className="p-1.5 rounded-md bg-gray-100 text-gray-400">
                        <LockIcon className="w-4 h-4" />
                    </div>
                ) : (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit?.(field, value)}
                        className="text-muted-foreground"
                    >
                        <PenBoxIcon className="w-4 h-4" />
                    </Button>
                )
            )}
        </div>
    );
};
