"use client";

import Card from "../components/card";
import { useState, useEffect } from "react";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 mx-auto max-w-screen-lg">
      {todos.map((todo) => (
        <Card key={todo._id} title={todo.task} content={todo.desc} />
      ))}
    </div>
  );
}
