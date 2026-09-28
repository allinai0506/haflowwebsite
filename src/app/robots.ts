import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://www.haflow.cn/sitemap.xml",
  };
}
