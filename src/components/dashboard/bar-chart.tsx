"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WeeklyVisitors } from "@/lib/mock-data";

interface BarChartProps {
    data: WeeklyVisitors[];
}

export function BarChart({ data }: BarChartProps) {
    const maxVisitors = Math.max(...data.map((d) => d.visitors));

    return (
        <Card className="border-border-subtle bg-surface-secondary">
            <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                    Visitors by Day
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex h-48 items-end gap-3">
                    {data.map((item) => {
                        const heightPercent = (item.visitors / maxVisitors) * 100;
                        return (
                            <div key={item.day} className="group flex flex-1 flex-col items-center gap-2">
                                <span className="text-xs tabular-nums text-text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                                    {item.visitors.toLocaleString()}
                                </span>
                                <div className="relative w-full overflow-hidden rounded-sm">
                                    <div
                                        className="w-full rounded-sm bg-overlay-8 transition-colors duration-150 group-hover:bg-overlay-14"
                                        style={{ height: `${(heightPercent / 100) * 160}px` }}
                                    />
                                </div>
                                <span className="text-xs text-text-muted">{item.day}</span>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
