"use client";

import { useState, useMemo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopPage } from "@/lib/mock-data";

interface TopPagesTableProps {
    data: TopPage[];
}

type SortKey = "path" | "views" | "uniqueVisitors" | "avgDuration";
type SortDir = "asc" | "desc";

export function TopPagesTable({ data }: TopPagesTableProps) {
    const [sortKey, setSortKey] = useState<SortKey>("views");
    const [sortDir, setSortDir] = useState<SortDir>("desc");

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("desc");
        }
    };

    const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
        if (sortKey !== columnKey) return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-40" />;
        return sortDir === "asc"
            ? <ArrowUp className="ml-1 inline h-3 w-3" />
            : <ArrowDown className="ml-1 inline h-3 w-3" />;
    };

    const sorted = useMemo(() => {
        return [...data].sort((a, b) => {
            let valA: string | number = a[sortKey];
            let valB: string | number = b[sortKey];
            if (typeof valA === "string" && typeof valB === "string") {
                const cmp = valA.localeCompare(valB);
                return sortDir === "asc" ? cmp : -cmp;
            }
            return sortDir === "asc"
                ? (valA as number) - (valB as number)
                : (valB as number) - (valA as number);
        });
    }, [data, sortKey, sortDir]);

    return (
        <Card className="border-border-subtle bg-surface-secondary">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Top Pages
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border-subtle hover:bg-transparent">
                            <TableHead
                                className="h-9 cursor-pointer select-none px-6 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                                onClick={() => handleSort("path")}
                            >
                                Path <SortIcon columnKey="path" />
                            </TableHead>
                            <TableHead
                                className="h-9 cursor-pointer select-none px-6 text-right text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                                onClick={() => handleSort("views")}
                            >
                                Views <SortIcon columnKey="views" />
                            </TableHead>
                            <TableHead
                                className="h-9 cursor-pointer select-none px-6 text-right text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                                onClick={() => handleSort("uniqueVisitors")}
                            >
                                Unique Visitors <SortIcon columnKey="uniqueVisitors" />
                            </TableHead>
                            <TableHead
                                className="h-9 cursor-pointer select-none px-6 text-right text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                                onClick={() => handleSort("avgDuration")}
                            >
                                Avg. Duration <SortIcon columnKey="avgDuration" />
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sorted.map((item) => (
                            <TableRow
                                key={item.path}
                                className="border-border-subtle transition-colors duration-150 hover:bg-overlay-2"
                            >
                                <TableCell className="px-6 py-3 text-sm font-mono text-text-primary">
                                    {item.path}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-right text-sm tabular-nums text-text-muted">
                                    {item.views.toLocaleString()}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-right text-sm tabular-nums text-text-muted">
                                    {item.uniqueVisitors.toLocaleString()}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-right text-sm tabular-nums text-text-muted">
                                    {item.avgDuration}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
