"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6">
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2">
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: "conic-gradient(from 220deg at 50% 50%, #f43f5e 0deg, #ec4899 60deg, #8b5cf6 120deg, #3b82f6 180deg, #06b6d4 240deg, #10b981 300deg, #f43f5e 360deg)",
                        opacity: 0.08,
                        filter: "blur(100px)",
                    }}
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center text-center"
            >
                <div className="relative">
                    <span className="text-[10rem] font-bold leading-none tracking-tighter text-white/[0.04] sm:text-[14rem]">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1
                            className="text-[4rem] font-bold tracking-tight sm:text-[5rem]"
                            style={{
                                background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.2) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Lost?
                        </h1>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="-mt-4 max-w-sm text-[15px] leading-relaxed text-white/35"
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.4 }}
                    className="mt-8 flex items-center gap-4"
                >
                    <Link
                        href="/"
                        className="group flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
                    >
                        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
                        Back to Khlan
                    </Link>
                    <Link
                        href="/dashboard"
                        className="rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-2 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
                    >
                        Dashboard
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute bottom-8 z-10"
            >
                <span className="text-xs text-white/15">khlan.io</span>
            </motion.div>
        </div>
    );
}
