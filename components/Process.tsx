"use client";

import { Compass, Hammer, Workflow as WorkflowIcon, Rocket } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const STEPS = [
  {
    icon: Compass,
    tag: "01 · design",
    title: "Architect the system",
    desc: "Map data flow and schema before writing a line of app code — the shape MongoDB collections and API contracts take up front decides how well things scale later.",
  },
  {
    icon: Hammer,
    tag: "02 · build",
    title: "Ship on the MERN stack",
    desc: "React/Next.js front ends, Express APIs, MongoDB persistence — with Python where a scripting or data task calls for it.",
  },
  {
    icon: WorkflowIcon,
    tag: "03 · automate",
    title: "Wire up the workflows",
    desc: "Webhooks, WhatsApp Business API hooks, and lead-conversion engines that turn manual steps into background jobs.",
  },
  {
    icon: Rocket,
    tag: "04 · deploy",
    title: "Containerize & ship",
    desc: "Docker images, GitHub Actions pipelines, and Linux boxes — so what works locally works the same way in production.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-12 sm:py-16">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHead index="03" title="Process" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group border border-line rounded-xl bg-panel p-5 sm:p-7 h-full transition-colors hover:border-teal/60">
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-panel2 border border-line flex items-center justify-center transition-colors group-hover:border-amber">
                      <Icon size={18} className="text-teal" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[10.5px] sm:text-[11px] text-dim tracking-wide">
                      {s.tag}
                    </span>
                  </div>
                  <div className="font-mono font-bold text-[16px] sm:text-[17px] text-primary mb-2">
                    {s.title}
                  </div>
                  <p className="text-muted text-[14px] sm:text-[14.5px] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
