"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SectionDivider({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-full h-px overflow-hidden bg-linesoft ${className}`}>
      <motion.div
        initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        className="w-full h-full bg-gradient-to-r from-teal/40 via-amber/50 to-transparent"
      />
      {!shouldReduceMotion && (
        <motion.div
          initial={{ x: "-100%" }}
          whileInView={{ x: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
          className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-transparent via-teal to-transparent opacity-80 pointer-events-none"
        />
      )}
    </div>
  );
}
