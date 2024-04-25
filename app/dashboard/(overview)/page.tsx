import { CollapsedSideNav } from "@/components/side-nav";
import { Tabs } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table-shadcn/data-table";
import { columns } from "@/components/data-table-shadcn/columns";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CookieBanner from "@/components/CookieBanner";
import { Suspense } from "react";
import DataTableSkeleton from "@/components/data-table-shadcn/skeleton";
import getData from "@/api/fetch/getDataTableData";

export default async function page({}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const data = await getData();

  return (
    <div className="w-4/5 " id="root">
      <div>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b justify-between bg-background px-4 py-3 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <CollapsedSideNav />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
          <div className="pt-8">
            <Suspense fallback={<DataTableSkeleton />}>
              <DataTable columns={columns} data={data} />
            </Suspense>
          </div>
        </main>
      </div>
      <CookieBanner />
    </div>
  );
}
