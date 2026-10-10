import type { Metadata } from "next";

/**
 * 百度SEO：统一分页 SEO（绝对 canonical + 绝对 OG/Twitter）。
 * 曾全站复用 layout 的相对 canonical "./" 与首页 OG URL，详情页去重信号错误。
 */
const SITE = "https://www.haflow.cn";
/**
 * 全站默认分享图。正方形 1200×1200，纯白背景，
 * 居中放置 HAFlow logo 与「共事智能」，二者视觉像素边界左右对齐。
 * 逐像素扫描验证：icon 374~824 / 文字 375~825（偏差 1px）。
 * 文件名 og-cover-square-v2.jpg：静态资源有 immutable 一年缓存，改图须换文件名。
 */
const OG_IMAGE = {
  url: `${SITE}/og-cover-square-v2.jpg`,
  width: 1200,
  height: 1200,
  alt: "共事智能 HAFlow",
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
   * 页面专属分享图（不含域名的站内路径）。留空则用全站默认 og-cover-square-v2.jpg。
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
