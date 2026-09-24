"use client";

import React, { useState } from "react";
import {
  Workflow,
  Cpu,
  UserCheck,
  ShieldCheck,
  Database,
  ArrowDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const SAMPLE_TASKS = [
  {
    id: "quote",
    label: "高频复杂报价",
    goal: "生成一次精准且具备利润把控的商务报价",
    steps: [
      { role: "规则引擎", icon: Database, text: "自动匹配客商阶梯价与历史返点政策", tag: "知识" },
      { role: "核算 Agent", icon: Cpu, text: "调取运费与汇率执行多维毛利测算", tag: "执行" },
      { role: "商务负责人", icon: UserCheck, text: "毛利率偏离临界值时人工确认裁决", tag: "In Flow" },
      { role: "系统回写", icon: ShieldCheck, text: "生成正式报价单并直写回 ERP 归档", tag: "闭环" },
    ],
  },
  {
    id: "bid",
    label: "标书合规审查",
    goal: "审查数百页招标文件中的废标硬性风险项",
    steps: [
      { role: "知识图谱", icon: Database, text: "提取行业资质、财务指标与法律合规库", tag: "知识" },
      { role: "质检 Agent", icon: Cpu, text: "逐段穿透比对资质条款，标红废标偏离", tag: "执行" },
      { role: "投标总监", icon: UserCheck, text: "针对偏离条款签署风控意见与澄清方案", tag: "In Flow" },
      { role: "审计溯源", icon: ShieldCheck, text: "导出带原文页码出处的《合规审查报告》", tag: "闭环" },
    ],
  },
];

export function MethodologyTaskVisual() {
  const [activeTask, setActiveTask] = useState<"quote" | "bid">("quote");
  const current = SAMPLE_TASKS.find((t) => t.id === activeTask) || SAMPLE_TASKS[0];

  return (
    <div className="w-full rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-100 overflow-hidden relative">
      {/* Visual Accent Top Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600" />

      <div className="p-5 sm:p-6 space-y-5">
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-700 font-bold">
                企业 AI 最小单位：Task
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              一件可被完整完成、可验证的事情
            </h3>
          </div>

          {/* Task Switcher Pill Buttons */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {SAMPLE_TASKS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTask(t.id as "quote" | "bid")}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTask === t.id
                    ? "bg-white text-blue-700 shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. Paradigm Contrast: Traditional Software Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2">
            <span className="font-semibold text-slate-600">传统软件视角（拆功能清单）</span>
            <span className="text-rose-600 font-medium">系统录入，人工拼凑</span>
          </div>
          <div className="flex items-center justify-between gap-1 text-center text-[11px] sm:text-xs font-medium">
            <div className="flex-1 py-1.5 px-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-2xs">
              功能菜单
            </div>
            <span className="text-slate-300 text-xs shrink-0">→</span>
            <div className="flex-1 py-1.5 px-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-2xs">
              录入表单
            </div>
            <span className="text-slate-300 text-xs shrink-0">→</span>
            <div className="flex-1 py-1.5 px-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-2xs">
              流转审批
            </div>
            <span className="text-slate-300 text-xs shrink-0">→</span>
            <div className="flex-1 py-1.5 px-1 rounded-lg bg-white border border-slate-200 text-slate-600 shadow-2xs">
              统计报表
            </div>
          </div>
        </div>

        {/* Transition Indicator */}
        <div className="flex items-center justify-center -my-0.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold shadow-2xs">
            <ArrowDown className="w-3.5 h-3.5 text-blue-600 animate-bounce" />
            <span>跃迁至共事工作流 · HAFlow 协同</span>
          </div>
        </div>

        {/* 2. Co-Execution Paradigm Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-blue-50/70 to-sky-50/30 border border-blue-200/90 space-y-3">
          {/* Target Banner */}
          <div className="flex items-center gap-2 text-xs font-bold text-blue-950 bg-white/80 py-1.5 px-3 rounded-xl border border-blue-100">
            <Workflow className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="text-slate-500 font-normal">当前目标：</span>
            <span className="text-blue-900 truncate">{current.goal}</span>
          </div>

          {/* 4 Steps In Flow */}
          <div className="space-y-2">
            {current.steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-blue-100/80 shadow-2xs hover:border-blue-300 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-bold text-slate-900">{s.role}</span>
                      <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200/60">
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">{s.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="pt-1 flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5 text-blue-700 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Human + Agent, in Flow
          </span>
          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            结果可验证 · 能力可沉淀
          </span>
        </div>
      </div>
    </div>
  );
}
