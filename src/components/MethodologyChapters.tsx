"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Compass,
  Cpu,
  Scale,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { METHODOLOGY_DATA } from "@/data/methodology";

export const CHAPTER_OPEN_EVENT = "methodology:open-chapter";

/** 打开指定章节（存在则展开）并平滑滚动到其头部。章节与普通锚点均可传入。 */
export function gotoMethodologyChapter(id: string) {
  window.dispatchEvent(new CustomEvent(CHAPTER_OPEN_EVENT, { detail: id }));
  window.setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
    const btn = document.getElementById(`${id}-button`);
    if (btn) btn.focus({ preventScroll: true });
  }, 80);
}

const CHAPTER_EN_LABEL: Record<string, string> = {
  c01: "TASK ORIENTED",
  c02: "ENTERPRISE ONTOLOGY",
  c03: "CONTINUOUS VERIFICATION",
  c04: "AGENT AS ACTOR",
  c05: "HUMAN IN FLOW",
  c06: "HAFLOW EXECUTION ENGINE",
  c07: "START REAL",
  c08: "DIGITAL ASSETS",
};

const CHAPTER_GRID: Record<string, string> = {
  c02: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  c03: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  c04: "grid-cols-1 sm:grid-cols-2",
  c05: "grid-cols-1 sm:grid-cols-3",
  c06: "grid-cols-1 sm:grid-cols-2",
  c07: "grid-cols-1 sm:grid-cols-3",
};

const C02_ICONS = [
  <BookOpen key="0" className="w-4 h-4 text-blue-600" aria-hidden="true" />,
  <Compass key="1" className="w-4 h-4 text-sky-600" aria-hidden="true" />,
  <Scale key="2" className="w-4 h-4 text-indigo-600" aria-hidden="true" />,
  <CheckSquare key="3" className="w-4 h-4 text-teal-600" aria-hidden="true" />,
  <BrainCircuit key="4" className="w-4 h-4 text-violet-600" aria-hidden="true" />,
  <Zap key="5" className="w-4 h-4 text-amber-600" aria-hidden="true" />,
];

function KeyPointCard({
  title,
  desc,
  eyebrow,
  icon,
}: {
  title: string;
  desc: string;
  eyebrow?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
      {eyebrow}
      <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </h4>
      <p className="text-xs text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function Callout({
  children,
  link,
}: {
  children: React.ReactNode;
  link?: { href: string; label: string; external?: boolean };
}) {
  return (
    <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs sm:text-sm text-blue-950 font-semibold">
      {children}
      {link ? (
        link.external ? (
          <Link
            href={link.href}
            className="mt-2 inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
          >
            <span>{link.label}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        ) : (
          <a
            href={link.href}
            className="mt-2 inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-800 cursor-pointer"
          >
            <span>{link.label}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        )
      ) : null}
    </div>
  );
}

