"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  Cpu,
  Workflow,
  ShieldCheck,
  CheckCircle2,
  FolderGit2,
  Repeat,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { METHODOLOGY_DATA } from "@/data/methodology";

export function MethodologyEvolutionLoop() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const stepIcons = [
    <AlertCircle key="1" className="w-5 h-5 text-blue-600" />,
    <Workflow key="2" className="w-5 h-5 text-sky-600" />,
    <Cpu key="3" className="w-5 h-5 text-indigo-600" />,
    <ShieldCheck key="4" className="w-5 h-5 text-emerald-600" />,
    <CheckCircle2 key="5" className="w-5 h-5 text-teal-600" />,
    <FolderGit2 key="6" className="w-5 h-5 text-blue-600" />,
    <Repeat key="7" className="w-5 h-5 text-violet-600" />,
  ];

  const currentStepData = METHODOLOGY_DATA.evolutionLoop.find(
    (s) => s.step === activeStep
  ) || METHODOLOGY_DATA.evolutionLoop[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
      {/* Eyebrow & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>持续演化闭环模型 · The Continuous Co-Execution Loop</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
            方法论运转全景：从一个问题到企业自主演进
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          打破传统 IT“立项—交付—冻结”的线性枯竭，每一个任务都经历完整的执行与验证，并将经验沉淀为可复用的数字资产，持续循环迭代。
        </p>
      </div>

      {/* Visual Sequence Grid */}
      <div className="relative">
        {/* Step nodes row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6 relative z-10">
          {METHODOLOGY_DATA.evolutionLoop.map((item, idx) => {
            const isSelected = item.step === activeStep;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStep(item.step)}
                className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                  isSelected
                    ? "bg-blue-50/70 border-blue-400 shadow-sm shadow-blue-500/10 ring-2 ring-blue-500/20"
                    : "bg-slate-50/70 border-slate-200/90 hover:bg-white hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200/80 text-slate-700"
                      }`}
                    >
                      0{item.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-medium">
                      {item.badge}
                    </span>
                  </div>
                  <div className="mb-2">{stepIcons[idx]}</div>
                  <h4
                    className={`text-xs font-bold leading-tight ${
                      isSelected ? "text-blue-900" : "text-slate-900"
                    }`}
                  >
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                    {item.nameEn}
                  </span>
                </div>

                {/* Right Arrow indicator on non-last items on desktop */}
                {idx < METHODOLOGY_DATA.evolutionLoop.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-slate-300 group-hover:text-blue-400 pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* The Continuous Feedback Loop Bar (Crucial requirement) */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/60 to-blue-50 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs mb-8">
          <div className="flex items-center gap-2.5 text-blue-900 font-semibold">
            <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Repeat className="w-4 h-4" />
            </div>
            <span>
              核心闭环机制：第七步“下一个任务”经验无缝回流第一步“真实问题”，形成自驱动业务演化闭环
            </span>
          </div>
          <span className="font-mono text-[11px] text-blue-700 font-bold bg-white/80 px-3 py-1 rounded-full border border-blue-200 shrink-0">
            资产复用 · 经验滚雪球
          </span>
        </div>
      </div>

      {/* Active Step Deep Detail Card */}
      <div className="bg-slate-50/80 rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-600 text-white">
              步骤 0{currentStepData.step} 深度解析
            </span>
            <span className="text-xs font-bold text-slate-700">
              {currentStepData.name} ({currentStepData.nameEn})
            </span>
          </div>
          <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
            {currentStepData.desc}
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span>点击上方环节切换观察</span>
          <span className="text-blue-600 font-bold">[{activeStep}/7]</span>
        </div>
      </div>
    </div>
  );
}
