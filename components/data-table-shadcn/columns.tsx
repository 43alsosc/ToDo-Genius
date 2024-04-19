"use client";

import { createClient } from "@/utils/supabase/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export type ToDo = {
  id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

const supabase = createClient();

export const columns: ColumnDef<ToDo>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-center w-full"
        >
          <div className="text-center">Id</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const id = row.getValue("id");
      const formatted = typeof id === "number" ? id.valueOf() : id;

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "is_complete",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-center w-full"
        >
          <div className="text-center">Completed</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const is_completed = row.getValue("is_complete");
      const id = row.original.id;

      const updateTask = async (id: number, is_complete: boolean) => {
        await supabase.from("todos").update({ is_complete }).eq("id", id);
        console.log(is_complete);
        const { data, error } = await supabase
          .from("todos")
          .select("")
          .eq("id", id);

        if (error) {
          console.error("Error fetching updated data:", error);
        } else {
          console.log("Updated data:", data);
        }
      };

      return (
        <div className="text-center font-medium">
          <input
            type="checkbox"
            checked={is_completed}
            onChange={() => updateTask(id, !is_completed)} // call updateTask when checkbox is clicked
          />
        </div>
      );
    },
  },
  {
    accessorKey: "task",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-center w-full"
        >
          <div className="text-center">Task</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const task = row.getValue("task");
      const formatted = typeof task === "string" ? task.toUpperCase() : task;

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "inserted_at",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-center w-full"
        >
          <div className="text-center">Created</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      const inserted_at = row.getValue("inserted_at");
      const formatted =
        typeof inserted_at === "string" ? inserted_at.slice() : inserted_at;
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
];
