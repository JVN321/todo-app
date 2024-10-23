// /app/api/todos/route.ts
// pages/api/register.ts

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, taskId, task, status, desc } = await req.json();
  await dbConnect();
  await new Todo({
    userId,
    taskId,
    task,
    status,
    desc,
    createdAt: new Date(),
  }).save();

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  // Extract data from the request body
  const {_id, userId, taskId, task, status, desc } = await req.json();

  // Connect to the database
  await dbConnect();

  // Update the existing task based on userId and taskId
  const updatedTask = await Todo.findOneAndUpdate(
    { userId, _id: _id }, // Find the task by userId and taskId
    {
      $set: {
        task,
        status,
        desc,
      },
    },
    { new: true } // Return the updated document
  );
  if (!updatedTask) {
    return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, updatedTask }, { status: 200 });
}
