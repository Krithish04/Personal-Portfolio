"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Pipeline from "./Pipeline";
import RotatingWord from "./RotatingWord";
import BootSequence from "./BootSequence";
import Magnetic from "./Magnetic";
import Avatar from "./Avatar";

const line1Words = ["Krithish", "Ravindra"];
const line2Words = ["Suvarna"];

export default function Hero() {
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
    <header className="min-h-screen flex flex-col justify-center pt-24 sm:pt-32 pb-12 sm:pb-20 relative overflow-hidden">
      {/* glow orbs with parallax */}
      <motion.div
        className="absolute -top-40 -left-40 w-[300px] sm:w-[520px] h-[300px] sm:h-[520px] rounded-full opacity-30 pointer-events-none"
        style={{
          y: orb1Y,
          background:
            "radial-gradient(circle, rgba(79,209,197,0.18) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute top-20 -right-32 w-[280px] sm:w-[420px] h-[280px] sm:h-[420px] rounded-full opacity-25 pointer-events-none"
        style={{
          y: orb2Y,
          background:
            "radial-gradient(circle, rgba(242,169,59,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8 w-full relative">
        <BootSequence onDone={() => {}} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-mono text-[10px] xs:text-[11.5px] sm:text-[13px] text-teal tracking-wide flex flex-wrap items-center gap-2 sm:gap-2.5 mb-4 sm:mb-6"
        >
          <span className="w-[18px] sm:w-[26px] h-px bg-teal hidden sm:inline-block" />
          <span className="break-words">FULL-STACK DEVELOPER &amp; DEVOPS SPECIALIST</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] xs:text-[10.5px] sm:text-[11px] text-amber border border-amber/20 bg-amber/10 rounded-full px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber animate-blink" />
            open to opportunities
          </span>
        </motion.div>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6 sm:gap-8">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-mono font-extrabold text-[clamp(1.85rem,7vw,4.6rem)] leading-[1.1] sm:leading-[1.06] tracking-tight text-primary break-words"
          >
            <span className="inline-block">
              {line1Words.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <br className="hidden sm:inline" />
            <span className="inline-block text-amber">
              {line2Words.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className="inline-block ml-0 sm:ml-0"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
            className="flex-shrink-0 self-center sm:self-auto"
          >
            <Avatar className="w-28 h-28 xs:w-36 xs:h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 shadow-[0_0_45px_rgba(242,169,59,0.35)] border-amber/70 border-2" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
          className="mt-4 sm:mt-[18px] max-w-[640px]"
        >
          <RotatingWord />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
          className="mt-3.5 sm:mt-6 max-w-[620px] text-muted text-[13.5px] xs:text-[14.5px] sm:text-[15.5px] leading-relaxed"
        >
          Strategic MCA candidate and Full-Stack Developer specializing in MERN stack architecture, Python microservices, and Kubernetes DevOps — containerizing multi-tier applications and automating CI/CD pipelines for high-reliability cloud deployments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: "easeOut" }}
          className="mt-6 sm:mt-9 flex flex-col xs:flex-row gap-3 sm:gap-4"
        >
          <Magnetic as="a" href="#projects" strength={14} className="w-full xs:w-auto">
            <span className="w-full font-mono text-[12.5px] sm:text-[13px] font-semibold px-5 sm:px-[22px] py-3.5 sm:py-[13px] rounded-lg flex items-center justify-center gap-2 border border-amber bg-amber text-void transition-shadow hover:shadow-[0_8px_24px_rgba(242,169,59,0.3)] active:scale-[0.98]">
              View Projects →
            </span>
          </Magnetic>
          <Magnetic as="a" href="#contact" strength={14} className="w-full xs:w-auto">
            <span className="w-full font-mono text-[12.5px] sm:text-[13px] font-semibold px-5 sm:px-[22px] py-3.5 sm:py-[13px] rounded-lg flex items-center justify-center gap-2 border border-line text-primary transition-colors hover:border-teal hover:text-teal active:scale-[0.98]">
              Get in Touch
            </span>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48, ease: "easeOut" }}
        >
          <Pipeline />
        </motion.div>
      </div>
    </header>
  );
}
