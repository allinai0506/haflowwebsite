import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, CheckCircle2, ChevronLeft } from "lucide-react";
import { INSIGHTS, getInsightBySlug, type InsightBlock, type InsightRun } from "@/data/insights";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ImageLightbox } from "@/components/ImageLightbox";
import { pageSeo } from "@/lib/seo";

/** 段落内文本 + 可选内链。link 为站内路径，external 为外链新窗口打开。 */
function InsightRuns({ runs }: { runs: InsightRun[] }) {
  return (
    <>
      {runs.map((run, i) =>
        run.link ? (
          <Link
            key={i}
            href={run.link}
            {...(run.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-blue-700 font-semibold hover:text-blue-800 underline decoration-blue-300 decoration-2 underline-offset-4 hover:decoration-blue-600 transition-colors"
          >
            {run.text}
          </Link>
        ) : (
          <span key={i}>{run.text}</span>
        )
      )}
    </>
  );
}

/**
 * 正文块渲染器：段落 / 列表 / 表格 / 金句。
 * 遵循 DESIGN.md——不用深色底，强调一律用蓝色浅底 + 蓝色描边。
 */
function InsightBlockView({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
          {"runs" in block ? <InsightRuns runs={block.runs} /> : block.text}
        </p>
      );

    case "subheading":
      return (
        <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight pt-3">
          {block.text}
        </h3>
      );

    case "emphasis":
      return (
        <p className="px-4 py-3 rounded-xl bg-blue-50 border-l-4 border-blue-600 text-sm sm:text-base font-bold text-blue-950 leading-relaxed">
          {block.text}
        </p>
      );

    case "checklist":
      return (
        <ul className="space-y-2 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
              <span
                aria-hidden="true"
                className="shrink-0 mt-0.5 w-4 h-4 rounded border-2 border-slate-300 bg-white"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 leading-relaxed">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded-md bg-blue-100 text-blue-700 font-mono text-[11px] font-bold flex items-center justify-center">
                {block.ordered ? i + 1 : "·"}
              </span>
              <span>
                {item.lead && <span className="font-bold text-slate-900">{item.lead}</span>}
                {item.runs ? <InsightRuns runs={item.runs} /> : item.text}
              </span>
            </li>
          ))}
        </Tag>
      );
    }

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-2.5 font-bold text-blue-900 whitespace-nowrap border-b border-blue-200">
                  {block.head[0]}
                </th>
                <th className="px-4 py-2.5 font-bold text-blue-900 border-b border-blue-200">
                  {block.head[1]}
                </th>
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0 even:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-semibold text-slate-900 whitespace-nowrap align-top">
                    {row[0]}
                  </td>
                  <td className="px-4 py-2.5 text-slate-700 align-top">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "image": {
      // 宽图（路线图类）在窄屏必须能横向滚动，否则关键信息不可读。
      // 用 overflow-x-auto 包裹 + min-w 保持原始宽度，滚动条提示可滑动。
      const body = block.zoom ? (
        // 用 aspect-ratio 预留空间：lightbox 内部是按钮，仍需显式占位避免 CLS
        <div style={{ aspectRatio: `${block.width} / ${block.height}` }}>
          <ImageLightbox src={block.src} alt={block.alt} caption={block.caption} />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={block.src}
          alt={block.alt}
          width={block.width}
          height={block.height}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto rounded-xl border border-slate-200"
        />
      );

      return (
        <figure className="space-y-2">
          {body}
          {block.caption && (
            <figcaption className="text-xs text-slate-500 text-center leading-relaxed">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  }
}

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
    title: article.seoTitle,
    titleSuffix: "企业AI落地思考",
    description: article.summary,
    keywords: [article.title, article.category, "共事智能观点", "AI Native"],
    ogType: "article",
    ogImage: article.ogImage
      ? { url: article.ogImage.src, alt: article.ogImage.alt, width: 1200, height: 630 }
      : undefined,
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
    dateModified: article.date,
    author: {
      "@type": "Organization",
      name: "上海共事智能科技有限公司",
    },
    publisher: {
      "@type": "Organization",
      name: "共事智能",
    },
    mainEntityOfPage: `https://www.haflow.cn/insights/${article.slug}`,
    // 与 og:image 保持一致：有专属卡片则用专属图，否则回落全站默认图
    image: article.ogImage
      ? `https://www.haflow.cn${article.ogImage.src}`
      : "https://www.haflow.cn/og-cover-v13.jpg",
  };
  const related = INSIGHTS.filter((i) => i.slug !== article.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 py-5 sm:py-10">
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
        <header className="py-4 sm:py-8 border-b border-slate-200">
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
            <section key={idx} className="space-y-4">
              {para.heading && (
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight pt-2">
                  {para.heading}
                </h2>
              )}
              {para.blocks
                ? para.blocks.map((block, bidx) => (
                    <InsightBlockView key={bidx} block={block} />
                  ))
                : para.body && (
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                      {para.body}
                    </p>
                  )}
            </section>
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
