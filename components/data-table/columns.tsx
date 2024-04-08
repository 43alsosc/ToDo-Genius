"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ToDo = {
  id: string;
  task: string;
  is_complete: boolean;
  inserted_at: Date;
};

export const columns: ColumnDef<ToDo>[] = [
  {
    accessorKey: "is_complete",
    header: () => <div className="text-center">Completed</div>,
    cell: ({ row }: { row: any }) => {
      const is_completed = row.getValue("is_complete");
      return (
        <div className="text-center font-medium">
          <input type="checkbox" checked={is_completed} disabled />
        </div>
      );
    },
  },
  {
    accessorKey: "task",
    header: () => <div className="text-center">Task</div>,
    cell: ({ row }: { row: any }) => {
      const task = row.getValue("task");
      const formatted = typeof task === "string" ? task.toUpperCase() : task;

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "inserted_at",
    header: () => <div className="text-center">Created</div>,
    cell: ({ row }: { row: any }) => {
      const inserted_at = row.getValue("inserted_at");
      const formatted =
        typeof inserted_at === "string" ? inserted_at.slice() : inserted_at;
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
];
