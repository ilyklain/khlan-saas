"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    BarChart3,
    FolderKanban,
    Users,
    Settings,
    ChevronsLeft,
    X,
    UserCircle,
    CreditCard,
} from "lucide-react";
import { NavItem } from "./nav-item";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
    collapsed: boolean;
    mobileOpen: boolean;
    onToggleCollapse: () => void;
    onCloseMobile: () => void;
    pathname: string;
}

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/projects", icon: FolderKanban, label: "Projects" },
    { href: "/dashboard/team", icon: Users, label: "Team" },
    { href: "/dashboard/profile", icon: UserCircle, label: "Profile" },
    { href: "/dashboard/billing", icon: CreditCard, label: "Billing" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar({
    collapsed,
    mobileOpen,
    onToggleCollapse,
    onCloseMobile,
    pathname,
}: SidebarProps) {
    const sidebarContent = (
        <div className="flex h-full flex-col">
            <div className="flex h-14 items-center justify-between px-4">
                {!collapsed && (
                    <span className="text-sm font-semibold tracking-tight text-text-primary">
                        Khlan
                    </span>
                )}
                <button
                    onClick={onToggleCollapse}
                    className="hidden rounded-md p-1.5 text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary md:flex"
                >
                    <motion.div
                        animate={{ rotate: collapsed ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </motion.div>
                </button>
                <button
                    onClick={onCloseMobile}
                    className="rounded-md p-1.5 text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary md:hidden"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
            <Separator className="bg-border-subtle" />
            <nav className="flex-1 space-y-1 px-2 py-3">
                {navItems.map((item) => (
                    <NavItem
                        key={item.href}
                        href={item.href}
                        icon={item.icon}
                        label={item.label}
                        active={pathname === item.href}
                        collapsed={collapsed}
                    />
                ))}
            </nav>
        </div>
    );

    return (
        <>
            <motion.aside
                className="hidden border-r border-border-subtle bg-surface md:flex md:flex-col"
                animate={{ width: collapsed ? 64 : 240 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {sidebarContent}
            </motion.aside>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/60 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={onCloseMobile}
                        />
                        <motion.aside
                            className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border-subtle bg-surface md:hidden"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {sidebarContent}
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
