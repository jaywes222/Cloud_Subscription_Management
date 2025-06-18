import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../../../components/ui/table";
import { format } from "date-fns";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";

const formatKES = (amount) =>
    new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 2,
    }).format(amount);

const sampleMonthlyTransactions = [
    {
        id: 1,
        date: '2024-07-01',
        month: 'July',
        amountDue: 250000,
        amountPaid: 250000,
    },
    {
        id: 2,
        date: '2024-08-01',
        month: 'August',
        amountDue: 250000,
        amountPaid: 250000,
    },
    {
        id: 3,
        date: '2024-09-01',
        month: 'September',
        amountDue: 250000,
        amountPaid: 300000,
    },
    {
        id: 4,
        date: '2024-10-01',
        month: 'October',
        amountDue: 250000,
        amountPaid: 250000,
    },
    {
        id: 5,
        date: '2024-11-01',
        month: 'November',
        amountDue: 250000,
        amountPaid: 250000,
    },
    {
        id: 6,
        date: '2024-12-01',
        month: 'December',
        amountDue: 250000,
        amountPaid: 250000,
    },
    {
        id: 7,
        date: '2025-01-01',
        month: 'January',
        amountDue: 250000,
        amountPaid: 300000,
    },
    {
        id: 8,
        date: '2025-02-01',
        month: 'February',
        amountDue: 250000,
        amountPaid: 250000,
    },
];

const SubscriptionScheduleTable = ({
    transactions = sampleMonthlyTransactions,
    startDate = "2024-07-01",
    billingCycle = "monthly",
    monthlyDue = 250000,
    months = 12,
}) => {
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const schedule = [];
    let currentDate = new Date(startDate);
    let carryOver = 0;
    let txIndex = 0;

    for (let i = 0; i < months; i++) {
        const tx = sortedTransactions[i];
        const amountPaid = tx ? tx.amountPaid : 0;
        const netPaid = amountPaid + carryOver;
        const remainingDue = Math.max(monthlyDue - netPaid, 0);
        carryOver = netPaid - monthlyDue;

        const status =
            netPaid >= monthlyDue ? "paid" : netPaid > 0 ? "partial" : "unpaid";

        schedule.push({
            id: i + 1,
            dueDate: format(currentDate, "yyyy-MM-dd"),
            month: format(currentDate, "MMMM yyyy"),
            amountDue: monthlyDue,
            amountPaid,
            remainingDue,
            carryOver,
            status,
        });

        currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return (
        <div className="space-y-6 w-full">
            <div className="w-full border rounded-md overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Month</TableHead>
                            <TableHead className="text-right">Amount Due</TableHead>
                            <TableHead className="text-right">Amount Paid</TableHead>
                            <TableHead className="text-right">Remaining Due</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {schedule.map((r) => (
                            <TableRow key={r.id}>
                                <TableCell>{r.dueDate}</TableCell>
                                <TableCell>{r.month}</TableCell>
                                <TableCell className="text-right text-red-700">
                                    {formatKES(r.amountDue)}
                                </TableCell>
                                <TableCell className="text-right text-green-700">
                                    {formatKES(r.amountPaid)}
                                </TableCell>
                                <TableCell className="text-right text-orange-700">
                                    {r.remainingDue > 0 ? formatKES(r.remainingDue) : "-"}
                                </TableCell>
                                <TableCell
                                    className={cn(
                                        "text-right font-semibold",
                                        r.status === "paid"
                                            ? "text-green-700"
                                            : r.status === "partial"
                                                ? "text-orange-600"
                                                : "text-red-600"
                                    )}
                                >
                                    {r.status === "paid"
                                        ? "Paid"
                                        : r.status === "partial"
                                            ? "Partially Paid"
                                            : "Unpaid"}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SubscriptionScheduleTable;
