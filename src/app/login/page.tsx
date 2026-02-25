"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useUser } from "@/context/user-context";

export default function LoginPage() {
    const { login } = useUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) return;
        setLoading(true);
        setTimeout(() => {
            login(name.trim(), email.trim(), password);
        }, 600);
    };

    return (
        <div className="flex min-h-screen bg-surface">
            <div className="relative hidden w-1/2 border-r border-border-subtle md:flex md:flex-col md:justify-between p-10">
                <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-overlay-8">
                        <svg className="h-3.5 w-3.5 text-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" />
                            <rect x="14" y="3" width="7" height="7" rx="1" />
                            <rect x="3" y="14" width="7" height="7" rx="1" />
                            <rect x="14" y="14" width="7" height="7" rx="1" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-text-primary">Khlan</span>
                </div>

                <div>
                    <blockquote className="text-sm leading-relaxed text-text-muted">
                        &ldquo;This platform has transformed how our team collaborates. The analytics
                        tools alone have saved us hundreds of hours and helped us make data-driven
                        decisions faster than ever before.&rdquo;
                    </blockquote>
                    <p className="mt-3 text-sm font-medium text-text-primary">— Sofia Davis</p>
                </div>
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex justify-between p-6 md:p-10">
                    <div className="flex items-center gap-2 md:hidden">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-overlay-8">
                            <svg className="h-3.5 w-3.5 text-text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="3" width="7" height="7" rx="1" />
                                <rect x="14" y="3" width="7" height="7" rx="1" />
                                <rect x="3" y="14" width="7" height="7" rx="1" />
                                <rect x="14" y="14" width="7" height="7" rx="1" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-text-primary">Khlan</span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center px-6 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full max-w-sm"
                    >
                        <div className="text-center">
                            <h1 className="text-xl font-semibold tracking-tight text-text-primary">
                                Create an account
                            </h1>
                            <p className="mt-2 text-sm text-text-muted">
                                Enter your details below to get started
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full rounded-md border border-border-subtle bg-surface-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-overlay-20"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full rounded-md border border-border-subtle bg-surface-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-overlay-20"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full rounded-md border border-border-subtle bg-surface-secondary px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-overlay-20"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-md bg-text-primary py-2.5 text-sm font-medium text-surface transition-opacity hover:opacity-90 disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-surface border-t-transparent" />
                                ) : (
                                    "Sign In with Email"
                                )}
                            </button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border-subtle" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-surface px-3 text-text-muted">Or continue with</span>
                            </div>
                        </div>

                        <button className="flex w-full items-center justify-center gap-2 rounded-md border border-border-subtle bg-surface-secondary py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-overlay-4">
                            <Github className="h-4 w-4" />
                            GitHub
                        </button>

                        <p className="mt-6 text-center text-[11px] leading-relaxed text-text-muted">
                            By clicking continue, you agree to our{" "}
                            <span className="underline underline-offset-2 transition-colors hover:text-text-primary cursor-pointer">
                                Terms of Service
                            </span>{" "}
                            and{" "}
                            <span className="underline underline-offset-2 transition-colors hover:text-text-primary cursor-pointer">
                                Privacy Policy
                            </span>
                            .
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
