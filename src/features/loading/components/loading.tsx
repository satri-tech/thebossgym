import { cn } from "@/core/lib/utils";

interface SkeletonProps {
    variant?: "text" | "circular" | "rectangular" | "card" | "avatar" | "button";
    width?: string | number;
    height?: string | number;
    className?: string;
    count?: number;
    rounded?: "none" | "sm" | "md" | "lg" | "full";
    animate?: boolean;
}

const variantStyles = {
    text: "h-4 w-full rounded",
    circular: "rounded-full",
    rectangular: "rounded-md",
    card: "h-48 w-full rounded-lg",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24 rounded-md",
};

const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
};

export function Skeleton({
    variant = "rectangular",
    width,
    height,
    className,
    count = 1,
    rounded,
    animate = true,
}: SkeletonProps) {
    const baseStyles = "bg-muted";
    const animationStyles = animate ? "animate-pulse" : "";
    const variantStyle = variantStyles[variant];
    const roundedStyle = rounded ? roundedStyles[rounded] : "";

    const style: React.CSSProperties = {
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    };

    if (count === 1) {
        return (
            <div
                className={cn(baseStyles, animationStyles, variantStyle, roundedStyle, className)}
                style={style}
            />
        );
    }

    return (
        <div className="space-y-2">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={cn(baseStyles, animationStyles, variantStyle, roundedStyle, className)}
                    style={style}
                />
            ))}
        </div>
    );
}

// Preset skeleton components for common use cases
export function TextSkeleton({ lines = 3, className }: { lines?: number; className?: string }) {
    return <Skeleton variant="text" count={lines} className={className} />;
}

export function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("space-y-3 p-4 border rounded-lg", className)}>
            <Skeleton variant="rectangular" height={200} />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="40%" />
        </div>
    );
}

export function AvatarSkeleton({ className }: { className?: string }) {
    return <Skeleton variant="avatar" className={className} />;
}

export function ButtonSkeleton({ className }: { className?: string }) {
    return <Skeleton variant="button" className={className} />;
}

export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-4">
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <Skeleton key={colIndex} variant="text" className="flex-1" />
                    ))}
                </div>
            ))}
        </div>
    );
}

export function ProfileSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-4", className)}>
            <Skeleton variant="circular" width={64} height={64} />
            <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="60%" />
            </div>
        </div>
    );
}

export function ListSkeleton({ items = 5, className }: { items?: number; className?: string }) {
    return (
        <div className={cn("space-y-3", className)}>
            {Array.from({ length: items }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                    <Skeleton variant="circular" width={40} height={40} />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="text" width="70%" />
                        <Skeleton variant="text" width="50%" />
                    </div>
                </div>
            ))}
        </div>
    );
}
