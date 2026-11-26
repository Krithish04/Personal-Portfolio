import { MetadataRoute } from "next";
import { getProjects, getFeatureFlags, getLatestPosts } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || "https://krithish-portfolio.vercel.app";
  const [projects, posts, flags] = await Promise.all([
    getProjects(),
    getLatestPosts(50),
    getFeatureFlags(),
  ]);

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  if (flags.blog) {
    routes.push({
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    posts.forEach((p) => {
      routes.push({
        url: `${baseUrl}/blog/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    });
  }

  if (flags.caseStudies) {
    projects.forEach((p) => {
      routes.push({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  }

  if (flags.resumeDownload) {
    routes.push({
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  if (flags.contactForm) {
    routes.push({
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return routes;
}
