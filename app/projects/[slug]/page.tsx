import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MiniFlow from "@/components/MiniFlow";
import { getProjects, getProjectBySlug, getFeatureFlags } from "@/lib/data";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const [project, flags, allProjects] = await Promise.all([
    getProjectBySlug(params.slug),
    getFeatureFlags(),
    getProjects(),
  ]);

  // If case studies feature is toggled off, return 404 per §6.8
  if (!flags.caseStudies || !project) {
    notFound();
  }

  // Calculate previous and next project links
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Nav
        showBlog={flags.blog}
        showResume={flags.resumeDownload}
        showContact={flags.contactForm}
      />
      <main id="main-content" className="flex-1 max-w-container w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        {/* Back Link */}
        <div className="mb-5 sm:mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft size={13} />
            Back to all projects
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-border">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
              Case Study
            </span>
            {project.timeframe && (
              <>
                <span className="text-border" aria-hidden="true">·</span>
                <span className="font-mono text-xs text-text-muted">
                  {project.timeframe}
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-semibold tracking-tight text-text mb-2">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-text-muted leading-relaxed mb-4">
            {project.subtitle}
          </p>

          {/* Links & Role Metadata */}
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 pt-3.5 border-t border-border/60">
            <div className="font-mono text-xs text-text-muted">
              <span className="text-text font-medium">Role:</span> {project.role || "Full-Stack Developer"}
            </div>

            <div className="flex items-center gap-2.5 font-mono text-xs">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded border border-border text-text hover:border-accent hover:text-accent transition-colors inline-flex items-center gap-1.5"
                >
                  <Github size={13} />
                  <span>Repository</span>
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-accent text-white hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 font-medium shadow-sm"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight size={13} />
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Deployment & Operations (draft) */}
        {project.deployment && (
          <div className="mb-6 sm:mb-8 p-4 sm:p-5 rounded-lg bg-surface border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
                Deployment & operations
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bg border border-border text-text-muted">
                draft
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-mono">
              {project.deployment}
            </p>
          </div>
        )}

        {/* DineSync Demo Video (lazy-loaded, controls, no autoplay) */}
        {project.slug === "dinesync" && (
          <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden border border-border bg-surface">
            <video
              controls
              playsInline
              preload="none"
              poster="/dinesync_preview.jpg"
              className="w-full h-auto object-cover max-h-[440px]"
            >
              <source src="/dinesync_demo.mp4" type="video/mp4" />
              Your browser does not support HTML5 video playback.
            </video>
            <div className="p-2 sm:p-2.5 text-center text-xs font-mono text-text-muted">
              Live Kitchen Display System (KDS) synchronization demo
            </div>
          </div>
        )}

        {/* Static Flat Architecture Flow */}
        {project.flowNodes && project.flowNodes.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <MiniFlow nodes={project.flowNodes} />
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-lg bg-surface border border-border">
          <div className="text-[11px] sm:text-xs font-mono text-text-muted uppercase tracking-wider mb-2">
            Technologies & Tools
          </div>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] sm:text-xs text-text px-2 py-0.5 sm:py-1 rounded bg-bg border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study Content Body */}
        <section className="prose dark:prose-invert max-w-prose text-text space-y-5 sm:space-y-6 leading-relaxed break-words">
          {project.bodyMarkdown ? (
            <div className="space-y-4">
              {project.bodyMarkdown.split("\n\n").map((block, idx) => {
                if (block.startsWith("## ")) {
                  return (
                    <h2
                      key={idx}
                      className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-text mt-6 mb-2 border-b border-border/60 pb-1"
                    >
                      {block.replace("## ", "")}
                    </h2>
                  );
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").map((line) => line.replace("- ", ""));
                  return (
                    <ul key={idx} className="list-disc list-outside ml-4 space-y-1.5 text-text-muted text-xs sm:text-sm md:text-base">
                      {items.map((it, iIdx) => (
                        <li key={iIdx}>{it}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-text-muted text-xs sm:text-sm md:text-base leading-relaxed">
                    {block}
                  </p>
                );
              })}
            </div>
          ) : (
            <p className="text-text-muted text-sm sm:text-base">{project.summary}</p>
          )}
        </section>

        {/* Previous / Next Project Navigation Footer */}
        <nav aria-label="Project Navigation" className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col xs:flex-row justify-between items-stretch xs:items-center gap-2.5 sm:gap-4 text-xs font-mono">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="p-2.5 xs:p-0 rounded border border-border xs:border-0 text-text-muted hover:text-accent transition-colors text-center xs:text-left truncate max-w-full"
            >
              ← {prevProject.title}
            </Link>
          ) : (
            <span className="hidden xs:inline" />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="p-2.5 xs:p-0 rounded border border-border xs:border-0 text-text-muted hover:text-accent transition-colors text-center xs:text-right truncate max-w-full"
            >
              {nextProject.title} →
            </Link>
          ) : (
            <span className="hidden xs:inline" />
          )}
        </nav>
      </main>
      <Footer showBlog={flags.blog} showResume={flags.resumeDownload} />
    </div>
  );
}
