import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { COMPANY_INFO } from "@/data/company";
import { BaiduSeoScripts } from "@/components/BaiduSeoScripts";

/**
 * 百度SEO说明：中文站曾用 Google Fonts（Bricolage/JetBrains）做拉丁展示字体，
 * 但 fonts.googleapis.com 国内慢/超时，会阻塞首屏并拖累百度速度分与蜘蛛渲染。
 * 改为全系统字体栈，零外部字体请求。展示字体用 font-display 类映射到系统黑体。
 */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://haflow.cn"),
  title: {
    default: "共事智能_企业AI落地_HAFlow人机协同 | 不做大系统只解具体问题",
    template: "%s_共事智能",
  },
  description:
    "上海共事智能科技有限公司（共事智能）。核心产品HAFlow人机协同平台。不做大系统，只用AI帮企业解决具体问题：智能报价、智能订货预测、标书质量核查、财务资料穿透关联与企业经验复用。",
  keywords: [
    "共事",
    "共事智能",
    "上海共事智能科技有限公司",
    "HAFlow",
    "人机协同",
    "企业AI落地",
    "AI Native 应用开发",
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
  // 百度SEO：layout 层不再写相对 canonical（曾用 "./" 全站复用，易误伤），
  // 各页面（含动态详情页）在 generateMetadata/metadata 中声明绝对 canonical。
  other: {
    "applicable-device": "pc,mobile",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://haflow.cn/",
    siteName: "共事智能 GONGSHI AI",
    title: "共事智能_企业AI落地_HAFlow人机协同",
    description:
      "上海共事智能：不做大系统，只用AI帮企业解决一个个具体问题。让人和Agent共同把事情做完。",
    images: [
      {
        url: "https://haflow.cn/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "共事智能 HAFlow_企业AI落地",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "共事智能_企业AI落地_HAFlow人机协同",
    description: "不做大系统，只用AI帮企业解决一个个具体问题。",
    images: ["https://haflow.cn/og-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Organization JSON-LD Schema（含百度偏好的 sameAs/联系方式字段）
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    alternateName: ["共事", "共事智能", "GONGSHI AI"],
    url: "https://haflow.cn/",
    logo: "https://haflow.cn/logo-icon.png",
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
      areaServed: "CN",
      availableLanguage: "zh-CN",
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
        <BaiduSeoScripts />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
