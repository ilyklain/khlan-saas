"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertTriangle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
    toast: () => { },
});

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Math.random().toString(36).slice(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const icons: Record<ToastType, React.ReactNode> = {
        success: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
        error: <AlertTriangle className="h-4 w-4 text-red-400" />,
        info: <Info className="h-4 w-4 text-blue-400" />,
    };

    return (
        <ToastContext.Provider value={{ toast: addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            layout
                            initial={{ opacity: 0, y: 16, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 80, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface px-4 py-3 shadow-2xl"
                        >
                            {icons[t.type]}
                            <span className="text-sm text-text-primary">{t.message}</span>
                            <button
                                onClick={() => removeToast(t.id)}
                                className="ml-2 text-text-muted transition-colors hover:text-text-primary"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}
