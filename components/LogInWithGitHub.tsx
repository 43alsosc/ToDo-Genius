"use client";
import useSupabaseClient from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { Github, GithubIcon } from "lucide-react";

export default function LogInWithGitHub() {
  const supabase = useSupabaseClient();
  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button
      onClick={loginWithGitHub}
      className="text-foreground text-center border border-foreground/20 rounded-md px-4 py-2 mb-2 w-1/2 gap-1"
    >
      <Github />
      Login with GitHub
    </Button>
  );
}
