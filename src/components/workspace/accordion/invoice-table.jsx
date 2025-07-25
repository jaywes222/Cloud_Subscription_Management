import React, { useMemo } from "react";
import { Eye, Download } from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../../../components/ui/table";
import { cn } from "../../../lib/utils";
import { getInvoicesQueryFn } from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "../../../hooks/use-toast";

// Action buttons
const ActionButtons = ({ onView, onDownload }) => (
    <div className="flex items-center gap-2">
        <button onClick={onView} title="View">
            <Eye className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </button>
        <button onClick={onDownload} title="Download">
            <Download className="w-4 h-4 text-muted-foreground hover:text-primary" />
        </button>
    </div>
);

const InvoiceTable = ({ className }) => {
    const { toast } = useToast();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["invoice-receipt"],
        queryFn: getInvoicesQueryFn,
        onError: (error) => {
            toast({
                title: "Failed to fetch invoices/receipts",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const invoices = useMemo(() => {
        if (!Array.isArray(data?.items)) return [];
        return data.items.map((item, index) => ({
            id: item.transNo ?? `INV-${index + 1}`,
            dateIssued: item.transDate?.split("T")[0] ?? "N/A",
            description: item.transType ?? "—",
            amount: item.kshAmt ?? 0,
            paymentMethod: item.dt ?? "Unknown",
        }));
    }, [data]);

    if (isLoading) return <div>Loading invoices/receipts...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (invoices.length === 0) return <div>No invoice/receipt found.</div>;

    return (
        <div className="w-full space-y-2">
            <Table className={cn("w-full", className)} role="table" aria-label="Invoices and Receipts Table">
                <TableHeader>
                    <TableRow>
                        <TableHead>Invoice ID</TableHead>
                        <TableHead>Date Issued</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.slice(0, 12).map((invoice) => (
                        <TableRow
                            key={invoice.id}
                            tabIndex={0}
                            aria-label={`Invoice ${invoice.id}, Amount ${invoice.amount}`}
                        >
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                <time dateTime={invoice.dateIssued}>{invoice.dateIssued}</time>
                            </TableCell>
                            <TableCell>{invoice.description}</TableCell>
                            <TableCell className="whitespace-nowrap">
                                {invoice.amount
                                    ? `KES ${Number(invoice.amount).toLocaleString()}`
                                    : "N/A"}
                            </TableCell>
                            <TableCell className="capitalize text-muted-foreground">
                                {invoice.paymentMethod}
                            </TableCell>
                            <TableCell>
                                <ActionButtons
                                    onView={() => console.log("View", invoice)}
                                    onDownload={() => console.log("Download", invoice)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {invoices.length > 12 && (
                <p className="text-sm text-muted-foreground italic">
                    Showing first 12 of {invoices.length} invoices.
                </p>
            )}
        </div>
    );
};

InvoiceTable.displayName = "InvoiceTable";

export { InvoiceTable };
