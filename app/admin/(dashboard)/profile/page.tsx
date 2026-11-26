"use client";

import { useState, useEffect } from "react";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    tagline: "",
    eyebrow: "",
    intro: "",
    heroIntro: "",
    aboutMarkdown: "",
    contactBlurb: "",
    email: "",
    phone: "",
    metaDescription: "",
    footerText: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setProfile({
            name: data.name || "",
            tagline: data.tagline || "",
            eyebrow: data.eyebrow || "FULL-STACK DEVELOPER & DEVOPS INTERN",
            intro: data.intro || "",
            heroIntro: data.heroIntro || data.intro || "",
            aboutMarkdown: data.aboutMarkdown || "",
            contactBlurb: data.contactBlurb || "",
            email: data.email || "",
            phone: data.phone || "",
            metaDescription: data.metaDescription || "",
            footerText: data.footerText || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Failed to save profile." });
      } else {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm font-mono text-text-muted">Loading profile settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-text">Profile & Bio</h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Update your public portfolio name, headline, summary text, and contact information.
        </p>
      </div>

      {message && (
        <div
          role="alert"
          className={`p-3 rounded text-xs font-medium ${
            message.type === "success"
              ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
              : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Full Name</label>
          <input
            type="text"
            required
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Eyebrow Label (Hero Top Tag)</label>
          <input
            type="text"
            required
            value={profile.eyebrow}
            onChange={(e) => setProfile({ ...profile, eyebrow: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            placeholder="FULL-STACK DEVELOPER & DEVOPS INTERN"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Tagline / Role</label>
          <input
            type="text"
            required
            value={profile.tagline}
            onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Hero Paragraph</label>
          <textarea
            rows={3}
            required
            value={profile.heroIntro || profile.intro}
            onChange={(e) =>
              setProfile({ ...profile, heroIntro: e.target.value, intro: e.target.value })
            }
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none resize-y"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">About Section Narrative (Markdown)</label>
          <textarea
            rows={5}
            required
            value={profile.aboutMarkdown}
            onChange={(e) => setProfile({ ...profile, aboutMarkdown: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none resize-y"
            placeholder="Write your About section narrative..."
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Get In Touch Blurb</label>
          <textarea
            rows={2}
            value={profile.contactBlurb}
            onChange={(e) => setProfile({ ...profile, contactBlurb: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none resize-y"
            placeholder="I'm open to internship and entry-level roles..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">Public Email</label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-text-muted mb-1">
              Phone Number <span className="text-[10px] text-text-muted/60">(Controlled by toggle)</span>
            </label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Default Meta Description</label>
          <input
            type="text"
            value={profile.metaDescription}
            onChange={(e) => setProfile({ ...profile, metaDescription: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-text-muted mb-1">Footer Tagline</label>
          <input
            type="text"
            value={profile.footerText}
            onChange={(e) => setProfile({ ...profile, footerText: e.target.value })}
            className="w-full px-3 py-2 rounded border border-border bg-surface text-base sm:text-sm text-text focus:border-accent outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto py-2.5 px-6 rounded bg-accent text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
