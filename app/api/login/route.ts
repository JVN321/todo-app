// pages/api/login.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/users';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  await dbConnect(); // Connect to the database

  // Check if the user exists
  const user = await User.findOne({ username });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  // Compare the provided password with the hashed password in the database
  const isPasswordValid = password == user.password;
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
  }

  // Here, you can handle creating a session or token if needed
  return NextResponse.json({ message: 'Login successful',userId: user.userId }, { status: 200 });
}
