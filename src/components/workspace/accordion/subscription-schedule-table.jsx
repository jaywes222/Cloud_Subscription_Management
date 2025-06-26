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
import { cn } from "../../../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionScheduleQueryFn } from "../../../lib/api";
import { useToast } from "../../../hooks/use-toast";

const formatKES = (amount) =>
    new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 2,
    }).format(amount);

const SubscriptionScheduleTable = () => {
    const { toast } = useToast();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["sub-schedule"],
        queryFn: getSubscriptionScheduleQueryFn,
        onError: (error) => {
            toast({
                title: "Failed to fetch subscription schedule",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    if (isLoading) return <div>Loading schedule...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (!Array.isArray(data?.schedule)) return <div>No subscription schedule found.</div>;

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
                            <TableHead className="text-right">Balance</TableHead>
                            <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.schedule.map((r, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {r.nextPaymentOn
                                        ? format(new Date(r.paymentDate), "yyyy-MM-dd")
                                        : "-"}
                                </TableCell>
                                <TableCell>{r.month}</TableCell>
                                <TableCell className="text-right text-red-700">
                                    {formatKES(r.amountDue)}
                                </TableCell>
                                <TableCell className="text-right text-green-700">
                                    {formatKES(r.amountPaid)}
                                </TableCell>
                                <TableCell className="text-right text-orange-700">
                                    {r.balance > 0 ? formatKES(r.balance) : "-"}
                                </TableCell>
                                <TableCell
                                    className={cn(
                                        "text-right font-semibold",
                                        r.status === "PAID"
                                            ? "text-green-700"
                                            : r.status === "PARTIAL"
                                                ? "text-orange-600"
                                                : "text-red-600"
                                    )}
                                >
                                    {r.status === "PAID"
                                        ? "PAID"
                                        : r.status === "PARTIAL"
                                            ? "PARTIALLY PAID"
                                            : "UNPAID"}
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
