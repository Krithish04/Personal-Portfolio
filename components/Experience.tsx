"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const experiences = [
  {
    hash: "#devisoft",
    role: "MERN Stack Intern",
    org: "Devisoft · Surat",
    date: "05/2026 – 07/2026",
    bullets: [
      "Built 15+ REST APIs and quotation CRUD features using Node.js, Express.js, and MongoDB, testing all endpoints with Postman.",
      "Developed 20+ reusable UI components in Next.js, standardizing the application interface and reducing frontend development time by 25%.",
      "Implemented robust JWT authentication, managing role-based access for an internal Agile team of 10+ developers and QA testers.",
      "Fixed critical bugs and deployed the application on the company's local testing server for validation, contributing to a 20% faster quotation generation workflow.",
    ],
  },
  {
    hash: "#freelance",
    role: "Full-Stack Developer & Automation Specialist",
    org: "Freelance · Remote",
    date: "01/2026 – 02/2026",
    bullets: [
      "TeleCRM Architecture: Engineered a centralized lead management system that integrates mobile communication logs with a MERN stack backend, enabling real-time synchronization of sales interactions.",
      "Omnichannel Integration: Developed custom hooks for the WhatsApp Business API and social media webhooks to automate lead capture, reducing manual data entry by 40%.",
      "Automated Workflow Engine: Architected a sophisticated lead-conversion engine using Node.js, transitioning cold social engagement into trackable sales opportunities through automated personal messaging.",
      "High-Volume Data Management: Optimized MongoDB schemas to handle high-frequency transactional workflows for niche community member databases, ensuring 99.9% data integrity during peak traffic.",
    ],
  },
];

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHead index="02" title="Experience" />

        <div className="relative pl-5 sm:pl-[34px]">
          <motion.div
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
            className="absolute left-[4px] sm:left-[6px] top-1.5 bottom-1.5 w-[1.5px] bg-gradient-to-b from-teal via-amber/60 to-line"
          />

          {experiences.map((exp, i) => (
            <Reveal key={exp.hash} delay={i * 0.08} className="relative mb-8 sm:mb-[52px] last:mb-0">
              <span className="absolute -left-[21px] sm:-left-[34px] top-1.5 w-3 h-3 rounded-full bg-void border-2 border-teal shadow-[0_0_0_4px_#0B0E14]" />
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2.5 mb-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] sm:text-xs text-amber bg-amber/10 px-2 py-0.5 rounded">
                    {exp.hash}
                  </span>
                  <span className="font-bold text-[15.5px] xs:text-[17px] sm:text-[19px] text-primary leading-tight">
                    {exp.role}
                  </span>
                </div>
                <span className="font-mono text-[11px] sm:text-[12.5px] text-dim mt-0.5 sm:mt-0">
                  {exp.date}
                </span>
              </div>
              <div className="font-mono text-[12.5px] sm:text-[13.5px] text-teal mt-0.5">{exp.org}</div>
              <ul className="mt-3 space-y-2 sm:space-y-2.5">
                {exp.bullets.map((b) => (
                  <li
                    key={b}
                    className="relative pl-4.5 text-muted text-[13.5px] xs:text-[14px] sm:text-[15px] leading-relaxed"
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
