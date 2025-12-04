import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden h-full flex flex-col p-0 gap-0">
      {/* Image Skeleton */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-xl">
        <Skeleton className="w-full h-full" />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-12 rounded-md" />
          </div>
          <Skeleton className="h-7 w-20 rounded-md ml-auto" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="px-4 py-3 space-y-2">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4" />

        {/* Location and Stats Skeleton */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export { PropertyCardSkeleton };


