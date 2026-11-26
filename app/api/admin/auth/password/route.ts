import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, verifyPassword } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { z } from "zod";

const PasswordChangeSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = PasswordChangeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;
    const isCurrentValid = await verifyPassword(currentPassword);
    if (!isCurrentValid) {
      return NextResponse.json({ error: "Current password does not match." }, { status: 400 });
    }

    // Generate new bcrypt hash
    const newHash = await bcrypt.hash(newPassword, 10);

    return NextResponse.json({
      success: true,
      newHash,
      message:
        "New password hash generated. To persist permanently in production, set ADMIN_PASSWORD_HASH in your .env or Vercel settings.",
    });
  } catch (err) {
    console.error("Password update error:", err);
    return NextResponse.json({ error: "Failed to update password." }, { status: 500 });
  }
}
