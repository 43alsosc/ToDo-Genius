"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "./ui/input";
import { createClient } from "@/utils/supabase/client";

export default function AddProduct() {
  const supabase = createClient();

  const [task, setTask] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const formattedDate = `${now.getFullYear()}-${month}-${now.getDate()}`;
    const stringDate = formattedDate.toString();

    console.log("task: ", task);
    console.log(formattedDate);

    if (user) {
      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            user_id: user.id,
            task: task,
            is_complete: false,
            inserted_at: stringDate,
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting todo:");
      } else {
        console.log("Inserted todo");
      }
      console.log("Form submitted");
    }
    setTask("");
  };

  return (
    <div>
      <form className="flex-1">
        <div className="flex items-center">
          <Input
            className="min-w-0 w-full"
            placeholder="Add new todo..."
            type="text"
            value={task}
            onChange={handleInputChange}
          />
          <Button
            size="sm"
            variant="outline"
            className="h-10 gap-1"
            onClick={handleFormSubmit}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Add ToDo</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
