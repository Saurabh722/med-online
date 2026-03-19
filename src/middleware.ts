import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const token = request.cookies.get("admin-session")?.value;

  if (!token) {
    if (isLoginPage) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const valid = await isValidToken(token);

  if (!valid) {
    const res = isLoginPage
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/admin/login", request.url));
    res.cookies.delete("admin-session");
    return res;
  }

  if (valid && isLoginPage) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

async function isValidToken(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET?.trim();
  const username = process.env.ADMIN_USERNAME?.trim();
  if (!secret || !username) return false;
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const sigBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      new TextEncoder().encode(username)
    );
    const expected = Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return token === expected;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
