import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import { getProjects, getFeatureFlags } from "@/lib/data";

export const metadata = {
  title: "Projects — Krithish Ravindra Suvarna",
  description:
    "Engineering case studies and projects by Krithish Ravindra Suvarna covering full-stack systems, microservices, and mobile tools.",
};

export default async function ProjectsPage() {
  const [projects, flags] = await Promise.all([
    getProjects(),
    getFeatureFlags(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <Nav
        showBlog={flags.blog}
        showResume={flags.resumeDownload}
        showContact={flags.contactForm}
      />
      <main id="main-content" className="flex-1 max-w-container w-full mx-auto px-4 sm:px-6 md:px-8 py-12">
        <header className="mb-8">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
            Portfolio & Systems
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-text mt-2 mb-3">
            Projects & Case Studies
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-prose">
            A comprehensive collection of full-stack platforms, microservices, and native mobile applications I have architected and deployed.
          </p>
        </header>

        <Projects
          projects={projects}
          showAll={true}
          showCaseStudies={flags.caseStudies}
        />
      </main>
      <Footer showPhone={flags.showPhone} />
    </div>
  );
}
