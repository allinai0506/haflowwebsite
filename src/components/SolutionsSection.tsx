"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { EvolutionPath } from "@/components/EvolutionPath";

export function SolutionsSection() {
  return (
    <section className="py-12 sm:py-20 bg-white border-t border-slate-100" id="solutions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with user-directed positioning */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span>SOLUTIONS & EVOLUTION PATH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            让企业进入人机共事时代
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            从企业管理软件到 AI Agent 工作流，重新设计人与 AI 共同工作的方式。
          </p>
        </div>

        <EvolutionPath />

        {/*
          首页不再重复铺 6 张案例大卡（与 Concrete Problems / Testimonials 讲同一批项目）：
          案例的归宿是 /cases 页，这里只留一条 portal 横幅做入口。
        */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border border-blue-200/80 flex flex-col lg:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>已在现场跑通</span>
            </div>
            <h4 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              您卡住的这件事，可能已经有人做成了
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              打开案例，对上您的行业：卡住什么、怎么做、结果怎么验收。
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs">
                <strong className="font-extrabold text-slate-950">−95%</strong>
                <span className="text-slate-600">废标风险</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs">
                <strong className="font-extrabold text-slate-950">5 分钟</strong>
                <span className="text-slate-600">国际询价</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs">
                <strong className="font-extrabold text-slate-950">−60%</strong>
                <span className="text-slate-600">门店缺货</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
            <Link
              href="/cases"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] w-full sm:w-auto text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-full transition-all shadow-md shadow-blue-500/20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <span>找和您最像的案例</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
