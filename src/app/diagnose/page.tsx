import React from "react";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DiagnoseForm } from "@/components/DiagnoseForm";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/diagnose",
  title: "企业AI落地诊断_业务场景可行性评估",
  description:
    "共事智能业务可行性诊断：评估工作流程、数据资产、现有系统与人机分工边界，24小时内给出务实落地建议与可行性报告，不推销大系统。",
  keywords: ["AI应用诊断", "企业AI落地评估", "共事智能", "业务场景评估"],
});

export default function DiagnosePage() {
  const diagnosticDimensions = [
    {
      num: "01",
      title: "当前工作是怎样完成的",
      desc: "梳理业务全流程的输入材料、流转节点与目前的操作介质（纸质、表格、邮件还是系统）。",
    },
    {
      num: "02",
      title: "最耗费时间的是哪个环节",
      desc: "精准定位瓶颈：是繁杂的非结构化资料翻查？跨表格对账？还是漫长的多方电话确认？",
    },
    {
      num: "03",
      title: "哪些环节依赖少数人的经验",
      desc: "寻找企业内的‘单点依赖’：一旦核心老员工休假或离职，该项业务是否面临停滞或质量下滑？",
    },
    {
      num: "04",
      title: "有哪些文档、数据和历史记录",
      desc: "盘点沉淀资产：过去是否有 3 个月以上的历史方案、成交记录、招投标文件或凭证归档底稿？",
    },
    {
      num: "05",
      title: "当前使用哪些业务系统",
      desc: "了解现有技术栈：ERP、OA、TMS、财务系统或本地网盘，明确数据调取与回写接口的开放度。",
    },
    {
      num: "06",
      title: "哪些结果可以用于验证 AI 是否有效",
      desc: "确立验收量化指标：耗时从 40 分钟降至 3 分钟？漏项率降为零？还是单据匹配率达到 95%？",
    },
    {
      num: "07",
      title: "如果 AI 判断错误，会造成什么风险",
      desc: "界定风控红线：是直接经济损失、合规行政处罚，还是仅需人工顺手校正的低风险文本？",
    },
    {
      num: "08",
      title: "哪些环节必须由人确认",
      desc: "确立 Human-in-the-loop 节点：关键金额、战略折扣、投标最终封印前，必须保留人工终审权。",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "AI 应用诊断" }]} />

        {/* Page Hero */}
        <div className="py-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <span>务实诊断 · 不推销大系统</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            不知道 AI 能解决什么？
            <br />
            先从你的一个具体问题开始。
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            很多企业面对大模型时感到迷茫，不知道从何下手。不要先去买上百万元的“中台平台”，只要带着一个当下让你最头疼、最耗人的业务动作，我们帮你拆解它适不适合用 AI 解决。
          </p>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">共事诊断准则：</span>
            如果评估后发现你的问题更适合用传统几行代码或现有 ERP 配置解决，我们会如实告知，绝不为了上 AI 而硬造需求。
          </div>
        </div>

        {/* 8 Diagnostic Dimensions */}
        <div className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block mb-1">
              八个核心维度
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              共事业务可行性诊断框架
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              在为任何企业启动方案前，我们的工程师都会围绕以下 8 个关键问题与业务负责人进行严谨推演：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {diagnosticDimensions.map((item) => (
              <div
                key={item.num}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-600 block mb-1.5">
                    DIMENSION {item.num}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Diagnostic Intake Form */}
        <div className="my-12">
          <div className="max-w-3xl mx-auto mb-6 text-center">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              在线提交诊断需求
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              无需繁琐公文，仅需把具体卡点用大白话写下来即可。
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <DiagnoseForm />
          </div>
        </div>

        {/* Bottom Reassurance */}
        <div className="my-12 max-w-3xl mx-auto p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 block mb-0.5">
              技术保密与商业道德：
            </span>
            您所提交的业务痛点、系统类型与文档特征将受到严格的机密保护。共事承诺绝不将您的企业数据用于公开模型训练，并在首次深度交流前主动签署正式保密协议（NDA）。
          </div>
        </div>
      </div>
    </div>
  );
}
