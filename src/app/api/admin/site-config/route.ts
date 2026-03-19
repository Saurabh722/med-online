import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteConfig from "@/models/SiteConfig";
import { verifyAdminAuth, unauthorizedResponse } from "@/lib/admin-auth";

export async function GET(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  await connectDB();
  const config = await SiteConfig.findOne({ key: "main" }).lean();
  return NextResponse.json(JSON.parse(JSON.stringify(config)));
}

export async function PUT(request: Request) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();
  const body = await request.json();
  await connectDB();
  const config = await SiteConfig.findOneAndUpdate(
    { key: "main" },
    body,
    { new: true, upsert: true, runValidators: true }
  ).lean();
  return NextResponse.json(JSON.parse(JSON.stringify(config)));
}
