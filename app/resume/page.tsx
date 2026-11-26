import { notFound } from "next/navigation";
import { Download } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getProfile, getExperience, getEducation, getSkills, getFeatureFlags } from "@/lib/data";

export const metadata = {
  title: "Resume — Krithish Ravindra Suvarna",
  description:
    "Curriculum Vitae and background summary of Krithish Ravindra Suvarna, Full-Stack Developer & DevOps Intern.",
};

export default async function ResumePage() {
  const [profile, experience, education, skills, flags] = await Promise.all([
    getProfile(),
    getExperience(),
    getEducation(),
    getSkills(),
    getFeatureFlags(),
  ]);

  if (!flags.resumeDownload) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Nav
        showBlog={flags.blog}
        showResume={flags.resumeDownload}
        showContact={flags.contactForm}
      />
      <main id="main-content" className="flex-1 max-w-container w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-border">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
              Curriculum Vitae
            </span>
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-semibold tracking-tight text-text mt-1">
              {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-text-muted mt-1">{profile.eyebrow || profile.tagline || "Full-Stack Developer & DevOps Intern"}</p>
          </div>

          <a
            href="/api/resume/download"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto shadow-sm"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </a>
        </header>

        {/* Summary */}
        <section className="mb-8 sm:mb-10">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-text mb-2.5 sm:mb-3">
            Summary
          </h2>
          <div className="space-y-3 text-text-muted text-xs sm:text-sm md:text-base leading-relaxed max-w-prose">
            {(profile.aboutMarkdown || profile.intro).split("\n\n").map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8 sm:mb-10">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-text mb-3 sm:mb-4">
            Professional Experience
          </h2>
          <div className="space-y-5 sm:space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-border pl-3.5 sm:pl-4 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                  <h3 className="font-sans text-sm xs:text-base font-semibold text-text">
                    {exp.role}
                  </h3>
                  <span className="font-mono text-xs text-text-muted">
                    {exp.date}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-accent font-medium">{exp.org}</div>
                <ul className="mt-2 list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-text-muted leading-relaxed">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="mb-8 sm:mb-10">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-text mb-3 sm:mb-4">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            {skills.map((g) => (
              <div key={g.title} className="p-3.5 rounded bg-surface border border-border">
                <span className="font-mono text-xs text-accent font-semibold block mb-2">
                  {g.title}
                </span>
                <p className="font-mono text-xs text-text-muted leading-relaxed">
                  {g.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-6 sm:mb-8">
          <h2 className="font-serif text-lg sm:text-xl font-semibold text-text mb-3 sm:mb-4">
            Education
          </h2>
          <div className="space-y-3.5 sm:space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="font-sans text-sm xs:text-base font-semibold text-text">
                    {edu.school}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted">{edu.degree}</p>
                </div>
                <div className="font-mono text-[11px] sm:text-xs text-text-muted">
                  {edu.location} · {edu.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer showBlog={flags.blog} showResume={flags.resumeDownload} />
    </div>
  );
}
