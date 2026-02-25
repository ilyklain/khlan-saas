"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TrafficSource } from "@/lib/mock-data";

interface TrafficTableProps {
    data: TrafficSource[];
}

export function TrafficTable({ data }: TrafficTableProps) {
    return (
        <Card className="border-border-subtle bg-surface-secondary">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Traffic Sources
                </CardTitle>
            </CardHeader>
            <CardContent className="px-0 pb-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border-subtle hover:bg-transparent">
                            <TableHead className="h-9 px-6 text-xs font-medium text-text-muted">
                                Source
                            </TableHead>
                            <TableHead className="h-9 px-6 text-right text-xs font-medium text-text-muted">
                                Visitors
                            </TableHead>
                            <TableHead className="h-9 px-6 text-right text-xs font-medium text-text-muted">
                                Share
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow
                                key={item.source}
                                className="border-border-subtle transition-colors duration-150 hover:bg-overlay-2"
                            >
                                <TableCell className="px-6 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 w-1.5 rounded-full bg-overlay-30" />
                                        <span className="text-sm text-text-primary">{item.source}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-3 text-right text-sm tabular-nums text-text-muted">
                                    {item.visitors.toLocaleString()}
                                </TableCell>
                                <TableCell className="px-6 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="h-1 w-16 overflow-hidden rounded-full bg-overlay-6">
                                            <div
                                                className="h-full rounded-full bg-overlay-20"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm tabular-nums text-text-muted">
                                            {item.percentage}%
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
