"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Pipeline from "./Pipeline";
import RotatingWord from "./RotatingWord";
import BootSequence from "./BootSequence";
import Magnetic from "./Magnetic";
import Avatar from "./Avatar";

const line1Words = ["Krithish", "Ravindra"];
const line2Words = ["Suvarna"];

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const orb1Y = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : 70]);
  const orb2Y = useTransform(scrollY, [0, 800], [0, shouldReduceMotion ? 0 : -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <header className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden">
      {/* glow orbs with parallax */}
      <motion.div
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full opacity-30 pointer-events-none"
        style={{
          y: orb1Y,
          background:
            "radial-gradient(circle, rgba(79,209,197,0.18) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute top-20 -right-32 w-[420px] h-[420px] rounded-full opacity-25 pointer-events-none"
        style={{
          y: orb2Y,
          background:
            "radial-gradient(circle, rgba(242,169,59,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1080px] mx-auto px-8 w-full relative">
        <BootSequence onDone={() => setBooted(true)} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-[13px] text-teal tracking-wide flex items-center gap-2.5 mb-6"
        >
          <span className="w-[26px] h-px bg-teal" />
          FULL-STACK DEVELOPER &amp; AUTOMATION SPECIALIST
          <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-[11px] text-amber border border-amber/20 bg-amber/10 rounded-full px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-blink" />
            open to opportunities
          </span>
        </motion.div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate={booted ? "visible" : "hidden"}
            className="font-mono font-extrabold text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.04] tracking-tight text-primary"
          >
            <span className="inline-block">
              {line1Words.map((word, i) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br />
            <span className="inline-block text-amber">
              {line2Words.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={booted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <Avatar size={240} className="shadow-[0_0_45px_rgba(242,169,59,0.35)] border-amber/70 border-2" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
          className="mt-[18px] max-w-[640px]"
        >
          <RotatingWord />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
          className="mt-6 max-w-[600px] text-muted text-[15.5px]"
        >
          MCA candidate specialising in scalable automation and DevOps —
          architecting bespoke CRM systems and API-driven workflows on the
          MERN stack, and bridging development with CI/CD, containerization,
          and cloud-native infrastructure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.38, ease: "easeOut" }}
          className="mt-9 flex gap-4 flex-wrap"
        >
          <Magnetic as="a" href="#projects" strength={14}>
            <span className="font-mono text-[13px] font-semibold px-[22px] py-[13px] rounded-md inline-flex items-center gap-2 border border-amber bg-amber text-void transition-shadow hover:shadow-[0_8px_24px_rgba(242,169,59,0.3)]">
              View Projects →
            </span>
          </Magnetic>
          <Magnetic as="a" href="#contact" strength={14}>
            <span className="font-mono text-[13px] font-semibold px-[22px] py-[13px] rounded-md inline-flex items-center gap-2 border border-line text-primary transition-colors hover:border-teal hover:text-teal">
              Get in Touch
            </span>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.48, ease: "easeOut" }}
        >
          <Pipeline />
        </motion.div>
      </div>
    </header>
  );
}
