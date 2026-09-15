import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { PROBLEMS } from "@/data/problems";
import { ProblemCard } from "@/components/ProblemCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "解决具体问题 · 不做大系统，只解决一个具体业务卡点",
  description:
    "共事不承接大而全的信息化系统，也不以替换客户现有的 ERP、OA、CRM、财务系统为目标。我们只用 AI 帮企业解决一个个具体问题：智能报价、智能订货预测、标书质量核查、财务单据自动关联与经验复用。",
};

export default function ProblemsPage() {
  const characteristics = [
    { title: "规则无法提前全部写死", desc: "业务边界灵活，无法用简单的穷举 if-else 代码固定下来" },
    { title: "情况每天都在变化", desc: "受天气、节假日、外部运价行情等多源浮动因素即时影响" },
    { title: "需要理解大量非结构化资料", desc: "涉及几十页甚至上百页 PDF、合同、单据与聊天记录上下文" },
    { title: "需要综合多种信息进行判断", desc: "不能只看单一字段，必须跨时间、跨维度推演最优解" },
    { title: "高度依赖少数资深人员的经验", desc: "老员工一休假业务便停摆，新人难以上手或极易出错" },
    { title: "涉及多个现有业务系统", desc: "数据散落在 ERP、OA、网盘与本地表格，缺乏智能连接" },
    { title: "传统软件只能记录，无法给结果", desc: "传统系统只能在事后录入，不能事前直接推演出有依据的建议" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "解决具体问题" }]} />

        {/* Page Header */}
        <div className="py-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <span>核心定位 · AI Native 应用</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-6">
            不做大系统。
            <br />
            只用 AI 帮企业解决一个个具体问题。
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            我们不主张推倒客户现有的 ERP、OA、CRM 或财务核算系统。企业既有系统负责记录交易与固化流程，共事负责在规则写不死的地方，用 AI 帮助人把结果做出来。
          </p>
        </div>

        {/* 7 Characteristics of Suitable Problems */}
        <div className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block mb-1">
              场景甄选法则
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              什么样的业务问题适合交给共事？
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              符合以下 7 项特征的问题，通常是传统软件的盲区，却是共事 AI Native 应用的着力点：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characteristics.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">
                  {idx + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 Concrete Problem Cards Grid */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                具体业务问题场景列表
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                点击进入每个场景的业务痛点、人机协同分工、系统对接及验证报告
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROBLEMS.map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} featured={true} />
            ))}
          </div>
        </div>

        {/* Diagnostic CTA */}
        <div className="my-16 p-8 sm:p-12 rounded-3xl bg-slate-950 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl font-bold text-white">
              你的问题不在上述列表中？
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              只要你的问题同样具备“规则写不死、多变复杂、依赖人工判断”的特征，欢迎直接提交问题描述，我们将在 24 小时内完成可行性评估。
            </p>
          </div>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <span>预约业务问题诊断</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
