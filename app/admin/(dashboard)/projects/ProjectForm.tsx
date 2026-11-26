"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Edit3 } from "lucide-react";

interface ProjectFormProps {
  initialData?: {
    _id?: string;
    title: string;
    slug: string;
    subtitle: string;
    summary: string;
    bodyMarkdown: string;
    role: string;
    timeframe: string;
    tech: string[];
    links?: { repo?: string; demo?: string };
    flowNodes?: string[];
    featured: boolean;
    order: number;
    status: "draft" | "published";
  };
  isNew?: boolean;
}

export default function ProjectForm({ initialData, isNew = false }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    subtitle: initialData?.subtitle || "",
    summary: initialData?.summary || "",
    bodyMarkdown: initialData?.bodyMarkdown || "",
    role: initialData?.role || "Full-Stack Developer",
    timeframe: initialData?.timeframe || "",
    techInput: initialData?.tech?.join(", ") || "",
    flowNodesInput: initialData?.flowNodes?.join(", ") || "",
    repoUrl: initialData?.links?.repo || "",
    demoUrl: initialData?.links?.demo || "",
    featured: initialData?.featured || false,
    order: initialData?.order ?? 0,
    status: initialData?.status || "published",
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

    const tech = formData.techInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const flowNodes = formData.flowNodesInput
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      slug: formData.slug,
      subtitle: formData.subtitle,
      summary: formData.summary,
      bodyMarkdown: formData.bodyMarkdown,
      role: formData.role,
      timeframe: formData.timeframe,
      tech,
      flowNodes,
      links: {
        repo: formData.repoUrl,
        demo: formData.demoUrl,
      },
      featured: formData.featured,
      order: Number(formData.order),
      status: formData.status,
    };

    try {
      const url = isNew ? "/api/admin/projects" : `/api/admin/projects/${initialData?._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to save project.");
      } else {
        router.push("/admin/projects");
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
          href="/admin/projects"
          className="text-xs font-mono text-text-muted hover:text-accent inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to projects
        </Link>
        <span className="text-xs font-mono text-text-muted">
          {isNew ? "Creating new project" : `Editing: ${formData.title}`}
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
              Project Title <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. DineSync AI"
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
              placeholder="dinesync"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm font-mono text-text focus:border-accent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Subtitle / One-line tagline</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="AI-Powered Multi-Tenant Restaurant ERP"
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">
            Short Summary (Displayed on cards) <span className="text-accent">*</span>
          </label>
          <textarea
            rows={2}
            required
            value={formData.summary}
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="High-level 2-sentence summary of the architecture and outcome..."
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Your Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Full-Stack Developer & Architect"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Timeframe</label>
            <input
              type="text"
              value={formData.timeframe}
              onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
              placeholder="08/2026 – Present"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Tech Stack (comma-separated)</label>
            <input
              type="text"
              value={formData.techInput}
              onChange={(e) => setFormData({ ...formData, techInput: e.target.value })}
              placeholder="React, FastAPI, Node.js, Redis, Docker"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Architecture Flow Nodes (comma-separated)</label>
            <input
              type="text"
              value={formData.flowNodesInput}
              onChange={(e) => setFormData({ ...formData, flowNodesInput: e.target.value })}
              placeholder="Client POS, FastAPI Service, Socket.IO KDS, Docker"
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Repository URL</label>
            <input
              type="url"
              value={formData.repoUrl}
              onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
              placeholder="https://github.com/Krithish04/..."
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Live Demo URL</label>
            <input
              type="url"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
        </div>

        {/* Markdown Body with Live Preview */}
        <div className="border border-border rounded-lg bg-surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-border bg-bg/50 px-4 py-2">
            <span className="text-xs font-mono text-text-muted">Case Study Body (Markdown)</span>
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
              rows={12}
              value={formData.bodyMarkdown}
              onChange={(e) => setFormData({ ...formData, bodyMarkdown: e.target.value })}
              placeholder="## Overview&#10;Describe the project...&#10;&#10;## The Problem&#10;What challenges did this solve?&#10;&#10;## Key Architecture Decisions&#10;- Decision 1&#10;- Decision 2"
              className="w-full p-4 bg-surface text-sm text-text font-mono focus:outline-none resize-y"
            />
          ) : (
            <div className="p-5 max-w-prose space-y-4 text-text text-sm leading-relaxed min-h-[250px]">
              {formData.bodyMarkdown ? (
                formData.bodyMarkdown.split("\n\n").map((b, i) => {
                  if (b.startsWith("## ")) {
                    return <h2 key={i} className="font-serif text-xl font-semibold border-b border-border pb-1 mt-4">{b.replace("## ", "")}</h2>;
                  }
                  if (b.startsWith("- ")) {
                    return (
                      <ul key={i} className="list-disc ml-4 space-y-1 text-text-muted">
                        {b.split("\n").map((item, idx) => (
                          <li key={idx}>{item.replace("- ", "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="text-text-muted">{b}</p>;
                })
              ) : (
                <p className="text-text-muted italic">Nothing to preview yet. Switch to write tab.</p>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs font-mono text-text cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="rounded border-border text-accent focus:ring-accent"
            />
            <span>Featured Project (Appears on Home page)</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-muted">Status:</span>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "draft" | "published" })}
              className="px-2.5 py-1 rounded border border-border bg-surface text-xs font-mono text-text focus:border-accent outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-muted">Order:</span>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
              className="w-16 px-2 py-1 rounded border border-border bg-surface text-xs font-mono text-text focus:border-accent outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto py-2.5 px-6 rounded bg-accent text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity shadow-sm"
        >
          {saving ? "Saving Project..." : isNew ? "Create Project" : "Update Project"}
        </button>
      </form>
    </div>
  );
}
