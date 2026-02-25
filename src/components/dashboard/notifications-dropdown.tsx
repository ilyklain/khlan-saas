"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell } from "lucide-react";

interface Notification {
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
}

const initialNotifications: Notification[] = [
    { id: "n1", title: "Deployment successful", description: "Production build v2.4.1 deployed", time: "2 min ago", read: false },
    { id: "n2", title: "New team member", description: "Marcus Rivera joined the team", time: "18 min ago", read: false },
    { id: "n3", title: "API rate limit warning", description: "Endpoint /api/users reached 80% capacity", time: "1 hr ago", read: false },
    { id: "n4", title: "Billing processed", description: "Monthly invoice #1042 has been paid", time: "3 hr ago", read: true },
    { id: "n5", title: "SSL renewed", description: "Certificate for khlan.io auto-renewed", time: "6 hr ago", read: true },
];

export function NotificationsDropdown() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState(initialNotifications);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="relative rounded-md p-1.5 text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary"
            >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-text-primary text-[9px] font-bold text-surface">
                        {unreadCount}
                    </span>
                )}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                        className="absolute right-0 top-10 z-50 w-80 overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-2xl"
                    >
                        <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
                            <span className="text-xs font-medium text-text-primary">Notifications</span>
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllRead}
                                    className="text-[11px] text-text-muted transition-colors hover:text-text-primary"
                                >
                                    Mark all read
                                </button>
                            )}
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.map((n) => (
                                <button
                                    key={n.id}
                                    onClick={() => markAsRead(n.id)}
                                    className={`flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-overlay-2 ${!n.read ? "bg-overlay-2" : ""}`}
                                >
                                    <div className="mt-1 flex-shrink-0">
                                        <div className={`h-1.5 w-1.5 rounded-full ${!n.read ? "bg-text-primary" : "bg-transparent"}`} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-xs font-medium text-text-primary">{n.title}</div>
                                        <div className="mt-0.5 text-[11px] text-text-muted">{n.description}</div>
                                        <div className="mt-1 text-[10px] text-text-muted">{n.time}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
