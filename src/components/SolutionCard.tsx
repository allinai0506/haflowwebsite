import Link from "next/link";
import { ArrowRight, FileCheck, TrendingUp, DollarSign } from "lucide-react";
import type { SolutionItem } from "@/data/solutions";
import { getCaseBySlug } from "@/data/cases";

interface SolutionCardProps {
  solution: SolutionItem;
}

const ICONS = {
  quote: DollarSign,
  "order-forecast": TrendingUp,
  "bid-audit": FileCheck,
} as const;

export function SolutionCard({ solution }: SolutionCardProps) {
  const Icon = ICONS[solution.slug];
  // 蜘蛛视角：卡片挂相关案例内链，既加独有文本又织密内链
  const relatedCases = solution.caseSlugs
    .map(getCaseBySlug)
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 sm:p-8"
    >
      <div>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600">
            解决方案
          </span>
        </div>
        <p className="mb-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
          {solution.eyebrow}
        </p>
        <h2 className="mb-4 text-xl font-extrabold tracking-tight text-slate-950 transition-colors group-hover:text-blue-700 sm:text-2xl">
          {solution.title}
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">
          {solution.audience}
        </p>
        <p className="mb-5 text-xs leading-relaxed text-slate-500 line-clamp-3">
          <span className="font-semibold text-slate-700">输入：</span>
          {solution.inputSummary}
        </p>
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm font-medium leading-relaxed text-blue-950">
          “{solution.businessQuestion}”
        </div>
        {relatedCases.length > 0 && (
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-700">相关案例：</span>
            {relatedCases.map((item) => item.headline).join("、")}
          </p>
        )}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
        <span>查看交付路径与验收边界</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </div>
    </Link>
  );
}
