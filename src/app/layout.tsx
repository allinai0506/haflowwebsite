import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { COMPANY_INFO } from "@/data/company";

export const metadata: Metadata = {
  metadataBase: new URL("https://haflow.cn"),
  title: {
    default: "共事智能 · 让人和 Agent 共同把事情做完 | HAFlow",
    template: "%s | 共事智能",
  },
  description:
    "上海共事智能科技有限公司（共事）。核心产品 HAFlow。我们是一家 AI Native 公司。不做大系统，只用 AI 帮企业解决一个个具体问题：智能报价、智能订货预测、标书质量核查、财务资料穿透关联与企业经验复用。",
  keywords: [
    "共事",
    "共事智能",
    "HAFlow",
    "人机协同",
    "AI Native 应用开发",
    "企业 AI 落地",
    "智能报价",
    "智能订货预测",
    "标书核查",
    "多 Agent 协作",
    "企业 AI 免费培训",
  ],
  authors: [{ name: "上海共事智能科技有限公司" }],
  creator: "上海共事智能科技有限公司",
  publisher: "上海共事智能科技有限公司",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "./",
  },
  other: {
    "applicable-device": "pc,mobile",
    baiduspider: "index, follow",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://haflow.cn",
    siteName: "共事智能 GONGSHI AI",
    title: "共事 · 不做大系统，只解决一个具体问题",
    description:
      "让人和 Agent 共同把事情做完。面对规则写不死、依赖人判断的事情，我们用 AI 帮你把真实结果做出来。",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "共事智能 HAFlow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "共事 · 让人和 Agent 共同把事情做完",
    description: "不做大系统，只用 AI 帮企业解决一个个具体问题。",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization JSON-LD Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    alternateName: ["共事", "共事智能", "GONGSHI AI"],
    url: "https://haflow.cn",
    logo: "https://haflow.cn/logo.png",
    description: COMPANY_INFO.corePositioning,
    address: {
      "@type": "PostalAddress",
      streetAddress: "曹杨路1888号星光耀广场1号楼1005室",
      addressLocality: "普陀区",
      addressRegion: "上海市",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: COMPANY_INFO.contact.phone,
    },
  };

  return (
    <html lang="zh-CN" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
