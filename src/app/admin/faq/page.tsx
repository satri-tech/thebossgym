import { Skeleton, CardSkeleton, TextSkeleton } from "@/features/loading/components/loading"

export default function page() {
    return (
        <div className="p-6 space-y-6">
            <p className="text-3xl font-semibold">
                FAQ Page
            </p>
            <Skeleton variant="text" width="30%" height={40} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
            </div>
            <TextSkeleton lines={5} />
        </div>
    )
}
