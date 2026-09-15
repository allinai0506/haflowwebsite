import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Calendar,
  Clock,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  FileCheck2,
  FolderOpen,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { PROBLEMS } from "@/data/problems";
import { CASE_STUDIES } from "@/data/cases";
import { TRAINING_OVERVIEW } from "@/data/training";
import { ProblemCard } from "@/components/ProblemCard";
import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { MethodologySteps } from "@/components/MethodologySteps";
import { DualPortal } from "@/components/DualPortal";
import { HAFlowShowcase } from "@/components/HAFlowShowcase";
import { InteractiveFlowSim } from "@/components/InteractiveFlowSim";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-white bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Brand Claim Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200/80 mb-8 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium tracking-tight">
                {COMPANY_INFO.sloganZh}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] sm:text-xs font-mono text-slate-500 font-normal">
                {COMPANY_INFO.sloganEn}
              </span>
            </div>

            {/* Main Title: Strictly per prompt */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6">
              不做大系统。
              <br />
              <span className="text-slate-900 underline decoration-emerald-400 decoration-wavy decoration-3 underline-offset-8">
                只解决一个具体问题。
              </span>
            </h1>

            {/* Subtitle: Strictly per prompt */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-10">
              帮你完成一次复杂报价，预测明天应该订多少货，检查一份标书有没有漏项。面对那些规则写不死、过去只能依靠人来判断的事情，我们用 AI 帮你把结果做出来。
            </p>

            {/* Two Main Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/diagnose"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <span>我有一个具体问题</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
              <Link
                href="/training"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-slate-800 bg-slate-100 hover:bg-slate-200/90 rounded-xl border border-slate-200 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>先参加免费培训</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                  每周日
                </span>
              </Link>
            </div>

            {/* Core Truth Statement */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-900">共事的客观态度：</span>
              不鼓吹 AI 完全取代人，也不把 AI 包装为全知全能。AI 负责理解上下文与多源推理给出依据，人在关键节点负责确认、纠偏和验收。
            </div>
          </div>

          {/* Live Task Execution Simulation in Hero Area */}
          <div className="mt-14 max-w-5xl mx-auto">
            <InteractiveFlowSim />
          </div>
        </div>
      </section>

      {/* 2. REAL PROBLEMS SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-white text-slate-700 border border-slate-200 mb-3">
                <span>拒绝假大空 · 从场景切入</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                用真实问题解释共事
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                每一个场景都来自一线真实的业务卡点。我们不卖泛化的系统软件，只为你的特定问题交付可靠的计算、判断与执行结果。
              </p>
            </div>

            <Link
              href="/problems"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors shrink-0"
            >
              <span>查看全部 5 个场景深度拆解</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Core Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PROBLEMS.slice(0, 4).map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY TRADITIONAL SOFTWARE FAILS VS AI NATIVE */}
      <ComparisonMatrix />

      {/* 4. METHODOLOGY: 4-STEP IMPLEMENTATION */}
      <MethodologySteps />

      {/* 5. TWO STARTING WAYS */}
      <DualPortal />

      {/* 6. HAFLOW PRODUCT DEEP DIVE */}
      <HAFlowShowcase />

      {/* 7. REAL CASE STUDIES SNAPSHOT */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
                <span>实事求是 · 不虚构业绩</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                客户实践与场景示例
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                每个案例均详细展示：遇到什么具体问题、原有系统为何难以解决、AI 做了哪些判断、人如何参与，以及真实数据来源声明。
              </p>
            </div>

            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-emerald-600 transition-colors shrink-0"
            >
              <span>进入完整案例库</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CASE_STUDIES.map((item) => (
              <div
                key={item.slug}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      {item.industry}
                    </span>
                    <span
                      className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-sm ${
                        item.type === "实践场景"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-slate-200/80 text-slate-700 border border-slate-300"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 leading-snug">
                    <Link
                      href={`/cases/${item.slug}`}
                      className="hover:text-emerald-600 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Business Outcome Snippet */}
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 mb-6 text-xs text-slate-700">
                    <span className="font-semibold text-slate-900 block mb-1">
                      核心业务成效：
                    </span>
                    {item.businessResults.slice(0, 2).map((res, idx) => (
                      <p key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    人机分工 · 真实可验证
                  </span>
                  <Link
                    href={`/cases/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-600"
                  >
                    <span>查看 9 项标准拆解报告</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FREE TRAINING PREVIEW SECTION */}
      <section className="py-20 bg-emerald-50/40 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
              <span>{TRAINING_OVERVIEW.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              面向零基础普通人，每一场做出一个看得见的结果
            </h2>
            <p className="text-base text-slate-700 leading-relaxed mb-4">
              {TRAINING_OVERVIEW.subtitle}
            </p>
            <div className="p-3 rounded-xl bg-white border border-emerald-200 max-w-2xl mx-auto text-xs text-emerald-900 font-medium leading-relaxed">
              {TRAINING_OVERVIEW.attitude}
            </div>
          </div>

          {/* 4 Sessions Horizontal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {TRAINING_OVERVIEW.sessions.map((session) => (
              <div
                key={session.sessionNumber}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-sm bg-slate-900 text-white">
                      第 {session.sessionNumber} 场
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                      {session.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {session.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                    {session.subtitle}
                  </p>

                  <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-semibold text-slate-700 block">
                      学习成果：
                    </span>
                    <p className="text-xs text-emerald-950 font-medium bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100/60 leading-relaxed">
                      {session.coreDeliverable}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{session.dateStr}</span>
                  </span>
                  <span className="font-semibold text-emerald-700">免费预约</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/training"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
            >
              <span>查看完整课表与报名入口</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM CONVERSION ACTION */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-3">
            从一个问题开始
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6">
            带着一个具体业务问题来交流
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto">
            不需要准备长篇大论的立项 PPT。只要告诉我们目前哪件事最耗费精力、哪里的规则写不死，我们帮你做一次 30 分钟的技术可行性诊断。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/diagnose"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-lg"
            >
              <span>立即填写诊断需求</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 transition-colors"
            >
              <span>联系共事团队</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
