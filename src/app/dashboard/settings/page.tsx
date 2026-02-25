"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/dashboard/toast";

interface SettingRowProps {
    label: string;
    description: string;
    children: React.ReactNode;
}

function SettingRow({ label, description, children }: SettingRowProps) {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="space-y-0.5">
                <div className="text-sm font-medium text-text-primary">{label}</div>
                <div className="text-xs text-text-muted">{description}</div>
            </div>
            {children}
        </div>
    );
}

function Toggle({ enabled: initial, onToggle }: { enabled: boolean; onToggle?: (state: boolean) => void }) {
    const [on, setOn] = useState(initial);
    return (
        <button
            onClick={() => {
                const next = !on;
                setOn(next);
                onToggle?.(next);
            }}
            className={`relative h-5 w-9 rounded-full transition-colors duration-200 ${on ? "bg-overlay-20" : "bg-overlay-6"
                }`}
        >
            <div
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-text-primary transition-transform duration-200 ${on ? "translate-x-4" : "translate-x-0.5"
                    }`}
            />
        </button>
    );
}

export default function SettingsPage() {
    const { toast } = useToast();

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-3xl space-y-6"
        >
            <div>
                <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                    Settings
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                    Manage your workspace preferences and configuration.
                </p>
            </div>

            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-0">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        General
                    </CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border-subtle">
                    <SettingRow
                        label="Workspace Name"
                        description="The display name for your workspace"
                    >
                        <span className="text-sm text-text-muted">Khlan</span>
                    </SettingRow>
                    <SettingRow
                        label="Workspace URL"
                        description="The URL slug for your workspace"
                    >
                        <span className="text-sm font-mono text-text-muted">khlan.io</span>
                    </SettingRow>
                    <SettingRow
                        label="Timezone"
                        description="Default timezone for all team members"
                    >
                        <span className="text-sm text-text-muted">UTC-5 (EST)</span>
                    </SettingRow>
                </CardContent>
            </Card>

            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-0">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        Notifications
                    </CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border-subtle">
                    <SettingRow
                        label="Email Notifications"
                        description="Receive email alerts for important events"
                    >
                        <Toggle enabled={true} onToggle={(s) => toast(s ? "Email notifications enabled" : "Email notifications disabled", "info")} />
                    </SettingRow>
                    <SettingRow
                        label="Deployment Alerts"
                        description="Get notified when a deployment completes or fails"
                    >
                        <Toggle enabled={true} onToggle={(s) => toast(s ? "Deployment alerts enabled" : "Deployment alerts disabled", "info")} />
                    </SettingRow>
                    <SettingRow
                        label="Weekly Digest"
                        description="Summary of key metrics and activity each week"
                    >
                        <Toggle enabled={false} onToggle={(s) => toast(s ? "Weekly digest enabled" : "Weekly digest disabled", "info")} />
                    </SettingRow>
                    <SettingRow
                        label="Marketing Emails"
                        description="Product updates and feature announcements"
                    >
                        <Toggle enabled={false} onToggle={(s) => toast(s ? "Marketing emails enabled" : "Marketing emails disabled", "info")} />
                    </SettingRow>
                </CardContent>
            </Card>

            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-0">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        Security
                    </CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border-subtle">
                    <SettingRow
                        label="Two-Factor Authentication"
                        description="Add an extra layer of security to your account"
                    >
                        <Toggle enabled={false} onToggle={(s) => toast(s ? "2FA enabled" : "2FA disabled", "info")} />
                    </SettingRow>
                    <SettingRow
                        label="Session Timeout"
                        description="Automatic logout after period of inactivity"
                    >
                        <span className="text-sm text-text-muted">30 minutes</span>
                    </SettingRow>
                    <SettingRow
                        label="API Keys"
                        description="Manage access tokens for API integrations"
                    >
                        <button
                            onClick={() => toast("API keys panel opened", "info")}
                            className="rounded-md bg-overlay-8 px-3 py-1 text-xs font-medium text-text-primary transition-colors hover:bg-overlay-12"
                        >
                            Manage
                        </button>
                    </SettingRow>
                </CardContent>
            </Card>

            <Separator className="bg-border-subtle" />

            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-0">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-red-400/70">
                        Danger Zone
                    </CardTitle>
                </CardHeader>
                <CardContent className="divide-y divide-border-subtle">
                    <SettingRow
                        label="Delete Workspace"
                        description="Permanently remove this workspace and all its data"
                    >
                        <button
                            onClick={() => toast("This action requires confirmation", "error")}
                            className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/20"
                        >
                            Delete
                        </button>
                    </SettingRow>
                </CardContent>
            </Card>
        </motion.div>
    );
}
