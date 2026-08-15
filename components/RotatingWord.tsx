"use client";

import { useEffect, useState } from "react";

const WORDS = [
  "CRM systems",
  "automation engines",
  "REST APIs",
  "CI/CD pipelines",
  "MERN apps",
];

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 250);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono text-[clamp(1rem,2.4vw,1.25rem)] text-muted inline-flex items-center flex-wrap gap-[2px]">
      Building{" "}
      <span
        className="transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {WORDS[index]}
      </span>
      <span className="inline-block w-[9px] h-[1.1em] bg-amber ml-1 animate-caret align-text-bottom" />
    </span>
  );
}
