import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

const formatKES = (amount) =>
    new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 2,
    }).format(amount);

const getNextDueDate = (latestDate, billingCycle) => {
    const date = new Date(latestDate);
    if (billingCycle === "monthly") date.setMonth(date.getMonth() + 1);
    else if (billingCycle === "quarterly") date.setMonth(date.getMonth() + 3);
    else if (billingCycle === "annually") date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0];
};

const SubscriptionScheduleTable = ({
    transactions = [],
    billingCycle = "monthly",
}) => {
    const sortedTx = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    let runningBalance = 0;
    let totalCredit = 0;
    let totalDebit = 0;

    const rows = sortedTx.map((tx) => {
        runningBalance += tx.debit - tx.credit;
        totalDebit += tx.debit;
        totalCredit += tx.credit;
        return {
            ...tx,
            runningBalance,
        };
    });

    const latestTx = sortedTx[sortedTx.length - 1];
    const dueDate = getNextDueDate(latestTx?.date || new Date(), billingCycle);
    const dueAmount = 250000;

    const handleExport = () => {
        const csvContent = [
            ["Date", "Description", "Debit", "Credit", "Balance"],
            ...rows.map((r) => [
                r.date,
                r.description,
                r.debit ? r.debit : "-",
                r.credit ? r.credit : "-",
                r.runningBalance,
            ]),
        ]
            .map((e) => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `subscription-transactions.csv`;
        link.click();
    };

    return (
        <div className="space-y-6 w-full">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm">
                        <span className="font-semibold">Next Due Date:</span> {dueDate}
                    </p>
                    <p className="text-sm">
                        <span className="font-semibold">Due Amount:</span>{" "}
                        {formatKES(dueAmount)}
                    </p>
                </div>
                <Button variant="outline" onClick={handleExport}>
                    Export CSV
                </Button>
            </div>

            <div className="w-full border rounded-md overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Posting Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Debit</TableHead>
                            <TableHead className="text-right">Credit</TableHead>
                            <TableHead className="text-right">Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((tx) => (
                            <TableRow key={tx.id}>
                                <TableCell>{tx.date}</TableCell>
                                <TableCell>{tx.description}</TableCell>
                                <TableCell className="text-right text-red-600">
                                    {tx.debit ? formatKES(tx.debit) : "-"}
                                </TableCell>
                                <TableCell className="text-right text-green-600">
                                    {tx.credit ? formatKES(tx.credit) : "-"}
                                </TableCell>
                                <TableCell
                                    className={cn(
                                        "text-right font-medium",
                                        tx.runningBalance < 0 ? "text-red-600" : "text-green-700"
                                    )}
                                >
                                    {formatKES(tx.runningBalance)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="bg-muted font-semibold">
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-right text-red-700">
                                {formatKES(totalDebit)}
                            </TableCell>
                            <TableCell className="text-right text-green-700">
                                {formatKES(totalCredit)}
                            </TableCell>
                            <TableCell
                                className={cn(
                                    "text-right",
                                    runningBalance < 0 ? "text-red-700" : "text-green-700"
                                )}
                            >
                                {formatKES(runningBalance)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SubscriptionScheduleTable;
