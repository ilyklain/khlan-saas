"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ProjectCard } from "@/components/dashboard/project-card";
import { ProjectDetail } from "@/components/dashboard/project-detail";
import { projectsData, Project } from "@/lib/mock-data";
import { SkeletonProjectCards } from "@/components/dashboard/skeleton";

export default function ProjectsPage() {
    const [query, setQuery] = useState("");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const filtered = projectsData.filter(
        (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()) ||
            p.status.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="mx-auto w-full max-w-6xl space-y-6"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                            Projects
                        </h2>
                        <p className="mt-1 text-sm text-text-muted">
                            Manage and track project progress across teams.
                        </p>
                    </div>
                    <button className="rounded-md bg-overlay-8 px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-overlay-12">
                        New Project
                    </button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full rounded-md border border-border-subtle bg-surface-secondary py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-overlay-20"
                    />
                </div>

                {loading ? (
                    <SkeletonProjectCards />
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((project) => (
                            <div key={project.id} onClick={() => setSelectedProject(project)} className="cursor-pointer">
                                <ProjectCard project={project} />
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div className="col-span-full py-12 text-center text-sm text-text-muted">
                                No projects match your search.
                            </div>
                        )}
                    </div>
                )}
            </motion.div>

            <ProjectDetail
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}
