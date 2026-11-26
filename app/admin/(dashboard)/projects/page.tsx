import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";
import { Plus, Edit3, ExternalLink } from "lucide-react";
import ProjectDeleteButton from "./ProjectDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  await connectDB();
  const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
            Projects & Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            Manage your project portfolio, case-study markdown writeups, and featured highlights.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="px-3.5 py-2 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>New Project</span>
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left text-sm min-w-[520px]">
            <thead className="border-b border-border bg-bg/50 font-mono text-xs text-text-muted">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4 hidden sm:table-cell">Slug</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 hidden md:table-cell">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {projects.map((proj) => (
                <tr key={String(proj._id)} className="hover:bg-bg/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-text">
                    <div>{proj.title}</div>
                    <div className="text-xs text-text-muted font-normal sm:hidden">
                      {proj.slug}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-text-muted hidden sm:table-cell">
                    {proj.slug}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        proj.status === "published"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {proj.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-text-muted hidden md:table-cell">
                    {proj.featured ? (
                      <span className="text-accent font-semibold">Yes</span>
                    ) : (
                      "No"
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-xs">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-bg text-text-muted hover:text-text"
                        title="View on site"
                      >
                        <ExternalLink size={13} />
                      </Link>
                      <Link
                        href={`/admin/projects/${String(proj._id)}`}
                        className="p-1.5 rounded hover:bg-bg text-text-muted hover:text-accent"
                        title="Edit project"
                      >
                        <Edit3 size={13} />
                      </Link>
                      <ProjectDeleteButton id={String(proj._id)} title={proj.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
