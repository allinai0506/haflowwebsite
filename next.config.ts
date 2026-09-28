import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // 百度SEO：全站 canonical 已统一为 www（https://www.haflow.cn，与站长平台验证站点一致）。
  // apex→www 301，避免双站重复。规则带 host 条件，localhost 调试不受影响，可常开。
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "haflow.cn" }], destination: "https://www.haflow.cn/:path*", permanent: true },
    ];
  },
  // 安全/缓存头：百度看重 HTTPS、安全头、静态资源缓存
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600" },
          { key: "Content-Type", value: "application/xml; charset=utf-8" },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
        ],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  // 隐藏 X-Powered-By: Next.js（减少指纹）
  poweredByHeader: false,
  // 严格模式已默认开启
  reactStrictMode: true,
};

export default nextConfig;
