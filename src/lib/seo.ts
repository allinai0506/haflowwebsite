import type { Metadata } from "next";

/**
 * 百度SEO：统一分页 SEO（绝对 canonical + 绝对 OG/Twitter）。
 * 曾全站复用 layout 的相对 canonical "./" 与首页 OG URL，详情页去重信号错误。
 */
const SITE = "https://haflow.cn";
const OG_IMAGE = {
  url: `${SITE}/og-cover.jpg`,
  width: 1200,
  height: 630,
  alt: "共事智能 HAFlow_企业AI落地",
};

interface PageSeoInput {
  /** 以 / 开头的站内路径，首页传 "/" */
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogType?: "website" | "article";
}

export function pageSeo({
  path,
  title,
  description,
  keywords,
  ogType = "website",
}: PageSeoInput): Metadata {
  const url = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  // 百度SERP标题约30汉字内展示，模板后缀统一为 _共事智能（layout template）
  const ogTitle = title.length > 28 ? title.slice(0, 28) : title;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: ogType,
      locale: "zh_CN",
      url,
      siteName: "共事智能 GONGSHI AI",
      title: ogTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [`${SITE}/og-cover.jpg`],
    },
  };
}
