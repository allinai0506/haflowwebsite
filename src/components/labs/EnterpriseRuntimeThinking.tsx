import { Fragment, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowRight } from "lucide-react";
import { ENTERPRISE_MODEL, EVOLUTION, THINKING_INTRODUCTION, THINKING_SECTIONS, THINKING_TITLE } from "@/data/enterprise-runtime-thinking";

function InlineText({ text }: { text: string }) {
  const result: ReactNode[] = [];
  const links = /\[([^\]]+)\]\((https:\/\/[^)]+)\)/g;
  let offset = 0;
  for (const match of text.matchAll(links)) {
    result.push(text.slice(offset, match.index));
    result.push(<a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline decoration-blue-200 underline-offset-4 hover:decoration-blue-600">{match[1]}</a>);
    offset = match.index! + match[0].length;
  }
  result.push(text.slice(offset));
  return <>{result}</>;
}

function ApprovalComparison() {
  return <figure className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
    <figcaption className="mb-6 font-semibold text-slate-900">从审批驱动，到授权 + 事件驱动</figcaption>
    <div className="grid gap-6 sm:grid-cols-2">{[
      { title: "传统 OA：审批驱动", steps: ["员工申请", "领导审批", "业务执行", "形成记录"] },
      { title: "新模式：授权 + 事件驱动", steps: ["事先授权", "业务直接执行", "自动生成台账"] },
    ].map((flow, column) => <div key={flow.title} className="rounded-xl border border-slate-200 bg-white p-4"><p className={`mb-4 text-sm font-semibold ${column ? "text-blue-700" : "text-slate-600"}`}>{flow.title}</p><ol className="space-y-3">{flow.steps.map((step, index) => <li key={step} className="flex items-center gap-3 text-sm"><span className="font-mono text-xs text-slate-400">0{index + 1}</span>{step}{index < flow.steps.length - 1 && <ArrowDown size={14} className="ml-auto text-blue-500" aria-hidden="true" />}</li>)}</ol>{column === 1 && <div className="mt-5 border-t border-blue-100 pt-4 text-xs leading-6 text-blue-800"><p>系统持续检查风险和异常</p><p>正常业务自动放行，超出授权的业务再进入人工决策</p></div>}</div>)}</div>
  </figure>;
}

function GoalExecution() {
  return <figure className="my-8 rounded-2xl border border-blue-200 bg-blue-50/50 p-5 sm:p-7">
    <figcaption className="mb-5 font-semibold text-slate-900">目标驱动的动态执行</figcaption>
    <div className="space-y-4 text-center">
      <div className="rounded-xl border border-blue-200 bg-white p-4"><p className="text-xs text-blue-700">人的目标</p><p className="mt-1 font-semibold">完成 A 客户报价</p></div>
      <ArrowDown className="mx-auto text-blue-500" size={18} aria-hidden="true" />
      <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-semibold">理解业务上下文</p><p className="mt-2 text-xs leading-6 text-slate-500">客户情况 · 产品信息 · 预算 · 授权 · 业务规则</p></div>
      <ArrowDown className="mx-auto text-blue-500" size={18} aria-hidden="true" />
      <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="font-semibold">动态工作流编排</p><div className="my-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">{["查询客户信用", "核算产品成本", "生成报价方案", "校验政策与授权"].map((task) => <div key={task} className="rounded-lg bg-blue-50 px-2 py-3 text-blue-800">{task}</div>)}</div><p className="text-xs leading-6 text-slate-500">Agent 与业务系统按依赖关系协同执行</p></div>
      <ArrowDown className="mx-auto text-blue-500" size={18} aria-hidden="true" />
      <div className="grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-blue-200 bg-white p-4"><p className="text-xs text-blue-700">符合授权</p><p className="mt-2 font-semibold">自动完成报价</p></div><div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs text-slate-500">需要例外决策</p><p className="mt-2 font-semibold">交给有权负责人</p></div></div>
      <ArrowDown className="mx-auto text-blue-500" size={18} aria-hidden="true" />
      <div className="rounded-xl border border-blue-200 bg-white p-4"><p className="font-semibold">业务完成 + 自动形成证据台账</p><p className="mt-2 text-xs leading-6 text-slate-500">保留执行过程、决策依据、授权版本和责任人</p></div>
    </div>
  </figure>;
}

function EvolutionTimeline() {
  return <figure className="my-8">
    <figcaption className="mb-6 text-sm font-semibold text-blue-700">一种可能的演化路径 · 作者推演</figcaption>
    <ol className="border-l border-blue-200 pl-5 sm:pl-7">{EVOLUTION.map((stage) => <li key={stage.year} className="relative pb-8 last:pb-0"><span className="absolute -left-[25px] top-2 h-2 w-2 rounded-full bg-blue-600 sm:-left-[33px]" aria-hidden="true" /><div className="flex items-baseline gap-3"><span className="font-mono text-2xl font-semibold text-blue-700">{stage.year}</span><span className="text-xs text-slate-500">{stage.period}</span></div><p className="mt-2 text-lg font-semibold text-slate-900">{stage.title}</p><p className="mt-3 text-sm leading-7 text-slate-600">{stage.body}</p></li>)}</ol>
  </figure>;
}

