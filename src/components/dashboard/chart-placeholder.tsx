"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { chartData as ChartDataType } from "@/lib/mock-data";

interface ChartPlaceholderProps {
    data: typeof ChartDataType;
}

export function ChartPlaceholder({ data: initialData }: ChartPlaceholderProps) {
    const [data, setData] = useState(initialData);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setData((prev) =>
                prev.map((point) => ({
                    ...point,
                    y: Math.max(
                        point.y * 0.7,
                        Math.min(
                            point.y * 1.3,
                            point.y + (Math.random() - 0.5) * point.y * 0.08
                        )
                    ),
                }))
            );
        }, 3000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const width = 800;
    const height = 200;
    const padding = 24;

    const maxY = Math.max(...data.map((d) => d.y));
    const minY = Math.min(...data.map((d) => d.y));
    const range = maxY - minY || 1;

    const points = data
        .map((d, i) => {
            const x = padding + (i / (data.length - 1)) * (width - padding * 2);
            const y = height - padding - ((d.y - minY) / range) * (height - padding * 2);
            return `${x},${y}`;
        })
        .join(" ");

    const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

    return (
        <Card className="border-border-subtle bg-surface-secondary">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        Revenue Over Time
                    </CardTitle>
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-text-muted opacity-40" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-text-muted" />
                        </span>
                        <span className="text-[10px] text-text-muted">Live</span>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="h-48 w-full"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" className="[stop-color:var(--chart-fill)]" stopOpacity="0.06" />
                            <stop offset="100%" className="[stop-color:var(--chart-fill)]" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                        const y = height - padding - ratio * (height - padding * 2);
                        return (
                            <line
                                key={ratio}
                                x1={padding}
                                y1={y}
                                x2={width - padding}
                                y2={y}
                                className="stroke-border-subtle"
                                strokeWidth="1"
                            />
                        );
                    })}
                    <polygon points={areaPoints} fill="url(#area-fill)">
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                    </polygon>
                    <polyline
                        points={points}
                        fill="none"
                        className="stroke-chart-stroke"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transition: "all 0.8s ease-out" }}
                    />
                    {data.map((d, i) => {
                        const x = padding + (i / (data.length - 1)) * (width - padding * 2);
                        const y = height - padding - ((d.y - minY) / range) * (height - padding * 2);
                        return (
                            <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="2.5"
                                className="fill-chart-dot stroke-chart-stroke"
                                strokeWidth="1.5"
                                style={{ transition: "all 0.8s ease-out" }}
                            />
                        );
                    })}
                </svg>
            </CardContent>
        </Card>
    );
}
