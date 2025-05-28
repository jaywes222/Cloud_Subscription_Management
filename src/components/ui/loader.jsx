import * as React from "react";
import { cn } from "../../lib/utils";
import { Loader as LucideLoader } from "lucide-react";

const Loader = React.forwardRef(({ className, size = 24, ...props }, ref) => {
    return (
        <LucideLoader
            size={size}
            ref={ref}
            className={cn("animate-spin text-gray-600", className)}
            {...props}
        />
    );
});
Loader.displayName = "Loader";

export { Loader };
