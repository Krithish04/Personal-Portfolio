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
    tagline: "Full-Stack Developer & DevOps Intern",
    eyebrow: "FULL-STACK DEVELOPER & DEVOPS INTERN",
    heroIntro:
      "I build full-stack web applications and the deployment pipelines that ship them. I work mostly with Node.js, React and Python, and I use Docker and GitHub Actions to take projects from a local build to a running service.",
    intro:
      "I build full-stack web applications and the deployment pipelines that ship them. I work mostly with Node.js, React and Python, and I use Docker and GitHub Actions to take projects from a local build to a running service.",
    aboutMarkdown:
      "I'm an MCA student at Christ University (Delhi NCR), based in Surat. In 2026 I worked as a MERN stack intern at Devisoft and as a freelance developer, building a lead-management system with WhatsApp Business API integrations.\n\nMy personal projects are where I practise the full path from code to deployment. DineSync is a multi-tenant restaurant platform with real-time kitchen displays. TaskFlow is a project management app with role-based access, a Docker build and a GitHub Actions pipeline.\n\nI'm looking for internship and entry-level roles in full-stack, backend or DevOps engineering.",
    contactBlurb:
      "I'm open to internship and entry-level roles in full-stack, backend and DevOps engineering. The quickest way to reach me is email.",
    email: "suvarnakrithish24@gmail.com",
    phone: "+91 9428141156",
    socials: [
      { platform: "GitHub", url: "https://github.com/Krithish04" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/krithish04" },
    ],
    metaDescription:
      "Portfolio of Krithish Ravindra Suvarna, a full-stack developer and DevOps intern. MERN and Next.js apps, Python services, Docker and CI/CD pipelines.",
    footerText: "© 2026 Krithish Ravindra Suvarna",
  };

  try {
    const conn = await connectDB();
    if (!conn) return fallback;

    const profile = await Profile.findOne().lean();
    if (!profile) return fallback;
    return {
      ...fallback,
      ...profile,
      eyebrow: profile.eyebrow || fallback.eyebrow,
      heroIntro: profile.heroIntro || fallback.intro,
      aboutMarkdown: profile.aboutMarkdown || fallback.aboutMarkdown,
      contactBlurb: profile.contactBlurb || fallback.contactBlurb,
    };
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
      deployment: p.deployment || "",
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
      deployment: project.deployment || "",
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
