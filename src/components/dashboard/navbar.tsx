"use client";

import { Menu, Sun, Moon, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";
import { NotificationsDropdown } from "./notifications-dropdown";
import { UserDropdown } from "./user-dropdown";

interface NavbarProps {
    onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
    "/dashboard": "Overview",
    "/dashboard/analytics": "Analytics",
    "/dashboard/projects": "Projects",
    "/dashboard/team": "Team",
    "/dashboard/profile": "Profile",
    "/dashboard/billing": "Billing",
    "/dashboard/settings": "Settings",
};

export function Navbar({ onMenuClick }: NavbarProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const title = pageTitles[pathname] || "Dashboard";

    const breadcrumbs = pathname
        .replace("/dashboard", "")
        .split("/")
        .filter(Boolean);

    return (
        <header className="flex h-14 items-center border-b border-border-subtle bg-surface px-4 md:px-6">
            <button
                onClick={onMenuClick}
                className="mr-3 rounded-md p-1.5 text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary md:hidden"
            >
                <Menu className="h-4 w-4" />
            </button>

            <nav className="flex items-center gap-1 text-sm">
                <Link href="/dashboard" className="text-text-muted transition-colors hover:text-text-primary">
                    Dashboard
                </Link>
                {breadcrumbs.length > 0 && (
                    <>
                        <ChevronRight className="h-3 w-3 text-text-muted" />
                        <span className="font-medium text-text-primary capitalize">
                            {breadcrumbs[breadcrumbs.length - 1]}
                        </span>
                    </>
                )}
                {breadcrumbs.length === 0 && (
                    <>
                        <ChevronRight className="h-3 w-3 text-text-muted" />
                        <span className="font-medium text-text-primary">Overview</span>
                    </>
                )}
            </nav>

            <div className="ml-auto flex items-center gap-2">
                <button
                    data-tour="search"
                    onClick={() => {
                        document.dispatchEvent(
                            new KeyboardEvent("keydown", { key: "k", ctrlKey: true })
                        );
                    }}
                    className="hidden items-center gap-1.5 rounded-md border border-border-subtle bg-overlay-4 px-2.5 py-1 text-xs text-text-muted transition-colors hover:bg-overlay-6 hover:text-text-primary md:flex"
                >
                    <span>Search</span>
                    <kbd className="rounded border border-border-subtle bg-overlay-4 px-1 py-0.5 text-[10px] font-medium">
                        ⌘K
                    </kbd>
                </button>

                <button
                    data-tour="theme"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="relative rounded-md p-1.5 text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary"
                >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute left-1.5 top-1.5 h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </button>

                <div data-tour="notifications">
                    <NotificationsDropdown />
                </div>

                <UserDropdown />
            </div>
        </header>
    );
}
