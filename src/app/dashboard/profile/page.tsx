"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Calendar, Link as LinkIcon, Building, Shield } from "lucide-react";
import { useUser } from "@/context/user-context";
import { useToast } from "@/components/dashboard/toast";

const recentActivity = [
    { action: "Pushed 3 commits to", target: "platform-redesign", time: "2 hours ago" },
    { action: "Approved PR #412 in", target: "api-v3-migration", time: "4 hours ago" },
    { action: "Created issue #89 in", target: "search-infrastructure", time: "6 hours ago" },
    { action: "Merged PR #408 in", target: "billing-system", time: "1 day ago" },
    { action: "Commented on issue #76 in", target: "documentation-portal", time: "2 days ago" },
];

const sessions = [
    { device: "MacBook Pro — Chrome", location: "San Francisco, CA", current: true },
    { device: "iPhone 15 — Safari", location: "San Francisco, CA", current: false },
];

const stats = {
    projects: 8,
    commits: 1247,
    reviews: 342,
};

export default function ProfilePage() {
    const { user } = useUser();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"overview" | "activity" | "security">("overview");

    const tabs = [
        { id: "overview" as const, label: "Overview" },
        { id: "activity" as const, label: "Activity" },
        { id: "security" as const, label: "Security" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-4xl space-y-6"
        >
            <Card className="border-border-subtle bg-surface-secondary">
                <CardContent className="p-6">
                    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-overlay-8 text-lg font-semibold text-text-primary ring-2 ring-overlay-6">
                            {user?.initials || "?"}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                                {user?.name || "User"}
                            </h2>
                            <p className="mt-0.5 text-sm text-text-muted">
                                Full-stack engineer focused on building scalable infrastructure and developer tools.
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
                                <span className="flex items-center gap-1.5">
                                    <Building className="h-3 w-3" />
                                    Engineering Lead
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="h-3 w-3" />
                                    San Francisco, CA
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3 w-3" />
                                    Joined January 2024
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <LinkIcon className="h-3 w-3" />
                                    khlan.io
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => toast("Profile updated successfully")}
                            className="rounded-md bg-overlay-8 px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-overlay-12"
                        >
                            Edit Profile
                        </button>
                    </div>
                </CardContent>
            </Card>

            <div className="flex gap-1 border-b border-border-subtle">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative px-4 py-2 text-sm font-medium transition-colors ${activeTab === tab.id
                            ? "text-text-primary"
                            : "text-text-muted hover:text-text-primary"
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="profile-tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-px bg-text-primary"
                                transition={{ duration: 0.2, ease: "easeOut" }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {activeTab === "overview" && (
                <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-1 gap-4 md:grid-cols-3"
                >
                    <Card className="border-border-subtle bg-surface-secondary">
                        <CardContent className="p-5 text-center">
                            <div className="text-2xl font-semibold tabular-nums text-text-primary">
                                {stats.projects}
                            </div>
                            <div className="mt-1 text-xs text-text-muted">Active Projects</div>
                        </CardContent>
                    </Card>
                    <Card className="border-border-subtle bg-surface-secondary">
                        <CardContent className="p-5 text-center">
                            <div className="text-2xl font-semibold tabular-nums text-text-primary">
                                {stats.commits.toLocaleString()}
                            </div>
                            <div className="mt-1 text-xs text-text-muted">Total Commits</div>
                        </CardContent>
                    </Card>
                    <Card className="border-border-subtle bg-surface-secondary">
                        <CardContent className="p-5 text-center">
                            <div className="text-2xl font-semibold tabular-nums text-text-primary">
                                {stats.reviews}
                            </div>
                            <div className="mt-1 text-xs text-text-muted">Code Reviews</div>
                        </CardContent>
                    </Card>

                    <Card className="border-border-subtle bg-surface-secondary md:col-span-3">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <Mail className="h-3.5 w-3.5" />
                                    Email
                                </div>
                                <span className="text-sm text-text-primary">{user?.email || "—"}</span>
                            </div>
                            <Separator className="bg-border-subtle" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <Building className="h-3.5 w-3.5" />
                                    Department
                                </div>
                                <span className="text-sm text-text-primary">Engineering</span>
                            </div>
                            <Separator className="bg-border-subtle" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Location
                                </div>
                                <span className="text-sm text-text-primary">San Francisco, CA</span>
                            </div>
                            <Separator className="bg-border-subtle" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-text-muted">
                                    <LinkIcon className="h-3.5 w-3.5" />
                                    Website
                                </div>
                                <span className="text-sm text-text-primary">khlan.io</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {activeTab === "activity" && (
                <motion.div
                    key="activity"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <Card className="border-border-subtle bg-surface-secondary">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-0">
                            {recentActivity.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 py-3">
                                    <div className="mt-1.5 flex-shrink-0">
                                        <div className="h-1.5 w-1.5 rounded-full bg-overlay-20" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm text-text-primary">
                                            {item.action}{" "}
                                            <span className="font-medium">{item.target}</span>
                                        </p>
                                        <p className="mt-0.5 text-xs text-text-muted">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {activeTab === "security" && (
                <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                >
                    <Card className="border-border-subtle bg-surface-secondary">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                                Two-Factor Authentication
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-overlay-6">
                                        <Shield className="h-4 w-4 text-text-muted" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-text-primary">
                                            Authenticator App
                                        </div>
                                        <div className="text-xs text-text-muted">
                                            Not configured
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toast("2FA enabled successfully")}
                                    className="rounded-md bg-overlay-8 px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-overlay-12"
                                >
                                    Enable
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border-subtle bg-surface-secondary">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                                Active Sessions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-0 divide-y divide-border-subtle">
                            {sessions.map((session, i) => (
                                <div key={i} className="flex items-center justify-between py-3">
                                    <div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                                            {session.device}
                                            {session.current && (
                                                <span className="rounded bg-overlay-8 px-1.5 py-0.5 text-[10px] font-medium text-text-muted">
                                                    Current
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-0.5 text-xs text-text-muted">
                                            {session.location}
                                        </div>
                                    </div>
                                    {!session.current && (
                                        <button
                                            onClick={() => toast("Session revoked", "info")}
                                            className="text-xs text-text-muted transition-colors hover:text-text-primary"
                                        >
                                            Revoke
                                        </button>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-border-subtle bg-surface-secondary">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                                Password
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm text-text-primary">
                                        ••••••••••••
                                    </div>
                                    <div className="text-xs text-text-muted">
                                        Last changed 3 months ago
                                    </div>
                                </div>
                                <button
                                    onClick={() => toast("Password updated successfully")}
                                    className="rounded-md bg-overlay-8 px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:bg-overlay-12"
                                >
                                    Change
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </motion.div>
    );
}
