import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, FileCheck, Layers } from "lucide-react";
import { CASE_STUDIES } from "@/data/cases";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "实践案例 · 从问题或结果出发的真实业务拆解 | 共事智能",
  description:
    "共事实践案例库。严格遵循 9 项标准业务结构：遇到了什么具体问题、原有系统为何难以解决、AI 与人如何协同分工、对接了哪些业务系统，以及清晰标明数据真实性声明。",
  keywords: ["共事案例", "AI落地案例", "人机协同案例", "财务凭证自动关联", "智能报价案例", "标书合规核查"],
};

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "实践案例" }]} />

        {/* Page Hero */}
        <div className="py-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <span>实事求是 · 九项严谨拆解</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            实践场景与落地方案示例
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            我们不发通篇空话的“公关通稿”。每一个案例均严格按照业务痛点、系统局限、人机分工、对接系统、验证方式及真实数据边界进行拆解。
          </p>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-900">
              数据真实性承诺原则：
            </p>
            <p>
              未经客户书面授权确认的数据绝不虚假宣传；未经验收推至终局的数据统一标明为“方案示例”，绝不凭空捏造合同金额或客户名单。
            </p>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((item) => (
            <div
              key={item.slug}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {item.industry}
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-sm ${
                      item.type === "实践场景"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-slate-200/80 text-slate-700 border border-slate-300"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                  <Link
                    href={`/cases/${item.slug}`}
                    className="hover:text-emerald-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {item.summary}
                </p>

                {/* Key Deliverable Results Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">
                    核心业务成效：
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.businessResults.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {item.tag}
                </span>
                <Link
                  href={`/cases/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-600"
                >
                  <span>阅读 9 项完整拆解报告</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="my-14 p-8 rounded-3xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              您也有类似的业务痛点等待攻克？
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              预约一次针对您具体业务的 30 分钟技术诊断，不推销，只讨论技术可行性。
            </p>
          </div>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <span>预约业务诊断</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
