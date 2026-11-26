import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { runSeed } from "@/scripts/seed";

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  // Allow if admin is logged in OR in development mode
  if (!session && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await runSeed();
    return NextResponse.json({ success: true, message: "Seed data initialized successfully." });
  } catch (error: unknown) {
    console.error("Error during database seeding:", error);
    const msg = error instanceof Error ? error.message : "Seeding failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
