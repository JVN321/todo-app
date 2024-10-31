"use client";

import Card from "./Card";
import CardEditor from "../components/Card_editor";
import { useState, useEffect } from "react";
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
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleEditClick = (todo: Todo | null) => {
    setSelectedTodo(todo);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setIsClosing(true);
    setIsEditing(false);
    setTimeout(() => {
      setSelectedTodo(null);
      setIsClosing(false);
      setShowEditor(false);
      
    }, 300);
  };

  async function fetchTodos() {
    try {
      const res = await fetch(`/api/todos?userId=${userId}`);
      const { data } = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    console.log("Fetched todos",isEditing)
    if (isEditing) {
      handleEditClick(null);
    }
    else{
      handleCloseEditor();
      
    }
  }, [isEditing]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mx-auto max-w-screen-lg">
        {todos?.map((todo) => (
          <Card
            key={todo._id}
            title={todo.task}
            content={todo.desc}
            onEditClick={() => handleEditClick(todo)}
          />
        ))}
      </div>

      {showEditor && (
        <div
          className={`modal modal-open fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
            showEditor && !isClosing ? "opacity-100" : "opacity-0"
          }`}
        >
          <CardEditor
            onClose={handleCloseEditor}
            fetchTodos={fetchTodos}
            selectedTodo={selectedTodo}
          />
        </div>
      )}
    </div>
  );
}
