import { Skeleton } from "../ui/skeleton";

export default function DataTableSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[535px] w-[992px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-[22px] w-[250px]" />
        <Skeleton className="h-[22px] w-[200px]" />
      </div>
    </div>
  );
}
