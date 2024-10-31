// /app/api/todos/route.ts
// pages/api/register.ts

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/todo";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, task, status, desc } = await req.json();
  await dbConnect();
  await new Todo({
    userId,
    task,
    status,
    desc,
    createdAt: new Date(),
  }).save();

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function PUT(req: NextRequest) {
  // Extract data from the request body
  const {_id, userId, task, status, desc } = await req.json();

  // Connect to the database
  await dbConnect();


  const updatedTask = await Todo.findOneAndUpdate(
    { userId, _id: _id },
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
