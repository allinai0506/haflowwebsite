import React from "react";
import Link from "next/link";
import { ArrowRight, Search, FlaskConical, Network, RefreshCw, CheckCircle2 } from "lucide-react";

export function MethodologySteps() {
  const steps = [
    {
      num: "01",
      icon: <Search className="w-5 h-5 text-emerald-600" />,
      title: "第一步：问题诊断",
      summary: "确认客户真正想解决的问题，而不是直接讨论要做什么系统。",
      details: [
        "深入业务一线工位，搞清哪件事最耗时、最容易出错、最依赖人工老经验",
        "审查现有业务资料（合同、询价单、单据格式等），评估 AI 解决可行性",
        "明确验收指标与业务成功边界，能解决才接，不适合就坦白告知",
      ],
      notDoing: "不先做动辄数十页的虚浮可行性规划，不讨论大而全的战略口号",
    },
    {
      num: "02",
      icon: <FlaskConical className="w-5 h-5 text-blue-600" />,
      title: "第二步：最小验证",
      summary: "使用真实资料和真实业务数据，验证 AI 能不能解决。",
      details: [
        "签署严格保密协议后，抽取客户脱敏的真实业务单据样本（如 50 份真实历史询盘）",
        "通过 HAFlow 快速搭建轻量验证流程，验证多 Agent 分析推理质量与准确度",
        "由客户资深业务人员参与盲测比对，用客观事实检验交付结果",
      ],
      notDoing: "不用精挑细选的假数据做自嗨表演，行就是行，不行及时调整",
    },
    {
      num: "03",
      icon: <Network className="w-5 h-5 text-indigo-600" />,
      title: "第三步：连接现有系统",
      summary: "根据需要连接 ERP、OA、财务等系统，不要求客户推倒重来。",
      details: [
        "通过轻量 API、数据库只读视图或文件协议对接客户现存业务系统",
        "保护企业既有信息化资产，新应用作为敏捷外部‘计算与辅助挂件’",
        "打通输入数据调取与最终业务结果的回传链路",
      ],
      notDoing: "不要求客户推翻重买现有系统，不搞伤筋动骨的底座替换工程",
    },
    {
      num: "04",
      icon: <RefreshCw className="w-5 h-5 text-teal-600" />,
      title: "第四步：上线并持续改进",
      summary: "让人参与关键判断，通过真实使用反馈不断调整。",
      details: [
        "业务人员在关键节点保留终审确认权，保障企业合规与安全底线",
        "每次人工确认与纠偏微调，都沉淀为当前场景的专业知识积累",
        "随着使用量增加，逐步提升自动化率与置信度阈值",
      ],
      notDoing: "不鼓吹‘全自动无人驾驶’，始终坚持人机协同与可控可追溯",
    },
  ];

  const corePrinciples = [
    "不先做庞大规划",
    "不先建设大平台",
    "不用假数据做表演",
    "先解决一个真实问题",
    "先形成可验证结果",
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100/80 text-emerald-800 border border-emerald-200 mb-3">
            <span>交付方法论 · 务实且可验证</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            从一个问题开始，先做出一个结果。
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            我们深刻理解企业对新技术落地的顾虑。共事采用循序渐进的四步走实施方式，拒绝大而全的漫长立项，始终以真实的业务交付为导向。
          </p>

          {/* Principles Bar */}
          <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
            {corePrinciples.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Four Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Step number badge & icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-mono text-xl font-bold text-slate-300">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium mb-4 pb-3 border-b border-slate-100 leading-relaxed">
                  {step.summary}
                </p>

                <ul className="space-y-2 mb-4">
                  {step.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed"
                    >
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-4 rounded-b-2xl">
                <span className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider block mb-0.5">
                  坚持底线：
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {step.notDoing}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
          >
            <span>预约一次业务问题诊断（30分钟）</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}
