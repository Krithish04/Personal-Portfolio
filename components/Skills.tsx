"use client";

import { Code2, Boxes, BarChart3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Magnetic from "./Magnetic";

const groups = [
  {
    title: "Development",
    icon: Code2,
    items: ["MongoDB", "Express.js", "React.js", "Python", "Kotlin", "SQL"],
  },
  {
    title: "DevOps & Tools",
    icon: Boxes,
    items: [
      "Git",
      "GitHub Actions",
      "Docker",
      "Linux/Bash",
      "REST APIs",
      "CI/CD Pipelines",
    ],
  },
  {
    title: "Analytics & Business",
    icon: BarChart3,
    items: ["Power BI", "Android Studio", "WhatsApp Business API"],
  },
];

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  const chipContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.88, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" as const },
    },
  };

  return (
    <section id="skills" className="py-12 sm:py-16">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHead index="05" title="Skills" />
        <div
          className="grid gap-5 sm:gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}
        >
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 0.08}>
                <div className="group border border-line rounded-[10px] p-5 sm:p-6 bg-panel h-full transition-colors hover:border-teal/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                      <div className="w-8 h-8 rounded-md bg-panel2 border border-line flex items-center justify-center transition-colors group-hover:border-amber">
                        <Icon size={15} className="text-teal" strokeWidth={1.75} />
                      </div>
                      <div className="font-mono text-xs text-dim tracking-wide">
                        {g.title}
                      </div>
                    </div>
                    <motion.div
                      variants={chipContainerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-10%" }}
                      className="flex flex-wrap gap-2 sm:gap-2.5"
                    >
                      {g.items.map((item) => (
                        <motion.div key={item} variants={chipVariants}>
                          <Magnetic strength={6}>
                            <span className="font-mono text-[12px] sm:text-[12.5px] px-2.5 sm:px-3 py-[6px] sm:py-[7px] rounded-md bg-panel2 border border-line text-primary transition-all hover:border-teal hover:text-teal inline-block cursor-default">
                              {item}
                            </span>
                          </Magnetic>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
