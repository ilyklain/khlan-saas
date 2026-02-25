"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff, RotateCcw } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ChartPlaceholder } from "@/components/dashboard/chart-placeholder";
import { ActivityTable } from "@/components/dashboard/activity-table";
import { kpiData, activityData, chartData } from "@/lib/mock-data";
import { SkeletonKpiCards, SkeletonChart, SkeletonTable } from "@/components/dashboard/skeleton";
import { useToast } from "@/components/dashboard/toast";

interface WidgetConfig {
    id: string;
    label: string;
    visible: boolean;
}

const defaultWidgets: WidgetConfig[] = [
    { id: "kpi", label: "KPI Cards", visible: true },
    { id: "chart", label: "Revenue Chart", visible: true },
    { id: "activity", label: "Activity Feed", visible: true },
];

const STORAGE_KEY = "khlan-widget-order";

function SortableWidget({
    config,
    children,
    onToggle,
}: {
    config: WidgetConfig;
    children: React.ReactNode;
    onToggle: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: config.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`group relative ${isDragging ? "z-10 opacity-70" : ""} ${!config.visible ? "opacity-40" : ""}`}
        >
            <div className="absolute -left-10 top-3 hidden items-center gap-1 md:flex">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab rounded p-0.5 text-text-muted opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing"
                >
                    <GripVertical className="h-3.5 w-3.5" />
                </button>
                <button
                    onClick={onToggle}
                    className="rounded p-0.5 text-text-muted opacity-0 transition-opacity hover:text-text-primary group-hover:opacity-100"
                >
                    {config.visible ? (
                        <Eye className="h-3.5 w-3.5" />
                    ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>
            {config.visible && children}
        </div>
    );
}

export default function DashboardPage() {
    const [widgets, setWidgets] = useState<WidgetConfig[]>(defaultWidgets);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setWidgets(JSON.parse(saved));
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const persist = useCallback(
        (updated: WidgetConfig[]) => {
            setWidgets(updated);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        },
        []
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = widgets.findIndex((w) => w.id === active.id);
        const newIndex = widgets.findIndex((w) => w.id === over.id);
        const reordered = arrayMove(widgets, oldIndex, newIndex);
        persist(reordered);
        toast("Widget order updated");
    };

    const toggleVisibility = (id: string) => {
        const updated = widgets.map((w) =>
            w.id === id ? { ...w, visible: !w.visible } : w
        );
        persist(updated);
        const widget = updated.find((w) => w.id === id);
        toast(
            widget?.visible ? `${widget.label} shown` : `${widget?.label} hidden`,
            "info"
        );
    };

    const resetLayout = () => {
        persist(defaultWidgets);
        toast("Layout reset to default");
    };

    const renderWidget = (id: string) => {
        switch (id) {
            case "kpi":
                return loading ? (
                    <SkeletonKpiCards />
                ) : (
                    <div data-tour="kpi" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {kpiData.map((item) => (
                            <KpiCard key={item.title} item={item} />
                        ))}
                    </div>
                );
            case "chart":
                return loading ? (
                    <SkeletonChart />
                ) : (
                    <div data-tour="chart">
                        <ChartPlaceholder data={chartData} />
                    </div>
                );
            case "activity":
                return loading ? (
                    <SkeletonTable />
                ) : (
                    <ActivityTable data={activityData} />
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-6xl space-y-6"
        >
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                        Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-text-muted">
                        Platform performance and recent activity.
                    </p>
                </div>
                <button
                    onClick={resetLayout}
                    className="hidden items-center gap-1.5 rounded-md border border-border-subtle px-2.5 py-1.5 text-xs text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary md:flex"
                >
                    <RotateCcw className="h-3 w-3" />
                    Reset Layout
                </button>
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={widgets.map((w) => w.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-6 pl-0 md:pl-10">
                        {widgets.map((widget) => (
                            <SortableWidget
                                key={widget.id}
                                config={widget}
                                onToggle={() => toggleVisibility(widget.id)}
                            >
                                {renderWidget(widget.id)}
                            </SortableWidget>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </motion.div>
    );
}
