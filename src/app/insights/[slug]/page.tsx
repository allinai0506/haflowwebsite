import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, CheckCircle2, ChevronLeft } from "lucide-react";
import { INSIGHTS, getInsightBySlug } from "@/data/insights";
import { Breadcrumb } from "@/components/Breadcrumb";
import { pageSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INSIGHTS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};

  return pageSeo({
    path: `/insights/${article.slug}`,
    title: `${article.title.slice(0, 20)}_企业AI落地思考`,
    description: article.summary,
    keywords: [article.title, article.category, "共事智能观点", "AI Native"],
    ogType: "article",
  });
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);

  if (!article) {
    notFound();
  }

  // 百度SEO：文章页补 Article 结构化数据（日期/作者/配图），提升收录与新鲜度评分
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "上海共事智能科技有限公司",
    },
    publisher: {
      "@type": "Organization",
      name: "共事智能",
    },
    mainEntityOfPage: `https://haflow.cn/insights/${article.slug}`,
    image: "https://haflow.cn/og-cover.jpg",
  };
  const related = INSIGHTS.filter((i) => i.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "观点与实践", href: "/insights" },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <header className="py-8 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-slate-500">
            <span className="font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>预计阅读 {article.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-950 text-sm leading-relaxed">
            <span className="font-bold block mb-1">文章核心概要：</span>
            <p>{article.summary}</p>
          </div>
        </header>

        {/* Key takeaways box */}
        <div className="my-8 p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            本文核心要点
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {article.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="my-10 space-y-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          {article.contentParagraphs.map((para, idx) => (
            <div key={idx} className="space-y-3">
              {para.heading && (
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-2">
                  {para.heading}
                </h2>
              )}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                {para.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="my-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>返回观点列表</span>
          </Link>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
          >
            <span>带着您的业务问题来诊断</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* 延伸阅读：增加内链密度与页面停留，缓解薄内容问题 */}
        {related.length > 0 && (
          <section className="my-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8">
            <h2 className="text-base font-bold text-slate-900 mb-4">延伸阅读</h2>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/insights/${r.slug}`}
                    className="text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    {r.title}
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{r.summary}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
