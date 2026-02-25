"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Check, Zap, CreditCard, Download } from "lucide-react";
import { useToast } from "@/components/dashboard/toast";

const currentPlan = {
    name: "Pro",
    price: "$49",
    period: "/month",
    renewalDate: "March 24, 2026",
    usage: {
        seats: { used: 8, total: 15 },
        storage: { used: 42, total: 100, unit: "GB" },
        apiCalls: { used: 847200, total: 1000000 },
    },
};

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "/month",
        features: ["3 team members", "5 GB storage", "10K API calls", "Community support"],
        current: false,
    },
    {
        name: "Pro",
        price: "$49",
        period: "/month",
        features: ["15 team members", "100 GB storage", "1M API calls", "Priority support", "Advanced analytics", "Custom integrations"],
        current: true,
    },
    {
        name: "Enterprise",
        price: "$199",
        period: "/month",
        features: ["Unlimited members", "1 TB storage", "Unlimited API calls", "24/7 dedicated support", "SSO & SAML", "Custom SLA", "Audit logs"],
        current: false,
    },
];

const invoices = [
    { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$49.00", status: "Paid" },
    { id: "INV-2025-011", date: "Nov 1, 2025", amount: "$49.00", status: "Paid" },
    { id: "INV-2025-010", date: "Oct 1, 2025", amount: "$29.00", status: "Paid" },
];

const paymentMethod = {
    brand: "Visa",
    last4: "4242",
    expiry: "12/27",
};

function UsageBar({ used, total, label, format }: { used: number; total: number; label: string; format?: (n: number) => string }) {
    const percentage = Math.min((used / total) * 100, 100);
    const fmt = format || ((n: number) => n.toLocaleString());
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
                <span className="text-text-muted">{label}</span>
                <span className="tabular-nums text-text-primary">{fmt(used)} / {fmt(total)}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-overlay-6">
                <div
                    className="h-full rounded-full bg-overlay-20 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default function BillingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
    const { toast } = useToast();

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-5xl space-y-6"
        >
            <div>
                <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                    Billing
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                    Manage your subscription, usage, and payment methods.
                </p>
            </div>

            <Card className="border-border-subtle bg-surface-secondary">
                <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-text-primary" />
                                <span className="text-sm font-semibold text-text-primary">
                                    {currentPlan.name} Plan
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-text-muted">
                                Your plan renews on {currentPlan.renewalDate}
                            </p>
                        </div>
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-2xl font-semibold tabular-nums text-text-primary">
                                {currentPlan.price}
                            </span>
                            <span className="text-sm text-text-muted">{currentPlan.period}</span>
                        </div>
                    </div>
                    <Separator className="my-5 bg-border-subtle" />
                    <div className="space-y-4">
                        <UsageBar
                            used={currentPlan.usage.seats.used}
                            total={currentPlan.usage.seats.total}
                            label="Team Seats"
                        />
                        <UsageBar
                            used={currentPlan.usage.storage.used}
                            total={currentPlan.usage.storage.total}
                            label="Storage"
                            format={(n) => `${n} GB`}
                        />
                        <UsageBar
                            used={currentPlan.usage.apiCalls.used}
                            total={currentPlan.usage.apiCalls.total}
                            label="API Calls"
                            format={(n) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : `${(n / 1000).toFixed(0)}K`}
                        />
                    </div>
                </CardContent>
            </Card>

            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        Plans
                    </h3>
                    <div className="flex rounded-md border border-border-subtle bg-overlay-4 p-0.5">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`rounded-sm px-3 py-1 text-xs font-medium transition-colors ${billingCycle === "monthly" ? "bg-overlay-8 text-text-primary" : "text-text-muted"}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("annual")}
                            className={`rounded-sm px-3 py-1 text-xs font-medium transition-colors ${billingCycle === "annual" ? "bg-overlay-8 text-text-primary" : "text-text-muted"}`}
                        >
                            Annual
                        </button>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            className={`border-border-subtle bg-surface-secondary ${plan.current ? "ring-1 ring-overlay-20" : ""}`}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-text-primary">{plan.name}</span>
                                    {plan.current && (
                                        <span className="rounded bg-overlay-8 px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
                                            Current
                                        </span>
                                    )}
                                </div>
                                <div className="mt-3 flex items-baseline gap-0.5">
                                    <span className="text-2xl font-semibold tabular-nums text-text-primary">
                                        {billingCycle === "annual"
                                            ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 10)}`
                                            : plan.price}
                                    </span>
                                    <span className="text-xs text-text-muted">
                                        {billingCycle === "annual" ? "/year" : "/month"}
                                    </span>
                                </div>
                                <ul className="mt-4 space-y-2">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-xs text-text-muted">
                                            <Check className="h-3 w-3 flex-shrink-0 text-text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => !plan.current && toast(`Upgrading to ${plan.name}...`, "info")}
                                    className={`mt-5 w-full rounded-md py-2 text-xs font-medium transition-colors ${plan.current
                                        ? "bg-overlay-6 text-text-muted cursor-default"
                                        : "bg-overlay-8 text-text-primary hover:bg-overlay-12"
                                        }`}
                                    disabled={plan.current}
                                >
                                    {plan.current ? "Current Plan" : "Upgrade"}
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        Payment Method
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-14 items-center justify-center rounded-md bg-overlay-6">
                                <CreditCard className="h-4 w-4 text-text-muted" />
                            </div>
                            <div>
                                <div className="text-sm font-medium text-text-primary">
                                    {paymentMethod.brand} ending in {paymentMethod.last4}
                                </div>
                                <div className="text-xs text-text-muted">
                                    Expires {paymentMethod.expiry}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => toast("Payment method updated")}
                            className="rounded-md bg-overlay-8 px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-overlay-12"
                        >
                            Update
                        </button>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        Invoice History
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border-subtle hover:bg-transparent">
                                <TableHead className="h-9 px-6 text-xs font-medium text-text-muted">
                                    Invoice
                                </TableHead>
                                <TableHead className="h-9 px-6 text-xs font-medium text-text-muted">
                                    Date
                                </TableHead>
                                <TableHead className="h-9 px-6 text-right text-xs font-medium text-text-muted">
                                    Amount
                                </TableHead>
                                <TableHead className="h-9 px-6 text-right text-xs font-medium text-text-muted">
                                    Status
                                </TableHead>
                                <TableHead className="h-9 w-12 px-6" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow
                                    key={invoice.id}
                                    className="border-border-subtle transition-colors duration-150 hover:bg-overlay-2"
                                >
                                    <TableCell className="px-6 py-3 text-sm font-mono text-text-primary">
                                        {invoice.id}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 text-sm text-text-muted">
                                        {invoice.date}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 text-right text-sm tabular-nums text-text-primary">
                                        {invoice.amount}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 text-right text-sm text-text-muted">
                                        {invoice.status}
                                    </TableCell>
                                    <TableCell className="px-6 py-3">
                                        <button
                                            onClick={() => toast(`Downloaded ${invoice.id}`)}
                                            className="text-text-muted transition-colors hover:text-text-primary"
                                        >
                                            <Download className="h-3.5 w-3.5" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    );
}
