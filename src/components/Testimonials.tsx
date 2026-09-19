import React from "react";
import Link from "next/link";
import { Quote, ArrowRight, TrendingUp, Route } from "lucide-react";
import {
  TESTIMONIALS,
  TESTIMONIAL_THEMES,
  type Testimonial,
} from "@/data/testimonials";

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:shadow-md transition-shadow">
      <Quote className="w-5 h-5 text-blue-300 mb-4 shrink-0" aria-hidden="true" />

      <p className="text-sm text-slate-700 leading-relaxed flex-1">
        {item.text}
      </p>

      {item.metric ? (
        <div className="mt-5 self-start inline-flex items-baseline gap-2 rounded-xl border border-blue-100 bg-blue-50/70 px-3 py-2">
          <span className="text-base font-extrabold text-blue-700 tabular-nums">
            {item.metric.value}
          </span>
          <span className="text-[11px] text-blue-900/80">
            {item.metric.label}
          </span>
        </div>
      ) : null}

      <footer className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <span
            className="w-9 h-9 shrink-0 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center"
            aria-hidden="true"
          >
            {item.industry.slice(0, 1)}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900">{item.role}</p>
            <p className="text-[11px] text-slate-500">{item.industry}</p>
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
    </article>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
            - CUSTOMER VOICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
            客户怎么评价共事
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            来自汽车零部件、装备制造、连锁零售、财税共享等实际项目的现场反馈。按客户要求隐去企业名称与敏感数据，每条证言都可点进去核对对应的完整案例。
          </p>
        </div>

        <div className="space-y-14">
          {TESTIMONIAL_THEMES.map((theme) => (
            <div key={theme.key}>
              <div className="flex items-start gap-3 mb-6">
                <span className="w-9 h-9 shrink-0 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  {theme.key === "efficiency" ? (
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Route className="w-4 h-4 text-blue-600" />
                  )}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {theme.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1 max-w-3xl">
                    {theme.summary}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TESTIMONIALS.filter((t) => t.theme === theme.key).map(
                  (item) => (
                    <TestimonialCard key={item.role} item={item} />
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-12 p-4 rounded-2xl bg-white border border-slate-200 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
          <strong className="text-slate-700">关于证言口径：</strong>
          以上内容来自项目现场访谈与交付回访的提炼整理，非逐字转录；按客户要求隐去企业名称、人员姓名与敏感金额。证言下方的数字均取自对应案例页已公开的指标，可点击核对。
        </p>
      </div>
    </section>
  );
}
