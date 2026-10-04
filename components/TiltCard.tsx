"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode, useEffect, useState } from "react";

export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(
    useSpring(y, { stiffness: 200, damping: 20 }),
    [0, 1],
    [6, -6]
  );
  const rotateY = useTransform(
    useSpring(x, { stiffness: 200, damping: 20 }),
    [0, 1],
    [-6, 6]
  );

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!canHover) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    if (!canHover) return;
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={canHover ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}
