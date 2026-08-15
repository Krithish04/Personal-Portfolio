"use client";

import { useEffect, useState } from "react";

const LINES = [
  "booting portfolio.tsx",
  "connecting MERN stack ...",
  "loading experience.json",
  "ready.",
];

export default function BootSequence({
  onDone,
}: {
  onDone: () => void;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      onDone();
      return;
    }

    if (lineIndex >= LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        onDone();
      }, 260);
      return () => clearTimeout(t);
    }

    const currentLine = LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), 16);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, 180);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIndex, charIndex]);

  if (done) return null;

  return (
    <div className="font-mono text-[12px] text-dim mb-6 h-[76px] leading-[1.6] select-none">
      {LINES.slice(0, lineIndex).map((l, i) => (
        <div key={i}>
          <span className="text-teal">$</span> {l}
        </div>
      ))}
      {lineIndex < LINES.length && (
        <div>
          <span className="text-teal">$</span>{" "}
          {LINES[lineIndex].slice(0, charIndex)}
          <span className="inline-block w-[7px] h-[1em] bg-amber ml-0.5 animate-caret align-text-bottom" />
        </div>
      )}
    </div>
  );
}
