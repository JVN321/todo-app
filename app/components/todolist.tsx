"use client";

import Card from "../components/card";
import CardEditor from "../components/Card_editor";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useEditingContext } from "../context/EditingContext";

export interface Todo {
  _id: string;
  userId: string;
  task: string;
  status: string;
  desc: string;
}

interface Props {
  userId: string;
}

export default function TodoList({ userId }: Props) {
  const { setIsEditing, isEditing } = useEditingContext();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null); // State to store the selected task

  // Function to trigger editor visibility and pass the selected task
  const handleEditClick = (todo: Todo) => {
    setSelectedTodo(todo); // Set the selected task
    setIsEditing(true); // Show the editor
  };

  const handleCloseEditor = () => {
    setIsEditing(false); // Hide the editor
    setSelectedTodo(null); // Clear the selected task
  };

  // Fetch todos from the API
  async function fetchTodos() {
    const res = await fetch(`/api/todos?userId=${userId}`);
    const { data } = await res.json();
    setTodos(data);
  }

  useEffect(() => {
    fetchTodos();
  }, [userId]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mx-auto max-w-screen-lg">
        {todos != undefined && todos.map((todo) => (
          <Card
            key={todo._id}
            title={todo.task}
            content={todo.desc}
            onEditClick={() => handleEditClick(todo)} // Pass the selected todo
          />
        ))}
      </div>
      {isEditing && (
        <CardEditor
          onClose={handleCloseEditor}
          fetchTodos={fetchTodos}
          selectedTodo={selectedTodo} // Pass the selected task
        />
      )}
    </div>
  );
}
