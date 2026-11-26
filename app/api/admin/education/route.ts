import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Education } from "@/models";
import { z } from "zod";

const EduSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  location: z.string().optional().default(""),
  date: z.string().min(1),
  order: z.number().default(0),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const list = await Education.find().sort({ order: 1 }).lean();
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = EduSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }

    await connectDB();
    const item = await Education.create(parsed.data);
    return NextResponse.json({ success: true, item });
  } catch {
    return NextResponse.json({ error: "Failed to create education" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await connectDB();
    const updated = await Education.findByIdAndUpdate(id, { $set: data }, { new: true });
    return NextResponse.json({ success: true, item: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await connectDB();
  await Education.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
