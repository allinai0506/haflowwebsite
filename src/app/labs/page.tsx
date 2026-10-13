import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo({ path: "/labs", title: "HAFlow 实验室", description: "探索企业与 AI 共事的新方式。通过可操作的产品原型，体验未来企业软件的交互与工作形态。" });

const views = ["运行总览", "业务工作空间", "我的目标", "例外决策", "业务事实台账", "授权与政策", "Agent 协作网络"];

export default function LabsPage() {
  return (
    <div className="bg-[#f7f8fa]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-8 flex items-center gap-3 text-xs font-mono tracking-widest text-blue-700"><span className="h-2 w-2 rounded-full bg-blue-600" />HAFLOW LABS / 开放探索</div>
        <div className="grid gap-8 border-b border-slate-200 pb-14 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">HAFlow 实验室<span className="mt-5 block text-xl font-normal tracking-normal text-slate-600 sm:text-2xl">探索企业与 AI 共事的新方式。</span></h1>
          <p className="max-w-lg text-base leading-8 text-slate-600">把关于未来企业软件的想法，做成可以亲手操作的实验。这里记录产品原型、交互探索，以及每一个想法背后值得追问的问题。</p>
        </div>
        <article className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-4 text-xs"><span className="font-mono text-slate-500">实验 001 / 2026.10</span><span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">交互原型</span></div>
              <h2 className="mt-7 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl"><Link href="/labs/enterprise-runtime" className="hover:text-blue-700">下一代企业运行空间</Link></h2>
              <p className="mt-5 text-lg leading-8 text-slate-800">如果企业软件围绕「业务完成」组织，<br className="hidden sm:block" />首页会是什么样？</p>
              <p className="mt-4 text-sm leading-7 text-slate-500">从业务目标出发，让工作自主推进，让交付物随时可见，让真正需要人判断的例外浮出水面。</p>
              <Link href="/labs/enterprise-runtime" className="mt-8 inline-flex min-h-12 items-center gap-4 rounded-full bg-blue-600 px-6 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">进入体验 <ArrowUpRight size={18} /></Link>
            </div>
            <div className="flex flex-col justify-center border-t border-slate-200 bg-blue-50/60 p-6 text-slate-900 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
              <p className="text-xs font-mono tracking-widest text-blue-700">从目标到结果</p>
              <div className="my-8 space-y-4">
                {["提出业务目标", "Agent 协作推进", "人判断关键例外", "交付结果 · 留下事实"].map((label, index) => <div key={label} className="flex items-center gap-4 border-b border-blue-100 pb-4"><span className="font-mono text-xs text-slate-500">0{index + 1}</span><span className="flex-1 text-lg">{label}</span><ArrowRight size={16} className="text-blue-600" /></div>)}
              </div>
              <p className="text-xs leading-6 text-slate-500">七个可切换界面</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">{views.join(" / ")}</p>
            </div>
          </div>
          <div className="border-t border-slate-200 px-6 py-4 text-xs leading-6 text-slate-500 sm:px-10">模拟业务数据 · 尚未连接真实 AI 或企业系统 · 探索中的产品形态</div>
        </article>
        <p className="mt-10 text-sm leading-7 text-slate-500">一个原型，是一个问题的开始。更多实验将在这里持续更新。</p>
      </div>
    </div>
  );
}
