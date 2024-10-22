// app/about/page.tsx
// pages/index.tsx
import React from "react";
import Card from "../components/card";
import Footer from "../components/footer";
import Bot_nav_bar from "../components/bot_nav_bar";
import TodoList from "../components/todolist";

const cardsData = [
  { title: "Card 1", content: "Content for card 1" },

  // Add more cards as needed
];

export default function todoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <TodoList userId={"60c72b2f9b1d2c001f2e3a35"}></TodoList>
      </main>
      <Bot_nav_bar />
    </div>
  );
}
