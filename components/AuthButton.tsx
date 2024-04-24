import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOut}>
        <Button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}

export function SignOutButton() {
  const signOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
  };

  return (
    <form action={signOut}>
      <DropdownMenuItem>
        <button className="w-full h-full p-0 m-0 text-left">Sign Out</button>
      </DropdownMenuItem>
    </form>
  );
}
