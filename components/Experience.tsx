"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const commits = [
  {
    hash: "#a1f92c",
    role: "Full-Stack Developer & Automation Specialist",
    org: "Freelance · Remote",
    date: "Jan 2026 – Feb 2026",
    bullets: [
      "Engineered TeleCRM, a centralized lead-management system syncing mobile communication logs with a MERN stack backend in real time.",
      "Built custom hooks for the WhatsApp Business API and social webhooks, cutting manual data entry by 40%.",
      "Architected an automated lead-conversion engine in Node.js, turning cold social engagement into trackable sales opportunities.",
      "Optimized MongoDB schemas for high-frequency transactional workflows, holding 99.9% data integrity under peak traffic.",
    ],
  },
  {
    hash: "#7c3e10",
    role: "MERN Stack Intern",
    org: "Devisoft · Surat",
    date: "May 2026 – Jul 2026",
    bullets: [
      "Developed and enhanced Quotation Master using Next.js, Node.js, Express.js, MongoDB, Mongoose, and JWT authentication.",
      "Built reusable UI components, REST APIs, and full quotation CRUD features.",
      "Tested APIs with Postman, fixed bugs, and collaborated within an Agile team.",
      "Deployed the application to the company's local testing server for validation.",
    ],
  },
];

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-16">
      <div className="max-w-[1080px] mx-auto px-8">
        <SectionHead index="02" title="Experience" />

        <div className="relative pl-[34px]">
          <motion.div
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[6px] top-1.5 bottom-1.5 w-[1.5px] bg-gradient-to-b from-teal via-amber/60 to-line"
          />

          {commits.map((c, i) => (
            <Reveal key={c.hash} delay={i * 0.08} className="relative mb-[52px] last:mb-0">
              <span className="absolute -left-[34px] top-1.5 w-3 h-3 rounded-full bg-void border-2 border-teal shadow-[0_0_0_4px_#0B0E14]" />
              <div className="flex flex-wrap items-baseline gap-2.5 mb-1.5">
                <span className="font-mono text-xs text-amber bg-amber/10 px-2 py-0.5 rounded">
                  {c.hash}
                </span>
                <span className="font-bold text-[19px] text-primary">
                  {c.role}
                </span>
                <span className="font-mono text-[12.5px] text-dim ml-auto">
                  {c.date}
                </span>
              </div>
              <div className="font-mono text-[13.5px] text-teal">{c.org}</div>
              <ul className="mt-3.5 space-y-2.5">
                {c.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative pl-5 text-muted text-[15px]"
                  >
                    <span className="absolute left-0 text-teal font-mono font-bold">
                      +
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
