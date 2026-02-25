"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { ActivityItem } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityTableProps {
    data: ActivityItem[];
}

export function ActivityTable({ data }: ActivityTableProps) {
    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        if (!query) return data;
        const q = query.toLowerCase();
        return data.filter(
            (item) =>
                item.event.toLowerCase().includes(q) ||
                item.user.toLowerCase().includes(q) ||
                item.status.toLowerCase().includes(q)
        );
    }, [data, query]);

    return (
        <Card className="border-border-subtle bg-surface-secondary">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        Recent Activity
                    </CardTitle>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder="Filter..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-40 rounded-md border border-border-subtle bg-surface py-1 pl-7 pr-2 text-xs text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-overlay-20"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border-subtle hover:bg-transparent">
                            <TableHead className="h-9 px-6 text-xs font-medium text-text-muted">
                                Event
                            </TableHead>
                            <TableHead className="h-9 px-6 text-xs font-medium text-text-muted">
                                User
                            </TableHead>
                            <TableHead className="h-9 px-6 text-xs font-medium text-text-muted">
                                Date
                            </TableHead>
                            <TableHead className="h-9 px-6 text-right text-xs font-medium text-text-muted">
                                Status
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((item) => (
                            <TableRow
                                key={item.id}
                                className="border-border-subtle transition-colors duration-150 hover:bg-overlay-2"
                            >
                                <TableCell className="px-6 py-3 text-sm text-text-primary">
                                    {item.event}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-sm text-text-muted">
                                    {item.user}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-sm text-text-muted">
                                    {item.date}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-right text-sm text-text-muted">
                                    {item.status}
                                </TableCell>
                            </TableRow>
                        ))}
                        {filtered.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="py-8 text-center text-sm text-text-muted">
                                    No matching activity.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
