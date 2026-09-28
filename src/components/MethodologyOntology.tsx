import React from "react";
import {
  Building2,
  Share2,
  Scale,
  Zap,
  ChevronDown,
  Plus,
  Repeat,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  Bot,
} from "lucide-react";
import { METHODOLOGY_DATA } from "@/data/methodology";

const FOUR_ICONS = [
  <Building2 key="o" className="w-4 h-4 text-blue-600" aria-hidden="true" />,
  <Share2 key="r" className="w-4 h-4 text-sky-600" aria-hidden="true" />,
  <Scale key="u" className="w-4 h-4 text-indigo-600" aria-hidden="true" />,
  <Zap key="a" className="w-4 h-4 text-amber-600" aria-hidden="true" />,
];

function ChainConnector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="true">
      <span className="block w-px h-5 bg-slate-200" />
      <ChevronDown className="w-4 h-4 text-blue-400 -my-0.5" strokeWidth={2.5} />
      {label ? (
        <span className="mt-1 text-[10px] font-mono text-slate-400 tracking-wide">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/**
 * 企业本体基础区：定义 + 四要素 + 主链路 + Workspace/Context 辨析 + 上下文编译关系。
 * 纯静态语义 HTML，无常驻动画，移动端纵向可读。
 */
export function MethodologyOntologyFoundation() {
  return (
    <section
      id="ontology"
      aria-labelledby="ontology-heading"
      className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs"
    >
      <div className="max-w-3xl mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
          理解企业 · Enterprise Ontology
        </span>
        <h2
          id="ontology-heading"
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3"
        >
          先把企业怎么做事，说清楚
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          企业里的很多知识和规则，并不真正存在于软件里。它们散落在人的经验、文档、数据库、流程和历史做法中。
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2">
          Agent 要参与真实业务，首先需要理解企业里有什么、它们是什么关系、遵循什么规则，以及允许执行什么动作。
        </p>
        <p className="text-sm sm:text-base font-semibold text-blue-900 leading-relaxed mt-3">
          先让 AI 理解企业，再让它开始工作。
        </p>
      </div>

      {/* 本体定义：只保留一句 */}
      <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 mb-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
          <span className="text-sm font-bold text-blue-950">企业本体</span>
          <span className="font-mono text-[11px] text-blue-600">
            Enterprise Ontology
          </span>
        </div>
        <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
          把企业里的对象、关系、规则和动作，变成 Human 与 Agent
          都可以理解和执行的共同业务模型。
        </p>
        <p className="text-xs text-slate-600 leading-relaxed mt-2">
          这不是新增的功能模块，而是把 HAFlow
          已有的知识、工作空间、上下文、工作流、规则、Agent
          等能力，组织成一套统一的企业运行模型。
        </p>
      </div>

      {/* 四要素 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {METHODOLOGY_DATA.ontologyFour.map((item, idx) => (
          <div
            key={item.title}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:border-blue-200 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                {FOUR_ICONS[idx]}
                <h3 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <span className="font-mono text-[11px] text-slate-400 block mb-3">
                {item.titleEn}
              </span>
              <ul className="flex flex-wrap gap-1.5 mb-3">
                {item.examples.map((ex) => (
                  <li
                    key={ex}
                    className="px-2 py-1 rounded-lg text-[11px] font-medium bg-white text-slate-700 border border-slate-200/90"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 主链路：Ontology → 真实企业 → 回流本体 */}
      <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5 sm:p-8 mb-8">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 text-center">
          HAFlow 核心关系：从理解企业，到把事情做完
        </h3>
        <p className="font-mono text-[11px] text-slate-400 text-center mt-1 mb-6">
          ONTOLOGY → CONTEXT → WORKFLOW → HUMAN + AGENT → ACTION
        </p>
        <ol
          aria-label="从企业本体到真实业务结果的主链路"
          className="max-w-xl mx-auto"
        >
          {METHODOLOGY_DATA.ontologyFlow.map((step, idx) => {
            const isFirst = idx === 0;
            const isHumanAgent = step.name === "Human + Agent";
            return (
              <li key={step.nameEn}>
                {idx > 0 ? <ChainConnector /> : null}
                <div
                  className={`rounded-2xl border px-4 py-3.5 flex items-start gap-3 ${
                    isFirst
                      ? "bg-gradient-to-r from-blue-600 to-sky-600 border-blue-600 shadow-lg shadow-blue-500/25"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 mt-0.5 ${
                      isFirst
                        ? "bg-white/15 text-white border border-white/25"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span
                        className={`text-sm font-bold ${
                          isFirst ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {step.name}
                      </span>
                      <span
                        className={`font-mono text-[10px] ${
                          isFirst ? "text-blue-100" : "text-slate-400"
                        }`}
                      >
                        {step.nameEn}
                      </span>
                    </div>
                    <p
                      className={`text-xs leading-relaxed mt-0.5 ${
                        isFirst ? "text-blue-50" : "text-slate-600"
                      }`}
                    >
                      {step.desc}
                      <span
                        className={`ml-1.5 ${
                          isFirst ? "text-blue-100" : "text-blue-700"
                        } font-medium`}
                      >
                        · {step.note}
                      </span>
                    </p>
                    {isHumanAgent ? (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                          <UserCheck
                            className="w-3 h-3"
                            aria-hidden="true"
                          />
                          人：关键节点确认
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-blue-50 text-blue-800 border border-blue-200">
                          <Bot className="w-3 h-3" aria-hidden="true" />
                          Agent：分析 · 判断 · 执行
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
          <li>
            <ChainConnector label="受控回写 · 需人工确认" />
            <div className="rounded-2xl border border-dashed border-blue-300 bg-blue-50/50 px-4 py-3.5 flex items-start gap-3">
              <Repeat
                className="w-4 h-4 text-blue-600 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">
                  新的企业事实回流企业本体：
                </strong>
                真实结果沉淀为新的业务事实，经人工审核与验证后，成为后续所有任务共同使用的知识。
              </p>
            </div>
          </li>
        </ol>
      </div>

      {/* 本体 / Workspace / Context 辨析 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <h3 className="text-sm font-bold text-slate-900">企业本体</h3>
          <span className="font-mono text-[11px] text-slate-400 block mb-2">
            Enterprise Ontology
          </span>
          <p className="text-xs font-semibold text-blue-900 mb-2">
            企业长期稳定的模型
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {["客户", "项目", "报价", "合同", "规则", "动作"].map((t) => (
              <li
                key={t}
                className="px-2 py-1 rounded-lg text-[11px] bg-white text-slate-700 border border-slate-200/90"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <h3 className="text-sm font-bold text-slate-900">工作空间</h3>
          <span className="font-mono text-[11px] text-slate-400 block mb-2">
            Workspace
          </span>
          <p className="text-xs font-semibold text-blue-900 mb-2">
            当前正在发生的事情
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {[
              "客户：A 公司",
              "项目：ERP 升级",
              "当前任务：生成报价",
              "预算 · 沟通记录",
              "状态：报价准备中",
            ].map((t) => (
              <li
                key={t}
                className="px-2 py-1 rounded-lg text-[11px] bg-white text-slate-700 border border-slate-200/90"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200">
          <h3 className="text-sm font-bold text-slate-900">任务上下文</h3>
          <span className="font-mono text-[11px] text-blue-600 block mb-2">
            Context Pack
          </span>
          <p className="text-xs font-semibold text-blue-900 mb-2">
            当前任务真正需要知道什么
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            不是 Workspace 的全部内容，而是本次任务真正需要的对象、关系、规则、知识和动作。
          </p>
        </div>
      </div>

      {/* 上下文是怎么来的 */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 text-center">
          上下文是怎么来的
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed text-center max-w-2xl mx-auto mt-1 mb-5">
          HAFlow
          根据当前任务，从企业本体和工作空间中提取真正需要的信息，为
          Agent 生成本次任务的上下文。不是把企业所有资料一次性交给 AI。
        </p>
        <div
          role="list"
          aria-label="企业本体加工作空间加当前任务生成上下文"
          className="flex flex-col items-center gap-2 max-w-2xl mx-auto"
        >
          <div
            role="listitem"
            className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full"
          >
            <span className="w-full sm:w-auto text-center px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200">
              企业本体
            </span>
            <Plus
              className="w-4 h-4 text-slate-400 shrink-0"
              aria-hidden="true"
            />
            <span className="w-full sm:w-auto text-center px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200">
              工作空间
            </span>
            <Plus
              className="w-4 h-4 text-slate-400 shrink-0"
              aria-hidden="true"
            />
            <span className="w-full sm:w-auto text-center px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200">
              当前任务
            </span>
          </div>
          <div aria-hidden="true" className="flex flex-col items-center py-0.5">
            <span className="block w-px h-4 bg-slate-200" />
            <ChevronDown
              className="w-4 h-4 text-blue-400 -my-0.5"
              strokeWidth={2.5}
            />
          </div>
          <div
            role="listitem"
            className="w-full text-center px-3 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm"
          >
            上下文编译器 · Context Compiler
            <span className="block text-[11px] font-medium text-blue-100 mt-0.5">
              只提供当前真正需要的对象、关系、规则、知识和动作
            </span>
          </div>
          <div aria-hidden="true" className="flex flex-col items-center py-0.5">
            <span className="block w-px h-4 bg-slate-200" />
            <ChevronDown
              className="w-4 h-4 text-blue-400 -my-0.5"
              strokeWidth={2.5}
            />
          </div>
          <div
            role="listitem"
            className="w-full text-center px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200"
          >
            任务上下文 · Context Pack → Agent
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * 报价具体示例：让非技术客户第一次理解本体有什么用。
 */
export function MethodologyQuoteExample() {
  return (
    <section
      id="ontology-quote"
      aria-labelledby="ontology-quote-heading"
      className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs"
    >
      <div className="max-w-3xl mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
          具体例子 · Quotation Example
        </span>
        <h2
          id="ontology-quote-heading"
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3"
        >
          举个例子：一次报价是怎么完成的
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          本体听起来抽象，落到一次报价里，它就是下面这些早就存在的东西——只是第一次被组织到了一起。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
        {METHODOLOGY_DATA.quoteExampleCards.map((card) => (
          <div
            key={card.title}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80"
          >
            <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
            <span className="font-mono text-[11px] text-slate-400 block mb-3">
              {card.titleEn}
            </span>
            <ul className="space-y-1.5">
              {card.items.map((item) => (
                <li
                  key={item}
                  className="px-2.5 py-1.5 rounded-lg text-xs bg-white text-slate-700 border border-slate-200/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck
              className="w-4 h-4 text-amber-600"
              aria-hidden="true"
            />
            <h3 className="text-sm font-bold text-slate-900">规则</h3>
            <span className="font-mono text-[11px] text-slate-400">
              Rule / Policy
            </span>
          </div>
          <ul className="space-y-1.5">
            {METHODOLOGY_DATA.quoteExampleRules.map((r) => (
              <li
                key={r}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-800 border border-amber-200/70"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <h3 className="text-sm font-bold text-slate-900">动作</h3>
            <span className="font-mono text-[11px] text-slate-400">Action</span>
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {METHODOLOGY_DATA.quoteExampleActions.map((a) => (
              <li
                key={a}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-800 border border-emerald-200/70"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
        <h3 className="text-sm font-bold text-blue-950 mb-4">
          这一次报价的真实走向
        </h3>
        <ol
          aria-label="报价任务从需求到回写的十个步骤"
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          {METHODOLOGY_DATA.quoteExampleFlow.map((step, idx) => (
            <li
              key={step}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-blue-200/70"
            >
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="text-xs font-medium text-slate-800">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * 持续演化轻闭环：企业变化以后怎么办。不神化 AI，强调人工审核。
 */
export function MethodologyOntologyEvolve() {
  return (
    <section
      id="ontology-evolve"
      aria-labelledby="ontology-evolve-heading"
      className="scroll-mt-28 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs"
    >
      <div className="max-w-3xl mb-6">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
          持续演化 · Evolution
        </span>
        <h2
          id="ontology-evolve-heading"
          className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3"
        >
          企业每天都在变化，模型也应该变化
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          新的业务事实在每一次真实任务里产生，经人确认与验证后，才会成为后续所有任务共同使用的知识。
        </p>
      </div>

      <ol
        aria-label="从真实执行到本体更新的七个步骤"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mb-6"
      >
        {METHODOLOGY_DATA.ontologyEvolveSteps.map((step, idx) => {
          const needsHuman = step.name === "人工审核";
          return (
            <li
              key={step.nameEn}
              className={`p-4 rounded-2xl border flex flex-col justify-between ${
                needsHuman
                  ? "bg-amber-50/70 border-amber-200"
                  : "bg-slate-50 border-slate-200/80"
              }`}
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-600 block mb-1">
                  0{idx + 1}
                </span>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  {step.name}
                </p>
                <span className="font-mono text-[10px] text-slate-400 block mt-0.5">
                  {step.nameEn}
                </span>
              </div>
              {needsHuman ? (
                <span className="inline-flex items-center gap-1 mt-3 text-[11px] font-semibold text-amber-800">
                  <UserCheck className="w-3 h-3" aria-hidden="true" />
                  必须有人把关
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-start gap-2.5">
        <CheckCircle2
          className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          HAFlow
          可以在真实任务中发现新的业务知识，但企业规则的改变不会由 Agent
          擅自决定。
          <strong className="text-slate-900">
            重要的企业定义需要经过确认、验证后，才能成为后续所有任务共同使用的知识。
          </strong>
        </p>
      </div>
    </section>
  );
}
