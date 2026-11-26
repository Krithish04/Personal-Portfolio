import Link from "next/link";
import Avatar from "./Avatar";

interface HeroProps {
  name?: string;
  role?: string;
  summary?: string;
  showPortrait?: boolean;
}

export default function Hero({
  name = "Krithish Ravindra Suvarna",
  role = "FULL-STACK DEVELOPER & DEVOPS INTERN",
  summary = "I build full-stack web applications and the deployment pipelines that ship them. I work mostly with Node.js, React and Python, and I use Docker and GitHub Actions to take projects from a local build to a running service.",
  showPortrait = true,
}: HeroProps) {
  return (
    <section className="pt-8 sm:pt-16 pb-10 sm:pb-12 border-b border-border">
      <div className="flex flex-col-reverse sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-10">
        <div className="max-w-2xl w-full text-center sm:text-left">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-accent font-medium block">
            {role}
          </span>
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text mt-1.5 sm:mt-2 mb-3 sm:mb-4">
            {name}
          </h1>
          <p className="text-text-muted text-sm xs:text-base sm:text-lg leading-relaxed max-w-prose text-justify sm:text-left mx-auto sm:mx-0">
            {summary}
          </p>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3">
            <Link
              href="/projects"
              className="w-full sm:w-auto px-5 py-2.5 rounded-md bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity text-center shadow-sm inline-flex items-center justify-center"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-border text-text text-sm font-medium hover:border-accent hover:text-accent transition-colors text-center inline-flex items-center justify-center"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {showPortrait && (
          <div className="w-full flex justify-center sm:w-auto sm:block shrink-0">
            <Avatar className="w-28 h-28 xs:w-32 xs:h-32 sm:w-32 sm:h-32 md:w-36 md:h-36 shadow-sm" />
          </div>
        )}
      </div>
    </section>
  );
}
