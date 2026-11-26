import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/db";
import { Post } from "@/models";
import { getFeatureFlags } from "@/lib/data";

export const metadata = {
  title: "Writing & Engineering Notes — Krithish Ravindra Suvarna",
  description:
    "Technical articles and design notes on full-stack architecture, microservices, and distributed real-time systems.",
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const flags = await getFeatureFlags();
  if (!flags.blog) {
    notFound();
  }

  await connectDB();
  const posts = await Post.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .lean();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Nav
        showBlog={flags.blog}
        showResume={flags.resumeDownload}
        showContact={flags.contactForm}
      />
      <main id="main-content" className="flex-1 max-w-container w-full mx-auto px-4 sm:px-6 md:px-8 py-12">
        <header className="mb-10 pb-6 border-b border-border">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
            Writing
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-text mt-2 mb-3">
            Articles & Engineering Notes
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-prose">
            Reflections, architectural breakdowns, and implementation lessons learned while building distributed web systems and microservices.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-sm text-text-muted py-8">No articles published yet.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={String(post._id)}
                className="p-5 sm:p-6 rounded-lg bg-surface border border-border hover:border-accent/70 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                  <h2 className="font-serif text-xl font-semibold text-text">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-accent transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <span className="font-mono text-xs text-text-muted shrink-0">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                      : ""}
                  </span>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                  <span>{post.readingTime || "3 min read"}</span>
                  {post.tags?.map((t: string) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-bg border border-border text-[11px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer showPhone={flags.showPhone} />
    </div>
  );
}
