import { NextResponse } from "next/server";
import { generateToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { username, password } = body as { username?: string; password?: string };

  if (
    !username ||
    !password ||
    username !== process.env.ADMIN_USERNAME?.trim() ||
    password !== process.env.ADMIN_PASSWORD?.trim()
  ) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = generateToken(username, process.env.ADMIN_SECRET!);
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return response;
}
