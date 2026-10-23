import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/content/portfolio";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "about",
    "projects",
    "skills",
    "experience",
    "certifications",
    "education",
    "contact",
    "journal",
    "privacy",
    "resume",
    ...projects.map((p) => `projects/${p.slug}`),
  ].map((path) => ({
    url: `${siteUrl}/${path ? `${path}/` : ""}`,
    lastModified: "2026-10-23",
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
