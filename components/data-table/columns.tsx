"use client";

import { createClient } from "@/utils/supabase/client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Check, Pen, Trash } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Close } from "@mui/icons-material";

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
    accessorKey: "mark done",
    header: ({ column }) => {
      return <div className="text-center">Mark Done</div>;
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
          console.error("Error fetching updated data:");
        } else {
          console.log("Updated data: ", data);
        }
      };

      const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        updateTask(id, !is_completed);
      };

      return (
        <div className="text-center font-medium">
          <Button
            variant="outline"
            className="text-green-500 bg-transparent"
            onClick={handleClick}
          >
            <Check className="h-4 w-4" />
          </Button>
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
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <div className="text-center">Actions</div>;
    },
    cell: ({ row }: { row: any }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [updatedTask, setUpdatedTask] = useState("");

      const id = row.getValue("id");

      const deleteTask = async (id: number) => {
        await supabase.from("todos").delete().eq("id", id);
        console.log("Deleted task");
      };

      const editTask = async (id: number, task: string) => {
        const { data, error } = await supabase
          .from("todos")
          .update({ task })
          .eq("id", id);

        if (error) {
          console.error("Error fetching data to edit:");
        } else {
          console.log("Edit data:");
          setIsEditing(false); // Hide the input field after successful update
        }
      };

      return (
        <div className="text-center font-medium">
          <Button
            variant="outline"
            onClick={() => deleteTask(id)}
            className="text-red-500"
          >
            <Trash className="h-4 w-4" />
          </Button>
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editTask(id, updatedTask);
                setUpdatedTask("");
              }}
            >
              <div className="flex">
                <Input
                  type="text"
                  placeholder="min 4 characters"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                  autoFocus
                />
                <Button
                  variant="outline"
                  type="submit"
                  className="text-green-500"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="text-red-500"
                >
                  <Close className="h-4 w-4" />
                </Button>
              </div>
            </form>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="text-green-500"
            >
              <Pen className="h-4 w-4" />
            </Button>
          )}
        </div>
      );
    },
  },
];
