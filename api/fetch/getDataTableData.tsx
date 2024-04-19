import { ToDo } from "@/components/data-table-shadcn/columns";
import { createClient } from "@/utils/supabase/server";

export default async function getData(): Promise<ToDo[]> {
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
