"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function MiniFlow({ nodes }: { nodes: string[] }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" as const },
    },
  };

  return (
    <div className="relative pt-2 pb-1 my-2">
      {/* Background connecting track line with animated dashed flow */}
      <div className="absolute top-[13px] left-4 right-4 h-[2px] bg-line overflow-hidden rounded">
        <div
          className={`w-full h-full bg-[linear-gradient(90deg,#4FD1C5_50%,transparent_50%)] bg-[length:14px_100%] opacity-70 ${
            shouldReduceMotion ? "" : "animate-dashflow"
          }`}
        />
      </div>

      {/* Nodes and Labels */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="relative flex justify-between items-start"
      >
        {nodes.map((label, i) => (
          <motion.div
            key={label}
            variants={nodeVariants}
            className="flex flex-col items-center text-center max-w-[130px]"
          >
            <div className="w-5 h-5 rounded-full bg-panel2 border-2 border-amber flex items-center justify-center z-10 shadow-sm transition-transform hover:scale-110">
              <div className="w-1.5 h-1.5 rounded-full bg-amber" />
            </div>
            <span className="mt-2 font-mono text-[11.5px] text-muted font-medium leading-tight">
              {label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        @keyframes dashflow {
          to {
            background-position: -28px 0;
          }
        }
        .animate-dashflow {
          animation: dashflow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
