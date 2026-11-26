import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Post } from "@/models";
import { isFeatureEnabled } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const enabled = await isFeatureEnabled("blog");
  if (!enabled) {
    return new NextResponse("Blog is currently disabled.", { status: 404 });
  }

  const siteUrl = process.env.SITE_URL || "https://krithish-portfolio.vercel.app";

  await connectDB();
  const posts = await Post.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .limit(30)
    .lean();

  const xmlItems = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid>${siteUrl}/blog/${p.slug}</guid>
      <description><![CDATA[${p.excerpt}]]></description>
      <pubDate>${p.publishedAt ? new Date(p.publishedAt).toUTCString() : new Date().toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Krithish Ravindra Suvarna — Engineering Notes</title>
    <link>${siteUrl}/blog</link>
    <description>Technical articles on full-stack web development, microservices, and reliable cloud deployments.</description>
    <language>en-us</language>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${xmlItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
