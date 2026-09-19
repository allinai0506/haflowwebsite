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
  // 百度SEO：强制 www→@ 或 @→www 任选其一，避免双站重复（此处以 www 为 canonical）
  // 本地调试时注释掉 redirects()，避免跳转到生产域名
  // async redirects() {
  //   return [
  //     { source: "/:path*", has: [{ type: "host", value: "haflow.cn" }], destination: "https://www.haflow.cn/:path*", permanent: true },
  //     { source: "/:path*", has: [{ type: "host", value: "www.haflow.cn" }], destination: "https://www.haflow.cn/:path*", permanent: false },
  //     // http -> https（百度强制要求全站 HTTPS，收录更快）
  //     { source: "/:path*", has: [{ type: "header", key: "x-forwarded-proto", value: "http" }], destination: "https://www.haflow.cn/:path*", permanent: true },
  //     // 统一尾斜杠：/path -> /path/（百度对尾斜杠一致性敏感）
  //     { source: "/:path", destination: "/:path/", permanent: true, missing: [{ type: "header", key: "x-nextjs-data" }] },
  //   ];
  // },
  // 安全/缓存头：百度看重 HTTPS、安全头、静态资源缓存
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|css|js)",
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
