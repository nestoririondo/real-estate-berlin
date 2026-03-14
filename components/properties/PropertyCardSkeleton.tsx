import { Skeleton } from "@/components/ui/skeleton";

const PropertyCardSkeleton = () => {
  return (
    <div className="block p-3 -mx-3">
      {/* Image */}
      <Skeleton className="w-full h-64 mb-4" />

      {/* Price */}
      <Skeleton className="h-7 w-32 mb-1" />
      {/* Neighborhood · size */}
      <Skeleton className="h-4 w-28 mb-3" />
      {/* Gold divider */}
      <Skeleton className="h-px w-6 mb-3" />
      {/* Title line 1 */}
      <Skeleton className="h-5 w-full mb-1.5" />
      {/* Title line 2 */}
      <Skeleton className="h-5 w-2/3" />
    </div>
  );
};

export { PropertyCardSkeleton };
