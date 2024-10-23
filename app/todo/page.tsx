
"use client";
import React from "react";
import Bot_nav_bar from "../components/Bot_nav_bar";
import TodoList from "../components/todolist";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

export default function todoPage() {
  const { userId } = useUserContext();
  console.log(userId);
  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-base-200">
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <TodoList userId={userId}></TodoList>
      </main>
      <Bot_nav_bar/>
    </div>
    </div>
  );
}
