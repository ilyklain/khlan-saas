"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

interface TourStep {
    target: string;
    title: string;
    description: string;
    position: "top" | "bottom" | "left" | "right";
}

const tourSteps: TourStep[] = [
    {
        target: "[data-tour='sidebar']",
        title: "Navigation",
        description: "Use the sidebar to navigate between different sections of your dashboard.",
        position: "right",
    },
    {
        target: "[data-tour='search']",
        title: "Quick Search",
        description: "Press Ctrl+K anytime to search pages, team members, and run actions.",
        position: "bottom",
    },
    {
        target: "[data-tour='notifications']",
        title: "Notifications",
        description: "Stay updated with deployment alerts, team activity, and system events.",
        position: "bottom",
    },
    {
        target: "[data-tour='theme']",
        title: "Theme Toggle",
        description: "Switch between light and dark mode to suit your preference.",
        position: "bottom",
    },
    {
        target: "[data-tour='kpi']",
        title: "Key Metrics",
        description: "Monitor your most important KPIs at a glance with real-time data.",
        position: "bottom",
    },
    {
        target: "[data-tour='chart']",
        title: "Live Chart",
        description: "Track revenue trends with a live-updating chart that refreshes automatically.",
        position: "top",
    },
];

interface OnboardingContextType {
    startTour: () => void;
    isActive: boolean;
}

const OnboardingContext = createContext<OnboardingContextType>({
    startTour: () => { },
    isActive: false,
});

export function useOnboarding() {
    return useContext(OnboardingContext);
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
    const [active, setActive] = useState(false);
    const [step, setStep] = useState(0);
    const [rect, setRect] = useState<DOMRect | null>(null);

    const positionSpotlight = useCallback(() => {
        if (!active) return;
        const currentStep = tourSteps[step];
        if (!currentStep) return;
        const el = document.querySelector(currentStep.target);
        if (el) {
            const r = el.getBoundingClientRect();
            setRect(r);
        } else {
            setRect(null);
        }
    }, [active, step]);

    useEffect(() => {
        positionSpotlight();
        window.addEventListener("resize", positionSpotlight);
        window.addEventListener("scroll", positionSpotlight, true);
        return () => {
            window.removeEventListener("resize", positionSpotlight);
            window.removeEventListener("scroll", positionSpotlight, true);
        };
    }, [positionSpotlight]);

    const startTour = useCallback(() => {
        setStep(0);
        setActive(true);
    }, []);

    useEffect(() => {
        const seen = localStorage.getItem("khlan-tour-seen");
        if (!seen) {
            localStorage.setItem("khlan-tour-seen", "true");
            const timer = setTimeout(() => {
                startTour();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [startTour]);

    const endTour = () => {
        setActive(false);
        localStorage.setItem("khlan-tour-seen", "true");
    };

    const nextStep = () => {
        if (step < tourSteps.length - 1) {
            setStep((s) => s + 1);
        } else {
            endTour();
        }
    };

    const currentStep = tourSteps[step];
    const pad = 8;

    const getTooltipPosition = (): React.CSSProperties => {
        if (!rect || !currentStep) return {};
        const pos = currentStep.position;
        const tooltipW = 288;
        const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
        const clampLeft = (ideal: number) => Math.max(16, Math.min(ideal, vw - tooltipW - 16));
        switch (pos) {
            case "right":
                return { top: rect.top, left: rect.right + 16 };
            case "left":
                return { top: rect.top, left: rect.left - tooltipW - 16 };
            case "bottom":
                return { top: rect.bottom + 16, left: clampLeft(rect.left + rect.width / 2 - tooltipW / 2) };
            case "top":
                return { top: rect.top - 160, left: clampLeft(rect.left + rect.width / 2 - tooltipW / 2) };
            default:
                return {};
        }
    };

    return (
        <OnboardingContext.Provider value={{ startTour, isActive: active }}>
            {children}
            <AnimatePresence>
                {active && rect && currentStep && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-[90]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <mask id="tour-mask">
                                        <rect width="100%" height="100%" fill="white" />
                                        <rect
                                            x={rect.left - pad}
                                            y={rect.top - pad}
                                            width={rect.width + pad * 2}
                                            height={rect.height + pad * 2}
                                            rx="8"
                                            fill="black"
                                        />
                                    </mask>
                                </defs>
                                <rect
                                    width="100%"
                                    height="100%"
                                    fill="rgba(0,0,0,0.6)"
                                    mask="url(#tour-mask)"
                                />
                            </svg>
                        </motion.div>

                        <motion.div
                            className="fixed z-[91] rounded-lg border border-overlay-20 ring-2 ring-overlay-12"
                            style={{
                                left: rect.left - pad,
                                top: rect.top - pad,
                                width: rect.width + pad * 2,
                                height: rect.height + pad * 2,
                            }}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />

                        <motion.div
                            className="fixed z-[92] w-72 rounded-lg border border-border-subtle bg-surface p-4 shadow-2xl"
                            style={getTooltipPosition()}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            key={step}
                        >
                            <div className="flex items-start justify-between">
                                <h4 className="text-sm font-semibold text-text-primary">
                                    {currentStep.title}
                                </h4>
                                <button
                                    onClick={endTour}
                                    className="text-text-muted transition-colors hover:text-text-primary"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                                {currentStep.description}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-[10px] tabular-nums text-text-muted">
                                    {step + 1} / {tourSteps.length}
                                </span>
                                <button
                                    onClick={nextStep}
                                    className="flex items-center gap-1 rounded-md bg-text-primary px-3 py-1.5 text-xs font-medium text-surface transition-opacity hover:opacity-90"
                                >
                                    {step < tourSteps.length - 1 ? "Next" : "Done"}
                                    {step < tourSteps.length - 1 && <ChevronRight className="h-3 w-3" />}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </OnboardingContext.Provider>
    );
}
