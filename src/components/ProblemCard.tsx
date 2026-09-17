import React from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, FileCheck, DollarSign, TrendingUp, Link2, BookOpen } from "lucide-react";
import { ProblemItem } from "@/data/problems";

interface ProblemCardProps {
  problem: ProblemItem;
  featured?: boolean;
}

export function ProblemCard({ problem, featured = false }: ProblemCardProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case "quote":
        return <DollarSign className="w-5 h-5 text-emerald-600" />;
      case "order-forecast":
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case "bid-audit":
        return <FileCheck className="w-5 h-5 text-indigo-600" />;
      case "voucher-link":
        return <Link2 className="w-5 h-5 text-teal-600" />;
      case "knowledge-reuse":
        return <BookOpen className="w-5 h-5 text-amber-600" />;
      default:
        return <HelpCircle className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <Link
      href={`/problems/${problem.slug}`}
      className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 bg-white hover:border-blue-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer block outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
        featured
          ? "border-slate-300 ring-1 ring-slate-900/5 p-6 sm:p-8"
          : "border-slate-200 p-6 sm:p-7"
      }`}
    >
      <div>
        {/* Header with category tag and icon */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
              {getIcon(problem.id)}
            </div>
            <div>
              <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider block">
                {problem.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                {problem.title}
              </h3>
            </div>
          </div>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80">
            {problem.tag}
          </span>
        </div>

        {/* The Concrete Business Question (Highlighted in clean light blue) */}
        <div className="mb-4 p-3.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-950 font-medium text-sm leading-snug flex items-start gap-2.5">
          <span className="text-blue-600 font-mono font-bold shrink-0 text-xs mt-0.5">
            [具体问题]
          </span>
          <p className="text-blue-950 italic">“{problem.question}”</p>
        </div>

        {/* Summary */}
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {problem.summary}
        </p>

        {/* Key factors to synthesize */}
        <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            AI 需综合的关键要素：
          </span>
          <ul className="space-y-1.5">
            {problem.factors.slice(0, 4).map((factor, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <span>{factor}</span>
              </li>
            ))}
            {problem.factors.length > 4 && (
              <li className="text-[11px] text-slate-400 pl-3.5 italic">
                + 及历史成交记录、客户敏感度等综合判定...
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Footer Deliverable & CTA */}
      <div className="pt-4 border-t border-slate-100 mt-2">
        <div className="mb-4 bg-blue-50/60 border border-blue-100/80 rounded-xl p-3 text-xs text-blue-950">
          <span className="font-semibold text-blue-950 block mb-0.5">
            最终交付结果：
          </span>
          <p className="text-blue-800 leading-relaxed">
            {problem.aiSolution.finalDeliverable}
          </p>
        </div>

        <div
          className="inline-flex items-center justify-between w-full text-xs font-semibold text-slate-900 group-hover:text-blue-600 py-2 transition-colors"
        >
          <span>查看该场景解决方案与人机分工</span>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}
