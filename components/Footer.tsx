import Reveal from "./Reveal";
import Avatar from "./Avatar";

export default function Footer() {
  return (
    <footer id="contact" className="pt-10 sm:pt-16 pb-12 text-center">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <Reveal>
          <div className="font-mono font-extrabold text-[clamp(1.45rem,5.5vw,2.6rem)] mb-3 sm:mb-4 leading-tight">
            Let&apos;s build something <span className="text-amber">resilient.</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-muted max-w-[480px] mx-auto mb-6 sm:mb-[34px] text-[13.5px] xs:text-[14.5px] sm:text-[15px] leading-relaxed">
            Open to full-stack and automation-focused roles — reach out
            directly or find me on LinkedIn / GitHub.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="flex justify-center gap-3 sm:gap-6 flex-wrap font-mono text-[12px] sm:text-sm mb-8 sm:mb-[60px]">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=suvarnakrithish24@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-b border-line pb-1 transition-all hover:text-teal hover:border-teal break-all px-1 py-0.5"
            >
              suvarnakrithish24@gmail.com
            </a>
            <a
              href="tel:+919428141156"
              className="text-primary border-b border-line pb-1 transition-all hover:text-teal hover:border-teal whitespace-nowrap px-1 py-0.5"
            >
              +919428141156
            </a>
            <a
              href="https://github.com/Krithish04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-b border-line pb-1 transition-all hover:text-teal hover:border-teal px-1 py-0.5"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/krithish04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-b border-line pb-1 transition-all hover:text-teal hover:border-teal px-1 py-0.5"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
        <div className="font-mono text-[11px] sm:text-[12.5px] text-dim flex items-center justify-center gap-2.5 sm:gap-3">
          <Avatar size={38} className="border-line/60" />
          <div className="text-left sm:text-center">
            <span className="text-teal">$</span> whoami{" "}
            <span className="text-primary">→ krithish, Surat, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
