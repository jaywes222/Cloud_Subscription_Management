import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../../../components/ui/table";
import { cn } from "../../../lib/utils";

const StatusIndicator = ({ status }) => {
    const normalized = (status || "pending").toLowerCase();
    const colorClass =
        normalized === "approved"
            ? "bg-green-500"
            : normalized === "pending"
                ? "bg-red-500"
                : "bg-yellow-500"; // fallback or other statuses

    return (
        <div className="flex items-center gap-2">
            <span className={cn("inline-block w-2 h-2 rounded-full", colorClass)} />
            <span className="capitalize text-sm text-muted-foreground">{status}</span>
        </div>
    );
};

const UploadsTable = ({ files = [], className }) => {
    return (
        <Table
            className={cn("overflow-auto max-h-96", className)}
            role="table"
            aria-label="Files Table"
        >
            <TableHeader>
                <TableRow>
                    <TableHead>File ID</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>File Type</TableHead>
                    <TableHead>File Size</TableHead>
                    <TableHead>Last Modified At</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {files.map((file) => (
                    <TableRow
                        key={file.id}
                        tabIndex={0}
                        aria-label={`File ${file.name} with status ${file.status}`}
                    >
                        <TableCell>{file.id}</TableCell>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>{file.fileType || "Unknown"}</TableCell>
                        <TableCell>
                            {file.size
                                ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                                : "N/A"}
                        </TableCell>
                        <TableCell>{file.lastModifiedAt || "N/A"}</TableCell>
                        <TableCell>
                            <StatusIndicator status={file.status} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UploadsTable;
