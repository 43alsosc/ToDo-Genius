"use client";
import useSupabaseClient from "@/utils/supabase/client";
import { Button } from "./ui/button";
import GoogleIcon from "@mui/icons-material/Google";

export default function LogInWithGoogle() {
  const supabase = useSupabaseClient();
  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button
      onClick={loginWithGoogle}
      className="bg-google text-white text-center border border-foreground/20 rounded-md px-4 py-2 mb-2 w-1/2 gap-1"
    >
      <GoogleIcon className="text-white" />
      Login with Google
    </Button>
  );
}
