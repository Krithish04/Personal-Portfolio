import mongoose from "mongoose";
import {
  Profile,
  Project,
  Post,
  Experience,
  Education,
  SkillGroup,
  FeatureFlag,
} from "../models";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";

export async function runSeed() {
  console.log("Connecting to MongoDB for seeding...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully.");

  // 1. Seed Profile
  await Profile.deleteMany({});
  await Profile.create({
    name: "Krithish Ravindra Suvarna",
    tagline: "Full-Stack Developer & Automation Specialist",
    intro:
      "Strategic MCA candidate specializing in MERN stack architecture, Python microservices, and reliable cloud deployments. Focused on building clean, high-performance web systems and automating resilient infrastructure.",
    email: "suvarnakrithish24@gmail.com",
    phone: "+919428141156",
    socials: [
      { platform: "GitHub", url: "https://github.com/Krithish04" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/krithish04" },
    ],
    metaDescription:
      "Personal portfolio of Krithish Ravindra Suvarna — Full-Stack Developer & DevOps Specialist. Specializing in MERN stack architecture, Python microservices, and cloud deployments.",
    footerText: "Built with care. Simple, calm, and resilient.",
  });
  console.log("✓ Profile seeded.");

  // 2. Seed Projects
  await Project.deleteMany({});
  await Project.create([
    {
      title: "DineSync AI",
      slug: "dinesync",
      subtitle: "Multi-Tenant Restaurant Platform with Real-Time KDS",
      summary:
        "Engineered an event-driven restaurant ERP with zero-latency Kitchen Display synchronization, time-series revenue forecasting, Redis locking, and automated CI/CD.",
      bodyMarkdown: `## Overview
DineSync is a multi-tenant restaurant management and Kitchen Display System (KDS) engineered to eliminate ordering bottlenecks and inventory discrepancies in high-volume hospitality environments.

## The Problem
Traditional POS and kitchen systems often rely on periodic polling or disjointed hardware interfaces. This introduces latency during peak service hours, resulting in duplicate order processing, delayed tickets, and inaccurate real-time inventory depletion figures.

## Approach & Key Decisions
- **Real-Time Synchronization**: Implemented Socket.IO WebSocket pipelines connecting client order terminals to the central Kitchen Display with sub-millisecond dispatch.
- **Microservice Architecture**: Decoupled forecasting and natural language reservation parsing into an autonomous Python FastAPI service.
- **Concurrency Control**: Designed a distributed Redis locking mechanism with automatic TTL fallbacks to guarantee atomic table seatings and avoid double-bookings.
- **Automated Delivery**: Containerized the entire topology with Docker Compose and automated deployments via GitHub Actions.

## Outcome
Demonstrated zero message loss across synthetic peak load tests and reduced kitchen ticket latency from minutes to milliseconds.`,
      role: "Lead Full-Stack & System Architect",
      timeframe: "08/2026 – Present",
      tech: [
        "React",
        "FastAPI",
        "Node.js",
        "Socket.io",
        "Redis",
        "Docker",
        "Scikit-Learn",
      ],
      links: {
        demo: "https://dine-sync-ashen.vercel.app/",
      },
      flowNodes: [
        "Client POS",
        "FastAPI Microservice",
        "Socket.io KDS Queue",
        "Docker CI/CD",
      ],
      featured: true,
      order: 1,
      status: "published",
    },
    {
      title: "TaskFlow",
      slug: "taskflow",
      subtitle: "Role-Based Project Management Platform with GridFS",
      summary:
        "Developed a full-stack project management platform featuring interactive Kanban boards, multi-tier RBAC, document management with MongoDB GridFS, and Next.js App Router.",
      bodyMarkdown: `## Overview
TaskFlow is a role-based project coordination platform designed to organize tasks, sprint milestones, and project document attachments with granular permission hierarchies.

## The Problem
Small development teams frequently switch between disparate task boards and external cloud storage drives, resulting in scattered attachments and permission mismatches.

## Approach & Key Decisions
- **Unified Document Storage**: Leveraged MongoDB GridFS to manage binary file attachments directly alongside task documents, streamlining database backups and eliminating multi-vendor storage dependencies.
- **Role-Based Access Control**: Built strict server-side middleware and authentication flows with Auth.js, separating privileges across Administrators, Project Managers, and Contributors.
- **Full-Stack Architecture**: Used Next.js App Router and Server Actions with Tailwind CSS for responsive Kanban state updates.

## Outcome
Delivered a self-contained, high-performance project platform with zero external blob storage costs and instantaneous task transitions.`,
      role: "Full-Stack Developer",
      timeframe: "06/2026 – 06/2026",
      tech: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "GridFS",
        "Tailwind CSS",
      ],
      links: {
        repo: "https://github.com/Krithish04/taskflow",
        demo: "https://taskflow-1-7sax.onrender.com/",
      },
      flowNodes: [
        "Next.js UI",
        "Server Actions & API",
        "MongoDB & GridFS",
        "Auth.js",
      ],
      featured: true,
      order: 2,
      status: "published",
    },
    {
      title: "AgriGuard",
      slug: "agriguard",
      subtitle: "Crop Yield Prediction System",
      summary:
        "Trained an ML regression pipeline with scikit-learn forecasting agricultural yields based on soil and climate variables, served via a Flask REST API and React dashboard.",
      bodyMarkdown: `## Overview
AgriGuard provides actionable agricultural yield projections using environmental, rainfall, and soil nutrient variables.

## The Problem
Farmers and regional planners often lack accessible tools to estimate seasonal harvest returns based on changing meteorological conditions.

## Approach & Key Decisions
- **Machine Learning Pipeline**: Trained and validated predictive regression models using scikit-learn on historical climate and agricultural datasets.
- **RESTful Inference Service**: Deployed a lightweight Python Flask API that ingests localized soil composition (NPK), rainfall metrics, and temperature to return predictions.
- **Interactive UI**: Built a clean React dashboard for real-time inference inputs and visual trend graphs.

## Outcome
Achieved consistent prediction reliability across regional test sets and packaged the model into a simple web dashboard.`,
      role: "ML & Backend Developer",
      timeframe: "12/2025 – 12/2025",
      tech: ["React", "Flask", "Python", "Scikit-learn"],
      links: {
        repo: "https://github.com/Krithish04/Agriculture-Prediction",
      },
      flowNodes: [
        "Soil/Climate Input",
        "Flask REST API",
        "Scikit-Learn ML",
        "React Dashboard",
      ],
      featured: true,
      order: 3,
      status: "published",
    },
    {
      title: "Android SMS Gateway Server",
      slug: "android-sms-gateway",
      subtitle: "Embedded Cellular HTTP Server",
      summary:
        "Exposes local REST endpoints from an Android foreground service and BootReceiver to programmatically trigger cellular SMS dispatches from external services.",
      bodyMarkdown: `## Overview
An embedded lightweight HTTP server operating natively on Android devices, transforming spare hardware into a programmable SMS delivery gateway.

## The Problem
Third-party SMS APIs can carry high per-message fees for internal alerts, system pings, or localized automation setups.

## Approach & Key Decisions
- **Native Embedded Server**: Built an embedded HTTP daemon inside an Android application using Kotlin and Android SDK.
- **Service Resilience**: Implemented a persistent foreground service with a persistent notification and BootReceiver to guarantee recovery across device restarts.
- **Secure Local API**: Protected dispatch endpoints with token authentication and rate throttling.

## Outcome
Provided an autonomous, reliable SMS delivery mechanism using existing cellular infrastructure with 99.9% daemon uptime.`,
      role: "Mobile Systems Developer",
      timeframe: "08/2026 – 08/2026",
      tech: [
        "Kotlin",
        "Android SDK",
        "Embedded HTTP Server",
        "Foreground Service",
      ],
      links: {
        repo: "https://github.com/Krithish04/android-sms-gateway",
      },
      flowNodes: [
        "REST API Call",
        "Embedded HTTP",
        "Foreground Service",
        "Cellular Dispatch",
      ],
      featured: false,
      order: 4,
      status: "published",
    },
    {
      title: "MorseMind",
      slug: "morsemind",
      subtitle: "Interactive Morse Code Learning App",
      summary:
        "Native Android educational application with dedicated symbol practice modules, real-time input decoding, and responsive XML layouts.",
      bodyMarkdown: `## Overview
MorseMind is an interactive Android application designed to teach telegraphic Morse code through structured symbol exercises and audio-tactile feedback.

## The Problem
Learning Morse code requires continuous repetition and immediate feedback on timing and character recognition, which text-heavy guides fail to deliver.

## Approach & Key Decisions
- **Clean Architecture**: Structured in idiomatic Kotlin leveraging Android Jetpack components and clean separation of concerns.
- **Real-Time Decoding**: Engineered a lightweight state machine that converts tap durations into dots, dashes, and decoded letters with immediate audio playback.
- **Native Layouts**: Optimized XML layouts for minimal battery consumption and low memory footprint.

## Outcome
Created a responsive, distraction-free native app with instant decoding feedback.`,
      role: "Android Developer",
      timeframe: "04/2026 – 04/2026",
      tech: ["Kotlin", "Android SDK", "Jetpack", "XML Layouts"],
      links: {
        repo: "https://github.com/Krithish04/morsemind",
      },
      flowNodes: [
        "Symbol Module",
        "Real-Time Input",
        "Kotlin Decoder",
        "UI Feedback",
      ],
      featured: false,
      order: 5,
      status: "published",
    },
  ]);
  console.log("✓ 5 Projects seeded.");

  // 3. Seed Experience
  await Experience.deleteMany({});
  await Experience.create([
    {
      role: "MERN Stack Intern",
      org: "Devisoft · Surat",
      location: "Surat, Gujarat",
      date: "05/2026 – 07/2026",
      bullets: [
        "Built 15+ REST APIs and quotation CRUD features using Node.js, Express.js, and MongoDB, testing all endpoints with Postman.",
        "Developed 20+ reusable UI components in Next.js, standardizing the application interface across frontend modules.",
        "Implemented robust JWT authentication, managing role-based access for an internal Agile team of developers and QA testers.",
        "Fixed critical bugs and deployed the application on local testing servers for validation, streamlining the quotation generation workflow.",
      ],
      order: 1,
    },
    {
      role: "Full-Stack Developer & Automation Specialist",
      org: "Freelance · Remote",
      location: "Remote",
      date: "01/2026 – 02/2026",
      bullets: [
        "TeleCRM Architecture: Engineered a centralized lead management system integrating communication logs with a MERN backend for real-time sales tracking.",
        "Omnichannel Integration: Developed custom hooks for the WhatsApp Business API and webhooks to automate lead capture and data ingestion.",
        "Automated Workflow Engine: Architected a lead-conversion engine in Node.js, transitioning inbound inquiries into trackable sales opportunities.",
        "High-Volume Data Management: Optimized MongoDB schemas to handle high-frequency transactional workflows while maintaining consistent data integrity.",
      ],
      order: 2,
    },
  ]);
  console.log("✓ Experience seeded.");

  // 4. Seed Education
  await Education.deleteMany({});
  await Education.create([
    {
      school: "Christ University",
      degree: "Master of Computer Applications (MCA)",
      location: "Delhi NCR",
      date: "Expected 05/2027",
      order: 1,
    },
    {
      school: "St. Aloysius (Autonomous) College",
      degree: "Bachelor of Computer Applications (BCA)",
      location: "Mangalore, Karnataka",
      date: "04/2025",
      order: 2,
    },
  ]);
  console.log("✓ Education seeded.");

  // 5. Seed Skills
  await SkillGroup.deleteMany({});
  await SkillGroup.create([
    {
      title: "Languages",
      items: [
        "JavaScript (ES6+)",
        "TypeScript",
        "Python",
        "Kotlin",
        "SQL",
        "HTML5/CSS3",
      ],
      order: 1,
    },
    {
      title: "Frontend",
      items: ["React.js", "Next.js", "Tailwind CSS", "Vite"],
      order: 2,
    },
    {
      title: "Backend & Data",
      items: [
        "Node.js",
        "Express.js",
        "FastAPI",
        "Flask",
        "MongoDB",
        "PostgreSQL",
        "Redis",
        "REST APIs",
      ],
      order: 3,
    },
    {
      title: "DevOps & Tools",
      items: [
        "Docker",
        "Docker Compose",
        "Git",
        "GitHub Actions",
        "Linux / Bash",
        "Postman",
        "Nginx",
      ],
      order: 4,
    },
  ]);
  console.log("✓ Skill groups seeded (with Kotlin & PostgreSQL, without Kubernetes).");

  // 6. Seed Feature Flags (Defaults per §6.8)
  await FeatureFlag.deleteMany({});
  await FeatureFlag.create([
    { key: "caseStudies", enabled: true },
    { key: "blog", enabled: true },
    { key: "contactForm", enabled: true },
    { key: "resumeDownload", enabled: true },
    { key: "themeToggle", enabled: true },
    { key: "analytics", enabled: true },
    { key: "showPhone", enabled: false }, // Default off per PRD
  ]);
  console.log("✓ Feature flags seeded with defaults.");

  // 7. Seed Initial Technical Blog Post
  await Post.deleteMany({});
  await Post.create({
    title: "Designing Event-Driven State Synchronization in Modern Web Apps",
    slug: "designing-event-driven-state-synchronization",
    excerpt:
      "A pragmatic look at building zero-latency communication channels between client terminals and microservice backends using WebSockets and Redis concurrency controls.",
    bodyMarkdown: `Real-time synchronization across multi-user environments poses unique challenges: connection state degradation, race conditions during simultaneous resource claims, and the cognitive overhead of managing distributed event loops.

When building real-time platforms—like Kitchen Display Systems or collaborative task boards—the goal is simple: deliver immediate state updates without sacrificing consistency or throughput.

### 1. WebSockets vs. Polling Under Load
While short-polling is trivial to implement, it scales poorly as concurrent active sessions increase. Establishing persistent WebSocket duplex pipes (via Socket.io or native WebSockets) keeps server overhead predictable while dropping event delivery latency to single-digit milliseconds.

### 2. Concurrency and Distributed Locks
When multiple clients attempt to claim a resource simultaneously—such as reserving a dining table or claiming a task—relying solely on client-side state guarantees race conditions.

Using a fast in-memory store like Redis allows us to implement atomic lock acquisition:
\`\`\`ts
// Atomic lock check with expiration fallback
const lockAcquired = await redis.set(
  \`lock:\${resourceId}\`,
  clientId,
  "NX",
  "PX",
  5000 // 5-second automatic safety release
);

if (!lockAcquired) {
  throw new Error("Resource is currently being modified by another session.");
}
\`\`\`

### 3. Graceful Fallbacks
A production system must never fail catastrophically if external caches restart. Designing in-memory fallbacks with idempotency keys ensures service continuity while maintaining transactional integrity.

Building calm, dependable software means handling edge conditions silently so users can focus on their work.`,
    tags: ["Architecture", "Node.js", "WebSockets", "Redis"],
    status: "published",
    readingTime: "4 min read",
    publishedAt: new Date(),
  });
  console.log("✓ Sample technical blog post seeded.");

  console.log("Database seeding completed successfully!");
  await mongoose.disconnect();
}

// Execute directly if run as a CLI script
if (require.main === module || process.argv[1]?.endsWith("seed.ts")) {
  runSeed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Seeding failed:", err);
      process.exit(1);
    });
}
