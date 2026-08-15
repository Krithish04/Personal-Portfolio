import Reveal from "./Reveal";
import Avatar from "./Avatar";

export default function Footer() {
  return (
    <footer id="contact" className="pt-16 pb-12 text-center">
      <div className="max-w-[1080px] mx-auto px-8">
        <Reveal>
          <div className="font-mono font-extrabold text-[clamp(1.8rem,4vw,2.6rem)] mb-4">
            Let&apos;s build something <span className="text-amber">resilient.</span>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-muted max-w-[480px] mx-auto mb-[34px] text-[15px]">
            Open to full-stack and automation-focused roles — reach out
            directly or find me on LinkedIn / GitHub.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="flex justify-center gap-6 flex-wrap font-mono text-sm mb-[60px]">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=suvarnakrithish24@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-b border-line pb-[3px] transition-all hover:text-teal hover:border-teal"
            >
              suvarnakrithish24@gmail.com
            </a>
            <a
              href="tel:+919428141156"
              className="text-primary border-b border-line pb-[3px] transition-all hover:text-teal hover:border-teal"
            >
              +919428141156
            </a>
            <a
              href="https://github.com/Krithish04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-b border-line pb-[3px] transition-all hover:text-teal hover:border-teal"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/krithish04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary border-b border-line pb-[3px] transition-all hover:text-teal hover:border-teal"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
        <div className="font-mono text-[12.5px] text-dim flex items-center justify-center gap-3">
          <Avatar size={48} className="border-line/60" />
          <div>
            <span className="text-teal">$</span> whoami{" "}
            <span className="text-primary">→ krithish, Surat, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
