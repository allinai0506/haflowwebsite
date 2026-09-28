"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { gotoMethodologyChapter } from "@/components/MethodologyChapters";

const ESSENCE_POINTS = [
  {
    point: "先让 AI 理解企业，再让它开始工作",
    detail: "对象、关系、规则、动作构成企业本体（Enterprise Ontology）。",
  },
  {
    point: "最小单位不是功能，而是一件可验证结果的事",
    detail: "Task —— 生成一次报价、完成一次投标判断。",
  },
  {
    point: "上下文按当前任务组装",
    detail: "只给 Agent 真正需要的信息，不过载、不缺失。",
  },
  {
    point: "人定目标与终审，Agent 做执行",
    detail: "流程结束 = 事情真正做完，而不只是审批完成。",
  },
];

const JOURNEY_STEPS = [
  { step: "真实问题", en: "Real Problem", target: "real-problem" },
  { step: "企业本体", en: "Ontology", target: "ontology" },
  { step: "持续验证", en: "Verify Loop", target: "evolution-loop" },
  { step: "人机执行", en: "Human + Agent", target: "c05" },
  { step: "能力沉淀", en: "Assets", target: "c08" },
];

/**
 * 阅读指南：60 秒要点 + 5 步阅读动线。
 * 动线按钮点击后展开目标章节并滚动（普通锚点直接滚动）。
 */
export function MethodologyReadingGuide() {
  return (
    <section
      aria-labelledby="reading-guide-heading"
      className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs"
    >
      <div className="max-w-3xl mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
          阅读指南 · Reading Guide
        </span>
        <h2
          id="reading-guide-heading"
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3"
        >
          先看结论，再按图索骥
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          下面 4 句话是本页的全部重点；5 步动线是建议的阅读顺序，全程约 8
          分钟。
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/60 border border-blue-200 mb-6">
        <span className="text-xs font-mono font-bold text-blue-900 block mb-4 uppercase tracking-wider">
          60 秒抓住重点 · TL;DR
        </span>
        <ol className="space-y-3">
          {ESSENCE_POINTS.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                <strong className="text-slate-900">{item.point}</strong>
                <span> —— {item.detail}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <span className="text-xs font-mono text-slate-500 font-bold block mb-3 uppercase tracking-wider">
          本页阅读动线 · 建议按顺序阅读
        </span>
        <ol className="flex flex-col sm:flex-row sm:items-stretch gap-2">
          {JOURNEY_STEPS.map((item, idx) => (
            <li
              key={item.target}
              className="flex-1 flex flex-col sm:flex-row items-stretch gap-2"
            >
              <button
                type="button"
                onClick={() => gotoMethodologyChapter(item.target)}
                className="flex-1 flex items-center gap-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-300 hover:shadow-2xs transition-all text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md shrink-0">
                  0{idx + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold text-slate-900">
                    {item.step}
                  </span>
                  <span className="block font-mono text-[10px] text-slate-400">
                    {item.en}
                  </span>
                </span>
              </button>
              {idx < JOURNEY_STEPS.length - 1 ? (
                <span
                  className="flex items-center justify-center"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-4 h-4 text-blue-300 rotate-90 sm:rotate-0" />
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
