"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Quote,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Route,
  ShieldCheck,
  Zap,
  FileCheck,
  Archive,
  MessageSquareQuote,
} from "lucide-react";
import {
  TESTIMONIALS,
  TESTIMONIAL_THEMES,
  type Testimonial,
  type TestimonialTheme,
} from "@/data/testimonials";

/** 顶部指标条：取自证言已公开指标，不另造新数据（PaceUI Testimonials 2 的 metrics 行）。 */
const HIGHLIGHT_METRICS = [
  { icon: TrendingUp, value: "15%", label: "报价毛利跑冒滴漏减少" },
  { icon: ShieldCheck, value: "95%", label: "废标风险降低" },
  { icon: Zap, value: "天 → 秒", label: "单据检索穿透时效" },
  { icon: Archive, value: "近 10 万卷", label: "库房全量实测后上线" },
] as const;

function QuoteMark() {
  return (
    <Quote
      className="w-6 h-6 text-slate-200 mb-3 shrink-0"
      aria-hidden="true"
    />
  );
}

function PersonFooter({ item }: { item: Testimonial }) {
  return (
    <footer className="mt-5 pt-4 border-t border-dashed border-slate-200 bg-slate-50/80 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 px-6 py-4 rounded-b-2xl">
      <div className="flex items-center gap-3">
        <span
          className="w-9 h-9 shrink-0 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center"
          aria-hidden="true"
        >
          {item.industry.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 leading-tight">
            {item.role}
          </p>
          <p className="text-xs text-slate-500 leading-tight mt-0.5">
            {item.industry}
          </p>
        </div>
      </div>

      <p className="mt-3 text-[10px] font-mono text-slate-400 leading-relaxed">
        {item.note}
      </p>

      <Link
        href={`/cases/${item.sourceSlug}`}
        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
      >
        <span>对应案例：{item.sourceLabel}</span>
        <ArrowRight className="w-3 h-3" />
      </Link>
    </footer>
  );
}

/** PaceUI Testimonials 1 右侧小卡：引号 + 正文 + 人物 footer。 */
function CompactCard({ item }: { item: Testimonial }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
      <QuoteMark />
      <p className="text-sm text-slate-900 leading-relaxed flex-1">
        {item.text}
      </p>
      {item.metric ? (
        <p className="mt-4 text-xs text-slate-500">
          <span className="font-extrabold text-blue-700 tabular-nums">
            {item.metric.value}
          </span>
          <span className="ml-1.5">{item.metric.label}</span>
        </p>
      ) : null}
      <PersonFooter item={item} />
    </article>
  );
}

/** PaceUI Testimonials 1 左侧精选大卡：大数字指标置顶。 */
function FeaturedCard({ item }: { item: Testimonial }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs hover:shadow-md transition-shadow h-full">
      {item.metric ? (
        <div className="mb-2">
          <p className="text-4xl font-black tracking-tight text-slate-950 tabular-nums font-display">
            {item.metric.value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{item.metric.label}</p>
        </div>
      ) : null}
      <QuoteMark />
      <p className="text-sm sm:text-[15px] text-slate-900 leading-relaxed flex-1">
        {item.text}
      </p>
      <PersonFooter item={item} />
    </article>
  );
}

export function Testimonials() {
  const [activeTheme, setActiveTheme] =
    useState<TestimonialTheme>("efficiency");
  const activeSummary = TESTIMONIAL_THEMES.find(
    (t) => t.key === activeTheme,
  )?.summary;
  const activeItems = TESTIMONIALS.filter((t) => t.theme === activeTheme);
  const [featured, ...rest] = activeItems;

  return (
    <section className="py-12 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PaceUI 式居中头：pill + 大标题 + 居中副标题 */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-white border border-blue-100 rounded-full px-3.5 py-1.5 mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" aria-hidden="true" />
            Customer Voices
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
            客户怎么评价共事
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            来自汽车零部件、装备制造、连锁零售、财税共享等实际项目的现场反馈。按客户要求隐去企业名称与敏感数据，每条证言都可点进去核对对应的完整案例。
          </p>
        </div>

        {/* PaceUI Testimonials 2 式指标条：数字全部取自证言已公开指标 */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {HIGHLIGHT_METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col"
            >
              <m.icon
                className="w-4 h-4 text-blue-600 mb-3"
                aria-hidden="true"
              />
              <dt className="order-2 text-xs text-slate-500 mt-1">
                {m.label}
              </dt>
              <dd className="order-1 text-2xl font-black tracking-tight text-slate-950 tabular-nums font-display">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* PaceUI Testimonials 1 式分组 Tabs：Startups / Enterprise 段控样式 */}
        <div className="flex justify-center mb-4">
          <div
            role="tablist"
            aria-label="证言分组"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-2xs"
          >
            {TESTIMONIAL_THEMES.map((theme) => {
              const active = theme.key === activeTheme;
              return (
                <button
                  key={theme.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTheme(theme.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 min-h-[44px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {theme.key === "efficiency" ? (
                    <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <Route className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  <span>
                    {theme.key === "efficiency" ? "提效之别" : "交付更顺"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-center text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl mx-auto mb-8">
          {TESTIMONIAL_THEMES.find((t) => t.key === activeTheme)?.title}：
          {activeSummary}
        </p>

        {/* PaceUI Testimonials 1 式布局：左侧精选大卡 + 右侧小卡堆叠 */}
        <div
          key={activeTheme}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {featured ? <FeaturedCard item={featured} /> : null}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6">
            {rest.map((item) => (
              <CompactCard key={item.role} item={item} />
            ))}
          </div>
        </div>

        {/* PaceUI 式底部信任条：左说明 / 中提示 / 右查看全部 */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-2xs">
          <p className="inline-flex items-center gap-2 text-xs text-slate-500">
            <span className="w-8 h-8 shrink-0 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
              <FileCheck className="w-4 h-4 text-blue-600" aria-hidden="true" />
            </span>
            <span>
              <strong className="text-slate-900 font-bold">
                {TESTIMONIALS.length} 条现场证言
              </strong>
              ，均可核对对应案例
            </span>
          </p>
          <p className="text-xs text-slate-500">
            每条证言下方都挂着完整案例，点击即可验证过程与数据。
          </p>
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-900 hover:border-blue-200 hover:text-blue-700 transition-colors shrink-0"
          >
            <span>查看全部案例</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
          <strong className="text-slate-700">关于证言口径：</strong>
          以上内容来自项目现场访谈与交付回访的提炼整理，非逐字转录；按客户要求隐去企业名称、人员姓名与敏感金额。证言下方的数字均取自对应案例页已公开的指标，可点击核对。
        </p>
      </div>
    </section>
  );
}
