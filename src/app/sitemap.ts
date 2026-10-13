import { MetadataRoute } from "next";
import { PROBLEMS } from "@/data/problems";
import { CASE_STUDIES } from "@/data/cases";
import { INSIGHTS } from "@/data/insights";
import { SOLUTIONS } from "@/data/solutions";

/**
 * 全站品牌、标题与页脚实际更新于 2026-10-12。仅在内容发生变更时更新此日期，
 * 不使用构建时间；文章新发布日期晚于全站更新时，以文章日期为准。
 */
const SITE_UPDATED_AT = new Date("2026-10-12T00:00:00+08:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.haflow.cn";

  // /training 已 308 永久合并到 /methodology#training（兼容旧外链与浏览器历史），不再进 sitemap
  const staticRoutes = [
    { url: `${baseUrl}/labs`, lastModified: new Date("2026-10-14T00:00:00+08:00"), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/labs/enterprise-runtime`, lastModified: new Date("2026-10-14T00:00:00+08:00"), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/`, lastModified: SITE_UPDATED_AT, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/problems`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/solutions`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/haflow`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/methodology`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/cases`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/diagnose`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: SITE_UPDATED_AT, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-10-13T00:00:00+08:00"), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: SITE_UPDATED_AT, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const problemRoutes = PROBLEMS.map((p) => ({
    url: `${baseUrl}/problems/${p.slug}`,
    lastModified: SITE_UPDATED_AT,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const solutionRoutes = SOLUTIONS.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified: SITE_UPDATED_AT,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const caseRoutes = CASE_STUDIES.map((c) => ({
    url: `${baseUrl}/cases/${c.slug}`,
    lastModified: SITE_UPDATED_AT,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const insightRoutes = INSIGHTS.map((i) => ({
    url: `${baseUrl}/insights/${i.slug}`,
    // 文章发布日期与实际全站修改日期取较晚者。
    lastModified: new Date(Math.max(new Date(i.date).getTime(), SITE_UPDATED_AT.getTime())),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...problemRoutes, ...solutionRoutes, ...caseRoutes, ...insightRoutes];
}
