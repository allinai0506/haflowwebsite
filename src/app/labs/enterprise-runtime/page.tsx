import Link from "next/link";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { pageSeo } from "@/lib/seo";
import { EnterpriseRuntimeThinking } from "@/components/labs/EnterpriseRuntimeThinking";
import { PrototypeExperience } from "@/components/labs/PrototypeExperience";

export const metadata = pageSeo({ path: "/labs/enterprise-runtime", title: "下一代企业运行空间｜HAFlow 实验室", description: "未来20年，企业还需要审批流吗？OA会不会彻底消失？共事智能关于授权、实时治理、Agent 与企业运行空间的完整思考，附七个界面的交互产品原型。" });

const steps = [
  { title: "提出一个业务目标", body: "在运行总览输入你想完成的业务，点击「开始工作」，观察系统如何创建业务工作空间。" },
  { title: "查看交付，推进工作", body: "点击「续约报价方案」，查看 Agent 的业务交付物，再点击「执行下一步」，观察进度变化。" },
  { title: "处理例外，追溯事实", body: "在「需要你判断的事」中处理一次例外决策，再到「业务事实台账」查看留下的决策记录。" },
];

export default function EnterpriseRuntimePage() {
  return (
    <div className="bg-[#f7f8fa] pb-16 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <Link href="/labs" className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-500 hover:text-blue-700"><ArrowLeft size={16} />HAFlow 实验室</Link>
        <div className="max-w-4xl py-8 sm:py-12">
          <p className="text-xs font-mono tracking-widest text-blue-700">实验 001 / 企业软件的下一种形态</p>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">下一代企业运行空间</h1>
          <p className="mt-6 text-lg leading-8 text-slate-700 sm:text-xl">企业软件的首页，应该从「等待审批」走向「推动业务完成」。</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500">我有哪些业务要完成？哪些工作正在自主推进？哪些事情真正需要我判断？这份交互草图，尝试围绕这三个问题重新组织企业软件。</p>
          <div className="mt-6 flex flex-wrap items-center gap-4"><a href="#design-thinking" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700">阅读完整思考 <ArrowDown size={16} /></a><a href="#experience" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700">开始体验 <ArrowDown size={16} /></a><span className="text-xs leading-6 text-slate-500">交互原型 · 模拟业务数据 · 尚未连接真实 AI 或企业系统</span></div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><EnterpriseRuntimeThinking /></div>
      <div className="mx-auto max-w-[1600px] px-2 sm:px-6 lg:px-8"><PrototypeExperience /></div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-12 sm:py-16" aria-labelledby="try-heading">
          <h2 id="try-heading" className="text-2xl font-bold text-slate-950">从这三个操作开始</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">{steps.map((step, index) => <article key={step.title} className="border-t border-slate-300 pt-5"><span className="font-mono text-sm text-blue-700">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{step.body}</p></article>)}</div>
        </section>

      </div>
    </div>
  );
}
