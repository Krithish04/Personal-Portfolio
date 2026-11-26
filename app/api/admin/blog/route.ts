import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Post } from "@/models";
import { z } from "zod";

const PostCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  bodyMarkdown: z.string().min(1),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("published"),
  readingTime: z.string().default("3 min read"),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = PostCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    await connectDB();
    const existing = await Post.findOne({ slug: parsed.data.slug });
    if (existing) {
      return NextResponse.json({ error: "A post with this slug already exists." }, { status: 400 });
    }

    const post = await Post.create({
      ...parsed.data,
      publishedAt: parsed.data.status === "published" ? new Date() : undefined,
    });

    return NextResponse.json({ success: true, post });
  } catch (err) {
    console.error("Error creating post:", err);
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
