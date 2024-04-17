"use client";
import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "./ui/input";
import { createClient } from "@/utils/supabase/client";

// This line is important for accessibility reasons. Replace '#root' with the id of your app's root element.
Modal.setAppElement("#rootElement");

export default function AddProduct() {
  const supabase = createClient();

  const [task, setTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const formattedDate = `${now.getFullYear()}-${month}-${now.getDate()}`;
    const stringDate = formattedDate.toString();

    console.log("task", task);
    console.log(user.id);
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
        console.error("Error inserting todo:", error);
      } else {
        console.log("Inserted todo:", data);
      }

      console.log("Form submitted");
    }
    closeModal();
  };

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        className="h-8 gap-1"
        onClick={openModal}
      >
        <PlusCircle className="h-3.5 w-3.5" />
        <span>Add Product</span>
      </Button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "500px",
            padding: "1rem",
            borderRadius: "0.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "none",
            background: "white",
            color: "white",
          },
        }}
      >
        <form onSubmit={handleFormSubmit}>
          {/* Your form fields go here. */}
          <div className="flex">
            <Input
              type="text"
              placeholder="Product Name"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <Button type="submit">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
