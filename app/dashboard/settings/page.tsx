import Link from "next/link";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { CollapsedSideNav } from "@/components/side-nav";
import Profile from "@/components/Profile";
import ModeToggle from "@/components/DarkmodeButton";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DeleteUser, DeleteUserButton } from "@/components/AuthButton";

export default async function Dashboard() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="">
          <CollapsedSideNav />
        </div>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[300px] lg:w-[300px]"
              />
            </div>
          </form>
          <Profile />
        </div>
      </header>
      <main className="flex md:ml-14 min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground"
            x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Toggle theme </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <ModeToggle />
                </form>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>Delete your account</CardDescription>
              </CardHeader>
              <CardContent>
                <DeleteUser />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
