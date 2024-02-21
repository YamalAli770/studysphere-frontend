import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <div className="space-y-3 bg-white rounded-lg px-6 py-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="h-[450px]" />
    </div>
  );
}

export function PostsSkeleton() {
    return (
      <>
        <div className="mb-8">
          <PostSkeleton />
        </div>
        <div className="mb-8">
          <PostSkeleton />
        </div>
        <div className="mb-8">
          <PostSkeleton />
        </div>
        <div className="mb-8">
          <PostSkeleton />
        </div>
      </>
    );
  }