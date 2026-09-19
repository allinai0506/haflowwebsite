import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { INSIGHTS } from "@/data/insights";
import { Breadcrumb } from "@/components/Breadcrumb";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/insights",
  title: "企业AI落地思考_AINative工程方法论",
  description:
    "共事智能企业AI落地思考：为什么不建大平台、规则写不死的着力点、人机协同分工边界、两周验证方法论。一线工程手记，拒绝营销套话。",
  keywords: ["企业AI落地思考", "AI Native应用方法论", "人机协同思考", "共事智能观点"],
});

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "观点与实践" }]} />

        {/* Page Hero */}
        <div className="py-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-4">
            <span>工程手记 · 拒绝浮夸</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            观点与实践思考
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            我们不写充斥空话套话的营销通稿。这里记录了我们在真实企业场景中摸爬滚打得出的第一手工程认知：关于大系统的陷阱、规则写不死的深水区，以及人和 Agent 应当如何真实共事。
          </p>
        </div>

        {/* Articles List */}
        <div className="my-10 space-y-6">
          {INSIGHTS.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-slate-500">
                  <span className="font-semibold px-2.5 py-0.5 rounded-sm bg-slate-100 text-slate-700 border border-slate-200">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>预计阅读 {article.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug">
                  <Link
                    href={`/insights/${article.slug}`}
                    className="hover:text-blue-600 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md"
                  >
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {article.summary}
                </p>

                {/* Key Takeaways Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 space-y-1.5 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block mb-1">
                    核心论点提炼：
                  </span>
                  {article.keyTakeaways.map((takeaway, idx) => (
                    <p key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{takeaway}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  原创实践手记
                </span>
                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-blue-600 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md py-1"
                >
                  <span>阅读全文</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
