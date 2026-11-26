"use client";

import { useState } from "react";
import { Download, Upload, Key, Server, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);

  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMsg(null);

    try {
      const res = await fetch("/api/admin/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordMsg({ type: "error", text: data.error || "Password change failed." });
      } else {
        setPasswordMsg({ type: "success", text: data.message });
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch {
      setPasswordMsg({ type: "error", text: "Network error occurred." });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleImportBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm("Importing this backup will overwrite existing database records. Are you sure you want to proceed?")) {
      e.target.value = "";
      return;
    }

    setImporting(true);
    setImportMsg(null);

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      const data = await res.json();
      if (res.ok) {
        setImportMsg("Database successfully restored from backup.");
      } else {
        setImportMsg(data.error || "Failed to restore backup.");
      }
    } catch {
      setImportMsg("Invalid JSON backup file.");
    } finally {
      setImporting(false);
      e.target.value = "";
    }
  };

  const handleRunSeed = async () => {
    if (!confirm("Reset database to initial seed data? This will overwrite edits.")) {
      return;
    }

    setSeeding(true);
    setSeedMsg(null);

    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSeedMsg("Seed data reset successfully.");
      } else {
        setSeedMsg(data.error || "Seeding failed.");
      }
    } catch {
      setSeedMsg("Network error.");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
          Settings & Maintenance
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          System health, password management, database backups, and environment configuration.
        </p>
      </div>

      {/* System Status */}
      <div className="p-5 rounded-lg border border-border bg-surface space-y-3">
        <div className="flex items-center gap-2">
          <Server size={18} className="text-accent" />
          <h2 className="font-serif text-base font-semibold text-text">Environment Status</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-text-muted pt-2 border-t border-border">
          <div>
            <span className="text-text font-medium">Node Environment:</span> {process.env.NODE_ENV || "development"}
          </div>
          <div>
            <span className="text-text font-medium">Next.js Version:</span> 14.2.35
          </div>
          <div>
            <span className="text-text font-medium">Platform:</span> Vercel (or Node.js)
          </div>
          <div>
            <span className="text-text font-medium">Storage Engine:</span> MongoDB GridFS
          </div>
        </div>
      </div>

      {/* Backup and Restore */}
      <div className="p-5 rounded-lg border border-border bg-surface space-y-4">
        <div>
          <h2 className="font-serif text-base font-semibold text-text">Data Backup & Restore</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Export a full JSON snapshot of your portfolio database, or restore from a previously exported backup file.
          </p>
        </div>

        {importMsg && (
          <div className="p-3 rounded bg-accent-soft/30 text-xs font-mono text-text border border-border">
            {importMsg}
          </div>
        )}

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <a
            href="/api/admin/backup"
            className="w-full sm:w-auto justify-center px-4 py-2 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 inline-flex items-center gap-1.5 transition-opacity"
          >
            <Download size={14} />
            <span>Export Backup (JSON)</span>
          </a>

          <label className="w-full sm:w-auto justify-center px-4 py-2 rounded border border-border text-text hover:border-accent hover:text-accent text-xs font-mono font-medium cursor-pointer inline-flex items-center gap-1.5 transition-colors">
            <Upload size={14} />
            <span>{importing ? "Restoring..." : "Import Backup (JSON)"}</span>
            <input
              type="file"
              accept="application/json"
              disabled={importing}
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>

          <button
            onClick={handleRunSeed}
            disabled={seeding}
            className="w-full sm:w-auto justify-center px-4 py-2 rounded border border-border text-text-muted hover:text-accent text-xs font-mono font-medium inline-flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw size={13} className={seeding ? "animate-spin" : ""} />
            <span>Reset to Seed Data</span>
          </button>
        </div>
        {seedMsg && <p className="text-xs font-mono text-accent">{seedMsg}</p>}
      </div>

      {/* Change Password */}
      <div className="p-5 rounded-lg border border-border bg-surface space-y-4">
        <div className="flex items-center gap-2">
          <Key size={18} className="text-accent" />
          <h2 className="font-serif text-base font-semibold text-text">Admin Password Hash</h2>
        </div>
        <p className="text-xs text-text-muted">
          Generate an updated bcrypt password hash for your administrative account.
        </p>

        {passwordMsg && (
          <div
            role="alert"
            className={`p-3 rounded text-xs font-mono ${
              passwordMsg.type === "success"
                ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
            }`}
          >
            {passwordMsg.text}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md">
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">New Password (min 8 chars)</label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 disabled:opacity-50 transition-opacity justify-center inline-flex items-center"
          >
            {passwordLoading ? "Hashing..." : "Generate New Password Hash"}
          </button>
        </form>
      </div>
    </div>
  );
}
