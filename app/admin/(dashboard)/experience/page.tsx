"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Briefcase, GraduationCap, Code2 } from "lucide-react";

export default function AdminExperiencePage() {
  const [tab, setTab] = useState<"experience" | "education" | "skills">("experience");
  const [experiences, setExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New item form state
  const [newExp, setNewExp] = useState({ role: "", org: "", location: "", date: "", bulletsText: "" });
  const [newEdu, setNewEdu] = useState({ school: "", degree: "", location: "", date: "" });
  const [newSkill, setNewSkill] = useState({ title: "", itemsText: "" });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [expRes, eduRes, skillRes] = await Promise.all([
        fetch("/api/admin/experience").then((r) => r.json()),
        fetch("/api/admin/education").then((r) => r.json()),
        fetch("/api/admin/skills").then((r) => r.json()),
      ]);
      setExperiences(Array.isArray(expRes) ? expRes : []);
      setEducations(Array.isArray(eduRes) ? eduRes : []);
      setSkills(Array.isArray(skillRes) ? skillRes : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateExp = async (e: React.FormEvent) => {
    e.preventDefault();
    const bullets = newExp.bulletsText.split("\n").map((b) => b.trim()).filter(Boolean);
    const res = await fetch("/api/admin/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newExp, bullets, order: experiences.length + 1 }),
    });
    if (res.ok) {
      setNewExp({ role: "", org: "", location: "", date: "", bulletsText: "" });
      fetchData();
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleCreateEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/education", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newEdu, order: educations.length + 1 }),
    });
    if (res.ok) {
      setNewEdu({ school: "", degree: "", location: "", date: "" });
      fetchData();
    }
  };

  const handleDeleteEdu = async (id: string) => {
    if (!confirm("Delete this education entry?")) return;
    await fetch(`/api/admin/education?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleCreateSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    const items = newSkill.itemsText.split(",").map((i) => i.trim()).filter(Boolean);
    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newSkill.title, items, order: skills.length + 1 }),
    });
    if (res.ok) {
      setNewSkill({ title: "", itemsText: "" });
      fetchData();
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Delete this skill group?")) return;
    await fetch(`/api/admin/skills?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
          Experience, Education & Skills
        </h1>
        <p className="text-xs sm:text-sm text-text-muted mt-0.5">
          Manage your career timeline milestones, university degrees, and categorized skills.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-xs font-mono overflow-x-auto w-full whitespace-nowrap scrollbar-none">
        <button
          onClick={() => setTab("experience")}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 flex-shrink-0 ${
            tab === "experience"
              ? "border-accent text-accent"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          <Briefcase size={14} />
          <span>Experience ({experiences.length})</span>
        </button>
        <button
          onClick={() => setTab("education")}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 flex-shrink-0 ${
            tab === "education"
              ? "border-accent text-accent"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          <GraduationCap size={14} />
          <span>Education ({educations.length})</span>
        </button>
        <button
          onClick={() => setTab("skills")}
          className={`px-4 py-2.5 border-b-2 font-medium flex items-center gap-2 flex-shrink-0 ${
            tab === "skills"
              ? "border-accent text-accent"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          <Code2 size={14} />
          <span>Skills ({skills.length})</span>
        </button>
      </div>

      {loading ? (
        <div className="text-sm font-mono text-text-muted py-8">Loading data...</div>
      ) : tab === "experience" ? (
        <div className="space-y-6">
          <form onSubmit={handleCreateExp} className="p-4 rounded-lg bg-surface border border-border space-y-3">
            <h3 className="font-serif text-base font-semibold text-text">Add Work Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Role (e.g. MERN Stack Intern)"
                value={newExp.role}
                onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
              <input
                type="text"
                required
                placeholder="Company & Location (e.g. Devisoft · Surat)"
                value={newExp.org}
                onChange={(e) => setNewExp({ ...newExp, org: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Date range (e.g. 05/2026 – 07/2026)"
                value={newExp.date}
                onChange={(e) => setNewExp({ ...newExp, date: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
              <input
                type="text"
                placeholder="City / Country (optional)"
                value={newExp.location}
                onChange={(e) => setNewExp({ ...newExp, location: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <textarea
              rows={3}
              placeholder="Bullet points (one per line)..."
              value={newExp.bulletsText}
              onChange={(e) => setNewExp({ ...newExp, bulletsText: e.target.value })}
              className="w-full px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 inline-flex items-center justify-center gap-1"
            >
              <Plus size={13} />
              <span>Add Experience</span>
            </button>
          </form>

          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp._id} className="p-4 rounded-lg bg-surface border border-border flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-semibold text-text text-sm">{exp.role}</h4>
                  <p className="text-xs text-accent mt-0.5">{exp.org} · <span className="text-text-muted">{exp.date}</span></p>
                  <ul className="mt-2 list-disc list-outside ml-4 text-xs text-text-muted space-y-1">
                    {exp.bullets?.map((b: string, i: number) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => handleDeleteExp(exp._id)}
                  className="text-text-muted hover:text-red-500 p-1"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : tab === "education" ? (
        <div className="space-y-6">
          <form onSubmit={handleCreateEdu} className="p-4 rounded-lg bg-surface border border-border space-y-3">
            <h3 className="font-serif text-base font-semibold text-text">Add Education</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Institution (e.g. Christ University)"
                value={newEdu.school}
                onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
              <input
                type="text"
                required
                placeholder="Degree (e.g. Master of Computer Applications)"
                value={newEdu.degree}
                onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Timeframe / Expected Year (e.g. Expected 05/2027)"
                value={newEdu.date}
                onChange={(e) => setNewEdu({ ...newEdu, date: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
              <input
                type="text"
                placeholder="Location (e.g. Delhi NCR)"
                value={newEdu.location}
                onChange={(e) => setNewEdu({ ...newEdu, location: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 inline-flex items-center justify-center gap-1"
            >
              <Plus size={13} />
              <span>Add Education</span>
            </button>
          </form>

          <div className="space-y-3">
            {educations.map((edu) => (
              <div key={edu._id} className="p-4 rounded-lg bg-surface border border-border flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-semibold text-text text-sm">{edu.school}</h4>
                  <p className="text-xs text-text-muted mt-0.5">{edu.degree} — {edu.location} ({edu.date})</p>
                </div>
                <button
                  onClick={() => handleDeleteEdu(edu._id)}
                  className="text-text-muted hover:text-red-500 p-1"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <form onSubmit={handleCreateSkill} className="p-4 rounded-lg bg-surface border border-border space-y-3">
            <h3 className="font-serif text-base font-semibold text-text">Add Skill Group</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Group Title (e.g. Cloud & DevOps)"
                value={newSkill.title}
                onChange={(e) => setNewSkill({ ...newSkill, title: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
              <input
                type="text"
                required
                placeholder="Items (comma-separated: Docker, Nginx, Linux)"
                value={newSkill.itemsText}
                onChange={(e) => setNewSkill({ ...newSkill, itemsText: e.target.value })}
                className="px-3 py-2 rounded border border-border bg-bg text-base sm:text-sm text-text outline-none focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 inline-flex items-center justify-center gap-1"
            >
              <Plus size={13} />
              <span>Add Skill Group</span>
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((s) => (
              <div key={s._id} className="p-4 rounded-lg bg-surface border border-border flex justify-between items-start gap-3">
                <div>
                  <h4 className="font-mono text-xs text-accent font-semibold">{s.title}</h4>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.items?.map((item: string) => (
                      <span key={item} className="px-2 py-0.5 rounded bg-bg border border-border text-xs font-mono text-text">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteSkill(s._id)}
                  className="text-text-muted hover:text-red-500 p-1"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
