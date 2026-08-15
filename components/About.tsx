import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Avatar from "./Avatar";

export default function About() {
  return (
    <section id="about" className="py-12 sm:py-16">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHead index="01" title="About" />
        <Reveal>
          <div className="border border-line rounded-[10px] bg-panel overflow-hidden">
            <div className="h-[38px] bg-panel2 border-b border-line flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                <span className="font-mono text-xs text-dim ml-3">
                  README.md
                </span>
              </div>
            </div>
            <div className="p-5 sm:p-7 font-mono text-[14.5px] text-muted leading-[1.85] flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
              <Avatar className="w-24 h-24 sm:w-32 sm:h-32 mt-1 border-amber/60 shadow-[0_0_25px_rgba(242,169,59,0.25)] flex-shrink-0" />
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm">
                  <span className="text-teal">$</span> cat summary.md{" "}
                  <span className="text-dim">--verbose</span>
                </div>
                <p className="text-primary font-sans text-[14.5px] sm:text-[15.5px] mt-3.5 leading-[1.75]">
                  MCA candidate and Full-Stack Engineer focused on building scalable web applications, intelligent automation, and reliable cloud infrastructure. Experienced in developing production-ready MERN stack applications, Python-based automation solutions, RESTful APIs, and containerized deployments. Passionate about connecting clean software architecture with robust DevOps practices, CI/CD automation, and cloud technologies to deliver efficient, secure, and maintainable systems.
                </p>
                <div className="mt-4 pt-3 border-t border-line/40 text-[12px] sm:text-[13px] font-mono text-dim flex flex-wrap items-center gap-2">
                  <span className="text-amber font-semibold">Focus:</span>
                  <span className="text-muted">
                    Scalable Systems • API Integration • CI/CD Automation • Cloud Infrastructure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
