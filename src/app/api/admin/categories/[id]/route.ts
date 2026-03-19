import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/admin-auth";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  await connectDB();
  const category = await Category.findById(id).lean();
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(JSON.parse(JSON.stringify(category)));
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  const body = await request.json();
  await connectDB();
  const category = await Category.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(JSON.parse(JSON.stringify(category)));
}

export async function DELETE(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  await connectDB();
  const category = await Category.findByIdAndDelete(id);
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
