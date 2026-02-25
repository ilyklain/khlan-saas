"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    BarChart3,
    FolderKanban,
    Users,
    Settings,
    Search,
    ArrowRight,
    UserCircle,
    CreditCard,
    Play,
} from "lucide-react";
import { useOnboarding } from "./onboarding";

interface CommandItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    category: string;
}

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { startTour } = useOnboarding();

    const items: CommandItem[] = [
        { id: "nav-overview", label: "Go to Overview", icon: <LayoutDashboard className="h-4 w-4" />, action: () => router.push("/dashboard"), category: "Navigation" },
        { id: "nav-analytics", label: "Go to Analytics", icon: <BarChart3 className="h-4 w-4" />, action: () => router.push("/dashboard/analytics"), category: "Navigation" },
        { id: "nav-projects", label: "Go to Projects", icon: <FolderKanban className="h-4 w-4" />, action: () => router.push("/dashboard/projects"), category: "Navigation" },
        { id: "nav-team", label: "Go to Team", icon: <Users className="h-4 w-4" />, action: () => router.push("/dashboard/team"), category: "Navigation" },
        { id: "nav-profile", label: "Go to Profile", icon: <UserCircle className="h-4 w-4" />, action: () => router.push("/dashboard/profile"), category: "Navigation" },
        { id: "nav-billing", label: "Go to Billing", icon: <CreditCard className="h-4 w-4" />, action: () => router.push("/dashboard/billing"), category: "Navigation" },
        { id: "nav-settings", label: "Go to Settings", icon: <Settings className="h-4 w-4" />, action: () => router.push("/dashboard/settings"), category: "Navigation" },
        { id: "search-sarah", label: "Sarah Chen", icon: <Users className="h-4 w-4" />, action: () => router.push("/dashboard/team"), category: "Team" },
        { id: "search-marcus", label: "Marcus Rivera", icon: <Users className="h-4 w-4" />, action: () => router.push("/dashboard/team"), category: "Team" },
        { id: "search-alex", label: "Alex Kim", icon: <Users className="h-4 w-4" />, action: () => router.push("/dashboard/team"), category: "Team" },
        { id: "search-priya", label: "Priya Patel", icon: <Users className="h-4 w-4" />, action: () => router.push("/dashboard/team"), category: "Team" },
        { id: "action-new-project", label: "Create New Project", icon: <FolderKanban className="h-4 w-4" />, action: () => router.push("/dashboard/projects"), category: "Actions" },
        { id: "action-invite", label: "Invite Team Member", icon: <Users className="h-4 w-4" />, action: () => router.push("/dashboard/team"), category: "Actions" },
        { id: "action-tour", label: "Restart Onboarding Tour", icon: <Play className="h-4 w-4" />, action: () => { startTour(); }, category: "Actions" },
    ];

    const filtered = query.length === 0
        ? items
        : items.filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
        );

    const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    const flatFiltered = Object.values(grouped).flat();

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
                setQuery("");
                setSelectedIndex(0);
            }
            if (!open) return;
            if (e.key === "Escape") {
                setOpen(false);
            }
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.min(prev + 1, flatFiltered.length - 1));
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex((prev) => Math.max(prev - 1, 0));
            }
            if (e.key === "Enter" && flatFiltered[selectedIndex]) {
                flatFiltered[selectedIndex].action();
                setOpen(false);
            }
        },
        [open, flatFiltered, selectedIndex]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [open]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    let globalIndex = -1;

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/60"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setOpen(false)}
                    />
                    <motion.div
                        className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2"
                        initial={{ opacity: 0, scale: 0.96, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -8 }}
                        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-2xl">
                            <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
                                <Search className="h-4 w-4 text-text-muted" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Type a command or search..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
                                />
                                <kbd className="rounded border border-border-subtle bg-overlay-4 px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
                                    ESC
                                </kbd>
                            </div>
                            <div className="max-h-72 overflow-y-auto p-2">
                                {flatFiltered.length === 0 && (
                                    <div className="py-8 text-center text-sm text-text-muted">
                                        No results found.
                                    </div>
                                )}
                                {Object.entries(grouped).map(([category, categoryItems]) => (
                                    <div key={category}>
                                        <div className="px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                                            {category}
                                        </div>
                                        {categoryItems.map((item) => {
                                            globalIndex++;
                                            const isSelected = globalIndex === selectedIndex;
                                            const currentIndex = globalIndex;
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => {
                                                        item.action();
                                                        setOpen(false);
                                                    }}
                                                    onMouseEnter={() => setSelectedIndex(currentIndex)}
                                                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${isSelected
                                                        ? "bg-overlay-6 text-text-primary"
                                                        : "text-text-muted hover:bg-overlay-4"
                                                        }`}
                                                >
                                                    {item.icon}
                                                    <span className="flex-1 text-left">{item.label}</span>
                                                    {isSelected && <ArrowRight className="h-3 w-3 text-text-muted" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
