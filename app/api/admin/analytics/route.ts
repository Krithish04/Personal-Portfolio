import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { PageView, Event } from "@/models";
import { isFeatureEnabled } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const isEnabled = await isFeatureEnabled("analytics");
  const url = new URL(req.url);
  const rangeDays = parseInt(url.searchParams.get("range") || "7", 10);
  const days = [7, 30, 90].includes(rangeDays) ? rangeDays : 7;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  await connectDB();

  // Aggregate page views in range
  const [views, resumeDownloads, contactSubmits] = await Promise.all([
    PageView.find({ createdAt: { $gte: startDate } }).lean(),
    Event.countDocuments({ type: "resume_download", createdAt: { $gte: startDate } }),
    Event.countDocuments({ type: "contact_submit", createdAt: { $gte: startDate } }),
  ]);

  const totalViews = views.length;

  // Compute unique daily visitors
  const uniqueVisitorDays = new Set(views.map((v) => `${v.visitorHash}_${new Date(v.createdAt).toISOString().slice(0, 10)}`));
  const uniqueVisitors = uniqueVisitorDays.size;

  // Day-by-day histogram
  const dayMap = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    dayMap.set(dateStr, 0);
  }

  // Top paths
  const pathMap = new Map<string, number>();
  // Top referrers
  const refMap = new Map<string, number>();
  // Devices
  const devMap = new Map<string, number>();

  views.forEach((v) => {
    const dateStr = new Date(v.createdAt).toISOString().slice(0, 10);
    if (dayMap.has(dateStr)) {
      dayMap.set(dateStr, (dayMap.get(dateStr) || 0) + 1);
    }

    const p = v.path || "/";
    pathMap.set(p, (pathMap.get(p) || 0) + 1);

    const ref = v.referrerHost || "Direct / None";
    refMap.set(ref, (refMap.get(ref) || 0) + 1);

    const dev = v.device || "Desktop";
    devMap.set(dev, (devMap.get(dev) || 0) + 1);
  });

  const dailyViews = Array.from(dayMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));

  const topPages = Array.from(pathMap.entries())
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const topReferrers = Array.from(refMap.entries())
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const devices = Array.from(devMap.entries()).map(([device, count]) => ({
    device,
    count,
  }));

  return NextResponse.json({
    isEnabled,
    days,
    totalViews,
    uniqueVisitors,
    resumeDownloads,
    contactSubmits,
    dailyViews,
    topPages,
    topReferrers,
    devices,
  });
}
