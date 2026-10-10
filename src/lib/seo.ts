import type { Metadata } from "next";

/**
 * 百度SEO：统一分页 SEO（绝对 canonical + 绝对 OG/Twitter）。
 * 曾全站复用 layout 的相对 canonical "./" 与首页 OG URL，详情页去重信号错误。
 */
const SITE = "https://www.haflow.cn";
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
  /** 可选的页面类型后缀；仅用于最终页面 Title，不截断业务标题。 */
  titleSuffix?: string;
  description: string;
  keywords?: string[];
  ogType?: "website" | "article";
  /**
   * 页面专属分享图（不含域名的站内路径）。留空则用全站默认 og-cover.jpg。
   * 文章/案例页可传自己的卡片，避免改动全站默认图影响其他页面。
   */
  ogImage?: { url: string; alt: string; width?: number; height?: number };
}

export function pageSeo({
  path,
  title,
  titleSuffix,
  description,
  keywords,
  ogType = "website",
  ogImage,
}: PageSeoInput): Metadata {
  const url = path === "/" ? `${SITE}/` : `${SITE}${path}`;
  const shareImage = ogImage
    ? {
        url: ogImage.url.startsWith("http") ? ogImage.url : `${SITE}${ogImage.url}`,
        width: ogImage.width ?? OG_IMAGE.width,
        height: ogImage.height ?? OG_IMAGE.height,
        alt: ogImage.alt,
      }
    : OG_IMAGE;
  const pageTitle = titleSuffix ? `${title}_${titleSuffix}` : title;
  // 百度SERP标题约30汉字内展示，模板后缀统一为 _共事智能（layout template）
  const ogTitle = pageTitle.length > 28 ? pageTitle.slice(0, 28) : pageTitle;
  return {
    title: pageTitle,
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
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [shareImage.url],
    },
  };
}
