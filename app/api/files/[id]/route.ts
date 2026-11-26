import { NextRequest, NextResponse } from "next/server";
import { downloadFromGridFS } from "@/lib/gridfs";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileId = params.id;
    if (!fileId) {
      return new NextResponse("File ID required", { status: 400 });
    }

    const file = await downloadFromGridFS(fileId);
    if (!file) {
      return new NextResponse("File not found", { status: 404 });
    }

    // Convert Node Readable to Web ReadableStream
    const readable = new ReadableStream({
      start(controller) {
        file.stream.on("data", (chunk) => controller.enqueue(chunk));
        file.stream.on("end", () => controller.close());
        file.stream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": file.contentType,
        "Content-Length": String(file.length),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error retrieving file from GridFS:", error);
    return new NextResponse("Error reading file", { status: 500 });
  }
}
