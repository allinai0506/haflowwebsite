import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Compass,
  Cpu,
  Sparkles,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { COMPANY_INFO } from "@/data/company";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/about",
  title: "关于共事智能_上海企业AI落地团队",
  description:
    "上海共事智能科技有限公司：多年企业管理软件背景，不做大而全系统，只用AI解决具体问题。阐释人机协同主张与每月四场免费培训初心。",
  keywords: ["关于共事", "共事智能", "上海共事智能科技有限公司", "企业文化", "HAFlow团队"],
});

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
    <div className="min-h-screen bg-slate-50 py-5 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "关于共事" }]} />

        {/* Section 1: Hero & Manifesto (2-Column Balanced Grid) */}
        <div className="py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Hero Header (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-4 w-fit">
              <span>公司与品牌定位</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
              让人和 Agent<br className="hidden sm:inline" />共同把事情做完
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-mono font-medium mb-6">
              Human + Agent, in Flow.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              面对那些规则写不死、过去只能依靠人来判断的事情，我们用 AI 帮你把结果做出来。传统软件记录流程，AI Native 应用交付结果。
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
                不做大系统，解决真问题
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
                人在关键节点把关
              </span>
              <span className="px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs">
                持续普及 AI 技能
              </span>
              <span className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-semibold shadow-2xs">
                低承诺，高交付
              </span>
            </div>
          </div>

          {/* Right Column: Core Manifesto Card (7 cols) */}
          <div className="lg:col-span-7 bg-blue-50/60 text-slate-900 rounded-3xl p-8 sm:p-10 border border-blue-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-blue-700 block">
                    初心与使命
                  </span>
                  <span className="font-mono text-[11px] tracking-widest text-slate-400 block mt-0.5">
                    OUR MISSION
                  </span>
                </div>
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                <p>
                  我们做过很多年的企业管理软件。传统软件非常擅长记录数据和固化流程，但企业里仍然有大量工作依赖人去理解、判断、协调和推进。
                </p>
                <p>
                  AI 出现以后，我们第一次有机会让软件不只记录工作，而是真正参与工作。
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-blue-200/60">
              <p className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold mb-1">
                共事使命
              </p>
              <p className="text-blue-600 font-extrabold text-xl sm:text-2xl leading-snug">
                共事想做的，就是让人和 Agent 一起，把这些事情做完。
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Brand Hierarchy Clarification (Full Width 3-Column Grid) */}
        <div className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              品牌层级说明
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              如何理解“共事”与“HAFlow”？
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              共事是公司品牌，HAFlow 是公司的核心底层产品之一，但不是公司的全部。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  公司层级
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  上海共事智能科技有限公司
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  AI Native 应用与人机协同方案提供商，提供技术咨询、业务诊断与落地开发。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  品牌主张
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  共事 (GONGSHI AI)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  让人和 Agent 共同把事情做完。倡导人机共生、各司其职，人不被替代，软件不只记录。
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  核心产品
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  HAFlow
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  人机协同任务执行底层平台，负责复杂任务拆解、上下文流转与多 Agent 敏捷协同调度。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Core Principles (Full Width 4-Column Grid) */}
        <div className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              做事准则
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              共事团队坚守的四大原则
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              不走虚妄宣传的捷径，只以每一个具体业务场景的确定性落地为交付标准。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.principles.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-mono font-bold flex items-center justify-center text-xs mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2">
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

        {/* Section 4: 6 Key Questions Answered (Full Width 2-Column Grid) */}
        <div className="my-12">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              深度问答
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              深入回答关于共事的六个问题
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              关于成立初衷、系统边界、人机分工与公益培训的深度思考。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sixQuestions.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3 flex flex-col justify-between hover:border-blue-200 transition-colors"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-start gap-2.5">
                    <span className="text-blue-600 font-mono shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Honesty Box (Full Width) */}
        <div className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed flex items-start gap-4 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm sm:text-base block mb-1">
              实事求是声明：
            </span>
            共事严守诚信底线，绝不虚构团队规模、融资情况、客户数量或夸张名头。我们是一支深耕企业软件与 AI Native 工程落地的严谨团队，我们唯一的声誉来自于帮客户解决的每一个具体业务问题。
          </div>
        </div>

        {/* Section 6: Bottom CTA (Full Width) */}
        <div className="my-14 p-8 sm:p-10 rounded-3xl bg-blue-50/70 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-left shadow-xs">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mb-2">
              想与共事团队直接交流？
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              无论您是企业决策者还是业务骨干，随时欢迎带着一个具体问题与我们交流。
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shrink-0 shadow-md shadow-blue-500/20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span>联系我们</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