function ChapterBody({ index }: { index: number }) {
  const chapter = METHODOLOGY_DATA.chapters[index];

  if (index === 0) {
    return (
      <>
        <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-xs font-mono text-slate-500 font-bold block mb-3 uppercase tracking-wider">
            典型任务形态（这不是一个功能，而是一件完整做完的事）：
          </span>
          <div className="flex flex-wrap gap-2">
            {chapter.examples?.map((ex, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-800 border border-slate-200/90 shadow-2xs"
              >
                <CheckCircle2
                  className="w-3.5 h-3.5 text-blue-600 shrink-0"
                  aria-hidden="true"
                />
                <span>{ex}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200">
          <span className="text-xs font-mono font-bold text-blue-900 block mb-3 uppercase tracking-wider">
            共事在每个项目起点的五个核心追问：
          </span>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {chapter.questions?.map((q, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-200/80 text-blue-900 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{q}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-blue-200/80 text-xs text-blue-950 font-semibold">
            {chapter.callout}
          </div>
        </div>
      </>
    );
  }

  if (index === 1) {
    return (
      <>
        <div className={`grid gap-4 mb-6 ${CHAPTER_GRID.c02}`}>
          {chapter.keyPoints?.map((item, idx) => (
            <KeyPointCard
              key={idx}
              title={item.title}
              desc={item.desc}
              icon={C02_ICONS[idx]}
            />
          ))}
        </div>
        <Callout link={{ href: "#ontology", label: "查看企业本体四要素与核心关系图" }}>
          {chapter.callout}
        </Callout>
      </>
    );
  }

  if (index === 2 || index === 6) {
    const grid = index === 2 ? CHAPTER_GRID.c03 : CHAPTER_GRID.c07;
    return (
      <>
        <div className={`grid gap-3 mb-6 ${grid}`}>
          {chapter.keyPoints?.map((item, idx) => (
            <KeyPointCard
              key={idx}
              title={item.title}
              desc={item.desc}
              eyebrow={
                <span className="text-xs font-mono font-bold text-blue-600 block mb-1">
                  阶段 0{idx + 1}
                </span>
              }
            />
          ))}
        </div>
        <Callout>{chapter.callout}</Callout>
      </>
    );
  }

  if (index === 3) {
    return (
      <>
        <div className={`grid gap-4 mb-6 ${CHAPTER_GRID.c04}`}>
          {chapter.keyPoints?.map((item, idx) => (
            <KeyPointCard
              key={idx}
              title={item.title}
              desc={item.desc}
              icon={<Cpu className="w-4 h-4 text-blue-600" aria-hidden="true" />}
            />
          ))}
        </div>
        <Callout>{chapter.callout}</Callout>
      </>
    );
  }

  if (index === 4) {
    return (
      <>
        <div className={`grid gap-4 mb-6 ${CHAPTER_GRID.c05}`}>
          {chapter.keyPoints?.map((item, idx) => (
            <KeyPointCard
              key={idx}
              title={item.title}
              desc={item.desc}
              eyebrow={
                <span className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                    Level 0{idx + 1}
                  </span>
                  <ShieldCheck
                    className="w-4 h-4 text-emerald-600"
                    aria-hidden="true"
                  />
                </span>
              }
            />
          ))}
        </div>
        <Callout>{chapter.callout}</Callout>
      </>
    );
  }

  if (index === 5) {
    return (
      <>
        <div className={`grid gap-4 mb-6 ${CHAPTER_GRID.c06}`}>
          {chapter.keyPoints?.map((item, idx) => (
            <KeyPointCard
              key={idx}
              title={item.title}
              desc={item.desc}
              icon={
                <Workflow className="w-4 h-4 text-blue-600" aria-hidden="true" />
              }
            />
          ))}
        </div>
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-4">
          <h4 className="text-sm font-bold text-slate-900 mb-2">
            本体与工作流各回答什么问题
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            企业本体回答<strong className="text-slate-900">企业是什么、允许发生什么</strong>：对象
            / 关系 / 规则 / 动作；工作流回答
            <strong className="text-slate-900">这一次事情应该怎样完成</strong>：这次任务先做什么、后做什么、由谁做、需要什么上下文、如何验收。
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
            工作流不是传统审批流。流程结束 ≠ 审批完成，
            <strong className="text-blue-900">流程结束 = 事情真正做完</strong>。
          </p>
        </div>
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-blue-950">
          <span className="font-semibold">{chapter.callout}</span>
          <Link
            href="/haflow"
            className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-800 shrink-0 cursor-pointer"
          >
            <span>探索 HAFlow 架构与能力</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </>
    );
  }

  // index === 7
  return (
    <>
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
        <span className="text-xs font-mono text-slate-500 font-bold block mb-4 uppercase tracking-wider">
          共事项目交付沉淀在客户手中的 8 大永久数字资产：
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {chapter.deliverables?.map((asset, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 flex items-start gap-2 shadow-2xs"
            >
              <CheckCircle2
                className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="font-medium leading-snug">{asset}</span>
            </div>
          ))}
        </div>
      </div>
      <Callout>{chapter.callout}</Callout>
    </>
  );
}

/**
 * 8 大章节手风琴：一次只展开一章，标题行即导航。
 * 全部内容保留在 DOM 中（折叠用 hidden），SEO 与锚点不受影响。
 */
export function MethodologyChapters() {
  const [openId, setOpenId] = useState<string>(() => {
    if (typeof window === "undefined") return "c01";
    const hash = window.location.hash.replace("#", "");
    return METHODOLOGY_DATA.chapters.some((c) => c.id === hash) ? hash : "c01";
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (METHODOLOGY_DATA.chapters.some((c) => c.id === id)) setOpenId(id);
    };
    window.addEventListener(CHAPTER_OPEN_EVENT, handler as EventListener);
    return () =>
      window.removeEventListener(CHAPTER_OPEN_EVENT, handler as EventListener);
  }, []);

  const toggle = useCallback(
    (id: string) => setOpenId((prev) => (prev === id ? "" : id)),
    []
  );

  return (
    <section id="chapters" aria-labelledby="chapters-heading" className="space-y-4 sm:space-y-5 scroll-mt-28">
      <div className="max-w-3xl">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
          深度解析 · 8大核心支柱
        </span>
        <h2
          id="chapters-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950"
        >
          共事方法论的落地工程细节
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          从解构一件业务任务，到把经验结构化，再到 Agent
          执行与分级人机边界，步步扎实，有迹可循。点击标题逐章展开。
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {METHODOLOGY_DATA.chapters.map((chapter, index) => {
          const open = openId === chapter.id;
          return (
            <div
              key={chapter.id}
              id={chapter.id}
              className={`scroll-mt-28 bg-white rounded-3xl border shadow-xs overflow-hidden transition-colors ${
                open ? "border-blue-200" : "border-slate-200"
              }`}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  id={`${chapter.id}-button`}
                  aria-expanded={open}
                  aria-controls={`${chapter.id}-panel`}
                  onClick={() => toggle(chapter.id)}
                  className="flex w-full items-center gap-3 sm:gap-4 p-5 sm:p-6 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                >
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md shrink-0 transition-colors ${
                      open
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {chapter.num}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className={`block text-base sm:text-lg font-bold leading-snug ${
                        open ? "text-blue-950" : "text-slate-900"
                      }`}
                    >
                      {chapter.title}
                    </span>
                    <span className="block text-xs text-blue-700 font-medium mt-1 truncate">
                      {chapter.tagline}
                      <span className="font-mono text-slate-400 ml-2 hidden sm:inline">
                        {CHAPTER_EN_LABEL[chapter.id]}
                      </span>
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      open ? "rotate-180 text-blue-600" : "text-slate-400"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={`${chapter.id}-panel`}
                role="region"
                aria-labelledby={`${chapter.id}-button`}
                hidden={!open}
              >
                <div className="px-5 sm:px-8 pb-6 sm:pb-8">
                  <div className="space-y-3 text-slate-600 text-sm leading-relaxed mb-6">
                    {chapter.leadParagraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                  <ChapterBody index={index} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
