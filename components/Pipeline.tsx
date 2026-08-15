"use client";

import { useEffect, useRef } from "react";

const STAGES = [
  {
    x: 80,
    step: "01",
    title: "Lead Capture",
    tech: "WhatsApp & Webhooks",
  },
  {
    x: 350,
    step: "02",
    title: "API Processing",
    tech: "Node.js / Express Server",
  },
  {
    x: 630,
    step: "03",
    title: "Lead Qualification",
    tech: "Automation Engine",
  },
  {
    x: 920,
    step: "04",
    title: "Database Sync",
    tech: "MongoDB & Real-time CRM",
  },
];

const PATH_START = 80;
const PATH_END = 920;

export default function Pipeline() {
  const packetRef = useRef<SVGCircleElement | null>(null);
  const nodesRef = useRef<(SVGCircleElement | null)[]>([]);
  const labelsRef = useRef<(SVGTextElement | null)[]>([]);
  const techRef = useRef<(SVGTextElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let progress = 0;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function animate(now: number) {
      const dt = now - last;
      last = now;

      progress += dt * 0.00018;
      if (progress > 1) progress -= 1;

      const currentX = PATH_START + (PATH_END - PATH_START) * progress;
      if (packetRef.current) {
        packetRef.current.setAttribute("cx", String(currentX));
      }

      let activeIndex = -1;
      STAGES.forEach((s, idx) => {
        if (Math.abs(currentX - s.x) < 45) {
          activeIndex = idx;
        }
      });

      STAGES.forEach((_, idx) => {
        const isActive = idx === activeIndex;
        nodesRef.current[idx]?.classList.toggle("stage-active", isActive);
        labelsRef.current[idx]?.classList.toggle("label-active", isActive);
        techRef.current[idx]?.classList.toggle("tech-active", isActive);
      });

      raf = requestAnimationFrame(animate);
    }

    if (!prefersReduced) {
      raf = requestAnimationFrame(animate);
    } else {
      nodesRef.current[0]?.classList.add("stage-active");
      labelsRef.current[0]?.classList.add("label-active");
      techRef.current[0]?.classList.add("tech-active");
    }

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="mt-14 border border-line rounded-[12px] bg-panel/90 p-6 overflow-hidden shadow-xl">
      <div className="flex items-center justify-between pb-3 mb-2 font-mono text-[12px]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_#4FD1C5] animate-blink" />
          <span className="text-primary font-bold">automated-lead-pipeline.ts</span>
        </div>
        <div className="font-mono text-[11px] px-2 py-0.5 rounded border border-teal/30 bg-teal/10 text-teal">
          status: 200 OK
        </div>
      </div>

      <svg
        viewBox="0 0 1000 150"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto block"
      >
        <line
          x1={80}
          y1={70}
          x2={920}
          y2={70}
          stroke="#232937"
          strokeWidth={2}
        />
        <line
          x1={80}
          y1={70}
          x2={920}
          y2={70}
          stroke="#4FD1C5"
          strokeWidth={1.5}
          strokeDasharray="4 6"
          opacity={0.3}
        />

        {STAGES.map((s, i) => (
          <g key={s.title}>
            <rect
              x={s.x - 28}
              y={16}
              width={56}
              height={18}
              rx={4}
              fill="#171C28"
              stroke="#232937"
              strokeWidth={1}
            />
            <text
              x={s.x}
              y={29}
              textAnchor="middle"
              className="font-mono text-[10px] fill-amber font-bold"
            >
              STEP {s.step}
            </text>

            <circle
              ref={(el) => {
                nodesRef.current[i] = el;
              }}
              cx={s.x}
              cy={70}
              r={10}
              className="fill-panel2 stroke-line stage-node transition-all duration-300"
              strokeWidth={2}
            />

            <text
              ref={(el) => {
                labelsRef.current[i] = el;
              }}
              x={s.x}
              y={106}
              textAnchor={i === 0 ? "start" : i === STAGES.length - 1 ? "end" : "middle"}
              className="font-mono text-[13px] font-bold fill-primary stage-label transition-colors duration-300"
            >
              {s.title}
            </text>

            <text
              ref={(el) => {
                techRef.current[i] = el;
              }}
              x={s.x}
              y={126}
              textAnchor={i === 0 ? "start" : i === STAGES.length - 1 ? "end" : "middle"}
              className="font-mono text-[11px] fill-dim tech-label transition-colors duration-300"
            >
              {s.tech}
            </text>
          </g>
        ))}

        <circle
          ref={packetRef}
          cx={80}
          cy={70}
          r={6}
          className="fill-teal"
          style={{ filter: "drop-shadow(0 0 10px #4FD1C5)" }}
        />
      </svg>

      <style jsx global>{`
        .stage-node.stage-active {
          stroke: #f2a93b;
          fill: #f2a93b25;
          r: 12px;
        }
        .stage-label.label-active {
          fill: #f2a93b;
        }
        .tech-label.tech-active {
          fill: #4fd1c5;
        }
      `}</style>
    </div>
  );
}
