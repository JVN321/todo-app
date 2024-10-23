// /app/api/todos/route.ts
// pages/api/register.ts

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { _id } = await req.json();
  await dbConnect();

  try {
    const deletedTodo = await Todo.findByIdAndDelete(_id); // Use findByIdAndDelete to remove the document

    if (!deletedTodo)  {
        return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
      }
    
      return NextResponse.json({ success: true, deletedTodo }, { status: 200 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    
  }
}
