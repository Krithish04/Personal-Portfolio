import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Profile } from "@/models";
import { z } from "zod";

const ProfileUpdateSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  eyebrow: z.string().optional().default("FULL-STACK DEVELOPER & DEVOPS INTERN"),
  intro: z.string().min(1),
  heroIntro: z.string().optional().default(""),
  aboutMarkdown: z.string().optional().default(""),
  contactBlurb: z.string().optional().default(""),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  socials: z.array(z.object({ platform: z.string(), url: z.string() })).optional().default([]),
  metaDescription: z.string().optional().default(""),
  footerText: z.string().optional().default(""),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const profile = await Profile.findOne().lean();
  return NextResponse.json(profile || {});
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = ProfileUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    await connectDB();
    const updated = await Profile.findOneAndUpdate(
      {},
      { $set: parsed.data },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, profile: updated });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
