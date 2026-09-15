import { MetadataRoute } from "next";
import { PROBLEMS } from "@/data/problems";
import { CASE_STUDIES } from "@/data/cases";
import { INSIGHTS } from "@/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://haflow.cn";
  const lastModified = new Date();

  const staticRoutes = [
    { url: `${baseUrl}`, lastModified, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/problems`, lastModified, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/haflow`, lastModified, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/training`, lastModified, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/cases`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/diagnose`, lastModified, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const problemRoutes = PROBLEMS.map((p) => ({
    url: `${baseUrl}/problems/${p.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const caseRoutes = CASE_STUDIES.map((c) => ({
    url: `${baseUrl}/cases/${c.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const insightRoutes = INSIGHTS.map((i) => ({
    url: `${baseUrl}/insights/${i.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...problemRoutes, ...caseRoutes, ...insightRoutes];
}
