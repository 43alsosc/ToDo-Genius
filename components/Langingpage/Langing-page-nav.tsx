import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "../AuthButton";

export default function LangingPageNav() {
  // Check if the Supabase client can be initialized
  const canInitSupabaseClient = () => {
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };
  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <header className="w-full px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center" href="#">
        <CheckCircleIcon className="h-6 w-6" />
        <span className="ml-2 text-xl font-bold">Todo</span>
      </Link>
      <nav className="hidden lg:flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
          {/* Possible future links, like "Contact" */}
        </Link>
      </nav>
      {isSupabaseConnected && <AuthButton />}
    </header>
  );
}
