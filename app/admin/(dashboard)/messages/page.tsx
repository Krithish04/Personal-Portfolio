"use client";

import { useState, useEffect } from "react";
import { Download, Trash2, Mail, MailOpen, Archive, Copy, Check } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      if (Array.isArray(data)) setMessages(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: !currentRead }),
    });
    fetchMessages();
  };

  const handleToggleArchive = async (id: string, currentArchived: boolean) => {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, archived: !currentArchived }),
    });
    fetchMessages();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this message?")) return;
    await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" });
    fetchMessages();
  };

  const handleClearArchived = async () => {
    if (!confirm("Permanently delete all archived messages?")) return;
    await fetch("/api/admin/messages?action=clear_archived", { method: "DELETE" });
    fetchMessages();
  };

  const copyEmail = (id: string, email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = messages.filter((m) => {
    if (filter === "unread") return !m.read && !m.archived;
    if (filter === "archived") return m.archived;
    return !m.archived;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
            Messages Inbox
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            Read and manage inquiries sent through the public contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/api/admin/messages/export"
            className="px-3 py-1.5 rounded border border-border text-text hover:border-accent hover:text-accent text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </a>
          <button
            onClick={handleClearArchived}
            className="px-3 py-1.5 rounded border border-border text-text-muted hover:text-red-500 text-xs font-mono inline-flex items-center gap-1.5 transition-colors"
          >
            <Trash2 size={13} />
            <span>Clear Archived</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-border text-xs font-mono">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 border-b-2 font-medium ${
            filter === "all" ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          Inbox ({messages.filter((m) => !m.archived).length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 border-b-2 font-medium ${
            filter === "unread" ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          Unread ({messages.filter((m) => !m.read && !m.archived).length})
        </button>
        <button
          onClick={() => setFilter("archived")}
          className={`px-4 py-2 border-b-2 font-medium ${
            filter === "archived" ? "border-accent text-accent" : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          Archived ({messages.filter((m) => m.archived).length})
        </button>
      </div>

      {loading ? (
        <div className="text-sm font-mono text-text-muted py-6">Loading inbox...</div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-text-muted py-6">No messages in this folder.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => (
            <div
              key={msg._id}
              className={`p-5 rounded-lg border transition-colors ${
                !msg.read ? "bg-surface border-accent/40" : "bg-surface/50 border-border"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text text-sm">{msg.name}</span>
                  <button
                    onClick={() => copyEmail(msg._id, msg.email)}
                    className="text-xs font-mono text-text-muted hover:text-accent inline-flex items-center gap-1"
                    title="Click to copy email address"
                  >
                    <span>&lt;{msg.email}&gt;</span>
                    {copiedId === msg._id ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                  </button>
                </div>
                <span className="font-mono text-[11px] text-text-muted">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-sm text-text whitespace-pre-wrap leading-relaxed py-2">
                {msg.message}
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-border/50 text-xs font-mono">
                <button
                  onClick={() => handleToggleRead(msg._id, msg.read)}
                  className="text-text-muted hover:text-text inline-flex items-center gap-1"
                >
                  {msg.read ? <Mail size={13} /> : <MailOpen size={13} />}
                  <span>{msg.read ? "Mark Unread" : "Mark Read"}</span>
                </button>
                <button
                  onClick={() => handleToggleArchive(msg._id, msg.archived)}
                  className="text-text-muted hover:text-text inline-flex items-center gap-1"
                >
                  <Archive size={13} />
                  <span>{msg.archived ? "Unarchive" : "Archive"}</span>
                </button>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="text-text-muted hover:text-red-500 inline-flex items-center gap-1"
                >
                  <Trash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
