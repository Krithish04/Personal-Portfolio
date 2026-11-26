import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import {
  getProfile,
  getProjects,
  getExperience,
  getSkills,
  getEducation,
  getLatestPosts,
  getFeatureFlags,
} from "@/lib/data";

export default async function Home() {
  const [profile, projects, experience, skills, education, latestPosts, flags] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getExperience(),
      getSkills(),
      getEducation(),
      getLatestPosts(3),
      getFeatureFlags(),
    ]);

  // JSON-LD Person schema for search engine optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.tagline,
    url: "https://krithish-portfolio.vercel.app",
    sameAs: profile.socials.map((s) => s.url),
    email: `mailto:${profile.email}`,
    description: profile.intro,
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      {/* Search Engine Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Nav
        showBlog={flags.blog}
        showResume={flags.resumeDownload}
        showContact={flags.contactForm}
      />

      <main id="main-content" className="flex-1 max-w-container w-full mx-auto px-4 sm:px-6 md:px-8">
        {/* 1. Intro */}
        <Hero
          name={profile.name}
          role={profile.tagline}
          summary={profile.intro}
          showPortrait={true}
        />

        {/* About Prose Summary */}
        <About content={profile.intro} />

        {/* 2 & 3. Selected Work & More Projects */}
        <Projects
          projects={projects}
          showAll={false}
          showCaseStudies={flags.caseStudies}
        />

        {/* 4. Experience Timeline */}
        <Experience items={experience} />

        {/* 5. Grouped Skills */}
        <Skills groups={skills} />

        {/* 6. Education */}
        <Education items={education} />

        {/* 7. Latest Writing (if blog feature enabled) */}
        {flags.blog && latestPosts.length > 0 && (
          <section id="blog" className="py-8 sm:py-12 border-b border-border">
            <div className="flex items-baseline justify-between mb-4 sm:mb-6">
              <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-semibold tracking-tight text-text">
                Writing
              </h2>
              <Link
                href="/blog"
                className="text-xs font-mono text-text-muted hover:text-accent transition-colors shrink-0 ml-2"
              >
                All posts ({latestPosts.length}) →
              </Link>
            </div>
            <div className="space-y-4">
              {latestPosts.map((post) => (
                <article
                  key={post.id}
                  className="p-4 sm:p-5 rounded-lg bg-surface border border-border hover:border-accent/60 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                    <h3 className="font-serif text-base xs:text-lg font-semibold text-text">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-accent transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <span className="font-mono text-xs text-text-muted shrink-0">
                      {post.publishedAt}
                    </span>
                  </div>
                  <p className="text-xs xs:text-sm text-text-muted leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-text-muted">
                    <span className="mr-1">{post.readingTime}</span>
                    {post.tags.map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-bg border border-border">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* 8. Contact Invitation */}
        <section id="contact" className="py-8 sm:py-12">
          <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-semibold tracking-tight text-text mb-2.5 sm:mb-3">
            Get in touch
          </h2>
          <p className="text-text-muted text-xs xs:text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 max-w-prose">
            I am currently open to full-stack, backend, and DevOps engineering opportunities. Feel free to reach out directly by email or through the contact form.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-mono">
            <a
              href={`mailto:${profile.email}`}
              className="text-accent hover:underline inline-flex items-center gap-1 font-sans font-medium break-all"
            >
              <span>{profile.email}</span>
              <ArrowUpRight size={14} className="shrink-0" />
            </a>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-text-muted font-sans pt-1 sm:pt-0">
              {flags.contactForm && (
                <>
                  <span className="text-border hidden sm:inline" aria-hidden="true">·</span>
                  <Link
                    href="/contact"
                    className="hover:text-text transition-colors"
                  >
                    Contact Form →
                  </Link>
                </>
              )}
              <span className="text-border" aria-hidden="true">·</span>
              <a
                href="https://github.com/Krithish04"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text transition-colors"
              >
                GitHub
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a
                href="https://www.linkedin.com/in/krithish04"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer showPhone={flags.showPhone} />
    </div>
  );
}
