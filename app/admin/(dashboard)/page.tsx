import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Project, Post, Message, PageView } from "@/models";
import {
  FolderGit2,
  BookOpen,
  Mail,
  Eye,
  Plus,
  ArrowUpRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let projectCount = 0;
  let postCount = 0;
  let unreadMessageCount = 0;
  let recentMessages: any[] = [];
  let views7d = 0;

  try {
    const conn = await connectDB();
    if (conn) {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const [pCount, bCount, mCount, msgs, views] = await Promise.all([
        Project.countDocuments({ status: "published" }),
        Post.countDocuments({ status: "published" }),
        Message.countDocuments({ read: false, archived: false }),
        Message.find().sort({ createdAt: -1 }).limit(5).lean(),
        PageView.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
      ]);

      projectCount = pCount;
      postCount = bCount;
      unreadMessageCount = mCount;
      recentMessages = msgs;
      views7d = views;
    }
  } catch (err) {
    console.error("Dashboard DB error:", err);
  }

  const statCards = [
    {
      label: "Published Projects",
      value: projectCount,
      href: "/admin/projects",
      icon: FolderGit2,
    },
    {
      label: "Blog Posts",
      value: postCount,
      href: "/admin/blog",
      icon: BookOpen,
    },
    {
      label: "Unread Messages",
      value: unreadMessageCount,
      href: "/admin/messages",
      icon: Mail,
      highlight: unreadMessageCount > 0,
    },
    {
      label: "Views (Last 7 Days)",
      value: views7d,
      href: "/admin/analytics",
      icon: Eye,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            Overview of your portfolio content, audience traffic, and recent inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/projects/new"
            className="px-3 py-1.5 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/blog/new"
            className="px-3 py-1.5 rounded border border-border text-text text-xs font-mono font-medium hover:border-accent hover:text-accent transition-colors inline-flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`p-5 rounded-lg border transition-colors ${
                card.highlight
                  ? "bg-accent-soft/30 border-accent/40"
                  : "bg-surface border-border hover:border-accent/50"
              }`}
            >
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="font-mono text-xs">{card.label}</span>
                <Icon size={16} />
              </div>
              <div className="text-2xl sm:text-3xl font-semibold text-text font-serif">
                {card.value}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Messages Section */}
      <div className="rounded-lg border border-border bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-semibold text-text">
            Recent Inquiries
          </h2>
          <Link
            href="/admin/messages"
            className="text-xs font-mono text-text-muted hover:text-accent inline-flex items-center gap-1"
          >
            <span>All messages</span>
            <ArrowUpRight size={12} />
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="text-sm text-text-muted py-4">No inquiries received yet.</p>
        ) : (
          <div className="divide-y divide-border/60">
            {recentMessages.map((msg) => (
              <div
                key={String(msg._id)}
                className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-sm"
              >
                <div>
                  <span className="font-medium text-text">{msg.name}</span>
                  <span className="text-xs text-text-muted ml-2 font-mono">
                    {msg.email}
                  </span>
                  <p className="text-text-muted text-xs line-clamp-1 mt-0.5">
                    {msg.message}
                  </p>
                </div>
                <span className="text-[11px] font-mono text-text-muted shrink-0">
                  {new Date(msg.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
