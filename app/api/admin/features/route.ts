import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { FeatureFlag } from "@/models";
import { z } from "zod";

const FeaturePatchSchema = z.object({
  key: z.string(),
  enabled: z.boolean(),
});

const DEFAULT_FLAGS: { key: string; label: string; description: string; default: boolean }[] = [
  {
    key: "caseStudies",
    label: "Project case-study pages",
    description: "When off: Projects shown as cards only, no detail pages (404 on detail URLs).",
    default: true,
  },
  {
    key: "blog",
    label: "Blog / notes",
    description: "When off: Blog routes, nav link, RSS, and home section are removed.",
    default: true,
  },
  {
    key: "contactForm",
    label: "Contact form",
    description: "When off: Form page and API are disabled; contact section displays direct email only.",
    default: true,
  },
  {
    key: "resumeDownload",
    label: "Resume download",
    description: "When off: Download PDF button and /resume route are removed.",
    default: true,
  },
  {
    key: "themeToggle",
    label: "Dark / light toggle",
    description: "When off: Toggle button is hidden and site follows visitor's system preference.",
    default: true,
  },
  {
    key: "analytics",
    label: "Privacy-friendly analytics",
    description: "When off: No visitor tracking requests are collected.",
    default: true,
  },
  {
    key: "showPhone",
    label: "Show phone number",
    description: "When off: Phone number is hidden everywhere across the public site.",
    default: false,
  },
];

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const storedFlags = await FeatureFlag.find().lean();
  const storedMap = new Map(storedFlags.map((f) => [f.key, f]));

  const features = DEFAULT_FLAGS.map((df) => {
    const existing = storedMap.get(df.key);
    return {
      key: df.key,
      label: df.label,
      description: df.description,
      enabled: existing !== undefined ? existing.enabled : df.default,
      updatedAt: existing?.updatedAt || new Date(),
    };
  });

  return NextResponse.json(features);
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = FeaturePatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    await connectDB();
    const updated = await FeatureFlag.findOneAndUpdate(
      { key: parsed.data.key },
      { $set: { enabled: parsed.data.enabled, updatedAt: new Date() } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, flag: updated });
  } catch (err) {
    console.error("Error updating feature flag:", err);
    return NextResponse.json({ error: "Failed to update feature flag" }, { status: 500 });
  }
}
