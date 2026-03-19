import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/admin-auth";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  await connectDB();
  const t = await Testimonial.findById(id).lean();
  if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(JSON.parse(JSON.stringify(t)));
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  const body = await request.json();
  await connectDB();
  const t = await Testimonial.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  }).lean();
  if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(JSON.parse(JSON.stringify(t)));
}

export async function DELETE(request: Request, { params }: Ctx) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const { id } = await params;
  await connectDB();
  const t = await Testimonial.findByIdAndDelete(id);
  if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
