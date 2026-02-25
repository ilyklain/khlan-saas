"use client";

export function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`animate-pulse rounded-md bg-overlay-6 ${className}`} />
    );
}

export function SkeletonKpiCards() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border-subtle bg-surface-secondary p-5">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="mt-3 h-7 w-28" />
                    <Skeleton className="mt-2 h-3 w-14" />
                </div>
            ))}
        </div>
    );
}

export function SkeletonChart() {
    return (
        <div className="rounded-lg border border-border-subtle bg-surface-secondary p-5">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="mt-4 h-48 w-full" />
        </div>
    );
}

export function SkeletonTable() {
    return (
        <div className="rounded-lg border border-border-subtle bg-surface-secondary">
            <div className="border-b border-border-subtle px-6 py-4">
                <Skeleton className="h-3 w-24" />
            </div>
            <div className="divide-y divide-border-subtle">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 px-6 py-3">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="ml-auto h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function SkeletonProjectCards() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border-subtle bg-surface-secondary p-5">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                    <Skeleton className="mt-3 h-3 w-full" />
                    <Skeleton className="mt-4 h-1.5 w-full rounded-full" />
                    <div className="mt-3 flex items-center justify-between">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function SkeletonProfile() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <div className="rounded-lg border border-border-subtle bg-surface-secondary p-6">
                <div className="flex items-center gap-5">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-3 w-64" />
                        <div className="flex gap-4 pt-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-28" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 border-b border-border-subtle pb-0">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-border-subtle bg-surface-secondary p-5 text-center">
                        <Skeleton className="mx-auto h-7 w-12" />
                        <Skeleton className="mx-auto mt-2 h-3 w-20" />
                    </div>
                ))}
            </div>
        </div>
    );
}
