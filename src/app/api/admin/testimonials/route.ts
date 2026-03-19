import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  await connectDB();
  const testimonials = await Testimonial.find({}).lean().sort({ id: 1 });
  return NextResponse.json(JSON.parse(JSON.stringify(testimonials)));
}

export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const body = await request.json();
  await connectDB();
  const testimonial = await Testimonial.create(body);
  return NextResponse.json(JSON.parse(JSON.stringify(testimonial)), { status: 201 });
}
