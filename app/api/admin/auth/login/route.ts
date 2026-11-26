import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimit";
import { signAdminToken, verifyPassword, AUTH_COOKIE_NAME, getEnvValue } from "@/lib/auth";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  // Extract client IP for rate limiting
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const rateLimitKey = `login_${ip}`;

  const rateCheck = checkRateLimit(rateLimitKey, 5, 15 * 60 * 1000);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: `Too many failed attempts. Please try again in ${rateCheck.retryAfterSec} seconds.`,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateCheck.retryAfterSec) },
      }
    );
  }

  try {
    const body = await req.json();
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid credentials provided." },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const rawEmail = getEnvValue("ADMIN_EMAIL") || "suvarnakrithish24@gmail.com";
    const configuredEmail = rawEmail.replace(/^=+/, "").trim();

    // Compare email & password
    const emailMatches = email.toLowerCase().trim() === configuredEmail.toLowerCase().trim();
    const passwordMatches = await verifyPassword(password);

    if (!emailMatches || !passwordMatches) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Reset rate limit on successful authentication
    resetRateLimit(rateLimitKey);

    // Sign session JWT
    const token = await signAdminToken(email);

    const isProd = process.env.NODE_ENV === "production";
    const res = NextResponse.json({ success: true, email });

    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 8 * 60 * 60, // 8 hours
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
