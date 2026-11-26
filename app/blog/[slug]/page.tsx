import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/db";
import { Post } from "@/models";
import { getFeatureFlags } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  await connectDB();
  const post = await Post.findOne({ slug: params.slug, status: "published" }).lean();
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Krithish Ravindra Suvarna`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const flags = await getFeatureFlags();
  if (!flags.blog) notFound();

  await connectDB();
  // Strictly query published posts: drafts are NEVER public per §5.3
  const post = await Post.findOne({ slug: params.slug, status: "published" }).lean();
  if (!post) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Nav
        showBlog={flags.blog}
        showResume={flags.resumeDownload}
        showContact={flags.contactForm}
      />
      <main id="main-content" className="flex-1 max-w-container w-full mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={13} />
            Back to all writing
          </Link>
        </div>

        <article className="space-y-6">
          <header className="pb-6 border-b border-border">
            <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs text-text-muted">
              <span>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                  : ""}
              </span>
              <span className="text-border" aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-text mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-1.5">
              {post.tags?.map((t: string) => (
                <span
                  key={t}
                  className="font-mono text-xs text-text-muted px-2 py-0.5 rounded bg-surface border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>

          {/* Formatted Markdown Content */}
          <div className="prose dark:prose-invert max-w-prose text-text space-y-6 leading-relaxed">
            {post.bodyMarkdown.split("\n\n").map((block: string, idx: number) => {
              if (block.startsWith("### ")) {
                return (
                  <h3
                    key={idx}
                    className="font-serif text-xl font-semibold tracking-tight text-text mt-6 mb-2"
                  >
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={idx}
                    className="font-serif text-2xl font-semibold tracking-tight text-text mt-8 mb-3 border-b border-border/60 pb-1"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              if (block.startsWith("```")) {
                const lines = block.split("\n");
                const code = lines.slice(1, -1).join("\n");
                return (
                  <pre
                    key={idx}
                    className="p-4 rounded-lg bg-surface border border-border font-mono text-xs overflow-x-auto text-text"
                  >
                    <code>{code}</code>
                  </pre>
                );
              }
              return (
                <p key={idx} className="text-text-muted text-base leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>
        </article>
      </main>
      <Footer showPhone={flags.showPhone} />
    </div>
  );
}
