import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { InfinityHeroVisual } from "@/components/InfinityHeroVisual";
import { WhatIsHAFlow } from "@/components/WhatIsHAFlow";
import { WhyHAFlow } from "@/components/WhyHAFlow";
import { SolutionsSection } from "@/components/SolutionsSection";
import { OurBeliefBanner } from "@/components/OurBeliefBanner";
import { PROBLEMS } from "@/data/problems";
import { ProblemCard } from "@/components/ProblemCard";
import { InteractiveFlowSim } from "@/components/InteractiveFlowSim";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { TRAINING_OVERVIEW } from "@/data/training";
import { Testimonials } from "@/components/Testimonials";
import { pageSeo } from "@/lib/seo";
import { COMPANY_INFO } from "@/data/company";

// 首页承接品牌词，HAFlow 产品词由独立产品页承接。
export const metadata: Metadata = pageSeo({
  path: "/",
  title: "共事智能官网｜企业 AI 落地与 HAFlow 人机协同平台",
  description:
    "共事智能是上海共事智能科技有限公司的品牌，HAFlow 是共事智能的核心产品。我们围绕智能报价、订货预测、标书核查等具体业务场景，帮助企业建立人与 Agent 协同工作的系统。",
  keywords: [
    "共事智能",
    "上海共事智能科技有限公司",
    "企业AI落地",
    "HAFlow",
    "人机协同",
    "智能报价",
    "标书核查",
  ],
});

