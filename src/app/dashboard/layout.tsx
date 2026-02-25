"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Navbar } from "@/components/dashboard/navbar";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { ToastProvider } from "@/components/dashboard/toast";
import { OnboardingProvider } from "@/components/dashboard/onboarding";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <ToastProvider>
            <OnboardingProvider>
                <div className="flex h-screen overflow-hidden bg-surface">
                    <CommandPalette />
                    <div data-tour="sidebar">
                        <Sidebar
                            collapsed={collapsed}
                            mobileOpen={mobileOpen}
                            onToggleCollapse={() => setCollapsed((prev) => !prev)}
                            onCloseMobile={() => setMobileOpen(false)}
                            pathname={pathname}
                        />
                    </div>
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <Navbar onMenuClick={() => setMobileOpen(true)} />
                        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
                            {children}
                        </main>
                    </div>
                </div>
            </OnboardingProvider>
        </ToastProvider>
    );
}
