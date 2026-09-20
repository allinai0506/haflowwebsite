import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Server,
  UserCheck,
  XCircle,
} from "lucide-react";
import type { CaseStudy } from "@/data/cases";
import type { ProblemItem } from "@/data/problems";
import type { SolutionItem } from "@/data/solutions";

interface SolutionDetailSectionsProps {
  solution: SolutionItem;
  problem: ProblemItem;
  relatedCases: CaseStudy[];
}

export function SolutionDetailSections({
  solution,
  problem,
  relatedCases,
}: SolutionDetailSectionsProps) {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <p className="mb-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            目标用户
          </p>
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-950">
            先确定谁要把这件事做完
          </h2>
          <p className="leading-relaxed text-slate-600">{solution.audience}</p>
        </div>
        <div className="rounded-3xl border border-blue-200 bg-blue-50/70 p-6 shadow-xs sm:p-8">
          <p className="mb-3 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            业务问题
          </p>
          <p className="text-xl font-bold leading-relaxed text-blue-950 sm:text-2xl">
            “{solution.businessQuestion}”
          </p>
          <Link
            href={`/problems/${problem.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            查看完整问题拆解
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            业务输入
          </p>
          <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-950">
            从已有资料开始，不要求推倒现有系统
          </h2>
          <p className="leading-relaxed text-slate-600">{solution.inputSummary}</p>
        </div>
        <div className="border-t border-slate-100 pt-8">
          <p className="mb-4 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            典型交付流程
          </p>
          <ol className="grid gap-4 md:grid-cols-2">
            {solution.workflowSteps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-slate-700">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">
            Human + Agent, in Flow
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
            AI 做高密度分析，人做关键确认
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
            <div className="mb-4 flex items-center gap-2 font-bold text-emerald-950">
              <Bot className="h-5 w-5 text-emerald-700" aria-hidden="true" />
              <h3>AI 负责的动作</h3>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
              {problem.aiSolution.whatAiDoes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-6">
            <div className="mb-4 flex items-center gap-2 font-bold text-slate-950">
              <UserCheck className="h-5 w-5 text-amber-600" aria-hidden="true" />
              <h3>人工负责的节点</h3>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-slate-700">
              {problem.aiSolution.whatHumanDoes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <Server className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-950">现有系统集成</h2>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-slate-600">
            只连接完成当前业务动作所需的数据和系统，不替换企业已有的核心记录系统。
          </p>
          <ul className="space-y-3 text-sm text-slate-700">
            {problem.aiSolution.systemsConnected.map((system) => (
              <li key={system} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                <span>{system}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 shadow-xs sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-950">最终交付结果</h2>
          </div>
          <p className="text-base font-semibold leading-relaxed text-emerald-950">
            {problem.aiSolution.finalDeliverable}
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xs sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-950">适用条件</h2>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
            {problem.applicableConditions.map((condition) => (
              <li key={condition} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-xs sm:p-8">
          <div className="mb-5 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-rose-600" aria-hidden="true" />
            <h2 className="text-xl font-bold text-slate-950">不适用条件</h2>
          </div>
          <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
            {problem.inapplicableConditions.map((condition) => (
              <li key={condition} className="flex items-start gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
              验收指标
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
              用可核对的结果判断是否值得继续
            </h2>
          </div>
          <Link
            href={`/problems/${problem.slug}`}
            className="text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            查看指标说明
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {problem.metricsOrOutcome.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="mb-2 text-xs text-slate-500">{metric.label}</p>
              <p className="mb-2 text-2xl font-extrabold tracking-tight text-slate-950">{metric.value}</p>
              <p className="text-xs leading-relaxed text-slate-500">{metric.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <div className="mb-6">
          <p className="mb-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            对应案例
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">
            先看相近问题如何被做成
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {relatedCases.map((relatedCase) => (
            <Link
              key={relatedCase.slug}
              href={`/cases/${relatedCase.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-blue-300"
            >
              <p className="mb-2 text-xs font-semibold text-blue-700">{relatedCase.subBadge}</p>
              <h3 className="mb-2 font-bold leading-relaxed text-slate-950 group-hover:text-blue-700">
                {relatedCase.headline}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{relatedCase.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">
                查看案例
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
