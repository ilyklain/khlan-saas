"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import type { Project } from "@/lib/mock-data";

interface ProjectCardProps {
    project: Project;
}

const statusStyles: Record<Project["status"], string> = {
    Active: "text-text-primary",
    Paused: "text-text-muted",
    Completed: "text-text-muted",
    Draft: "text-text-muted",
};

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-sm font-medium text-text-primary">
                            {project.name}
                        </CardTitle>
                        <span className={`text-xs font-medium ${statusStyles[project.status]}`}>
                            {project.status}
                        </span>
                    </div>
                    <p className="text-xs text-text-muted">{project.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-text-muted">Progress</span>
                            <span className="text-xs tabular-nums text-text-muted">
                                {project.progress}%
                            </span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-overlay-6">
                            <div
                                className="h-full rounded-full bg-overlay-20 transition-all duration-300"
                                style={{ width: `${project.progress}%` }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-muted">
                        <div className="flex items-center gap-1.5">
                            <Users className="h-3 w-3" />
                            <span>{project.members}</span>
                        </div>
                        <span>{project.lastUpdated}</span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
