"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, CreditCard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/user-context";

export function UserDropdown() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { user, logout } = useUser();

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-overlay-8 text-xs font-medium text-text-primary ring-1 ring-overlay-6 transition-all hover:ring-overlay-12"
            >
                {user?.initials || "?"}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                        className="absolute right-0 top-10 z-50 w-56 overflow-hidden rounded-lg border border-border-subtle bg-surface shadow-2xl"
                    >
                        <div className="px-4 py-3">
                            <div className="text-sm font-medium text-text-primary">{user?.name || "User"}</div>
                            <div className="text-xs text-text-muted">{user?.email || ""}</div>
                        </div>
                        <Separator className="bg-border-subtle" />
                        <div className="p-1.5">
                            <button
                                onClick={() => { router.push("/dashboard/profile"); setOpen(false); }}
                                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary"
                            >
                                <User className="h-3.5 w-3.5" />
                                Profile
                            </button>
                            <button
                                onClick={() => { router.push("/dashboard/billing"); setOpen(false); }}
                                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary"
                            >
                                <CreditCard className="h-3.5 w-3.5" />
                                Billing
                            </button>
                        </div>
                        <Separator className="bg-border-subtle" />
                        <div className="p-1.5">
                            <button
                                onClick={() => { logout(); setOpen(false); }}
                                className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-text-muted transition-colors hover:bg-overlay-4 hover:text-text-primary"
                            >
                                <LogOut className="h-3.5 w-3.5" />
                                Log out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
