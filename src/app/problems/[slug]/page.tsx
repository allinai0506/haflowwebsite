import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Server,
  UserCheck,
  Bot,
  HelpCircle,
  Layers,
} from "lucide-react";
import { PROBLEMS, getProblemBySlug } from "@/data/problems";
import { getSolutionBySlug } from "@/data/solutions";
import { Breadcrumb } from "@/components/Breadcrumb";
import { pageSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROBLEMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return {};

  return pageSeo({
    path: `/problems/${problem.slug}`,
    title: problem.title,
    titleSuffix: "企业AI解决方案",
    description: `${problem.subtitle}共事智能不做大系统，针对“${problem.title}”规则写不死、多变复杂的痛点，提供人机协同落地解决方案。`,
    keywords: [
      problem.title,
      problem.category,
      "AI Native应用",
      "人机协同",
      "共事智能",
      "HAFlow",
    ],
  });
}

export default async function ProblemDetailPage({ params }: Props) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);

  if (!problem) {
    notFound();
  }

  const solution = getSolutionBySlug(slug);

  // FAQ Schema JSON-LD for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: problem.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  // 百度SEO：问题详情页补 Article 结构化数据（提升收录新鲜度与主题相关性）
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: problem.title,
    description: problem.subtitle,
    articleSection: problem.category,
    about: problem.category,
    image: "https://www.haflow.cn/og-cover-v6.jpg",
    author: {
      "@type": "Organization",
      name: "上海共事智能科技有限公司",
    },
    publisher: {
      "@type": "Organization",
      name: "共事智能",
    },
    mainEntityOfPage: `https://www.haflow.cn/problems/${problem.slug}`,
  };

  return (
    <div className="min-h-screen bg-slate-50 py-5 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "解决具体问题", href: "/problems" },
            { label: problem.title },
          ]}
        />

        {/* Page Hero */}
        <div className="py-4 sm:py-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {problem.category}
            </span>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
              {problem.tag}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            {problem.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-6">
            {problem.subtitle}
          </p>

          {/* Concrete Business Question Box */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 text-slate-900 shadow-xs flex items-start gap-3.5">
            <span className="text-xs font-mono font-bold text-blue-700 shrink-0 mt-0.5">
              [具体业务痛点]
            </span>
            <p className="text-base sm:text-lg font-medium text-slate-800 italic">
              “{problem.question}”
            </p>
          </div>
          {solution && (
            <Link
              href={`/solutions/${solution.slug}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              查看完整解决方案路径
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Factors & Traditional Limitations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
          {/* Left: Factors to synthesize */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  该场景必须综合的多源变量
                </h2>
              </div>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                这些因素不仅数量庞大，且相互交织博弈，任何单一维度的静态公式都无法覆盖全部边缘情形：
              </p>

              <ul className="space-y-3">
                {problem.factors.map((factor, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span className="leading-relaxed">{factor}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
              AI 的核心使命：容纳非结构化输入，进行多维综合推理，给出可解释的依据。
            </div>
          </div>

          {/* Right: Why traditional software failed */}
          <div className="bg-amber-50/40 rounded-3xl border border-amber-200/80 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-slate-900">
                  为什么传统软件很难把这件事情解决？
                </h2>
              </div>
              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                这不是原有系统开发团队能力不足，而是传统确定性软件架构在“规则写不死”问题面前的天然边界：
              </p>

              <ul className="space-y-3">
                {problem.traditionalLimitations.map((lim, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ×
                    </span>
                    <span className="leading-relaxed">{lim}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-amber-200/60 text-xs text-slate-600">
              共事原则：不替换既有系统，而是作为轻量外挂只攻克这个具体卡点。
            </div>
          </div>
        </div>

        {/* AI + Human in the loop Solution Framework */}
        <div className="my-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="block text-xs font-bold text-emerald-600 mb-0.5">
              人机协同架构
            </span>
            <span className="block font-mono text-[11px] tracking-widest text-slate-400 mb-1">
              HUMAN + AGENT, IN FLOW
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              共事怎样解决这项业务难题？
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              明确划分 AI 的分析推理职责与人类专家的终审把关节点，保障交付结果的安全性与合规性。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* What AI Does */}
            <div className="p-6 rounded-2xl bg-emerald-50/40 border border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm mb-4">
                <Bot className="w-5 h-5 text-emerald-700" />
                <span>AI Agent 负责的动作（理解、推理、初筛）</span>
              </div>
              <ul className="space-y-3">
                {problem.aiSolution.whatAiDoes.map((action, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What Human Does */}
            <div className="p-6 rounded-2xl bg-amber-50/60 text-slate-900 border border-amber-200/80 shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-4">
                <UserCheck className="w-5 h-5 text-amber-600" />
                <span>人类专家负责的节点（审核、纠偏、终裁）</span>
              </div>
              <ul className="space-y-3">
                {problem.aiSolution.whatHumanDoes.map((human, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                  >
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{human}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connected Systems & Deliverable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100 text-xs">
            <div>
              <span className="font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <Server className="w-4 h-4 text-indigo-600" />
                <span>轻量对接的既有系统：</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {problem.aiSolution.systemsConnected.map((sys, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    {sys}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>最终交付标准结果：</span>
              </span>
              <p className="text-slate-700 font-medium bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-100">
                {problem.aiSolution.finalDeliverable}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive demo teaser: only on bid-audit, demo lives in the case page */}
        {slug === "bid-audit" && (
          <div className="my-12 p-6 sm:p-8 rounded-3xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-xs">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-700 font-bold block mb-2">
                交互演示 · 双屏联动
              </span>
              <h3 className="text-lg sm:text-xl font-bold mb-1.5 text-slate-950">
                看 AI 怎样把 100 分评分标准逐条锚定到标书原文
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                左侧招标文件原文，右侧结构化评分表，双向点击联动定位，支持预计得分 /
                实际打分阶段切换。完整可操作的演示放在落地案例页。
              </p>
            </div>
            <Link
              href="/cases/bid-compliance#demo"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-500/20 shrink-0"
            >
              <span>去体验双屏联动演示</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Boundary: Applicable vs Inapplicable Conditions (Honesty First) */}
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>适用条件（什么情况下建议做）</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {problem.applicableConditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2 text-rose-950">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>不适用条件（什么情况下坚决不做）</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {problem.inapplicableConditions.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expected Metrics / Business Value */}
        <div className="my-10 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          <h3 className="text-base font-bold text-slate-900 mb-4">
            预期业务收益与测算指标（方案示例测算）
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {problem.metricsOrOutcome.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block mb-1">
                  {metric.label}
                </span>
                <p className="text-xl font-bold text-slate-900 mb-1">
                  {metric.value}
                </p>
                <span className="text-[11px] text-slate-400">
                  {metric.note}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="my-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <span>关于本场景的常见问题</span>
          </h3>
          <div className="space-y-4">
            {problem.faq.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Q: {item.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A: {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA for this Problem */}
        <div className="my-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50 border border-blue-200/80 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-slate-950 mb-2">
              您企业也有类似“{problem.title}”的困扰？
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              提供几份脱敏材料，我们在 2 周内为您完成技术验证，行不行用事实说话。
            </p>
          </div>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shrink-0 shadow-sm"
          >
            <span>预约该场景诊断</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
