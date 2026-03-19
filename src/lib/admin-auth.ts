import crypto from "crypto";

export function generateToken(username: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(username).digest("hex");
}

/**
 * Verifies the admin session cookie from a Next.js route handler request.
 */
export function verifyAdminAuth(request: Request): boolean {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/(?:^|;\s*)admin-session=([^;]+)/);
  const token = match?.[1];
  if (!token) return false;

  const expected = generateToken(
    process.env.ADMIN_USERNAME!,
    process.env.ADMIN_SECRET!
  );
  return token === expected;
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
