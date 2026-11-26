import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Message } from "@/models";

export async function GET(req: NextRequest) {
  const session = await getAdminSession(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();

  // Generate CSV format
  const headers = ["ID", "Name", "Email", "Message", "Read", "Archived", "Date"];
  const rows = messages.map((m) => [
    `"${m._id}"`,
    `"${(m.name || "").replace(/"/g, '""')}"`,
    `"${(m.email || "").replace(/"/g, '""')}"`,
    `"${(m.message || "").replace(/"/g, '""').replace(/\n/g, " ")}"`,
    m.read ? "Yes" : "No",
    m.archived ? "Yes" : "No",
    `"${new Date(m.createdAt).toISOString()}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="portfolio_messages.csv"',
    },
  });
}
