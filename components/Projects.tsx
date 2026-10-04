"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Layers, Eye, CheckCircle2, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import AnimatedStat from "./AnimatedStat";
import TiltCard from "./TiltCard";
import MiniFlow from "./MiniFlow";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  badge: string;
  tech: string[];
  description: string[];
  stats?: { target: number; suffix: string; label: string; decimals?: number }[];
  flowNodes?: string[];
  image?: string;
  githubUrl?: string;
  vercelUrl?: string;
}

const projects: Project[] = [
  {
    id: "dinesync",
    title: "DineSync",
    subtitle: "AI-Powered Multi-Tenant Restaurant ERP",
    date: "08/2026 – Present",
    badge: "Featured / Production",
    tech: ["React", "FastAPI", "Node.js", "Socket.io", "Docker", "Scikit-Learn", "Google Gemini"],
    description: [
      "Engineered a multi-tenant restaurant platform utilizing React and Node.js, managing 500+ daily transactions with automated split-bill GST billing and inventory tracking.",
      "Synchronized live KDS queues via Socket.io, handling up to 150 concurrent client connections with zero latency during peak operational hours.",
      "Built a Python FastAPI microservice utilizing Google Gemini and scikit-learn for demand forecasting and smart menu optimization, achieving an 85% predictive accuracy.",
      "Containerized multi-tier services using Docker Compose and established automated GitHub Actions CI/CD deployment pipelines, reducing manual server configuration time by 40%.",
    ],
    stats: [
      { target: 500, suffix: "+", label: "daily transactions managed" },
      { target: 150, suffix: "", label: "concurrent Socket.io KDS clients" },
      { target: 85, suffix: "%", label: "AI forecast accuracy" },
    ],
    flowNodes: ["Client POS", "FastAPI Microservice", "Socket.io KDS Queue", "Docker CI/CD"],
    image: "/dinesync_preview.jpg",
    vercelUrl: "https://dine-sync-ashen.vercel.app/",
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    subtitle: "Project Management Platform with K8s Orchestration",
    date: "06/2026 – 06/2026",
    badge: "Cloud & DevOps",
    tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Kubernetes", "Kustomize", "Docker"],
    description: [
      "Developed a 3-tier project tracker featuring interactive Kanban boards and dynamic task workflows, capable of managing 1,000+ active tasks with multi-tier RBAC for Admins, PMs, and Users.",
      "Engineered declarative Kubernetes manifests with Kustomize overlays and persistent volume claims, orchestrating a highly available cluster designed to support 200+ concurrent users.",
      "Implemented Docker containerization and automated CI/CD build-and-deploy workflows via GitHub Actions, accelerating deployment release cycles by 30%.",
    ],
    stats: [
      { target: 1000, suffix: "+", label: "active tasks managed" },
      { target: 200, suffix: "+", label: "concurrent K8s cluster users" },
      { target: 30, suffix: "%", label: "faster release cycles" },
    ],
    flowNodes: ["React Kanban UI", "Express REST API", "MongoDB Pods", "K8s Ingress"],
    image: "/taskflow_preview.jpg",
    githubUrl: "https://github.com/Krithish04/taskflow",
    vercelUrl: "https://taskflow-1-7sax.onrender.com/",
  },
  {
    id: "agriguard",
    title: "AgriGuard",
    subtitle: "Crop Yield Prediction System",
    date: "12/2025 – 12/2025",
    badge: "ML Analytics",
    tech: ["React", "Flask", "Python", "Scikit-learn"],
    description: [
      "Trained and serialized an ML regression pipeline with scikit-learn to forecast crop yields based on soil and climate parameters.",
      "Built a RESTful Flask backend and a responsive React analytics dashboard for real-time inference and data visualization.",
    ],
    stats: [
      { target: 94.3, suffix: "%", decimals: 1, label: "model inference precision" },
    ],
    flowNodes: ["Soil/Climate Input", "Flask REST API", "Scikit-Learn ML", "React Dashboard"],
    image: "/agriguard_preview.jpg",
    githubUrl: "https://github.com/Krithish04/agriguard",
    vercelUrl: "https://agriguard-analytics.vercel.app",
  },
  {
    id: "android-sms",
    title: "Android SMS Gateway Server",
    subtitle: "Embedded Cellular HTTP Server",
    date: "08/2026 – 08/2026",
    badge: "Mobile Systems",
    tech: ["Kotlin", "Android SDK", "Embedded HTTP Server", "Foreground Service"],
    description: [
      "Developed an Android service exposing local REST APIs to programmatically trigger cellular SMS dispatches from external applications.",
      "Configured a persistent background foreground service and BootReceiver to guarantee daemon uptime across device reboots.",
    ],
    flowNodes: ["REST API Call", "Embedded HTTP", "Foreground Service", "Cellular Dispatch"],
    githubUrl: "https://github.com/Krithish04/android-sms-gateway",
  },
  {
    id: "morsemind",
    title: "MorseMind",
    subtitle: "Interactive Morse Code Tutor App",
    date: "04/2026 – 04/2026",
    badge: "Native Android App",
    tech: ["Kotlin", "Android SDK", "Jetpack", "XML Layouts"],
    description: [
      "Built a native Android learning app with dedicated symbol practice modules, real-time input decoding, and structured XML layouts.",
      "Designed clean architecture Kotlin components focused on minimal APK footprint and responsive UI interactions.",
    ],
    flowNodes: ["Symbol Module", "Real-Time Input", "Kotlin Decoder", "UI Feedback"],
    githubUrl: "https://github.com/Krithish04/morsemind",
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState<{ [key: string]: "preview" | "flow" }>({});

  const toggleTab = (id: string, tab: "preview" | "flow") => {
    setActiveTab((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section id="projects" className="py-10 sm:py-16">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 md:px-8">
        <SectionHead index="04" title="Projects" />

        <div className="grid grid-cols-1 gap-8 sm:gap-10">
          {projects.map((proj, index) => {
            const currentTab = activeTab[proj.id] || (proj.image ? "preview" : "flow");

            return (
              <Reveal key={proj.id} delay={index * 0.06}>
                <TiltCard className="border border-line rounded-xl bg-panel overflow-hidden transition-colors hover:border-teal/60 [transform-style:preserve-3d] shadow-xl">
                  {/* Window Bar */}
                  <div className="h-10 bg-panel2 border-b border-line flex items-center justify-between px-3.5 sm:px-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber" />
                      <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                      <span className="font-mono text-[10px] sm:text-[11px] text-dim ml-2 sm:ml-3 bg-void/40 px-2.5 py-0.5 rounded truncate max-w-[160px] xs:max-w-[240px] sm:max-w-none">
                        {proj.id}.internal/preview
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      {proj.image && (
                        <button
                          type="button"
                          onClick={() => toggleTab(proj.id, "preview")}
                          className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                            currentTab === "preview"
                              ? "bg-amber/10 text-amber border border-amber/20"
                              : "text-dim hover:text-primary"
                          }`}
                        >
                          <Eye size={12} />
                          <span className="hidden xs:inline">Preview</span>
                        </button>
                      )}
                      {proj.flowNodes && (
                        <button
                          type="button"
                          onClick={() => toggleTab(proj.id, "flow")}
                          className={`px-2.5 py-1 rounded transition-colors flex items-center gap-1 ${
                            currentTab === "flow"
                              ? "bg-teal/10 text-teal border border-teal/20"
                              : "text-dim hover:text-primary"
                          }`}
                        >
                          <Layers size={12} />
                          <span className="hidden xs:inline">Flow</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4 xs:p-6 sm:p-8">
                    {/* Header Row */}
                    <div className="flex justify-between items-start gap-3 flex-wrap">
                      <div>
                        <div className="font-mono text-xs text-amber font-semibold tracking-wide">
                          {proj.subtitle}
                        </div>
                        <h3 className="font-mono font-extrabold text-lg xs:text-xl sm:text-2xl text-primary mt-1">
                          {proj.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10.5px] text-dim">{proj.date}</span>
                        <span className="font-mono text-[10px] sm:text-[11px] text-amber border border-amber/20 bg-amber/10 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                          {proj.badge}
                        </span>
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10.5px] sm:text-[11.5px] text-muted border border-line bg-panel2/60 px-2.5 py-1 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Description Bullets */}
                    <ul className="mt-4 space-y-2">
                      {proj.description.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-muted text-[13.5px] xs:text-[14.5px] leading-relaxed">
                          <CheckCircle2 size={15} className="text-teal flex-shrink-0 mt-1" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Visual Media Preview vs Architecture Flow */}
                    <div className="mt-6 pt-5 border-t border-linesoft">
                      {currentTab === "preview" && proj.image ? (
                        <div className="relative rounded-lg overflow-hidden border border-line bg-void/80 shadow-md group">
                          <Image
                            src={proj.image}
                            alt={`${proj.title} live dashboard preview`}
                            width={1280}
                            height={720}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          {proj.vercelUrl && (
                            <a
                              href={proj.vercelUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4"
                            >
                              <span className="font-mono text-xs text-teal font-semibold flex items-center gap-1">
                                Live Application Preview <ArrowRight size={14} />
                              </span>
                            </a>
                          )}
                        </div>
                      ) : proj.flowNodes ? (
                        <div>
                          <div className="font-mono text-[10px] text-dim tracking-wide mb-2">
                            DATA &amp; ARCHITECTURE FLOW
                          </div>
                          <MiniFlow nodes={proj.flowNodes} />
                        </div>
                      ) : null}
                    </div>

                    {/* Stats grid */}
                    {proj.stats && (
                      <div className="grid grid-cols-2 sm:flex sm:gap-9 gap-4 mt-5 pt-4 border-t border-linesoft">
                        {proj.stats.map((s) => (
                          <AnimatedStat
                            key={s.label}
                            target={s.target}
                            suffix={s.suffix}
                            decimals={s.decimals}
                            label={s.label}
                          />
                        ))}
                      </div>
                    )}

                    {/* Action Links (Git & Vercel Preview Buttons) */}
                    <div className="mt-6 pt-5 border-t border-linesoft flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                      <div className="flex items-center gap-3 flex-wrap">
                        {proj.vercelUrl && (
                          <a
                            href={proj.vercelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold px-4 py-2 rounded-lg bg-teal text-void hover:bg-teal/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(79,209,197,0.25)] active:scale-95"
                          >
                            <ExternalLink size={14} />
                            <span>Live Application Preview</span>
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg border border-line text-primary hover:border-amber hover:text-amber transition-all flex items-center gap-2 bg-panel2/50 active:scale-95"
                          >
                            <Github size={14} />
                            <span>View Git Repository</span>
                          </a>
                        )}
                      </div>

                      {proj.vercelUrl && (
                        <div className="flex items-center gap-2 text-[11px] text-teal/90">
                          <span className="w-2 h-2 rounded-full bg-teal animate-blink" />
                          <span>status: 200 live</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
