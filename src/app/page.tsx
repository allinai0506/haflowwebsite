import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, GraduationCap } from "lucide-react";
import { InfinityHeroVisual } from "@/components/InfinityHeroVisual";
import { WhatIsHAFlow } from "@/components/WhatIsHAFlow";
import { WhyHAFlow } from "@/components/WhyHAFlow";
import { SolutionsSection } from "@/components/SolutionsSection";
import { OurBeliefBanner } from "@/components/OurBeliefBanner";
import { PROBLEMS } from "@/data/problems";
import { ProblemCard } from "@/components/ProblemCard";
import { InteractiveFlowSim } from "@/components/InteractiveFlowSim";
import { TRAINING_OVERVIEW } from "@/data/training";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION - Exact layout and typography from 网页参考.png */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12]">
                让企业进入
                <br />
                <span className="text-slate-900">人机共事时代</span>
              </h1>

              {/* Subtitles matching reference */}
              <div className="space-y-3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                <p className="font-semibold text-slate-800">
                  HAFlow 让人和 Agent 在同一个工作流中共事。
                </p>
                <p className="text-sm sm:text-base text-slate-500">
                  从业务流程设计，到多 Agent 协同，再到真实企业系统落地，HAFlow 是我们所有产品背后的方法论与工程底座。不做大系统，只用 AI 帮企业解决一个个具体问题。
                </p>
              </div>

              {/* Stylized Brand Slogan matching reference image */}
              <div className="pt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-slate-950">Human</span>
                <span className="text-slate-400 font-light mx-2">+</span>
                <span className="text-blue-600">Agent</span>
                <span className="text-slate-400 font-normal">, in </span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Flow.
                </span>
              </div>

              {/* Dual Action Buttons matching reference image */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/haflow"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md hover:shadow-lg shadow-blue-500/20"
                >
                  <span>了解 HAFlow</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cases"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50/50 rounded-full border border-blue-200 transition-colors shadow-2xs"
                >
                  <span>查看真实案例</span>
                </Link>
              </div>
            </div>

            {/* Right Column: 3D Infinity Ribbon Visual */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <InfinityHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT IS HAFLOW SECTION - Exact layout from 网页参考.png */}
      <WhatIsHAFlow />

      {/* 3. WHY HAFLOW SECTION - 3 Comparison Cards from 网页参考.png */}
      <WhyHAFlow />

      {/* 4. SOLUTIONS SECTION - 6 Industry Cards from 网页参考.png */}
      <SolutionsSection />

      {/* 5. OUR BELIEF DARK MOUNTAIN BANNER - Exact layout from 网页参考.png */}
      <OurBeliefBanner />

      {/* 6. CONCRETE PROBLEM SOLVING & LIVE SIMULATION (Reinforcing Business Power) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
              - CONCRETE PROBLEMS
            </span>
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
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
              - FREE TRAINING
            </span>
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
                  <Link href="/training#booking" className="font-semibold text-blue-600 hover:text-blue-700">
                    立即预约
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/training"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md shadow-blue-500/20 transition-all"
            >
              <span>查看本月课表与预约入口</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CONTACT CTA */}
      <section className="py-20 bg-slate-950 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            带着一个具体业务问题来交流
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto mb-8">
            从一次复杂报价、一份标书审核、一次日级订货预测开始。我们帮您用 AI 做出真实结果。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg shadow-blue-500/30"
            >
              联系我们
            </Link>
            <Link
              href="/diagnose"
              className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 rounded-full border border-slate-700 transition-colors"
            >
              在线问题诊断
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
