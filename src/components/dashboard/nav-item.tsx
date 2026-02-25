"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
    href: string;
    icon: LucideIcon;
    label: string;
    active?: boolean;
    collapsed?: boolean;
}

export function NavItem({ href, icon: Icon, label, active, collapsed }: NavItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                "text-text-muted hover:text-text-primary hover:bg-overlay-4",
                active && "bg-overlay-6 text-text-primary",
                collapsed && "justify-center px-2"
            )}
        >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
        </Link>
    );
}
