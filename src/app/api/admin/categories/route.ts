import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  await connectDB();
  const categories = await Category.find({}).lean().sort({ name: 1 });
  return NextResponse.json(JSON.parse(JSON.stringify(categories)));
}

export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const body = await request.json();
  await connectDB();
  const category = await Category.create(body);
  return NextResponse.json(JSON.parse(JSON.stringify(category)), { status: 201 });
}
