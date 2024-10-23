"use client";
import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaSave } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { useUserContext } from "../context/UserContext";
import { Todo } from "../components/todolist";


interface CardEditorProps {
  onClose: () => void;
  fetchTodos: () => void;
  selectedTodo: Todo | null; // Accept the selected task as a prop
}



const CardEditor: React.FC<CardEditorProps> = ({ onClose, fetchTodos, selectedTodo }) => {
  const { userId } = useUserContext(); // Use context to get userId
  const [task, setTask] = useState(selectedTodo?.task || ""); // Pre-fill task if editing
  const [desc, setDesc] = useState(selectedTodo?.desc || ""); // Pre-fill description if editing

  // Handle saving the task (either editing or creating a new one)
  const handleSave = async () => {
    try {
      const url = "/api/todos_add"; // If editing, use the task's ID
      const method = selectedTodo ? "PUT" : "POST"; // Use PUT for updating, POST for creating

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectedTodo?._id || null,
          userId: userId,
          task: task,
          status: "pending", // Assuming the default status is 'pending'
          desc: desc,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        fetchTodos(); // Refresh the todo list
        onClose(); // Close the editor
      } else {
        alert("Failed to save task");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const handleDrop = async () => {
    try {
      const url = "/api/todos_drop";
      const method = "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: selectedTodo?._id
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        fetchTodos(); // Refresh the todo list
        onClose(); // Close the editor
      } else {
        alert("Failed to Delete task");
      }
    } catch (error) {
      console.error("Error Deleting task:", error);
      alert("An error occurred. Please try again.");
    }
  };
  // Update the state if selectedTodo changes
  useEffect(() => {
    if (selectedTodo) {
      setTask(selectedTodo.task);
      setDesc(selectedTodo.desc);
    }
  }, [selectedTodo]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-lg shadow-xl p-6">
        <div className="card-body">
          <input
            type="text"
            placeholder="Title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <textarea
            className="textarea textarea-primary w-full mb-4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
          />
          <div className="card-actions justify-end space-x">
            <button onClick={handleDrop} className="btn flex items-center btn-outline border-red-700 hover:border-red-700 hover:bg-red-700 hover:bg-opacity-20">
              <FaTrashAlt className="text-lg text-red-600" />
            </button>
            <button
              onClick={handleSave}
              className="btn flex items-center btn-outline border-green-700 hover:border-green-700 hover:bg-green-700 hover:bg-opacity-20"
            >
              <FaSave className="text-lg text-green-600" />
            </button>
            <button
              className="btn flex items-center btn-outline hover:border-white border-white hover:bg-white hover:bg-opacity-20"
              onClick={onClose}
            >
              <MdArrowBack className="text-lg text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEditor;
