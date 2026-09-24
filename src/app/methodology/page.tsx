import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Workflow,
  ShieldCheck,
  Cpu,
  GraduationCap,
  FolderGit2,
  Brain,
  Clock,
  Users,
  Server,
  BookOpen,
  Compass,
  Scale,
  CheckSquare,
  BrainCircuit,
  Zap,
  Quote,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { METHODOLOGY_DATA } from "@/data/methodology";
import { MethodologyEvolutionLoop } from "@/components/MethodologyEvolutionLoop";
import { MethodologyChapterNav } from "@/components/MethodologyChapterNav";
import { MethodologyTaskVisual } from "@/components/MethodologyTaskVisual";
import { TrainingBookingForm } from "@/components/TrainingBookingForm";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/methodology",
  title: "共事方法论_人机协同系统实施方法_HAFlow工程底座",
  description:
    "共事方法论（Human + Agent Co-Execution Method）：我们不从‘做什么软件’开始，而从‘这件事到底是怎么被完成的’开始。以 Task 为企业 AI 最小单位，和客户一起建立人 + Agent 持续完成工作的系统。",
  keywords: [
    "共事方法论",
    "Human + Agent Co-Execution Method",
    "HAFlow",
    "人机协同方法论",
    "企业AI最小单位",
    "AI应用实施方法",
    "多Agent协同",
    "共事智能",
  ],
});

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "共事方法论" }]} />

        {/* 1. HERO SECTION */}
        <section className="py-2 lg:py-4 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Manifesto & Editorial Lead */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-blue-50/90 text-blue-900 border border-blue-200/80 shadow-2xs text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="font-bold">共事方法论</span>
                <span className="text-slate-300">|</span>
                <span className="text-blue-700 font-medium">Human + Agent Co-Execution Method</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.16]">
                不是先做系统，
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600">
                  而是先把事情做成
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                传统企业软件通常从一张功能清单开始：需要哪些菜单、表单、审批流程与报表？最后得到一套软件，但事情并没有真正变简单。
                共事智能采用完全不同的路径：以 <strong className="text-slate-900 font-bold underline decoration-blue-300 decoration-2 underline-offset-4">Task（一件可验证结果的事）</strong> 为思考原点，让 Agent 深度参与执行，让人专注目标与关键裁决。
              </p>

              {/* High-End Editorial Brand Quote */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 shadow-2xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-700 font-bold">
                  <Quote className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>共事方法论核心信条</span>
                </div>
                <blockquote className="text-lg sm:text-xl font-black text-slate-950 leading-snug tracking-tight">
                  我们不从“做什么软件”开始，
                  <br className="hidden sm:inline" />
                  而从“这件事到底是怎么被完成的”开始。
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  不是交付一个静态软件，而是与企业共同建立一套人机协同生产系统。HAFlow 作为方法论的技术载体，让不同 Agent、领域知识与人在同一流中协同闭环。
                </p>
              </div>

              {/* Action Buttons & Value Anchor Badges */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#c01"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    <span>浏览 8 大实施章节</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#evolution-loop"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white hover:bg-blue-50/60 text-slate-700 hover:text-blue-700 border border-slate-200 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs"
                  >
                    <span>体验 7 步演化闭环</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    以 Task 为思考原点
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    人机同流分级裁决
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    过程沉淀为企业数字资产
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Paradigm Shift Interactive Visual */}
            <div className="lg:col-span-5 w-full">
              <MethodologyTaskVisual />
            </div>
          </div>

          {/* Hero 4 Highlights Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {METHODOLOGY_DATA.heroHighlights.map((h, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                  {h.label}
                </span>
                <div className="text-base sm:text-lg font-bold text-slate-950 mb-0.5 leading-snug">
                  {h.value}
                </div>
                <span className="text-xs text-blue-700 font-medium">
                  {h.sub}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* STICKY CHAPTER NAVIGATOR */}
        <MethodologyChapterNav />

        {/* 2. CONTRAST OF PAIN POINTS - 为什么传统做系统不管用 */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              问题溯源
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              很多企业真正的问题，从来不是“缺少一个页面”
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              为什么上了很多套 ERP、CRM、OA 之后，一线员工依然每天焦头烂额？因为复杂业务真正卡住的地方，根本不是界面。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-slate-100/50 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  <FolderGit2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">信息散落多处</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  合同在邮件、价格在表格、单据在微信、历史记录在老系统，无法自动穿透联动。
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-4 block">01 / 孤岛困境</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-slate-100/50 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">规则藏在脑子里</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  何时折让、哪家供应商靠谱、哪项合规有隐患，只存在于资深老员工的直觉经验中。
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-4 block">02 / 经验隐性化</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-slate-100/50 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">反复人工判断</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  每单业务都需人工反复肉眼对账、逐条清标、比选航线，高耗时且极易因疲倦出错。
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-4 block">03 / 机械重复</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-slate-100/50 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">传递摩擦与衰减</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  业务口头告诉助理，助理整理后交财务，人与人之间不断倒腾上下文，极易失真。
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-4 block">04 / 上下文断层</span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-slate-100/50 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center mb-3">
                  <Server className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">系统并未真正参与</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  现有软件只是冷冰冰地记录了数据，但所有繁杂的推演和执行依然全靠人工手动完成。
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-4 block">05 / 哑铃型脱节</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-sm text-slate-800">
              <strong className="text-blue-900">转变从提问开始：</strong>
              传统问“你想做一个什么系统？”，共事先问
              <span className="text-blue-700 font-bold ml-1">
                “这件事情今天到底是怎么被完成的？”
              </span>
            </div>
            <Link
              href="/diagnose"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              <span>提交你的业务痛点诊断</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 3. MINIMUM UNIT OF ENTERPRISE AI MANIFESTO & PARADIGM COMPARISON */}
        <section className="bg-gradient-to-r from-blue-50 via-sky-50/40 to-blue-50 rounded-3xl border border-blue-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-white px-3.5 py-1 rounded-full border border-blue-200 inline-block shadow-2xs">
              企业 AI 核心概念 · Minimum Viable Unit
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-snug">
              “{METHODOLOGY_DATA.minUnitQuote}”
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto pt-2">
              这套内容和传统 IT 实施方法论最大的区别，不是换了一套名词，而是<strong>基本单位变了</strong>。
              传统方法的基本单位是“功能/模块/流程”，共事的基本单位是 <strong>Task —— 一件需要被完成的事</strong>。
              传统项目管理的是需求和交付，我们管理的是 <strong>目标、上下文、执行、证据和持续改进</strong>。
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90 text-slate-700 font-semibold">
                  <th className="py-3.5 px-6 w-1/4">对比维度</th>
                  <th className="py-3.5 px-6 w-3/8 text-slate-500">传统企业软件思维</th>
                  <th className="py-3.5 px-6 w-3/8 text-blue-800 font-bold bg-blue-50/60">
                    共事方法论思维 (Human + Agent)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {METHODOLOGY_DATA.paradigmComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 font-mono text-xs">
                      {row.dimension}
                    </td>
                    <td className="py-4 px-6 text-slate-600 leading-relaxed">
                      {row.traditional}
                    </td>
                    <td className="py-4 px-6 text-slate-900 font-medium bg-blue-50/30 leading-relaxed">
                      <span className="font-semibold text-blue-900">{row.gongshi}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-based View (Eliminates horizontal scrolling) */}
          <div className="mt-8 md:hidden space-y-4">
            {METHODOLOGY_DATA.paradigmComparison.map((row, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {row.dimension}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400 block">传统思维：</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{row.traditional}</p>
                </div>
                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-1">
                  <span className="text-[11px] font-mono text-blue-700 font-bold block">
                    共事方法论：
                  </span>
                  <p className="text-xs font-semibold text-blue-950 leading-relaxed">
                    {row.gongshi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. THE CONTINUOUS EVOLUTION LOOP (DIAGRAM COMPONENT) */}
        <MethodologyEvolutionLoop />

        {/* 5. EIGHT CORE CHAPTERS (01 - 08) */}
        <section className="space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              深度解析 · 8大核心支柱
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950">
              共事方法论的落地工程细节
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              从解构一件业务任务，到把经验结构化，再到 Agent 执行与分级人机边界，步步扎实，有迹可循。
            </p>
          </div>

          <div className="space-y-6">
            {/* Chapter 01 */}
            <div
              id="c01"
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl font-mono font-black text-slate-100 pointer-events-none select-none">
                01
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  第 01 章
                </span>
                <span className="text-xs text-slate-400 font-mono">TASK ORIENTED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 relative z-10">
                {METHODOLOGY_DATA.chapters[0].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-700 font-semibold mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[0].tagline}
              </p>

              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[0].leadParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Concrete Task Examples */}
              <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 relative z-10">
                <span className="text-xs font-mono text-slate-500 font-bold block mb-3 uppercase tracking-wider">
                  典型任务形态（这不是一个功能，而是一件完整做完的事）：
                </span>
                <div className="flex flex-wrap gap-2">
                  {METHODOLOGY_DATA.chapters[0].examples?.map((ex, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-800 border border-slate-200/90 shadow-2xs hover:border-blue-300 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{ex}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* 5 Core Questions */}
              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 relative z-10">
                <span className="text-xs font-mono font-bold text-blue-900 block mb-3 uppercase tracking-wider">
                  共事在每个项目起点的五个核心追问：
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  {METHODOLOGY_DATA.chapters[0].questions?.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-200/80 text-blue-900 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{q}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-blue-200/80 text-xs text-blue-950 font-semibold">
                  {METHODOLOGY_DATA.chapters[0].callout}
                </div>
              </div>
            </div>

            {/* Chapter 02 */}
            <div
              id="c02"
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl font-mono font-black text-slate-100 pointer-events-none select-none">
                02
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  第 02 章
                </span>
                <span className="text-xs text-slate-400 font-mono">EXPERIENCE STRUCTURE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 relative z-10">
                {METHODOLOGY_DATA.chapters[1].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-700 font-semibold mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[1].tagline}
              </p>

              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[1].leadParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* 6 Structural Elements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[1].keyPoints?.map((item, idx) => {
                  const icons = [
                    <BookOpen key="0" className="w-4 h-4 text-blue-600" />,
                    <Compass key="1" className="w-4 h-4 text-sky-600" />,
                    <Scale key="2" className="w-4 h-4 text-indigo-600" />,
                    <CheckSquare key="3" className="w-4 h-4 text-teal-600" />,
                    <BrainCircuit key="4" className="w-4 h-4 text-violet-600" />,
                    <Zap key="5" className="w-4 h-4 text-amber-600" />,
                  ];
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-200 hover:shadow-2xs transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        {icons[idx]}
                        <span className="text-xs font-bold text-slate-900 block">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 font-semibold relative z-10">
                {METHODOLOGY_DATA.chapters[1].callout}
              </div>
            </div>

            {/* Chapter 03 */}
            <div
              id="c03"
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl font-mono font-black text-slate-100 pointer-events-none select-none">
                03
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  第 03 章
                </span>
                <span className="text-xs text-slate-400 font-mono">CONTINUOUS VERIFICATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 relative z-10">
                {METHODOLOGY_DATA.chapters[2].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-700 font-semibold mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[2].tagline}
              </p>

              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[2].leadParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* 5 Cycles Horizontal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[2].keyPoints?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:border-blue-200 transition-colors"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-600 block mb-1">
                        阶段 0{idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 leading-relaxed font-medium relative z-10">
                {METHODOLOGY_DATA.chapters[2].callout}
              </div>
            </div>

            {/* Chapter 04 */}
            <div
              id="c04"
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl font-mono font-black text-slate-100 pointer-events-none select-none">
                04
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  第 04 章
                </span>
                <span className="text-xs text-slate-400 font-mono">AGENT AS ACTOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 relative z-10">
                {METHODOLOGY_DATA.chapters[3].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-700 font-semibold mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[3].tagline}
              </p>

              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[3].leadParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[3].keyPoints?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-200 transition-colors"
                  >
                    <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 font-semibold relative z-10">
                {METHODOLOGY_DATA.chapters[3].callout}
              </div>
            </div>

            {/* Chapter 05 */}
            <div
              id="c05"
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl font-mono font-black text-slate-100 pointer-events-none select-none">
                05
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  第 05 章
                </span>
                <span className="text-xs text-slate-400 font-mono">HUMAN IN FLOW</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 relative z-10">
                {METHODOLOGY_DATA.chapters[4].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-700 font-semibold mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[4].tagline}
              </p>

              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[4].leadParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* 3 Tier Boundaries */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[4].keyPoints?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:border-blue-200 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                          Level 0{idx + 1}
                        </span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 font-semibold relative z-10">
                {METHODOLOGY_DATA.chapters[4].callout}
              </div>
            </div>

            {/* Chapter 06 */}
            <div
              id="c06"
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl font-mono font-black text-slate-100 pointer-events-none select-none">
                06
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  第 06 章
                </span>
                <span className="text-xs text-slate-400 font-mono">HAFLOW EXECUTION ENGINE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 relative z-10">
                {METHODOLOGY_DATA.chapters[5].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-700 font-semibold mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[5].tagline}
              </p>

              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[5].leadParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[5].keyPoints?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-200 transition-colors"
                  >
                    <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-blue-600" />
                      <span>{item.title}</span>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-blue-950 relative z-10">
                <span className="font-semibold">{METHODOLOGY_DATA.chapters[5].callout}</span>
                <Link
                  href="/haflow"
                  className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-800 shrink-0 cursor-pointer"
                >
                  <span>探索 HAFlow 架构与能力</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Chapter 07 */}
            <div
              id="c07"
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl font-mono font-black text-slate-100 pointer-events-none select-none">
                07
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  第 07 章
                </span>
                <span className="text-xs text-slate-400 font-mono">START REAL</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 relative z-10">
                {METHODOLOGY_DATA.chapters[6].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-700 font-semibold mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[6].tagline}
              </p>

              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[6].leadParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[6].keyPoints?.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-blue-200 transition-colors"
                  >
                    <span className="text-xs font-mono font-bold text-blue-600 block mb-1">
                      阶段 0{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 font-semibold relative z-10">
                {METHODOLOGY_DATA.chapters[6].callout}
              </div>
            </div>

            {/* Chapter 08 */}
            <div
              id="c08"
              className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs relative overflow-hidden"
            >
              <div className="absolute right-4 top-4 text-7xl font-mono font-black text-slate-100 pointer-events-none select-none">
                08
              </div>
              <div className="flex items-center gap-3 mb-4 relative z-10">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800">
                  第 08 章
                </span>
                <span className="text-xs text-slate-400 font-mono">DIGITAL ASSETS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2 relative z-10">
                {METHODOLOGY_DATA.chapters[7].title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-700 font-semibold mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[7].tagline}
              </p>

              <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
                {METHODOLOGY_DATA.chapters[7].leadParagraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* 8 Deliverable Assets */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 relative z-10">
                <span className="text-xs font-mono text-slate-500 font-bold block mb-4 uppercase tracking-wider">
                  共事项目交付沉淀在客户手中的 8 大永久数字资产：
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {METHODOLOGY_DATA.chapters[7].deliverables?.map((asset, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 flex items-start gap-2 shadow-2xs hover:border-emerald-300 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{asset}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 font-semibold relative z-10">
                {METHODOLOGY_DATA.chapters[7].callout}
              </div>
            </div>
          </div>
        </section>

        {/* 6. SIX BASIC PRINCIPLES */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              价值准则
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              共事智能的基本原则
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              不追求酷炫的演示，一切以真实业务落地与客观效果为唯一衡量标尺。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {METHODOLOGY_DATA.principles.map((p) => (
              <div
                key={p.num}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:border-blue-200 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold flex items-center justify-center text-xs mb-4">
                    {p.num}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. TRAINING IN METHODOLOGY (CLARIFICATION SECTION) */}
        <section id="training" className="scroll-mt-28 bg-blue-50/50 rounded-3xl border border-blue-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-blue-700 border border-blue-200 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>能力沉淀与组织带练</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                {METHODOLOGY_DATA.trainingRole.title}
              </h2>

              <p className="text-sm sm:text-base font-semibold text-blue-900">
                “{METHODOLOGY_DATA.trainingRole.subtitle}”
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {METHODOLOGY_DATA.trainingRole.content}
              </p>

              <div className="p-4 rounded-xl bg-white border border-blue-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {METHODOLOGY_DATA.trainingRole.whyFree}
              </div>
            </div>

            <div className="w-full lg:w-80 shrink-0 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  每月4场公益公开课
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  面向零基础业务人员与开发者
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  每周日上午 11:00，每次 40 分钟带练一个具体任务，完全免费。
                </p>
              </div>

              <a
                href="#booking"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span>立即在线预约本周课</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Embedded Training Booking Form */}
          <div className="pt-4 border-t border-blue-100">
            <TrainingBookingForm />
          </div>
        </section>

        {/* 8. FINAL VISION & ACTION CALLOUT */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block">
              展望 · The Future of Work
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight">
              最终，我们想做的事情其实很简单
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left my-6">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-mono text-slate-400 font-bold block mb-1">过去三十年</span>
                <p className="text-sm font-semibold text-slate-800">
                  企业管理软件主要在回答一个问题：
                  <br />
                  <strong className="text-slate-900">“如何让人更好地使用系统？”</strong>
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <span className="text-xs font-mono text-blue-700 font-bold block mb-1">未来企业软件</span>
                <p className="text-sm font-semibold text-blue-950">
                  AI 到来以后，核心问题正在变成：
                  <br />
                  <strong className="text-blue-900">“如何让人、Agent 和已有系统一起，把事情做完？”</strong>
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 inline-block">
              <p className="text-base sm:text-lg font-extrabold text-slate-950">
                {METHODOLOGY_DATA.finalVisionSub}
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/diagnose"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span>提交真实业务问题进行诊断</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/haflow"
                className="w-full sm:w-auto inline-flex items-center justify-center py-3 px-6 text-sm font-semibold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/70 rounded-full border border-blue-200 transition-colors cursor-pointer"
              >
                <span>了解 HAFlow 执行底座</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
