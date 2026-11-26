import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db";
import { Message, Event } from "@/models";
import { checkRateLimit } from "@/lib/rateLimit";
import { isFeatureEnabled } from "@/lib/data";
import { sendContactNotification } from "@/lib/email";

const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
  // Honeypot field - must be empty for human users
  hp_website: z.string().optional(),
  // Client timestamp when form loaded
  formLoadedAt: z.number().optional(),
});

export async function POST(req: NextRequest) {
  const enabled = await isFeatureEnabled("contactForm");
  if (!enabled) {
    return NextResponse.json(
      { error: "Contact form is currently disabled." },
      { status: 403 }
    );
  }

  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
  const rateLimitKey = `contact_${ip}`;

  const rateCheck = checkRateLimit(rateLimitKey, 3, 10 * 60 * 1000);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        error: `Too many submissions. Please wait ${rateCheck.retryAfterSec} seconds before sending another message.`,
      },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, email, message, hp_website, formLoadedAt } = parsed.data;

    // Honeypot check: bot filled out invisible field
    if (hp_website && hp_website.trim().length > 0) {
      // Silently succeed so bot does not retry
      return NextResponse.json({ success: true });
    }

    // Minimum submit time check (human takes > 1.5s to read & type)
    if (formLoadedAt) {
      const diffMs = Date.now() - formLoadedAt;
      if (diffMs < 1500) {
        return NextResponse.json({ success: true });
      }
    }

    await connectDB();
    await Message.create({
      name,
      email,
      message,
      read: false,
      archived: false,
      ipHash: ip,
    });

    // Track contact submit event
    try {
      await Event.create({ type: "contact_submit" });
    } catch {}

    // Dispatch email notification to Google Mail (Gmail)
    try {
      await sendContactNotification({ name, email, message });
    } catch (mailErr) {
      console.error("Email notification error (message safely saved in DB):", mailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been delivered. Thank you!",
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Unable to send message right now. Please email directly." },
      { status: 500 }
    );
  }
}
