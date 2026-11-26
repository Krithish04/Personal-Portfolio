"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Copy, Check, ImageIcon } from "lucide-react";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [altText, setAltText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (Array.isArray(data)) setMedia(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setError("File exceeds 4 MB limit.");
      return;
    }

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("alt", altText);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        setAltText("");
        fetchMedia();
      }
    } catch {
      setError("Network error occurred during upload.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/admin/media?id=${id}`, { method: "DELETE" });
    fetchMedia();
  };

  const copyUrl = (fileId: string) => {
    const url = `/api/files/${fileId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(fileId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
          Media Library
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Upload and store images directly in MongoDB GridFS for case studies, portraits, and articles.
        </p>
      </div>

      {error && (
        <div role="alert" className="p-3 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium">
          {error}
        </div>
      )}

      {/* Upload Form */}
      <div className="p-5 rounded-lg border border-border bg-surface flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-auto flex-1">
          <label className="block text-xs font-mono text-text-muted mb-1">
            Image Alt Text (Accessibility description)
          </label>
          <input
            type="text"
            placeholder="e.g. Architectural diagram of microservices"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="w-full px-3 py-1.5 rounded border border-border bg-bg text-sm text-text outline-none focus:border-accent"
          />
        </div>

        <label className="shrink-0 px-4 py-2 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 cursor-pointer inline-flex items-center gap-1.5">
          <Upload size={14} />
          <span>{uploading ? "Uploading..." : "Upload Image"}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-sm font-mono text-text-muted py-6">Loading media...</div>
      ) : media.length === 0 ? (
        <p className="text-sm text-text-muted py-6">No images uploaded to GridFS yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {media.map((item) => (
            <div key={item._id} className="rounded-lg border border-border bg-surface overflow-hidden flex flex-col justify-between">
              <div className="h-40 bg-bg flex items-center justify-center overflow-hidden border-b border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/files/${item.fileId}`}
                  alt={item.alt || item.filename}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 space-y-2">
                <div className="text-xs font-medium text-text truncate">{item.filename}</div>
                <div className="text-[11px] font-mono text-text-muted">
                  {(item.size / 1024).toFixed(1)} KB · {item.mime}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border font-mono text-xs">
                  <button
                    onClick={() => copyUrl(item.fileId)}
                    className="text-accent hover:underline inline-flex items-center gap-1"
                  >
                    {copiedId === item.fileId ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    <span>{copiedId === item.fileId ? "Copied" : "Copy URL"}</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-text-muted hover:text-red-500"
                    title="Delete image"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
