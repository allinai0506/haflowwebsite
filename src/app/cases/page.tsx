import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/cases";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CasesClientView } from "@/components/CasesClientView";

export const metadata: Metadata = {
  title: "落地案例",
  description:
    "您卡住的这件事，可能已经有人做成了。报价漏算、标书废标、凭证翻仓、门店断货——找和您同一类的问题，看现场怎么做成、结果怎么验收。",
  keywords: [
    "共事案例",
    "落地案例",
    "AI落地案例",
    "人机协同案例",
    "财务凭证自动关联",
    "智能报价案例",
    "标书合规核查",
  ],
};

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "落地案例" }]} />

        <div className="py-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <span>汽车 · 招投标 · 财税档案 · 连锁订货 · 国际物流</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            您卡住的这件事，可能已经有人做成了
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            报价漏算、标书废标、凭证翻仓、门店断货——找和您同一类的问题，看现场怎么做成、结果怎么验收。
            <span className="whitespace-nowrap">不推倒现有系统。</span>
          </p>
        </div>

        <CasesClientView initialCases={CASE_STUDIES} />

        <div className="my-14 p-8 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-slate-50 border border-blue-200/80 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-slate-950 mb-1">
              您也有类似的业务痛点等待攻克？
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              预约一次针对您具体业务的 30 分钟技术诊断，不推销，只讨论技术可行性。
            </p>
          </div>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shrink-0 shadow-sm"
          >
            <span>预约业务诊断</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
