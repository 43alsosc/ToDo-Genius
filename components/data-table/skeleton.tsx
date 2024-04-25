import { Skeleton } from "../ui/skeleton";

export default function DataTableSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-5/6 w-auto rounded-xl" />
    </div>
  );
}
