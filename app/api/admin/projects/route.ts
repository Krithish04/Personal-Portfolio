import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import { z } from "zod";

const ProjectCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  subtitle: z.string().optional().default(""),
  summary: z.string().min(1),
  bodyMarkdown: z.string().optional().default(""),
  role: z.string().optional().default("Full-Stack Developer"),
  timeframe: z.string().optional().default(""),
  tech: z.array(z.string()).default([]),
  links: z.object({
    repo: z.string().optional().default(""),
    demo: z.string().optional().default(""),
  }).default({ repo: "", demo: "" }),
  flowNodes: z.array(z.string()).optional().default([]),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  status: z.enum(["draft", "published"]).default("published"),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = ProjectCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    await connectDB();
    // Ensure slug uniqueness
    const existing = await Project.findOne({ slug: parsed.data.slug });
    if (existing) {
      return NextResponse.json({ error: "A project with this slug already exists." }, { status: 400 });
    }

    const created = await Project.create(parsed.data);
    return NextResponse.json({ success: true, project: created });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
