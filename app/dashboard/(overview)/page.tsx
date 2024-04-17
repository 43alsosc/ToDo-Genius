import { CollapsedSideNav, SideNav } from "@/components/side-nav";
import { Button } from "@/components/ui/button";
import { Search, File, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table/data-table";
import { ToDo, columns } from "@/components/data-table/columns";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CookieBanner from "@/components/CookieBanner";
import Profile from "@/components/Profile";
import AddProduct from "@/components/AddToDo";

async function getData(): Promise<ToDo[]> {
  const supabase = createClient();
  supabase.auth.getUser();
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error("Error fetching todos", error);
    throw error;
  } else if (!data) {
    console.error("No data found");
  }
  return data;
}

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const data = await getData();
  return (
    <div className="w-4/5" id="rootElement">
      <SideNav />
      <div>
        <div className="">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b justify-between bg-background px-4 py-3 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <CollapsedSideNav />
            {/* Søk */}
            <div className="relative flex-1 md:grow-0 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[700px] h-10"
              />
            </div>
            {/*  Dropdown fra profilbilde  */}
            <Profile />
          </header>
        </div>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs>
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="done">Done</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1">
                  <File className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export
                  </span>
                </Button>
                <AddProduct />
              </div>
            </div>
            <div className="pt-8">
              <DataTable columns={columns} data={data} />
            </div>
          </Tabs>
        </main>
      </div>
      <CookieBanner />
    </div>
  );
}
