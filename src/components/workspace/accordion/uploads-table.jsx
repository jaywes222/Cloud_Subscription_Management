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
import { useQuery } from "@tanstack/react-query";
import { getFilesQueryFn } from "../../../lib/api";
import { toast } from "../../../hooks/use-toast";

const StatusIndicator = ({ status }) => {
    const normalized = (status || "pending").toLowerCase();
    const colorClass =
        normalized === "approved"
            ? "bg-green-500"
            : normalized === "pending"
                ? "bg-red-500"
                : "bg-yellow-500";

    return (
        <div className="flex items-center gap-2">
            <span className={cn("inline-block w-2 h-2 rounded-full", colorClass)} />
            <span className="capitalize text-sm text-muted-foreground">{status}</span>
        </div>
    );
};

const UploadsTable = ({className }) => {
    const {
        data: files = [],
        isError
    } = useQuery({
        queryKey: ["uploaded-files"],
        queryFn: getFilesQueryFn
    });

    if (isError) {
        toast({
            title: "Failed to fetch uploaded files.",
            description: "Unable to load uploaded files.",
            variant: "destructive",
        })
    }

    const formattedFiles = files.map((file, index) => ({
        id: index + 1,
        name: file.originalFileName,
        fileType: file.filetype,
        category: file.isTrainingSheet
            ? "Training Sheet"
            : file.isMasterDoc
                ? "Master Document"
                : "General",
        status: "approved",
    }));

    return (
        <Table
            className={cn("w-full", className)}
            role="table"
            aria-label="Files Table"
        >
            <TableHeader>
                <TableRow>
                    <TableHead>File ID</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>File Type</TableHead>
                    <TableHead>File Category</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {formattedFiles.slice(0,12).map((file) => (
                    <TableRow
                        key={file.id}
                        tabIndex={0}
                        aria-label={`File ${file.name} with status ${file.status}`}
                    >
                        <TableCell>{file.id}</TableCell>
                        <TableCell>{file.name}</TableCell>
                        <TableCell>{file.fileType || "Unknown"}</TableCell>
                        <TableCell>{file.category || "N/A"}</TableCell>
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
