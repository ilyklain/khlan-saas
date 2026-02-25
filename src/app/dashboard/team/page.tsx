"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamData, TeamMember } from "@/lib/mock-data";
import { useToast } from "@/components/dashboard/toast";

type SortKey = "name" | "role" | "department" | "lastActive";
type SortDir = "asc" | "desc";

export default function TeamPage() {
    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState<SortKey>("name");
    const [sortDir, setSortDir] = useState<SortDir>("asc");
    const { toast } = useToast();

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
        if (sortKey !== columnKey) return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-40" />;
        return sortDir === "asc"
            ? <ArrowUp className="ml-1 inline h-3 w-3" />
            : <ArrowDown className="ml-1 inline h-3 w-3" />;
    };

    const filtered = useMemo(() => {
        let result = teamData.filter(
            (m) =>
                m.name.toLowerCase().includes(query.toLowerCase()) ||
                m.email.toLowerCase().includes(query.toLowerCase()) ||
                m.role.toLowerCase().includes(query.toLowerCase()) ||
                m.department.toLowerCase().includes(query.toLowerCase())
        );

        result.sort((a, b) => {
            const valA = a[sortKey].toLowerCase();
            const valB = b[sortKey].toLowerCase();
            const cmp = valA.localeCompare(valB);
            return sortDir === "asc" ? cmp : -cmp;
        });

        return result;
    }, [query, sortKey, sortDir]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto w-full max-w-6xl space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                        Team
                    </h2>
                    <p className="mt-1 text-sm text-text-muted">
                        Manage team members and their roles.
                    </p>
                </div>
                <button
                    onClick={() => toast("Invite link copied to clipboard", "info")}
                    className="rounded-md bg-overlay-8 px-3 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-overlay-12"
                >
                    Invite Member
                </button>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                    type="text"
                    placeholder="Search by name, email, role, or department..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-md border border-border-subtle bg-surface-secondary py-2 pl-9 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-overlay-20"
                />
            </div>

            <Card className="border-border-subtle bg-surface-secondary">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium uppercase tracking-wider text-text-muted">
                        All Members · {filtered.length}
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border-subtle hover:bg-transparent">
                                <TableHead
                                    className="h-9 cursor-pointer select-none px-6 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                                    onClick={() => handleSort("name")}
                                >
                                    Name <SortIcon columnKey="name" />
                                </TableHead>
                                <TableHead
                                    className="h-9 cursor-pointer select-none px-6 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                                    onClick={() => handleSort("role")}
                                >
                                    Role <SortIcon columnKey="role" />
                                </TableHead>
                                <TableHead
                                    className="h-9 cursor-pointer select-none px-6 text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                                    onClick={() => handleSort("department")}
                                >
                                    Department <SortIcon columnKey="department" />
                                </TableHead>
                                <TableHead
                                    className="h-9 cursor-pointer select-none px-6 text-right text-xs font-medium text-text-muted transition-colors hover:text-text-primary"
                                    onClick={() => handleSort("lastActive")}
                                >
                                    Last Active <SortIcon columnKey="lastActive" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((member) => (
                                <TableRow
                                    key={member.id}
                                    className="border-border-subtle transition-colors duration-150 hover:bg-overlay-2"
                                >
                                    <TableCell className="px-6 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-overlay-8 text-xs font-medium text-text-primary ring-1 ring-overlay-6">
                                                {member.name.split(" ").map((n) => n[0]).join("")}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-text-primary">
                                                    {member.name}
                                                </div>
                                                <div className="text-xs text-text-muted">
                                                    {member.email}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-6 py-3 text-sm text-text-muted">
                                        {member.role}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 text-sm text-text-muted">
                                        {member.department}
                                    </TableCell>
                                    <TableCell className="px-6 py-3 text-right text-sm text-text-muted">
                                        {member.lastActive}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="py-12 text-center text-sm text-text-muted">
                                        No members match your search.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </motion.div>
    );
}
