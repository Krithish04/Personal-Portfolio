"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Edit3 } from "lucide-react";

interface PostFormProps {
  initialData?: {
    _id?: string;
    title: string;
    slug: string;
    excerpt: string;
    bodyMarkdown: string;
    tags: string[];
    status: "draft" | "published";
    readingTime: string;
  };
  isNew?: boolean;
}

export default function PostForm({ initialData, isNew = false }: PostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    bodyMarkdown: initialData?.bodyMarkdown || "",
    tagsInput: initialData?.tags?.join(", ") || "",
    status: initialData?.status || "published",
    readingTime: initialData?.readingTime || "3 min read",
  });

  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (isNew && (!prev.slug || prev.slug === prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))) {
        updated.slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const tags = formData.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Calculate approximate reading time
    const wordCount = formData.bodyMarkdown.split(/\s+/).length;
    const calcReadingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const payload = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      bodyMarkdown: formData.bodyMarkdown,
      tags,
      status: formData.status,
      readingTime: formData.readingTime || calcReadingTime,
    };

    try {
      const url = isNew ? "/api/admin/blog" : `/api/admin/blog/${initialData?._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save post.");
      } else {
        router.push("/admin/blog");
        router.refresh();
      }
    } catch {
      setError("Network error occurred.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <Link
          href="/admin/blog"
          className="text-xs font-mono text-text-muted hover:text-accent inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to blog list
        </Link>
        <span className="text-xs font-mono text-text-muted">
          {isNew ? "Creating new post" : `Editing: ${formData.title}`}
        </span>
      </div>

      {error && (
        <div role="alert" className="p-3 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">
              Post Title <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Building Real-Time WebSockets"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">
              URL Slug <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="building-real-time-websockets"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm font-mono text-text focus:border-accent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">
            Short Excerpt (Displayed in lists and RSS) <span className="text-accent">*</span>
          </label>
          <textarea
            rows={2}
            required
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="A short 1-2 sentence overview of the article..."
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tagsInput}
              onChange={(e) => setFormData({ ...formData, tagsInput: e.target.value })}
              placeholder="Architecture, WebSockets, Node.js"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Reading Time</label>
            <input
              type="text"
              value={formData.readingTime}
              onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
              placeholder="4 min read"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
        </div>

        {/* Markdown Editor with Live Preview */}
        <div className="border border-border rounded-lg bg-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-bg/50 px-4 py-2">
            <span className="text-xs font-mono text-text-muted">Post Content (Markdown)</span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("write")}
                className={`px-2.5 py-1 rounded inline-flex items-center gap-1 ${
                  activeTab === "write" ? "bg-surface border border-border text-accent" : "text-text-muted hover:text-text"
                }`}
              >
                <Edit3 size={12} />
                <span>Write</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-2.5 py-1 rounded inline-flex items-center gap-1 ${
                  activeTab === "preview" ? "bg-surface border border-border text-accent" : "text-text-muted hover:text-text"
                }`}
              >
                <Eye size={12} />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {activeTab === "write" ? (
            <textarea
              rows={16}
              value={formData.bodyMarkdown}
              onChange={(e) => setFormData({ ...formData, bodyMarkdown: e.target.value })}
              placeholder="Write your article in Markdown..."
              className="w-full p-4 bg-surface text-sm text-text font-mono focus:outline-none resize-y"
            />
          ) : (
            <div className="p-5 max-w-prose space-y-4 text-text text-sm leading-relaxed min-h-[300px]">
              {formData.bodyMarkdown ? (
                formData.bodyMarkdown.split("\n\n").map((b, i) => {
                  if (b.startsWith("### ")) {
                    return <h3 key={i} className="font-serif text-lg font-semibold border-b border-border pb-1 mt-4">{b.replace("### ", "")}</h3>;
                  }
                  if (b.startsWith("## ")) {
                    return <h2 key={i} className="font-serif text-xl font-semibold border-b border-border pb-1 mt-4">{b.replace("## ", "")}</h2>;
                  }
                  if (b.startsWith("```")) {
                    return <pre key={i} className="p-3 rounded bg-bg border border-border font-mono text-xs overflow-x-auto">{b.replace(/```[a-z]*/g, "")}</pre>;
                  }
                  return <p key={i} className="text-text-muted">{b}</p>;
                })
              ) : (
                <p className="text-text-muted italic">Nothing to preview yet.</p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-muted">Publication Status:</span>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
              className="px-2.5 py-1 rounded border border-border bg-surface text-xs font-mono text-text focus:border-accent outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft (Never public)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="py-2.5 px-6 rounded bg-accent text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? "Saving Post..." : isNew ? "Publish / Save Post" : "Update Post"}
        </button>
      </form>
    </div>
  );
}
