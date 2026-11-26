import { connectDB } from "./db";
import {
  Profile,
  Project,
  Post,
  Experience,
  Education,
  SkillGroup,
  FeatureFlag,
} from "@/models";
import { seedProjects } from "@/components/Projects";

// Feature Flags lookup with fallback defaults
export async function getFeatureFlags(): Promise<Record<string, boolean>> {
  const defaults: Record<string, boolean> = {
    caseStudies: true,
    blog: true,
    contactForm: true,
    resumeDownload: true,
    themeToggle: true,
    analytics: true,
    showPhone: false,
  };

  try {
    const conn = await connectDB();
    if (!conn) return defaults;

    const flags = await FeatureFlag.find({}).lean();
    if (!flags || flags.length === 0) return defaults;

    const result = { ...defaults };
    flags.forEach((f) => {
      result[f.key] = f.enabled;
    });
    return result;
  } catch {
    return defaults;
  }
}

export async function isFeatureEnabled(key: string): Promise<boolean> {
  const flags = await getFeatureFlags();
  return flags[key] ?? true;
}

// Profile lookup with fallback
export async function getProfile() {
  const fallback = {
    name: "Krithish Ravindra Suvarna",
    tagline: "Full-Stack Developer & Automation Specialist",
    intro:
      "Strategic MCA candidate specializing in MERN stack architecture, Python microservices, and reliable cloud deployments. Focused on building clean, high-performance web systems and automating resilient infrastructure.",
    email: "suvarnakrithish24@gmail.com",
    phone: "+91 9428141156",
    socials: [
      { platform: "GitHub", url: "https://github.com/Krithish04" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/krithish04" },
    ],
    metaDescription:
      "Personal portfolio of Krithish Ravindra Suvarna. Full-Stack developer specializing in MERN stack architecture, Python microservices, and reliable cloud deployments.",
    footerText: "Built with care. Simple, calm, and resilient.",
  };

  try {
    const conn = await connectDB();
    if (!conn) return fallback;

    const profile = await Profile.findOne().lean();
    if (!profile) return fallback;
    return profile;
  } catch {
    return fallback;
  }
}

// Projects lookup
export async function getProjects() {
  try {
    const conn = await connectDB();
    if (!conn) return seedProjects;

    const projects = await Project.find({ status: "published" })
      .sort({ order: 1 })
      .lean();

    if (!projects || projects.length === 0) return seedProjects;

    return projects.map((p) => ({
      id: String(p._id),
      slug: p.slug,
      title: p.title,
      subtitle: p.subtitle,
      summary: p.summary,
      bodyMarkdown: p.bodyMarkdown,
      role: p.role,
      timeframe: p.timeframe,
      featured: p.featured,
      tech: p.tech || [],
      githubUrl: p.links?.repo || "",
      demoUrl: p.links?.demo || "",
      flowNodes: p.flowNodes || [],
    }));
  } catch {
    return seedProjects;
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const conn = await connectDB();
    if (!conn) {
      return seedProjects.find((p) => p.slug === slug) || null;
    }

    const project = await Project.findOne({ slug, status: "published" }).lean();
    if (!project) {
      return seedProjects.find((p) => p.slug === slug) || null;
    }

    return {
      id: String(project._id),
      slug: project.slug,
      title: project.title,
      subtitle: project.subtitle,
      summary: project.summary,
      bodyMarkdown: project.bodyMarkdown,
      role: project.role,
      timeframe: project.timeframe,
      featured: project.featured,
      tech: project.tech || [],
      githubUrl: project.links?.repo || "",
      demoUrl: project.links?.demo || "",
      flowNodes: project.flowNodes || [],
      images: project.images || [],
    };
  } catch {
    return seedProjects.find((p) => p.slug === slug) || null;
  }
}

// Experience lookup
export async function getExperience() {
  const fallback = [
    {
      role: "MERN Stack Intern",
      org: "Devisoft · Surat",
      location: "Surat, Gujarat",
      date: "05/2026 – 07/2026",
      bullets: [
        "Built 15+ REST APIs and quotation CRUD features using Node.js, Express.js, and MongoDB, thoroughly tested via Postman.",
        "Developed 20+ reusable UI components in Next.js, standardizing frontend modules across the application.",
        "Implemented robust JWT authentication with role-based access control for development and QA teams.",
        "Diagnosed and resolved critical bugs, streamlining the quotation generation workflow on local testing environments.",
      ],
      order: 1,
    },
    {
      role: "Full-Stack Developer & Automation Specialist",
      org: "Freelance · Remote",
      location: "Remote",
      date: "01/2026 – 02/2026",
      bullets: [
        "Architected TeleCRM: A centralized lead management system integrating communication logs with a MERN stack backend for real-time sales tracking.",
        "Developed custom webhooks and WhatsApp Business API integrations for automated lead ingestion.",
        "Engineered an automated lead-conversion engine in Node.js, transitioning inbound inquiries into trackable sales opportunities.",
        "Optimized MongoDB schemas to maintain high transactional performance and data consistency.",
      ],
      order: 2,
    },
  ];

  try {
    const conn = await connectDB();
    if (!conn) return fallback;

    const list = await Experience.find().sort({ order: 1 }).lean();
    return list.length > 0 ? list : fallback;
  } catch {
    return fallback;
  }
}

// Education lookup
export async function getEducation() {
  const fallback = [
    {
      school: "Christ University",
      degree: "Master of Computer Applications (MCA)",
      date: "Expected 05/2027",
      location: "Delhi NCR",
      order: 1,
    },
    {
      school: "St. Aloysius (Autonomous) College",
      degree: "Bachelor of Computer Applications (BCA)",
      date: "04/2025",
      location: "Mangalore, Karnataka",
      order: 2,
    },
  ];

  try {
    const conn = await connectDB();
    if (!conn) return fallback;

    const list = await Education.find().sort({ order: 1 }).lean();
    return list.length > 0 ? list : fallback;
  } catch {
    return fallback;
  }
}

// Skills lookup
export async function getSkills() {
  const fallback = [
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
  ];

  try {
    const conn = await connectDB();
    if (!conn) return fallback;

    const list = await SkillGroup.find().sort({ order: 1 }).lean();
    return list.length > 0 ? list : fallback;
  } catch {
    return fallback;
  }
}

// Latest Blog Posts
export async function getLatestPosts(limit = 3) {
  try {
    const conn = await connectDB();
    if (!conn) return [];

    const posts = await Post.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .lean();

    return posts.map((p) => ({
      id: String(p._id),
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      tags: p.tags || [],
      publishedAt: p.publishedAt
        ? new Date(p.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
      readingTime: p.readingTime || "3 min read",
    }));
  } catch {
    return [];
  }
}
