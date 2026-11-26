"use client";

import { useState, useEffect } from "react";
import { Upload, CheckCircle2, Trash2, FileText, Download } from "lucide-react";

export default function AdminResumePage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/resume");
      const data = await res.json();
      if (Array.isArray(data)) {
        setResumes(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File exceeds maximum allowed size of 5 MB.");
      return;
    }

    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        fetchResumes();
      }
    } catch {
      setError("Failed to upload file.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSetActive = async (id: string) => {
    const res = await fetch("/api/admin/resume", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchResumes();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this resume version?")) return;
    const res = await fetch(`/api/admin/resume?id=${id}`, { method: "DELETE" });
    if (res.ok) fetchResumes();
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
          Resume Manager
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Upload new PDF resume versions, maintain version history, and choose which version is served live at <code>/api/resume/download</code>.
        </p>
      </div>

      {error && (
        <div role="alert" className="p-3 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium">
          {error}
        </div>
      )}

      {/* Upload Box */}
      <div className="p-6 rounded-lg border-2 border-dashed border-border bg-surface text-center">
        <FileText size={28} className="mx-auto text-accent mb-2" />
        <h3 className="font-serif text-base font-semibold text-text">Upload Resume PDF</h3>
        <p className="text-xs text-text-muted mb-4">
          Maximum file size 5 MB. PDF files only. Magic bytes will be verified.
        </p>

        <label className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 cursor-pointer">
          <Upload size={14} />
          <span>{uploading ? "Uploading..." : "Select PDF File"}</span>
          <input
            type="file"
            accept="application/pdf"
            disabled={uploading}
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Resume Versions List */}
      <div className="space-y-3">
        <h2 className="font-serif text-lg font-semibold text-text">
          Version History ({resumes.length})
        </h2>

        {loading ? (
          <div className="text-sm font-mono text-text-muted py-4">Loading versions...</div>
        ) : resumes.length === 0 ? (
          <p className="text-sm text-text-muted py-4">No PDF resumes uploaded yet.</p>
        ) : (
          <div className="divide-y divide-border rounded-lg border border-border bg-surface overflow-hidden">
            {resumes.map((r) => (
              <div key={r._id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text">{r.originalName}</span>
                    {r.active && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-mono">
                        <CheckCircle2 size={12} />
                        Active Live
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-text-muted mt-1">
                    {(r.size / 1024).toFixed(1)} KB · Uploaded {new Date(r.uploadedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  {r.fileId && (
                    <a
                      href={`/api/files/${r.fileId}`}
                      target="_blank"
                      className="px-2.5 py-1 rounded border border-border hover:border-accent inline-flex items-center gap-1"
                    >
                      <Download size={12} />
                      Download
                    </a>
                  )}
                  {!r.active && (
                    <button
                      onClick={() => handleSetActive(r._id)}
                      className="px-2.5 py-1 rounded bg-surface border border-border hover:border-accent text-accent"
                    >
                      Set Active
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="p-1 rounded text-text-muted hover:text-red-500"
                    title="Delete version"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
