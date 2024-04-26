import { Button } from "./ui/button";
import { File } from "lucide-react";
import * as XLSX from "xlsx";
import { createClient } from "@/utils/supabase/client";

async function exportToExcel(fileName: string) {
  const supabase = createClient();
  let { data: todos, error } = await supabase.from("todos").select("*");

  if (error) {
    console.error("Error fetching data:", error.message);
  }
  if (!todos) {
    console.error("No data to export");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(todos);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  /* generate XLSX file and send to client */
  XLSX.writeFile(wb, fileName);
}

function handleExportClick(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
  exportToExcel("data.xlsx");
}

export default function ExportButton() {
  return (
    <Button
      size="sm"
      variant="outline"
      className="h-10 gap-1"
      onClick={handleExportClick}
    >
      <File className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Export
      </span>
    </Button>
  );
}
