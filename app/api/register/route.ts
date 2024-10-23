// pages/api/register.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';
import { NextRequest } from 'next/server';

const generateRandomUserId = () => {
  return 'user_' + Math.random().toString(36).slice(2, 11); // Generates a string of length 9
};

export async function POST(req: NextRequest) {
  // Parse the request body
  const { username, password } = await req.json(); // Use await req.json() to get the request body

  await dbConnect(); // Ensure you connect to the database

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  // Create a new user
  const userId = generateRandomUserId();
  const newUser = new User({ userId, username, password }); // Hash password in production
  await newUser.save();

  return NextResponse.json({ message: 'User created successfully', userId }, { status: 201 });
}
