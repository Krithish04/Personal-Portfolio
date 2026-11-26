import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  bodyMarkdown?: string;
  role?: string;
  timeframe?: string;
  featured: boolean;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  flowNodes?: string[];
  images?: { fileId: string; alt: string }[];
}

export const seedProjects: ProjectData[] = [
  {
    id: "dinesync",
    slug: "dinesync",
    title: "DineSync AI",
    subtitle: "Multi-Tenant Restaurant Platform with Real-Time KDS",
    summary:
      "Engineered an event-driven restaurant ERP with zero-latency Kitchen Display synchronization, time-series revenue forecasting, Redis locking, and automated CI/CD.",
    featured: true,
    tech: ["React", "FastAPI", "Node.js", "Socket.io", "Redis", "Docker", "Scikit-Learn"],
    demoUrl: "https://dine-sync-ashen.vercel.app/",
    flowNodes: ["Client POS", "FastAPI Microservice", "Socket.io KDS Queue", "Docker CI/CD"],
  },
  {
    id: "taskflow",
    slug: "taskflow",
    title: "TaskFlow",
    subtitle: "Role-Based Project Management Platform with GridFS",
    summary:
      "Developed a full-stack project management platform featuring interactive Kanban boards, multi-tier RBAC, document management with MongoDB GridFS, and Next.js App Router.",
    featured: true,
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "GridFS", "Tailwind CSS"],
    githubUrl: "https://github.com/Krithish04/taskflow",
    demoUrl: "https://taskflow-1-7sax.onrender.com/",
    flowNodes: ["Next.js UI", "Server Actions & API", "MongoDB & GridFS", "Auth.js"],
  },
  {
    id: "agriguard",
    slug: "agriguard",
    title: "AgriGuard",
    subtitle: "Crop Yield Prediction System",
    summary:
      "Trained an ML regression pipeline with scikit-learn forecasting agricultural yields based on soil and climate variables, served via a Flask REST API and React dashboard.",
    featured: true,
    tech: ["React", "Flask", "Python", "Scikit-learn"],
    githubUrl: "https://github.com/Krithish04/Agriculture-Prediction",
    flowNodes: ["Soil/Climate Input", "Flask REST API", "Scikit-Learn ML", "React UI"],
  },
  {
    id: "android-sms",
    slug: "android-sms-gateway",
    title: "Android SMS Gateway Server",
    subtitle: "Embedded Cellular HTTP Server",
    summary:
      "Exposes local REST endpoints from an Android foreground service and BootReceiver to programmatically trigger cellular SMS dispatches from external services.",
    featured: false,
    tech: ["Kotlin", "Android SDK", "Embedded HTTP Server", "Foreground Service"],
    githubUrl: "https://github.com/Krithish04/android-sms-gateway",
    flowNodes: ["REST API Call", "Embedded HTTP", "Foreground Service", "Cellular Dispatch"],
  },
  {
    id: "morsemind",
    slug: "morsemind",
    title: "MorseMind",
    subtitle: "Interactive Morse Code Learning App",
    summary:
      "Native Android educational application with dedicated symbol practice modules, real-time input decoding, and responsive XML layouts.",
    featured: false,
    tech: ["Kotlin", "Android SDK", "Jetpack", "XML Layouts"],
    githubUrl: "https://github.com/Krithish04/morsemind",
    flowNodes: ["Symbol Module", "Real-Time Input", "Kotlin Decoder", "UI Feedback"],
  },
];

export default function Projects({
  projects = seedProjects,
  showAll = false,
  showCaseStudies = true,
}: {
  projects?: ProjectData[];
  showAll?: boolean;
  showCaseStudies?: boolean;
}) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-8 sm:py-12 border-b border-border">
      <div className="flex items-baseline justify-between mb-4 sm:mb-6">
        <h2 className="font-serif text-xl xs:text-2xl sm:text-3xl font-semibold tracking-tight text-text">
          {showAll ? "All Projects" : "Selected Work"}
        </h2>
        {!showAll && (
          <Link
            href="/projects"
            className="text-xs font-mono text-text-muted hover:text-accent transition-colors shrink-0 ml-2 group inline-flex items-center gap-1"
          >
            <span>View all ({projects.length})</span>
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>

      {/* Featured Projects Grid */}
      <div className="space-y-4 sm:space-y-6">
        {(showAll ? projects : featured).map((project) => (
          <article
            key={project.id}
            className="p-4 sm:p-6 rounded-lg bg-surface border border-border hover:border-accent/70 hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4 mb-2">
              <div className="min-w-0">
                <h3 className="font-serif text-lg xs:text-xl font-semibold text-text">
                  {showCaseStudies ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="hover:text-accent transition-colors inline-flex items-center gap-1.5 group/title"
                    >
                      <span>{project.title}</span>
                      <ArrowUpRight size={15} className="text-text-muted group-hover/title:text-accent group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all duration-150 shrink-0" />
                    </Link>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-xs font-mono text-text-muted mt-0.5">
                  {project.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 self-start font-mono text-xs text-text-muted shrink-0">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded border border-border bg-bg/50 hover:border-accent hover:text-text active:scale-95 transition-all duration-150 inline-flex items-center gap-1"
                    aria-label={`GitHub repository for ${project.title}`}
                  >
                    <Github size={12} />
                    <span>Code</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded bg-accent text-white hover:opacity-90 active:scale-95 transition-all duration-150 inline-flex items-center gap-1 font-medium"
                    aria-label={`Live demo for ${project.title}`}
                  >
                    <span>Live</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-xs xs:text-sm text-text-muted leading-relaxed mt-2 mb-3.5 sm:mb-4">
              {project.summary}
            </p>

            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10.5px] xs:text-[11px] text-text-muted px-2 py-0.5 rounded bg-bg border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* More projects list when on home page */}
      {!showAll && others.length > 0 && (
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border">
          <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3 sm:mb-4">
            More Projects
          </h3>
          <div className="space-y-2 sm:space-y-3">
            {others.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-2 border-b border-border/40 last:border-0"
              >
                <div className="min-w-0">
                  <span className="font-medium text-sm text-text">
                    {showCaseStudies ? (
                      <Link
                        href={`/projects/${p.slug}`}
                        className="hover:text-accent transition-colors group/more inline-flex items-center gap-1"
                      >
                        <span>{p.title}</span>
                        <ArrowUpRight size={13} className="text-text-muted group-hover/more:text-accent group-hover/more:translate-x-0.5 group-hover/more:-translate-y-0.5 transition-all duration-150 shrink-0" />
                      </Link>
                    ) : (
                      p.title
                    )}
                  </span>
                  <span className="text-xs text-text-muted block xs:inline xs:ml-2">
                    — {p.subtitle}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs text-text-muted shrink-0 self-start sm:self-auto">
                  <span className="hidden md:inline">{p.tech.slice(0, 3).join(", ")}</span>
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 rounded border border-border text-xs hover:border-accent hover:text-accent transition-colors"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
