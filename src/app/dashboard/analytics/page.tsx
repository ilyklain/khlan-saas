"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartPlaceholder } from "@/components/dashboard/chart-placeholder";
import { BarChart } from "@/components/dashboard/bar-chart";
import { TrafficTable } from "@/components/dashboard/traffic-table";
import { TopPagesTable } from "@/components/dashboard/top-pages-table";
import {
    analyticsKpiData,
    pageViewsOverTime,
    weeklyVisitors,
    trafficSources,
    topPages,
} from "@/lib/mock-data";
import { SkeletonKpiCards, SkeletonChart, SkeletonTable } from "@/components/dashboard/skeleton";

export default function AnalyticsPage() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-6xl space-y-6"
        >
            <div>
                <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                    Analytics
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                    Traffic, engagement, and content performance.
                </p>
            </div>

            {loading ? (
                <>
                    <SkeletonKpiCards />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <SkeletonChart />
                        <SkeletonChart />
                    </div>
                    <SkeletonTable />
                    <SkeletonTable />
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {analyticsKpiData.map((item) => (
                            <KpiCard key={item.title} item={item} />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <ChartPlaceholder data={pageViewsOverTime} />
                        <BarChart data={weeklyVisitors} />
                    </div>

                    <TrafficTable data={trafficSources} />

                    <TopPagesTable data={topPages} />
                </>
            )}
        </motion.div>
    );
}
