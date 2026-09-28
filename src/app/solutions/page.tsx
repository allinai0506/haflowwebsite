import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionEyebrow } from "@/components/SectionEyebrow";
import { SolutionCard } from "@/components/SolutionCard";
import { SOLUTIONS } from "@/data/solutions";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/solutions",
  title: "企业AI解决方案_报价预测标书核查",
  description:
    "共事智能企业 AI 解决方案：围绕智能报价、连锁门店订货预测和标书质量核查，把一个具体业务问题做成可交付、可验收的结果。",
  keywords: [
    "企业AI解决方案",
    "智能报价",
    "订货预测",
    "AI标书核查",
    "人机协同落地",
    "共事智能",
  ],
});

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-5 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "解决方案" }]} />

        <header className="max-w-4xl py-4 sm:py-8">
          <SectionEyebrow className="mb-4">Solution Paths · 解决方案</SectionEyebrow>
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            从一个具体问题开始，
            <br />
            把企业 AI 做成可验收的结果。
          </h1>
          <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
            解决方案页回答的是“服务谁、怎么接入、如何交付和怎样验收”。它不替换企业已有的 ERP、OA、CRM 或业务系统，而是围绕一个规则写不死的业务动作，建立人和 Agent 共同完成结果的路径。
          </p>
        </header>

        <section className="mb-12 grid gap-4 md:grid-cols-3" aria-label="解决方案选择原则">
          {[
            ["目标用户", "先明确哪类团队正在承担这个业务结果。"],
            ["交付路径", "把输入、分析、人工确认和回写拆成可检查的步骤。"],
            ["验收边界", "同时写清适用条件、不适用条件和可核对指标。"],
          ].map(([title, description], index) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <span className="mb-4 block text-xs font-mono font-bold text-blue-700">0{index + 1}</span>
              <h2 className="mb-2 text-base font-bold text-slate-950">{title}</h2>
              <p className="text-sm leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="solution-list-title">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
                Fact-backed scenarios
              </p>
              <h2 id="solution-list-title" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                已有业务事实支撑的三条路径
              </h2>
            </div>
            <Link href="/problems" className="text-sm font-semibold text-blue-700 hover:text-blue-900">
              查看全部具体问题
              <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {SOLUTIONS.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} />
            ))}
          </div>
        </section>

        <section className="my-16 flex flex-col items-center justify-between gap-6 rounded-3xl border border-blue-100 bg-blue-50/70 p-8 text-center sm:flex-row sm:text-left sm:p-10">
          <div className="max-w-2xl">
            <h2 className="mb-2 text-2xl font-extrabold tracking-tight text-slate-950">
              你的业务问题不在这三类？
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              只要问题涉及多源资料、动态规则和人工判断，就可以从一份脱敏材料开始做可行性诊断。
            </p>
          </div>
          <Link
            href="/diagnose"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            预约业务问题诊断
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
