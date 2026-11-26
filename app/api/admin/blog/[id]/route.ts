import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Post } from "@/models";
import { z } from "zod";

const PostUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().min(1).optional(),
  bodyMarkdown: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "published"]).optional(),
  readingTime: z.string().optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const post = await Post.findById(params.id).lean();
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = PostUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    await connectDB();
    const updated = await Post.findByIdAndUpdate(
      params.id,
      { $set: parsed.data },
      { new: true }
    );

    if (!updated) return NextResponse.json({ error: "Post not found" }, { status: 404 });
    return NextResponse.json({ success: true, post: updated });
  } catch (err) {
    console.error("Error updating post:", err);
    return NextResponse.json({ error: "Failed to update post." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const deleted = await Post.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Post not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
