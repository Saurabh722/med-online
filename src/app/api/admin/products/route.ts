import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  await connectDB();
  const products = await Product.find({}).lean().sort({ createdAt: -1 });
  return NextResponse.json(JSON.parse(JSON.stringify(products)));
}

export async function POST(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const body = await request.json();
  await connectDB();
  const product = await Product.create(body);
  return NextResponse.json(JSON.parse(JSON.stringify(product)), { status: 201 });
}
