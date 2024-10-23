"use client";

import Card from "./Card";
import CardEditor from "./Card_editor";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useEditingContext } from "../context/EditingContext";

interface Todo {
  _id: string;
  task: string;
  status: string;
  desc: string;
}

interface Props {
  userId: string;
}

export default function TodoList({ userId }: Props) {
  const { setIsEditing, isEditing } = useEditingContext();
  // State to show or hide the CardEditor component
  // Function to trigger editor visibility
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEditor = () => {
    setIsEditing(false); // Hide the editor when close button is clicked
  };
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch(`/api/todos?userId=${userId}`);
      const { data } = await res.json();
      setTodos(data);
    }

    fetchTodos();
  }, [userId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mx-auto max-w-screen-lg">
        {todos != undefined && todos.map((todo) => (
          <Card key={todo._id} title={todo.task} content={todo.desc} onEditClick={handleEditClick} />
        ))}
      </div>
      {isEditing && <CardEditor onClose={handleCloseEditor} />}
    </div>
  );
}
