import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";
import { IoLogoGithub } from "react-icons/io";

export default function GitAuth() {
  const supabase = createClient();
  const githubLogin = async () => {
    "use server";
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };
  return (
    <div>
      <Button onClick={githubLogin}>
        <IoLogoGithub className="h-full" />
      </Button>
    </div>
  );
}
