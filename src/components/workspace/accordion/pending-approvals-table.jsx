import React, { useMemo } from "react";
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
import { useToast } from "../../../hooks/use-toast";
import { getPendingApprovalsQueryFn } from "../../../lib/api";

const PendingApprovalTable = ({ className }) => {
    const { toast } = useToast();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["pending-approvals"],
        queryFn: getPendingApprovalsQueryFn,
        onError: (error) => {
            toast({
                title: "Failed to fetch pending approvals",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const approvals = useMemo(() => {
        const rawItems = Array.isArray(data) ? data : data?.items;
        if (!Array.isArray(rawItems)) return [];

        return rawItems.map((item, index) => ({
            id: item.reference ?? `REF-${index + 1}`,
            amount: item.amount ?? 0,
            paymentMethod: item.paymentMethod ?? "Unknown",
            date: item.paymentDate?.split("T")[0] ?? "N/A",
            status: item.status ?? "Pending",
        }));
    }, [data]);

    if (isLoading) return <div>Loading pending approvals...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (approvals.length === 0) return <div>No pending approvals found.</div>;

    return (
        <div className="w-full space-y-2">
            <Table className={cn("w-full", className)} role="table" aria-label="Pending Approvals Table">
                <TableHeader>
                    <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {approvals.slice(0, 12).map((item) => (
                        <TableRow
                            key={item.id}
                            tabIndex={0}
                            aria-label={`Approval ${item.id}, Amount ${item.amount}`}
                        >
                            <TableCell>{item.id}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                <time dateTime={item.date}>{item.date}</time>
                            </TableCell>
                            <TableCell>
                                {item.amount
                                    ? `KES ${Number(item.amount).toLocaleString()}`
                                    : "N/A"}
                            </TableCell>
                            <TableCell className="capitalize font-medium text-green-600">
                                {item.paymentMethod}
                            </TableCell>
                            <TableCell className={cn(
                                "capitalize font-semibold",
                                item.status === "PENDING_PAYMENT"
                                    ? "text-red-600"
                                    : "text-muted-foreground"
                            )}>
                                {item.status.replace(/_/g, " ")}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {approvals.length > 12 && (
                <p className="text-sm text-muted-foreground italic">
                    Showing first 12 of {approvals.length} pending approvals.
                </p>
            )}
        </div>
    );
};

export default PendingApprovalTable;
