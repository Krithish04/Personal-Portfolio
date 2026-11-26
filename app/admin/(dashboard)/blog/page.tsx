import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Post } from "@/models";
import { Plus, Edit3, ExternalLink } from "lucide-react";
import PostDeleteButton from "./PostDeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-text">
            Blog & Articles
          </h1>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            Write technical articles, design notes, and manage draft vs. published visibility.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="px-3.5 py-2 rounded bg-accent text-white text-xs font-mono font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>New Post</span>
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
                <th className="py-3 px-4 hidden md:table-cell">Reading Time</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {posts.map((post) => (
                <tr key={String(post._id)} className="hover:bg-bg/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-text">
                    <div>{post.title}</div>
                    <div className="text-xs text-text-muted font-normal sm:hidden">
                      {post.slug}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-text-muted hidden sm:table-cell">
                    {post.slug}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        post.status === "published"
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-xs text-text-muted hidden md:table-cell">
                    {post.readingTime}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-xs">
                    <div className="flex items-center justify-end gap-2">
                      {post.status === "published" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-1.5 rounded hover:bg-bg text-text-muted hover:text-text"
                          title="View post on site"
                        >
                          <ExternalLink size={13} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/blog/${String(post._id)}`}
                        className="p-1.5 rounded hover:bg-bg text-text-muted hover:text-accent"
                        title="Edit post"
                      >
                        <Edit3 size={13} />
                      </Link>
                      <PostDeleteButton id={String(post._id)} title={post.title} />
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
