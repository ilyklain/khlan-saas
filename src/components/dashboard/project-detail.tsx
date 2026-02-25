"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/lib/mock-data";

interface ProjectDetailProps {
    project: Project | null;
    onClose: () => void;
}

const mockTasks = [
    { name: "Design system audit", done: true },
    { name: "Component library migration", done: true },
    { name: "API integration layer", done: false },
    { name: "Performance benchmarking", done: false },
    { name: "User acceptance testing", done: false },
];

export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {project && (
                <>
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />
                    <motion.div
                        ref={panelRef}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-border-subtle bg-surface shadow-2xl"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="flex h-full flex-col overflow-y-auto">
                            <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
                                <h3 className="text-sm font-semibold text-text-primary">{project.name}</h3>
                                <button
                                    onClick={onClose}
                                    className="rounded-md p-1 text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-6 p-6">
                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wider text-text-muted">Description</div>
                                    <p className="mt-2 text-sm text-text-primary">{project.description}</p>
                                </div>

                                <Separator className="bg-border-subtle" />

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs text-text-muted">Status</div>
                                        <div className="mt-1 text-sm font-medium text-text-primary">{project.status}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-text-muted">Progress</div>
                                        <div className="mt-1 text-sm font-medium text-text-primary">{project.progress}%</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-text-muted">Team Members</div>
                                        <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-text-primary">
                                            <Users className="h-3.5 w-3.5 text-text-muted" />
                                            {project.members}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-text-muted">Last Updated</div>
                                        <div className="mt-1 text-sm font-medium text-text-primary">{project.lastUpdated}</div>
                                    </div>
                                </div>

                                <Separator className="bg-border-subtle" />

                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wider text-text-muted">Progress</div>
                                    <div className="mt-3 space-y-1.5">
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-overlay-6">
                                            <div
                                                className="h-full rounded-full bg-overlay-30 transition-all duration-500"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <Separator className="bg-border-subtle" />

                                <div>
                                    <div className="text-xs font-medium uppercase tracking-wider text-text-muted">Tasks</div>
                                    <div className="mt-3 space-y-2">
                                        {mockTasks.map((task) => (
                                            <div key={task.name} className="flex items-center gap-3">
                                                <div className={`h-3.5 w-3.5 rounded border ${task.done ? "border-overlay-30 bg-overlay-20" : "border-border-subtle"} flex items-center justify-center`}>
                                                    {task.done && (
                                                        <svg className="h-2 w-2 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <span className={`text-sm ${task.done ? "text-text-muted line-through" : "text-text-primary"}`}>
                                                    {task.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
