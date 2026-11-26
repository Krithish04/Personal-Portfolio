import nodemailer from "nodemailer";
import { getEnvValue } from "./auth";

interface ContactNotificationParams {
  name: string;
  email: string;
  message: string;
}

export async function sendContactNotification({
  name,
  email,
  message,
}: ContactNotificationParams): Promise<boolean> {
  const user = getEnvValue("SMTP_USER");
  const pass = getEnvValue("SMTP_PASS");
  const host = getEnvValue("SMTP_HOST") || (user?.endsWith("@gmail.com") ? "smtp.gmail.com" : "");
  const port = Number(getEnvValue("SMTP_PORT")) || 465;
  const toEmail = getEnvValue("CONTACT_TO_EMAIL") || user || "suvarnakrithish24@gmail.com";

  if (!user || !pass || !host) {
    console.log(
      "[EMAIL] SMTP not fully configured in .env (SMTP_USER / SMTP_PASS). Message saved to admin dashboard only."
    );
    return false;
  }

  try {
    const isGmail = host.includes("gmail.com");
    const transporter = nodemailer.createTransport(
      isGmail
        ? {
            service: "gmail",
            auth: {
              user,
              pass,
            },
          }
        : {
            host,
            port,
            secure: port === 465,
            auth: {
              user,
              pass,
            },
          }
    );

    const dateStr = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${user}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio Contact] New message from ${name}`,
      text: `You received a new message through your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nDate: ${dateStr}\n\nMessage:\n${message}\n\n---\nView all messages in your admin panel at /admin/messages`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E4DDD2; border-radius: 8px; background-color: #FAF7F2; color: #2B2622;">
          <h2 style="margin-top: 0; color: #9F4F2C; font-size: 20px; border-bottom: 1px solid #E4DDD2; padding-bottom: 12px;">
            New Portfolio Message
          </h2>
          <div style="margin: 16px 0; font-size: 14px; line-height: 1.6;">
            <p style="margin: 4px 0;"><strong>Sender:</strong> ${name}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #9F4F2C; text-decoration: underline;">${email}</a></p>
            <p style="margin: 4px 0; color: #6E655C; font-size: 12px;"><strong>Received:</strong> ${dateStr} (IST)</p>
          </div>
          <div style="margin-top: 16px; padding: 16px; background-color: #FFFFFF; border: 1px solid #E4DDD2; border-radius: 6px; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
${message}
          </div>
          <div style="margin-top: 24px; font-size: 12px; color: #6E655C; text-align: center;">
            <p style="margin: 0;">Hit <strong>Reply</strong> to respond directly to ${name} (${email}).</p>
            <p style="margin: 4px 0 0 0;">This notification was dispatched by your Next.js portfolio.</p>
          </div>
        </div>
      `,
    });

    console.log(`[EMAIL] Notification dispatched successfully to ${toEmail}:`, info.messageId);
    return true;
  } catch (err: any) {
    console.error("[EMAIL] Failed to send email notification:", err.message);
    return false;
  }
}