function EnterpriseModel() {
  return <figure className="my-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
    <figcaption className="font-semibold text-slate-900">企业运行模型</figcaption><p className="mt-2 text-sm leading-7 text-slate-500">不再从审批表单出发，而从真实的企业业务出发</p>
    <div className="mt-6 space-y-3">{ENTERPRISE_MODEL.map((item, index) => <div key={item.en} className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4"><span className="pt-1 font-mono text-xs text-blue-600">0{index + 1}</span><div><p className="text-sm font-semibold text-slate-900">{item.title}<span className="ml-2 font-mono text-xs font-normal text-slate-500">{item.en}</span></p><p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p></div></div>)}</div>
    <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 p-4"><p className="text-sm font-semibold text-blue-800">全过程证据与责任记录</p><p className="mt-2 text-sm leading-7 text-slate-600">贯穿以上所有对象，支持追溯、审计和纠偏</p></div>
  </figure>;
}

/** 本篇稿件只使用段落、引用、列表、表格、链接和小标题；不执行 HTML。 */
function ThinkingBody({ text }: { text: string }) {
  return <div className="space-y-5 text-sm leading-8 text-slate-700 sm:text-base">{text.split(/\n\s*\n/).map((block, index) => {
    if (block === "[diagram:approval]") return <ApprovalComparison key={index} />;
    if (block === "[diagram:goal]") return <GoalExecution key={index} />;
    if (block === "[timeline:evolution]") return <EvolutionTimeline key={index} />;
    if (block === "[model:enterprise]") return <EnterpriseModel key={index} />;
    if (block.startsWith("### ")) return <h4 key={index} className="pt-6 text-lg font-semibold leading-8 text-slate-950 sm:text-xl">{block.slice(4)}</h4>;
    if (block.startsWith("> ")) return <blockquote key={index} className="border-l-2 border-blue-600 bg-blue-50/60 px-5 py-4 font-medium text-slate-900"><InlineText text={block.slice(2)} /></blockquote>;
    if (block.startsWith("- ")) return <ul key={index} className="list-disc space-y-2 pl-5 marker:text-blue-500">{block.split("\n").map((item) => <li key={item}><InlineText text={item.slice(2)} /></li>)}</ul>;
    if (block.startsWith("|")) {
      const rows = block.split("\n").filter((row) => !/^\|[\s|:-]+\|$/.test(row)).map((row) => row.slice(1, -1).split("|").map((cell) => cell.trim()));
      return <div key={index} role="region" aria-label={`${rows[0].join("与")}对照表`} tabIndex={0} className="overflow-x-auto rounded-xl border border-slate-200 focus-visible:outline-2 focus-visible:outline-blue-600"><table className="w-full min-w-[520px] border-collapse text-left text-sm leading-7"><caption className="sr-only">{rows[0].join("与")}对照表</caption><thead className="bg-blue-50"><tr>{rows[0].map((cell) => <th key={cell} scope="col" className="px-4 py-3 font-semibold text-slate-900">{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={rowIndex} className="border-t border-slate-200">{row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 align-top">{cell}</td>)}</tr>)}</tbody></table></div>;
    }
    return <p key={index}><InlineText text={block} /></p>;
  })}</div>;
}

export function EnterpriseRuntimeThinking() {
  return <article id="design-thinking" className="scroll-mt-24 border-t border-slate-200 py-12 sm:py-16" aria-labelledby="thinking-heading">
    <div className="mb-10 max-w-4xl"><p className="text-xs font-mono tracking-widest text-blue-700">设计思考 / 从管理人，到帮助组织完成工作</p><h2 id="thinking-heading" className="mt-4 text-2xl font-bold leading-snug tracking-tight text-slate-950 sm:text-4xl">{THINKING_TITLE}</h2><p className="mt-5 text-sm leading-7 text-slate-500">共事智能 · HAFlow 实验室 / 2026.10.14</p></div>
    <div className="grid items-start gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <aside className="min-w-0 lg:sticky lg:top-24"><nav aria-label="设计思考阅读目录" className="rounded-2xl border border-slate-200 bg-white p-5"><p className="mb-3 text-xs font-semibold text-slate-500">阅读全文</p><ol className="space-y-1">{THINKING_SECTIONS.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="flex min-h-11 items-start gap-3 rounded-lg px-2 py-2 text-xs leading-6 text-slate-600 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-blue-600"><span className="font-mono text-blue-600">0{index + 1}</span><span>{section.title.replace(/^[一二三四五六七八九]、/, "")}</span></a></li>)}</ol><a href="#experience" className="mt-4 flex min-h-11 items-center gap-2 border-t border-slate-200 pt-4 text-sm font-semibold text-blue-700">对照思考，体验原型 <ArrowRight size={16} aria-hidden="true" /></a></nav></aside>
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 lg:p-10">
        <ThinkingBody text={THINKING_INTRODUCTION} />
        {THINKING_SECTIONS.map((section) => <Fragment key={section.id}><section id={section.id} className="scroll-mt-24 border-t border-slate-200 pt-10 mt-10" aria-labelledby={`${section.id}-heading`}><h3 id={`${section.id}-heading`} className="mb-6 text-xl font-bold leading-9 text-slate-950 sm:text-2xl">{section.title}</h3><ThinkingBody text={section.body} /></section></Fragment>)}
        <div className="mt-10 border-t border-slate-200 pt-8"><p className="text-sm leading-7 text-slate-500">页面上方的交互原型，是对这篇思考的一个界面层验证。业务与执行均为模拟数据。</p><a href="#experience" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue-700">返回上方原型体验 <ArrowUp size={16} aria-hidden="true" /></a></div>
      </div>
    </div>
  </article>;
}