export default function HomePage() {
  // GEO/实体：WebSite 帮助搜索引擎确立站点名称与品牌实体（Organization 已在 layout 全站输出）
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.haflow.cn/#website",
    name: COMPANY_INFO.brand,
    alternateName: [COMPANY_INFO.brandEn],
    publisher: { "@id": "https://www.haflow.cn/#organization" },
    url: "https://www.haflow.cn/",
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* 1. HERO BANNER - 居中式：徽章 + 主张 + 行动 + 可视化 + 信任条 */}
      <section className="relative pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white">
        {/* 浅色装饰光晕，小屏缩小 */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-[36rem] sm:h-[36rem] rounded-full bg-blue-100/50 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          <div className="lg:col-span-5 max-w-3xl mx-auto lg:mx-0 w-full text-center lg:text-left space-y-5 sm:space-y-6">
            {/* Eyebrow 徽章 */}
            <p className="hero-copy-enter">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-blue-700 border border-blue-200 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                共事智能 · 企业 AI 落地
              </span>
            </p>
            {/* 品牌与主张均作为可见文字展示 */}
            <h1 className="hero-copy-enter text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-slate-900 tracking-tight leading-[1.2]">
              共事智能，让企业进入
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                人机共事时代
              </span>
            </h1>

            {/* Subtitles */}
            <div className="hero-copy-enter hero-copy-d1 space-y-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <p className="font-semibold text-slate-800">
                HAFlow 是共事智能打造的人机协同任务执行平台。
              </p>
              <p className="text-sm sm:text-base text-slate-500">
                共事智能从业务流程设计、多 Agent 协同到真实企业系统落地，帮助人和 Agent 共同把事情做完。HAFlow 是这套方法的工程底座。不做大系统，只用 AI 帮企业解决一个个具体问题。
              </p>
            </div>

            {/* Stylized Brand Slogan */}
            <div className="hero-copy-enter hero-copy-d2 text-xl sm:text-2xl font-extrabold tracking-tight">
              <div className="hero-slogan-flow font-display">
                Human
                <span className="hero-slogan-mark font-light mx-2">+</span>
                Agent
                <span className="hero-slogan-mark font-normal">, in </span>
                Flow.
              </div>
            </div>

            {/* Dual Action Buttons：移动端全宽堆叠，PC 左对齐 */}
            <div className="hero-copy-enter hero-copy-d3 pt-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto lg:mx-0">
              <Link
                href="/haflow"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] w-full sm:w-auto text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-full transition-all shadow-md hover:shadow-lg shadow-blue-500/20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>了解 HAFlow</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                href="/cases"
                className="inline-flex items-center justify-center px-7 py-3.5 min-h-[48px] w-full sm:w-auto text-sm font-semibold text-blue-600 hover:text-blue-700 active:bg-blue-100 bg-white hover:bg-blue-50/50 rounded-full border border-blue-200 transition-colors shadow-2xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>查看真实案例</span>
              </Link>
            </div>
          </div>

          {/* 可视化：移动端居中收窄，PC 右列 */}
          <div className="lg:col-span-7 mt-2 lg:mt-0 max-w-3xl lg:max-w-none mx-auto w-full flex items-center justify-center lg:justify-end">
            <InfinityHeroVisual />
          </div>
          </div>

          {/* Trust strip: aggregate proof, all numbers verifiable from /cases */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-500">
              <BadgeCheck
                className="w-4 h-4 text-blue-600 shrink-0"
                aria-hidden="true"
              />
              <span>
                <strong className="font-bold text-slate-900 tabular-nums">
                  14
                </strong>{" "}
                个落地案例
                <span className="mx-2 text-slate-300" aria-hidden="true">
                  ·
                </span>
                <strong className="font-bold text-slate-900 tabular-nums">
                  10+
                </strong>{" "}
                个细分行业
                <span className="mx-2 text-slate-300" aria-hidden="true">
                  ·
                </span>
                结果全部可核对
              </span>
            </p>
            <Link
              href="/cases"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>去验证</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS HAFLOW SECTION - Exact layout from 网页参考.png */}
      <WhatIsHAFlow />

      {/* 3. WHY HAFLOW SECTION - 3 Comparison Cards from 网页参考.png */}
      <WhyHAFlow />

      {/* 4. SOLUTIONS SECTION - Evolution Path + Cases Portal (案例大卡归 /cases 页) */}
      <SolutionsSection />

      {/* 5. OUR BELIEF DARK MOUNTAIN BANNER - Exact layout from 网页参考.png */}
      <OurBeliefBanner />

      {/* 6. CONCRETE PROBLEM SOLVING & LIVE SIMULATION (Reinforcing Business Power) */}
      <section className="py-12 sm:py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <SectionEyebrow className="mb-2">Concrete Problems</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              不做大系统，只解决一个具体问题
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              帮你完成一次复杂报价，预测明天应该订多少货，检查一份标书有没有漏项。面对那些规则写不死、过去只能依靠人来判断的事情，我们用 AI 帮你把结果做出来。
            </p>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="mb-14">
            <InteractiveFlowSim />
          </div>

          {/* 4 Specific Problem Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PROBLEMS.slice(0, 4).map((p) => (
              <ProblemCard key={p.slug} problem={p} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/problems"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              <span>查看全部 5 项具体场景拆解方案</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. MONTHLY FREE WORKSHOPS SECTION (Embodying Gongshi's Attitude) */}
      <section className="py-12 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionEyebrow className="mb-2">Free Training</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
              {TRAINING_OVERVIEW.title}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              每周日上午 11:00 · 每次 40 分钟 · 面向零基础普通人 · 完全免费参加
            </p>
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-blue-900 leading-relaxed max-w-2xl mx-auto">
              {TRAINING_OVERVIEW.attitude}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {TRAINING_OVERVIEW.sessions.map((s) => (
              <div
                key={s.sessionNumber}
                className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                      第 {s.sessionNumber} 场
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{s.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    {s.subtitle}
                  </p>
                  <p className="text-xs text-blue-950 bg-blue-50/50 p-2.5 rounded-lg font-medium leading-relaxed">
                    成果：{s.coreDeliverable}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                  <span>{s.dateStr}</span>
                  <Link href="/methodology#booking" className="font-semibold text-blue-600 hover:text-blue-700">
                    立即预约
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/methodology#training"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md shadow-blue-500/20 transition-all"
            >
              <span>查看本月课表与预约入口</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER VOICES - 客户评价 */}
      <Testimonials />

      {/* 9. BOTTOM CONTACT CTA */}
      <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-50 to-white text-slate-900 text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-4">
            带着一个具体业务问题来交流
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
            从一次复杂报价、一份标书审核、一次日级订货预测开始。我们帮您用 AI 做出真实结果。
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 min-h-[48px] w-full sm:w-auto text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-full transition-all shadow-md shadow-blue-500/20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              联系我们
            </Link>
            <Link
              href="/diagnose"
              className="inline-flex items-center justify-center px-7 py-3.5 min-h-[48px] w-full sm:w-auto text-sm font-semibold text-blue-600 hover:text-blue-700 active:bg-blue-100 bg-white hover:bg-blue-50/60 rounded-full border border-blue-200 transition-colors shadow-2xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              在线问题诊断
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
