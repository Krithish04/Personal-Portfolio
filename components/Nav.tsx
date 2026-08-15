"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const links = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Experience", href: "#experience" },
  { num: "03", label: "Process", href: "#process" },
  { num: "04", label: "Projects", href: "#projects" },
  { num: "05", label: "Skills", href: "#skills" },
  { num: "06", label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [active, setActive] = useState<string>("about");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));

    function onScroll() {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-void/75 border-b border-line">
      <div className="max-w-[1080px] mx-auto px-8 h-16 flex items-center justify-between">
        <Magnetic strength={8}>
          <a href="#" className="font-mono text-sm font-semibold flex items-center gap-2 text-primary">
            <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_#4FD1C5] animate-blink" />
            krithish@dev:~$
          </a>
        </Magnetic>
        <div className="hidden md:flex gap-7 font-mono text-[13px]">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <Magnetic key={l.href} as="a" href={l.href} strength={8}>
                <span
                  className={`relative py-1 transition-colors group inline-block ${
                    isActive ? "text-amber" : "text-muted hover:text-amber"
                  }`}
                >
                  <span className="text-dim mr-1">{l.num}</span>
                  {l.label}
                  <span
                    className={`absolute left-0 bottom-0 h-px bg-amber transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </Magnetic>
            );
          })}
        </div>
      </div>
      <div className="h-[2px] bg-line/40">
        <div
          className="h-full bg-gradient-to-r from-teal to-amber transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  );
}
