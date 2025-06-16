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

const sampleTransactions = [
    {
        id: 1,
        date: "2025-01-01",
        description: "January Subscription",
        debit: 0,
        credit: 1000,
    },
    {
        id: 2,
        date: "2025-01-15",
        description: "Payment Received",
        debit: 1000,
        credit: 0,
    },
    {
        id: 3,
        date: "2025-02-01",
        description: "February Subscription",
        debit: 0,
        credit: 1000,
    },
    {
        id: 4,
        date: "2025-02-10",
        description: "Partial Payment",
        debit: 600,
        credit: 0,
    },
    {
        id: 5,
        date: "2025-03-01",
        description: "March Subscription",
        debit: 0,
        credit: 1000,
    },
    {
        id: 6,
        date: "2025-03-05",
        description: "Overpayment",
        debit: 1500,
        credit: 0,
    },
];

const formatKES = (amount) =>
    new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 2,
    }).format(amount);

const SubscriptionScheduleTable = ({ transactions = sampleTransactions, billingCycle = "monthly" }) => {
    let runningBalance = 0;
    let totalCredit = 0;
    let totalDebit = 0;

    const slicedTx = transactions.slice(0, 11)

    const rows = slicedTx.map((tx) => {
        runningBalance += tx.debit - tx.credit;
        totalDebit += tx.debit;
        totalCredit += tx.credit;

        return {
            ...tx,
            runningBalance: runningBalance,
        };
    });

    return (
        <div className="space-y-6 w-full">
            <div className="w-full border rounded-md">
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
                                <TableCell className={cn("text-right", tx.runningBalance < 0 ? "text-red-500" : "text-green-700")}>
                                    {formatKES(tx.runningBalance)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="bg-muted font-semibold">
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-right text-red-700">{formatKES(totalDebit)}</TableCell>
                            <TableCell className="text-right text-green-700">{formatKES(totalCredit)}</TableCell>
                            <TableCell className={cn("text-right", runningBalance < 0 ? "text-red-700" : "text-green-700")}>
                                {formatKES(runningBalance)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>

            {transactions.length > 11 && (<p className="text-sm text-muted-foreground italic">
                Showing first 11 of {transactions.length} transactions + total.
            </p>
            )}
        </div>
    );
};

export default SubscriptionScheduleTable;
