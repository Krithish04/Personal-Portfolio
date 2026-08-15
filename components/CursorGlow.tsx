"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    let raf = 0;

    function onMove(e: MouseEvent) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function tick() {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x - 260}px, ${
          pos.current.y - 260
        }px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-0 pointer-events-none hidden md:block will-change-transform"
      style={{
        width: 520,
        height: 520,
        background:
          "radial-gradient(circle, rgba(242,169,59,0.06) 0%, rgba(79,209,197,0.045) 40%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
