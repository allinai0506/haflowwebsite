import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Server,
  UserCheck,
  Bot,
  HelpCircle,
  ShieldCheck,
  Building,
  Check,
  Info,
} from "lucide-react";
import { CASE_STUDIES, getCaseBySlug } from "@/data/cases";
import { Breadcrumb } from "@/components/Breadcrumb";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return {};

  return {
    title: `${item.title} · 实践案例 | 共事智能`,
    description: `${item.summary}。详细拆解共事如何通过人机协同方式解决业务难题，包含完整 9 项严谨拆解与真实数据声明。`,
    keywords: [item.title, item.industry, item.tag, "共事案例", "HAFlow落地"],
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "实践案例", href: "/cases" },
            { label: item.title },
          ]}
        />

        {/* Hero Header */}
        <div className="py-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-900 text-white">
              {item.industry}
            </span>
            <span
              className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-md ${
                item.type === "实践场景"
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-slate-200 text-slate-700 border border-slate-300"
              }`}
            >
              {item.type}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              标签：{item.tag}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight mb-4 leading-snug">
            {item.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {item.summary}
          </p>
        </div>

        {/* 9 Standard Sections */}
        <div className="space-y-8 my-8">
          {/* 1. Problem Description */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                1
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                客户遇到了什么具体问题？
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed pl-8">
              {item.problemDescription}
            </p>
          </div>

          {/* 2. Why Original System Failed */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                2
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                为什么原有系统难以解决？
              </h2>
            </div>
            <ul className="space-y-3 pl-8">
              {item.whyOriginalSystemFailed.map((reason, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <span className="w-4 h-4 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                    ×
                  </span>
                  <span className="leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. How Gongshi Diagnosed */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                3
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                共事怎样诊断问题？
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed pl-8">
              {item.howGongshiDiagnosed}
            </p>
          </div>

          {/* 4 & 5. AI Decisions vs Human in the Loop (Side-by-Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 4. What AI did */}
            <div className="bg-emerald-50/50 rounded-3xl border border-emerald-100 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4 text-emerald-950">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center font-mono font-bold text-xs">
                  4
                </span>
                <h3 className="text-base font-bold">
                  AI 做了哪些判断和执行？
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                {item.aiDecisionsAndActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <Bot className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5. What Human did */}
            <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4 text-white">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-mono font-bold text-xs">
                  5
                </span>
                <h3 className="text-base font-bold">
                  人在哪些关键环节参与？
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                {item.humanInTheLoopRole.map((role, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <UserCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Connected Systems */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                6
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                对接了哪些现有业务系统？
              </h2>
            </div>
            <div className="pl-8 flex flex-wrap gap-2.5 pt-2">
              {item.connectedSystems.map((sys, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium flex items-center gap-1.5"
                >
                  <Server className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{sys}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 7. Business Results */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                7
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                最终产生了什么业务结果？
              </h2>
            </div>
            <ul className="space-y-2.5 pl-8 text-xs sm:text-sm text-slate-700">
              {item.businessResults.map((res, idx) => (
                <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium text-slate-900">{res}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 8. Verification Method */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center font-mono font-bold text-xs">
                8
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                结果如何验证？
              </h2>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed pl-8">
              {item.verificationMethod}
            </p>
          </div>

          {/* 9. Data Authenticity Declaration (Critical Honesty Gate) */}
          <div className="bg-slate-950 text-white rounded-3xl border border-slate-800 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-6 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center font-mono font-bold text-xs">
                9
              </span>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>真实数据与待验证目标声明</span>
                <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-sm bg-slate-800 text-slate-300">
                  严守诚信底线
                </span>
              </h2>
            </div>

            <div className="pl-8 space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-emerald-400 block mb-1">
                  ✓ 来自真实业务与系统验证的部分：
                </span>
                <ul className="space-y-1 text-slate-300 text-xs">
                  {item.dataAuthenticityDeclaration.realAspects.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-semibold text-amber-400 block mb-1">
                  ⚠ 仍处于持续演进或待规模化验证的目标：
                </span>
                <ul className="space-y-1 text-slate-300 text-xs">
                  {item.dataAuthenticityDeclaration.pendingValidationAspects.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-slate-400 italic pt-1">
                {item.dataAuthenticityDeclaration.statement}
              </p>
            </div>
          </div>
        </div>

        {/* Back Link & CTA */}
        <div className="my-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <Link
            href="/cases"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            ← 返回案例列表
          </Link>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors shadow-xs"
          >
            <span>带着您的业务问题来诊断</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
