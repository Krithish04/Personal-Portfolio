import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Message } from "@/models";
import { z } from "zod";

const MessagePatchSchema = z.object({
  id: z.string(),
  read: z.boolean().optional(),
  archived: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(messages);
}

export async function PATCH(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = MessagePatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    await connectDB();
    const update: { read?: boolean; archived?: boolean } = {};
    if (typeof parsed.data.read === "boolean") update.read = parsed.data.read;
    if (typeof parsed.data.archived === "boolean") update.archived = parsed.data.archived;

    const message = await Message.findByIdAndUpdate(parsed.data.id, { $set: update }, { new: true });
    return NextResponse.json({ success: true, message });
  } catch (err) {
    console.error("Error updating message:", err);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  await connectDB();
  if (id) {
    await Message.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  }

  // Bulk delete archived messages
  const action = url.searchParams.get("action");
  if (action === "clear_archived") {
    await Message.deleteMany({ archived: true });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Missing message ID or action" }, { status: 400 });
}
