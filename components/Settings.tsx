import { redirect } from "next/navigation";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function Settings() {
  const settings = async () => {
    "use server";
    return redirect("/dashboard/settings");
  };

  return (
    <form action={settings}>
      <DropdownMenuItem>
        <button className="w-full h-full p-0 m-0 text-left">Settings</button>
      </DropdownMenuItem>
    </form>
  );
}
