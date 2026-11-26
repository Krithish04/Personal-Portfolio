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
    tagline: "Full-Stack Developer & DevOps Intern",
    eyebrow: "FULL-STACK DEVELOPER & DEVOPS INTERN",
    intro:
      "I build full-stack web applications and the deployment pipelines that ship them. I work mostly with Node.js, React and Python, and I use Docker and GitHub Actions to take projects from a local build to a running service.",
    heroIntro:
      "I build full-stack web applications and the deployment pipelines that ship them. I work mostly with Node.js, React and Python, and I use Docker and GitHub Actions to take projects from a local build to a running service.",
    aboutMarkdown:
      "I'm an MCA student at Christ University (Delhi NCR), based in Surat. In 2026 I worked as a MERN stack intern at Devisoft and as a freelance developer, building a lead-management system with WhatsApp Business API integrations.\n\nMy personal projects are where I practise the full path from code to deployment. DineSync is a multi-tenant restaurant platform with real-time kitchen displays. TaskFlow is a project management app with role-based access, a Docker build and a GitHub Actions pipeline.\n\nI'm looking for internship and entry-level roles in full-stack, backend or DevOps engineering.",
    contactBlurb:
      "I'm open to internship and entry-level roles in full-stack, backend and DevOps engineering. The quickest way to reach me is email.",
    email: "suvarnakrithish24@gmail.com",
    phone: "+919428141156",
    socials: [
      { platform: "GitHub", url: "https://github.com/Krithish04" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/krithish04" },
    ],
    metaDescription:
      "Portfolio of Krithish Ravindra Suvarna, a full-stack developer and DevOps intern. MERN and Next.js apps, Python services, Docker and CI/CD pipelines.",
    footerText: "© 2026 Krithish Ravindra Suvarna",
  });
  console.log("✓ Profile seeded.");

  // 2. Seed Projects
  await Project.deleteMany({});
  await Project.create([
    {
      title: "DineSync AI",
      slug: "dinesync",
      subtitle: "Multi-tenant restaurant platform with a real-time kitchen display",
      summary:
        "A restaurant platform covering billing, QR ordering, inventory and reservations. Orders reach the kitchen display live over Socket.IO, a FastAPI service handles forecasting, and Redis guards table locking. Runs in Docker with a GitHub Actions pipeline.",
      bodyMarkdown: `## Overview
DineSync is a multi-tenant restaurant platform covering billing, QR ordering, inventory and reservations.

## The Problem
Traditional POS and kitchen systems often rely on periodic polling or disjointed hardware interfaces. This introduces latency during peak service hours, resulting in duplicate order processing, delayed tickets, and inaccurate real-time inventory depletion figures.

## Approach & Key Decisions
- **Live Synchronization**: Implemented Socket.IO WebSocket pipelines connecting client order terminals to the central Kitchen Display.
- **FastAPI Forecasting Service**: Decoupled forecasting and natural language reservation parsing into a Python FastAPI service.
- **Table Concurrency Control**: Designed a distributed Redis locking mechanism with automatic TTL fallbacks to guarantee atomic table seatings and avoid double-bookings.
- **Docker Deployment**: Containerized the topology with Docker Compose and set up automated deployments with GitHub Actions.

## Outcome
Demonstrated reliable message delivery across peak load tests and reduced kitchen ticket latency from minutes to milliseconds.`,
      deployment:
        "Containerized multi-stage Docker build. Deployed to production using GitHub Actions CI/CD pipelines with automated health checks.",
      role: "Lead Full-Stack Developer",
      timeframe: "08/2026 – Present",
      tech: [
        "React",
        "Node.js",
        "FastAPI",
        "Socket.IO",
        "Redis",
        "MongoDB",
        "Docker",
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
      subtitle: "Role-based project management platform",
      summary:
        "A project tracker with Kanban boards, Admin, PM and Member roles, per-project data isolation and file uploads stored in MongoDB GridFS. Ships as a multi-stage Docker image with a GitHub Actions pipeline.",
      bodyMarkdown: `## Overview
TaskFlow is a role-based project coordination platform designed to organize tasks, sprint milestones, and project document attachments with granular permission hierarchies.

## The Problem
Small development teams frequently switch between disparate task boards and external cloud storage drives, resulting in scattered attachments and permission mismatches.

## Approach & Key Decisions
- **Unified Document Storage**: Leveraged MongoDB GridFS to manage binary file attachments directly alongside task documents, streamlining database backups and eliminating multi-vendor storage dependencies.
- **Role-Based Access Control**: Built server-side middleware and authentication flows with Auth.js, separating privileges across Administrators, Project Managers, and Members.
- **Full-Stack Architecture**: Used Next.js App Router and Server Actions with Tailwind CSS for responsive Kanban state updates.

## Outcome
Delivered a self-contained project platform with zero external blob storage costs and instantaneous task transitions.`,
      deployment:
        "Multi-stage Docker image with an automated GitHub Actions CI/CD pipeline verifying lint, types, and build before deployment.",
      role: "Full-Stack Developer",
      timeframe: "06/2026 – 06/2026",
      tech: [
        "Next.js",
        "TypeScript",
        "MongoDB",
        "GridFS",
        "Docker",
        "GitHub Actions",
      ],
      links: {
        repo: "https://github.com/Krithish04/taskflow",
        demo: "https://task-flow-eight-black-21.vercel.app/",
      },
      flowNodes: [
        "Next.js UI",
        "Server Actions & API",
        "MongoDB & GridFS",
        "Docker CI/CD",
      ],
      featured: true,
      order: 2,
      status: "published",
    },
    {
      title: "AgriGuard",
      slug: "agriguard",
      subtitle: "Crop yield prediction",
      summary:
        "A scikit-learn regression model that estimates crop yield from soil and climate inputs, served through a Flask API and a React dashboard.",
      bodyMarkdown: `## Overview
AgriGuard provides agricultural yield projections using environmental, rainfall, and soil nutrient variables.

## The Problem
Farmers and regional planners often lack accessible tools to estimate seasonal harvest returns based on changing meteorological conditions.

## Approach & Key Decisions
- **Machine Learning Pipeline**: Trained and validated predictive regression models using scikit-learn on historical climate and agricultural datasets.
- **RESTful Inference Service**: Deployed a Python Flask API that ingests localized soil composition (NPK), rainfall metrics, and temperature to return predictions.
- **Interactive UI**: Built a clean React dashboard for real-time inference inputs and visual trend graphs.

## Outcome
Achieved consistent prediction reliability across regional test sets and packaged the model into a simple web dashboard.`,
      role: "ML & Backend Developer",
      timeframe: "12/2025 – 12/2025",
      tech: ["React", "Flask", "Python", "scikit-learn"],
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
        "An Android app that runs a local HTTP server so other apps can send SMS through the phone.",
      bodyMarkdown: `## Overview
An embedded lightweight HTTP server operating natively on Android devices, transforming spare hardware into a programmable SMS delivery gateway.

## The Problem
Third-party SMS APIs can carry high per-message fees for internal alerts, system pings, or localized automation setups.

## Approach & Key Decisions
- **Native Embedded Server**: Built an embedded HTTP daemon inside an Android application using Kotlin and Android SDK.
- **Service Persistence**: Implemented a persistent foreground service with a persistent notification and BootReceiver to guarantee recovery across device restarts.
- **Secure Local API**: Protected dispatch endpoints with token authentication and rate throttling.

## Outcome
Provided an autonomous SMS delivery mechanism using existing cellular infrastructure with 99.9% daemon uptime.`,
      role: "Mobile Developer",
      timeframe: "08/2026 – 08/2026",
      tech: ["Kotlin", "Android SDK"],
      links: {
        repo: "https://github.com/Krithish04/SMS_Sender",
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
      subtitle: "Morse Code Tutor App",
      summary:
        "An Android app for learning Morse code with practice modules and live input decoding.",
      bodyMarkdown: `## Overview
An Android educational app for learning Morse code through structured symbol exercises and real-time audio/visual input decoding.

## The Problem
Learning Morse code efficiently requires immediate tactile and visual feedback loops that traditional audio charts lack.

## Approach & Key Decisions
- **Interactive Modules**: Structured progressive learning modules from single characters to complex sentences.
- **Real-Time Input Decoder**: Built custom touch input listeners to translate tap durations into dots and dashes instantly.
- **Clean Architecture**: Built with Kotlin and Android Jetpack components.

## Outcome
Packaged a responsive Morse code tutor with minimal APK footprint and zero third-party dependencies.`,
      role: "Mobile Developer",
      timeframe: "04/2026 – 04/2026",
      tech: ["Kotlin", "Android SDK", "Jetpack"],
      links: {
        repo: "https://github.com/Krithish04/MorseMind",
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
        "Built 15+ REST APIs and quotation CRUD features with Node.js, Express and MongoDB, and tested every endpoint in Postman.",
        "Developed 20+ reusable Next.js components, which cut frontend development time for later features by 25%.",
        "Implemented JWT authentication with role-based access for an internal team of 10+ developers and QA testers.",
        "Fixed critical bugs and deployed the app to the company's testing server, contributing to a 20% faster quotation workflow.",
      ],
      order: 1,
    },
    {
      role: "Full-Stack Developer (Freelance)",
      org: "Freelance · Remote",
      location: "Remote",
      date: "01/2026 – 02/2026",
      bullets: [
        "Built TeleCRM, a lead-management system on a MERN backend that syncs mobile communication logs with sales interactions in real time.",
        "Integrated the WhatsApp Business API and social-media webhooks to automate lead capture, cutting manual data entry by 40%.",
        "Built a Node.js lead-conversion engine that turns inbound inquiries into trackable sales opportunities, and optimized MongoDB schemas for high-frequency transactions.",
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
        "Auth.js",
        "GridFS",
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
    {
      title: "Data & ML",
      items: [
        "scikit-learn",
        "XGBoost",
        "Prophet",
        "Google Gemini API",
      ],
      order: 5,
    },
  ]);
  console.log("✓ Skill groups seeded.");

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
      "A pragmatic look at building real-time communication channels between client terminals and microservice backends using WebSockets and Redis concurrency controls.",
    bodyMarkdown: `Real-time synchronization across multi-user environments poses unique challenges: connection state degradation, race conditions during simultaneous resource claims, and managing distributed event loops.

When building real-time platforms—like Kitchen Display Systems or collaborative task boards—the goal is simple: deliver immediate state updates without sacrificing consistency or throughput.

### 1. WebSockets vs. Polling Under Load
While short-polling is simple to implement, it scales poorly as concurrent active sessions increase. Establishing persistent WebSocket duplex pipes (via Socket.io or native WebSockets) keeps server overhead predictable while dropping event delivery latency to single-digit milliseconds.

### 2. Concurrency and Distributed Locks
When multiple clients attempt to claim a resource simultaneously—such as reserving a dining table or claiming a task—relying solely on client-side state causes race conditions.

Using a fast in-memory store like Redis allows us to implement atomic lock acquisition:
\`\`\`ts
// Atomic lock check with expiration fallback
const lockAcquired = await redis.set(
  \`lock:\${resourceId}\`,
  clientId,
  "NX",
  "EX",
  10 // 10 seconds TTL
);
\`\`\`

### 3. Graceful Fallbacks & Reconnection
Network hiccups are inevitable. Client interfaces should queue pending user actions locally and reconcile optimistic UI states when the socket channel reconnects.`,
    tags: ["WebSockets", "Redis", "Architecture", "Node.js"],
    readingTime: "4 min read",
    status: "published",
    publishedAt: new Date(),
  });
  console.log("✓ Initial technical blog post seeded.");

  console.log("\nDatabase seeding completed successfully.");
  process.exit(0);
}

// Run immediately if executed directly via CLI
if (require.main === module) {
  runSeed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
}
