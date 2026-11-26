import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { PageView } from "@/models";
import { isFeatureEnabled } from "@/lib/data";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  // Check if Analytics is turned on
  const enabled = await isFeatureEnabled("analytics");
  if (!enabled) {
    return new NextResponse(null, { status: 204 });
  }

  // Honor Do Not Track (DNT) header
  const dnt = req.headers.get("dnt") || req.headers.get("x-do-not-track");
  if (dnt === "1") {
    return new NextResponse(null, { status: 204 });
  }

  // Exclude Admin sessions
  const adminCookie = req.cookies.get(AUTH_COOKIE_NAME);
  if (adminCookie) {
    return new NextResponse(null, { status: 204 });
  }

  // Detect and exclude bots / crawlers
  const userAgent = req.headers.get("user-agent") || "";
  const botPattern = /bot|spider|crawl|slurp|lighthouse|preview|headless/i;
  if (botPattern.test(userAgent)) {
    return new NextResponse(null, { status: 204 });
  }

  try {
    const body = await req.json();
    const path = typeof body.path === "string" ? body.path.slice(0, 200) : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer : "";

    let referrerHost = "";
    if (referrer) {
      try {
        const url = new URL(referrer);
        referrerHost = url.hostname;
      } catch {}
    }

    // Classify Device Class
    let device = "Desktop";
    if (/mobile/i.test(userAgent)) device = "Mobile";
    else if (/tablet|ipad/i.test(userAgent)) device = "Tablet";

    // Classify Browser Family
    let browser = "Other";
    if (/chrome|crios/i.test(userAgent) && !/edg/i.test(userAgent)) browser = "Chrome";
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = "Safari";
    else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
    else if (/edg/i.test(userAgent)) browser = "Edge";

    // Vercel Geolocation Header (Country only, no IP stored)
    const country = req.headers.get("x-vercel-ip-country") || "";

    // Generate daily-rotating salted hash for anonymous uniqueness (never stores IP)
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    const today = new Date().toISOString().slice(0, 10);
    const salt = process.env.ANALYTICS_SALT_SECRET || "privacy_analytics_salt_12345";
    const visitorHash = crypto
      .createHash("sha256")
      .update(ip + salt + today)
      .digest("hex")
      .slice(0, 16);

    await connectDB();
    await PageView.create({
      path,
      referrerHost,
      device,
      browser,
      country,
      visitorHash,
      createdAt: new Date(),
    });

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
