import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Resume } from "@/models";
import { uploadToGridFS, deleteFromGridFS } from "@/lib/gridfs";

// Maximum resume PDF size: 5 MB
const MAX_PDF_SIZE = 5 * 1024 * 1024;

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const resumes = await Resume.find().sort({ uploadedAt: -1 }).lean();
  return NextResponse.json(resumes);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are permitted." }, { status: 400 });
    }

    if (file.size > MAX_PDF_SIZE) {
      return NextResponse.json({ error: "File exceeds maximum size of 5 MB." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Magic bytes verification for PDF (%PDF- / 0x25 0x50 0x44 0x46)
    if (
      buffer.length < 4 ||
      buffer[0] !== 0x25 ||
      buffer[1] !== 0x50 ||
      buffer[2] !== 0x44 ||
      buffer[3] !== 0x46
    ) {
      return NextResponse.json({ error: "Invalid PDF file structure." }, { status: 400 });
    }

    await connectDB();
    const fileId = await uploadToGridFS(buffer, file.name, "application/pdf", "resumes");

    // Deactivate previous active resumes and set this new one as active
    await Resume.updateMany({}, { $set: { active: false } });

    const newResume = await Resume.create({
      fileId,
      originalName: file.name,
      size: file.size,
      active: true,
      uploadedAt: new Date(),
    });

    return NextResponse.json({ success: true, resume: newResume });
  } catch (error) {
    console.error("Resume upload error:", error);
    return NextResponse.json({ error: "Failed to upload resume PDF." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await connectDB();
    // Set all to false, then set chosen one to true
    await Resume.updateMany({}, { $set: { active: false } });
    const activated = await Resume.findByIdAndUpdate(id, { $set: { active: true } }, { new: true });

    return NextResponse.json({ success: true, resume: activated });
  } catch {
    return NextResponse.json({ error: "Failed to set active resume" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await connectDB();
  const doc = await Resume.findById(id);
  if (doc) {
    if (doc.fileId) {
      await deleteFromGridFS(doc.fileId, "resumes");
    }
    await Resume.findByIdAndDelete(id);
  }

  return NextResponse.json({ success: true });
}
