import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import { z } from "zod";

const ProjectUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  summary: z.string().min(1).optional(),
  bodyMarkdown: z.string().optional(),
  role: z.string().optional(),
  timeframe: z.string().optional(),
  deployment: z.string().optional(),
  tech: z.array(z.string()).optional(),
  links: z.object({
    repo: z.string().optional(),
    demo: z.string().optional(),
  }).optional(),
  flowNodes: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  status: z.enum(["draft", "published"]).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const project = await Project.findById(params.id).lean();
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = ProjectUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    await connectDB();
    const updated = await Project.findByIdAndUpdate(
      params.id,
      { $set: parsed.data },
      { new: true }
    );

    if (!updated) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const deleted = await Project.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Project not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
