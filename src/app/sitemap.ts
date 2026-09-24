import { MetadataRoute } from "next";
import { PROBLEMS } from "@/data/problems";
import { CASE_STUDIES } from "@/data/cases";
import { INSIGHTS } from "@/data/insights";
import { SOLUTIONS } from "@/data/solutions";

/**
 * 百度SEO：lastModified 必须稳定，只有内容真正变更时才动。
 * 曾用 new Date() 导致每次构建 32 个 URL 全量“更新”，浪费百度抓取配额。
 * 策略：首页保持构建日（daily 栏目需要新鲜度）；栏目页用固定基线日；
 * insights 详情用文章 date 字段；problems/cases 详情用固定基线日（数据文件无日期字段）。
 */
const SITEMAP_BASELINE = new Date("2026-09-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://haflow.cn";
  const today = new Date();

  const staticRoutes = [
    { url: `${baseUrl}/`, lastModified: today, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/problems`, lastModified: SITEMAP_BASELINE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/solutions`, lastModified: SITEMAP_BASELINE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/haflow`, lastModified: SITEMAP_BASELINE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/methodology`, lastModified: SITEMAP_BASELINE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/training`, lastModified: SITEMAP_BASELINE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/cases`, lastModified: SITEMAP_BASELINE, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/diagnose`, lastModified: SITEMAP_BASELINE, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: SITEMAP_BASELINE, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: SITEMAP_BASELINE, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: SITEMAP_BASELINE, changeFrequency: "monthly" as const, priority: 0.6 },
  ];

  const problemRoutes = PROBLEMS.map((p) => ({
    url: `${baseUrl}/problems/${p.slug}`,
    lastModified: SITEMAP_BASELINE,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const solutionRoutes = SOLUTIONS.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified: SITEMAP_BASELINE,
    changeFrequency: "weekly" as const,
    priority: 0.88,
  }));

  const caseRoutes = CASE_STUDIES.map((c) => ({
    url: `${baseUrl}/cases/${c.slug}`,
    lastModified: SITEMAP_BASELINE,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const insightRoutes = INSIGHTS.map((i) => ({
    url: `${baseUrl}/insights/${i.slug}`,
    // 文章页用真实发布日期，百度按内容新鲜度排序
    lastModified: new Date(i.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...problemRoutes, ...solutionRoutes, ...caseRoutes, ...insightRoutes];
}
