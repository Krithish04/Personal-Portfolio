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
  role = "Full-Stack Developer & Automation Specialist",
  summary = "Strategic MCA candidate specializing in MERN stack architecture, Python microservices, and reliable cloud deployments. Focused on building clean, high-performance web systems and automating resilient infrastructure.",
  showPortrait = true,
}: HeroProps) {
  return (
    <section className="pt-8 sm:pt-16 pb-10 sm:pb-12 border-b border-border">
      <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-10">
        <div className="max-w-2xl w-full">
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-accent font-medium">
            {role}
          </span>
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-text mt-1.5 sm:mt-2 mb-3 sm:mb-4">
            {name}
          </h1>
          <p className="text-text-muted text-sm xs:text-base sm:text-lg leading-relaxed max-w-prose">
            {summary}
          </p>
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 self-start sm:self-center shrink-0 shadow-sm" />
        )}
      </div>
    </section>
  );
}
