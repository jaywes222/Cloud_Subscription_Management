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

// Moved StatusIndicator here for reuse
const StatusIndicator = ({ status }) => {
    const normalized = (status || "pending").toLowerCase();
    const colorClass =
        normalized === "active"
            ? "bg-green-500"
            : normalized === "inactive"
                ? "bg-red-500"
                : "bg-yellow-500";

    return (
        <div className="flex items-center gap-2">
            <span className={cn("inline-block w-2 h-2 rounded-full", colorClass)} />
            <span className="capitalize text-sm text-muted-foreground">{status}</span>
        </div>
    );
};

const SubscriptionScheduleTable = ({ subscriptions = [], className }) => {
    const formatKES = (amount) =>
        new Intl.NumberFormat('en-KE', {
            style: 'currency',
            currency: 'KES',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);

    const renderSchedule = (schedule) =>
        schedule.map(({ date, amount, status }, idx) => (
            <div key={idx} className="whitespace-nowrap">
                <span>{date}: </span>
                <span
                    className={cn(
                        "font-semibold",
                        status === "paid" ? "text-green-600" : "text-red-600"
                    )}
                >
                    {formatKES(amount)} ({status})
                </span>
            </div>
        ));

    return (
        <Table className={cn("overflow-auto max-h-96", className)} role="table" aria-label="Subscription Schedule Table">
            <TableHeader>
                <TableRow>
                    <TableHead>Sub ID</TableHead>
                    <TableHead>Subscription Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Cycle</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subscriptions.map((sub) => (
                    <TableRow key={sub.id} tabIndex={0} aria-label={`Subscription ${sub.name} with status ${sub.status}`}>
                        <TableCell>{sub.id}</TableCell>
                        <TableCell>{sub.name}</TableCell>
                        <TableCell>{sub.startDate}</TableCell>
                        <TableCell className="capitalize">{sub.cycle}</TableCell>
                        <TableCell>{renderSchedule(sub.schedule)}</TableCell>
                        <TableCell>{sub.paymentMethod}</TableCell>
                        <TableCell>
                            <StatusIndicator status={sub.status} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default SubscriptionScheduleTable;
