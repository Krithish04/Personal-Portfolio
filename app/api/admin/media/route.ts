import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Media } from "@/models";
import { uploadToGridFS, deleteFromGridFS } from "@/lib/gridfs";

// Maximum image size: 4 MB
const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp"];

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const mediaList = await Media.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(mediaList);
}

export async function POST(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const alt = (formData.get("alt") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, and WebP images are permitted." },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Image exceeds maximum allowed size of 4 MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    await connectDB();
    const fileId = await uploadToGridFS(buffer, file.name, file.type, "media");

    const record = await Media.create({
      fileId,
      filename: file.name,
      mime: file.type,
      size: file.size,
      alt,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, media: record });
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await connectDB();
  const doc = await Media.findById(id);
  if (doc) {
    if (doc.fileId) {
      await deleteFromGridFS(doc.fileId, "media");
    }
    await Media.findByIdAndDelete(id);
  }

  return NextResponse.json({ success: true });
}
