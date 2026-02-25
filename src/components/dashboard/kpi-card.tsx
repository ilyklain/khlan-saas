"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { KpiItem } from "@/lib/mock-data";

function useCountUp(target: number, duration: number = 1200) {
    const [value, setValue] = useState(0);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const start = performance.now();
        const isDecimal = target % 1 !== 0;

        function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            if (isDecimal) {
                setValue(parseFloat((eased * target).toFixed(2)));
            } else {
                setValue(Math.floor(eased * target));
            }

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            }
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [target, duration]);

    return value;
}

function formatValue(value: number, prefix?: string, suffix?: string): string {
    const formatted = value >= 1000
        ? value.toLocaleString("en-US")
        : value.toString();
    return `${prefix || ""}${formatted}${suffix || ""}`;
}

interface KpiCardProps {
    item: KpiItem;
}

export function KpiCard({ item }: KpiCardProps) {
    const animatedValue = useCountUp(item.value);

    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        {item.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-semibold tracking-tight text-text-primary">
                            {formatValue(animatedValue, item.prefix, item.suffix)}
                        </span>
                        <span className="text-xs font-medium text-text-muted">
                            {item.change}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
