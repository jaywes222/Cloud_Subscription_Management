import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export function StatusIndicator({ status }) {
    if (status === "saving")
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
    if (status === "success")
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status === "error")
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    return null;
}
