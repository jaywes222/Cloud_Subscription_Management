import React, { useMemo } from "react";
import { Eye, Download, Printer } from "lucide-react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../../../components/ui/table";
import { cn } from "../../../lib/utils";

// Status Indicator with color
const StatusIndicator = ({ status }) => {
    const normalized = (status || "pending").toLowerCase();
    const colorClass =
        normalized === "paid"
            ? "bg-green-500"
            : normalized === "unpaid"
                ? "bg-yellow-500"
                : "bg-red-500";

    return (
        <div className="flex items-center gap-2">
            <span className={cn("inline-block w-2 h-2 rounded-full", colorClass)} />
            <span className="capitalize text-sm text-muted-foreground">{status}</span>
        </div>
    );
};

// Actions
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

const InvoiceTable = ({ invoices = [], className }) => {
    const rows = useMemo(() => {
        return invoices.map((invoice) => (
            <TableRow
                key={invoice.id}
                tabIndex={0}
                aria-label={`Invoice ${invoice.id}, Amount ${invoice.amount}, Status ${invoice.status}`}
            >
                <TableCell>{invoice.id}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                    <time dateTime={invoice.dateIssued}>{invoice.dateIssued}</time>
                </TableCell>
                <TableCell>{invoice.description || "—"}</TableCell>
                <TableCell className="whitespace-nowrap">
                    {invoice.amount ? `KES ${Number(invoice.amount).toLocaleString()}` : "N/A"}
                </TableCell>
                <TableCell className="capitalize text-muted-foreground">
                    {invoice.paymentMethod || "Unknown"}
                </TableCell>
                <TableCell>
                    <StatusIndicator status={invoice.status} />
                </TableCell>
                <TableCell>
                    <ActionButtons
                        onView={() => console.log("View", invoice)}
                        onDownload={() => console.log("Download", invoice)}
                        onPrint={() => console.log("Print", invoice)}
                    />
                </TableCell>
            </TableRow>
        ));
    }, [invoices]);

    return (
        <Table
            className={cn("overflow-auto max-h-64 sm:max-h-[28rem]", className)}
            role="table"
            aria-label="Invoices and Receipts Table"
        >
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date Issued</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{rows}</TableBody>
        </Table>
    );
};

InvoiceTable.displayName = "InvoiceTable";

export { InvoiceTable };
