"use client";

import React, { useState } from "react";
import {
  Workflow,
  Cpu,
  UserCheck,
  ShieldCheck,
  ArrowDown,
  Sparkles,
} from "lucide-react";

const SAMPLE_SCENARIOS = [
  {
    id: "quote",
    name: "复杂业务报价",
    goal: "完成一次精准报价并把控毛利底线",
    agent: "规则引擎自动算价与多维毛利测算",
    human: "毛利率偏离临界值时总监终审裁决",
    result: "生成带核算依据的报价单并回写 ERP",
  },
  {
    id: "bid",
    name: "标书合规审查",
    goal: "数百页招标文件废标硬性风险穿透审查",
    agent: "比对资质与财务条款，自动标红偏离",
    human: "风控负责人针对偏离条款签署处置意见",
    result: "导出带原文页码出处的《合规审查报告》",
  },
];

export function MethodologyTaskVisual() {
  const [activeTab, setActiveTab] = useState<"quote" | "bid">("quote");
  const current = SAMPLE_SCENARIOS.find((s) => s.id === activeTab) || SAMPLE_SCENARIOS[0];

  return (
    <div className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-100/80 p-5 space-y-4 relative overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600" />

      {/* Header: Title + Scenario Switcher */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-900 tracking-tight">
            企业 AI 最小单位：Task
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[11px]">
          {SAMPLE_SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveTab(s.id as "quote" | "bid")}
              className={`px-2 py-0.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === s.id
                  ? "bg-white text-blue-700 font-bold shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Traditional Paradigm (Muted & Compact) */}
      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-[11px]">
        <div className="flex items-center justify-between text-slate-500 mb-1.5 font-mono text-[10px]">
          <span>传统功能清单视角</span>
          <span className="text-rose-500">仅记录数据，人肉拼凑</span>
        </div>
        <div className="flex items-center justify-between text-slate-600 font-medium px-1">
          <span className="bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">功能菜单</span>
          <span className="text-slate-300">→</span>
          <span className="bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">录入表单</span>
          <span className="text-slate-300">→</span>
          <span className="bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">审批流转</span>
          <span className="text-slate-300">→</span>
          <span className="bg-white px-2 py-1 rounded border border-slate-200 shadow-2xs">统计报表</span>
        </div>
      </div>

      {/* Transition Pill */}
      <div className="flex items-center justify-center -my-1">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold shadow-2xs">
          <ArrowDown className="w-3 h-3 text-blue-600" />
          <span>跃迁至共事工作流 · 把一件事做完</span>
        </div>
      </div>

      {/* 2. Co-Execution Task Core (Compact & High Contrast) */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-b from-blue-50/70 to-sky-50/30 border border-blue-200/90 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950 bg-white/90 py-1 px-2.5 rounded-lg border border-blue-100">
          <Workflow className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="text-slate-500 text-[11px] font-normal">目标：</span>
          <span className="text-blue-900 truncate text-[11px] sm:text-xs">{current.goal}</span>
        </div>

        {/* 3 Core Pillars: Agent / Human / Evidence */}
        <div className="grid grid-cols-1 gap-1.5 text-xs">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-blue-100 shadow-2xs">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono font-bold text-blue-700 mr-1.5">Agent 执行</span>
              <span className="text-slate-700 text-[11px] leading-tight truncate block sm:inline">{current.agent}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-blue-100 shadow-2xs">
            <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono font-bold text-amber-700 mr-1.5">人机裁决</span>
              <span className="text-slate-700 text-[11px] leading-tight truncate block sm:inline">{current.human}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-blue-100 shadow-2xs">
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-mono font-bold text-emerald-700 mr-1.5">结果闭环</span>
              <span className="text-slate-700 text-[11px] leading-tight truncate block sm:inline">{current.result}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Minimal Indicator */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium px-1 pt-0.5">
        <span className="inline-flex items-center gap-1 text-blue-700 font-semibold">
          <Sparkles className="w-3 h-3 text-blue-600" />
          Human + Agent, in Flow
        </span>
        <span className="text-slate-400 font-mono text-[10px]">
          结果可验证 · 资产可沉淀
        </span>
      </div>
    </div>
  );
}
