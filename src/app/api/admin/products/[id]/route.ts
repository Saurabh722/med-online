import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/admin-auth";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(JSON.parse(JSON.stringify(product)));
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  const body = await request.json();
  await connectDB();
  const product = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(JSON.parse(JSON.stringify(product)));
}

export async function DELETE(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  await connectDB();
  const product = await Product.findByIdAndDelete(id);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
