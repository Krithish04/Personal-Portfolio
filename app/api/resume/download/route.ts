import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Resume, Event } from "@/models";
import { downloadFromGridFS } from "@/lib/gridfs";
import { isFeatureEnabled } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const enabled = await isFeatureEnabled("resumeDownload");
  if (!enabled) {
    return new NextResponse("Resume download is currently disabled.", {
      status: 404,
    });
  }

  // Record download analytics event
  try {
    await connectDB();
    await Event.create({ type: "resume_download" });
  } catch {}

  try {
    const conn = await connectDB();
    if (conn) {
      // Look for active uploaded resume in MongoDB GridFS
      const activeDoc = await Resume.findOne({ active: true }).lean();
      if (activeDoc?.fileId) {
        const file = await downloadFromGridFS(activeDoc.fileId, "resumes");
        if (file) {
          const readable = new ReadableStream({
            start(controller) {
              file.stream.on("data", (chunk) => controller.enqueue(chunk));
              file.stream.on("end", () => controller.close());
              file.stream.on("error", (err) => controller.error(err));
            },
          });

          return new NextResponse(readable, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": 'attachment; filename="Krithish_Suvarna_Resume.pdf"',
              "Cache-Control": "public, max-age=3600",
            },
          });
        }
      }
    }

    // Fallback: If no PDF uploaded to DB yet, redirect to /resume page
    return NextResponse.redirect(new URL("/resume", process.env.SITE_URL || "http://localhost:3000"));
  } catch (err) {
    console.error("Error serving resume:", err);
    return NextResponse.redirect(new URL("/resume", process.env.SITE_URL || "http://localhost:3000"));
  }
}
