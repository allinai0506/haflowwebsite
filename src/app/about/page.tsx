import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Users,
  Target,
  Sparkles,
  Award,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { COMPANY_INFO } from "@/data/company";

export const metadata: Metadata = {
  title: "关于共事 · 让人和 Agent 共同把事情做完 | 共事智能",
  description:
    "上海共事智能科技有限公司。我们做过很多年的企业管理软件。我们不做大而全的系统，只用 AI 帮企业解决一个个具体问题。深入阐释为什么成立共事、为什么坚持人机协同与持续免费培训。",
  keywords: ["关于共事", "共事智能", "上海共事智能科技有限公司", "企业文化", "HAFlow团队"],
};

export default function AboutPage() {
  const sixQuestions = [
    {
      q: "为什么成立共事？",
      a: "我们做过很多年的企业管理软件。传统软件非常擅长记录数据和固化流程，但企业里仍然有大量工作依赖人去理解、判断、协调和推进。AI 出现以后，我们第一次有机会让软件不只记录工作，而是真正参与工作。共事想做的，就是让人和 Agent 一起，把这些事情做完。",
    },
    {
      q: "为什么不再做大而全的系统？",
      a: "大而全的系统往往伴随着高昂的商务成本、长达数月的立项扯皮和最终的使用脱节。企业已经购买了太多彼此孤立的大系统。我们深知推倒重来的代价，因此坚定选择‘不做大系统，只解决一个具体问题’的务实道路，让每一个敏捷应用快速自我证明价值。",
    },
    {
      q: "为什么一定要从一个具体问题开始？",
      a: "宏大规划往往在漫长的周期中被消磨殆尽。而一次复杂报价、一次订货预测、一份标书合规核对，是一个可以在两周内拿出真实结果的具象任务。只有用真实数据跑通一个点，建立一线团队的确定性信任，AI 落地才不会沦为 PPT 演示。",
    },
    {
      q: "为什么强调人和 Agent 共同工作？",
      a: "我们不认同‘AI 彻底替代人类员工’的狂妄宣传，那既不尊重企业实际业务的复杂性，也无视了法律合规与商业风控的底线。正确的姿态是：AI 负责消化非结构化资料并给出有逻辑依据的候选方案；人类专家在关键节点负责把关、纠偏和终审验收。",
    },
    {
      q: "为什么每周日坚持举办免费培训？",
      a: "技术的价值在于普惠，而不是制造信息壁垒。我们希望通过每月四场零基础实战培训，帮助普通业务人员真正掌握 AI 与 AI Coding。即使参加培训后决定不采购共事的服务，而是团队自己动手完成开发，我们也由衷感到欣慰与自豪。",
    },
    {
      q: "对 AI Native 企业软件的长期判断是什么？",
      a: "未来的企业软件不再是以表单和填报为核心的静态记录库，而是由大量敏捷、专业化分工的 Agent 组成的协同网络。它们像活跃的数字员工一样在系统之间穿梭，与人类密切配合。记录归传统软件，交付归 AI Native 应用。",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "关于共事" }]} />

        {/* Page Hero */}
        <div className="py-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <span>公司与品牌定位</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
            让人和 Agent 共同把事情做完
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-mono">
            Human + Agent, in Flow.
          </p>
        </div>

        {/* Core Manifesto Box */}
        <div className="my-8 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl max-w-4xl">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block mb-4">
            初心与使命
          </span>
          <div className="space-y-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            <p>
              我们做过很多年的企业管理软件。传统软件非常擅长记录数据和固化流程，但企业里仍然有大量工作依赖人去理解、判断、协调和推进。
            </p>
            <p>
              AI 出现以后，我们第一次有机会让软件不只记录工作，而是真正参与工作。
            </p>
            <p className="text-emerald-400 font-bold text-xl sm:text-2xl pt-2">
              共事想做的，就是让人和 Agent 一起，把这些事情做完。
            </p>
          </div>
        </div>

        {/* Brand Hierarchy Clarification */}
        <div className="my-12 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs max-w-4xl">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block mb-1">
              品牌层级说明
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              如何理解“共事”与“HAFlow”？
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              共事是公司品牌，HAFlow 是公司的核心底层产品之一，但不是公司的全部。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                公司层级
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                上海共事智能科技有限公司
              </h3>
              <p className="text-slate-600">
                AI Native 应用与人机协同方案提供商
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                品牌主张
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                共事 (GONGSHI AI)
              </h3>
              <p className="text-slate-600">
                让人和 Agent 共同把事情做完
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                核心产品
              </span>
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                HAFlow
              </h3>
              <p className="text-slate-600">
                人机协同任务执行底层平台
              </p>
            </div>
          </div>
        </div>

        {/* 6 Key Questions Answered */}
        <div className="my-12 max-w-4xl space-y-6">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-bold block mb-1">
              深度问答
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              深入回答关于共事的六个问题
            </h2>
          </div>

          {sixQuestions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-2"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-start gap-2">
                <span className="text-emerald-600 font-mono">Q{idx + 1}.</span>
                <span>{item.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Honesty Box */}
        <div className="my-10 max-w-4xl p-6 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-900 block mb-0.5">
              实事求是声明：
            </span>
            共事严守诚信底线，绝不虚构团队规模、融资情况、客户数量或夸张名头。我们是一支深耕企业软件与 AI Native 工程落地的严谨团队，我们唯一的声誉来自于帮客户解决的每一个具体业务问题。
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="my-14 max-w-4xl p-8 rounded-3xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">
              想与共事团队直接交流？
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              无论您是企业决策者还是业务骨干，随时欢迎联系我们。
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <span>联系我们</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
