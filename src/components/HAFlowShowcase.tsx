import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Workflow,
  Users,
  ShieldAlert,
  Server,
  Activity,
  History,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export function HAFlowShowcase() {
  const capabilities = [
    {
      icon: <Workflow className="w-5 h-5 text-blue-600" />,
      title: "根据目标拆解任务",
      desc: "将宏观业务指令分解为相互校验的多步骤执行图谱，不再出现大模型单一回答遗漏要点的现象。",
    },
    {
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      title: "多个 Agent 分工协作",
      desc: "信息提取、规则比对、计算核算与风控审查分别由不同专业 Agent 独立负责，分工明确、互相制衡。",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
      title: "人在关键节点进行确认",
      desc: "Human-in-the-loop：高风险或低置信度环节强制触发人工审核确认，杜绝失控与盲目自动执行。",
    },
    {
      icon: <Server className="w-5 h-5 text-indigo-600" />,
      title: "安全调用工具与业务系统",
      desc: "支持对接内部 SQL 数据库、ERP、TMS、第三方天气/运价 API 以及复杂业务公式计算脚本。",
    },
    {
      icon: <Activity className="w-5 h-5 text-teal-600" />,
      title: "任务过程持续实时反馈",
      desc: "非黑盒运行。每一步执行的当前状态、调用的上下文片段与思考依据全部透明可查。",
    },
    {
      icon: <Cpu className="w-5 h-5 text-violet-600" />,
      title: "异常自动发现与纠偏",
      desc: "当单据内容冲突或缺少必要证据链时，Agent 自动识别并主动标红，提醒用户补充材料。",
    },
    {
      icon: <History className="w-5 h-5 text-cyan-600" />,
      title: "结果有依据、过程可追溯",
      desc: "每一个判断建议均附带原文出处引用页码和计算公式证据链，确保企业审计与合规复核需要。",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      title: "可以对完成结果闭环验收",
      desc: "结合确定性质量规则与业务专家打分，完成最终交付件的结构化验收与回写。",
    },
  ];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background visual elements */}
      <div className="absolute inset-0 dark-grid-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand & Product Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 tracking-wider uppercase">
              核心产品能力
            </span>
            <span className="text-xs text-slate-300 font-mono">
              Human + Agent, in Flow.
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
            HAFlow：人机协同任务执行平台
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6">
            HAFlow 是共事解决不同业务问题时使用的人机协同底层能力。它不是普通的网页聊天机器人，而是把人、Agent、数据、工具和现有业务系统组织起来，让规则写不死的复杂任务可以持续推进并最终交付结果。
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              不是通用大模型，是业务工作流执行平台
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              连接企业现有 ERP / OA / 数据库
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              关键节点人把关，过程可审计
            </span>
          </div>
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <div className="mb-16 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 lg:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
              执行逻辑与架构
            </span>
            <h3 className="text-xl font-bold text-white">
              HAFlow 如何把业务任务做完
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              打破“人找数据、人手工对账”的孤岛模式，让人和 Agent 在同一闭环中高效共事
            </p>
          </div>

          {/* Flow visual columns */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* 1: Goal */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-center flex flex-col items-center justify-center min-h-[140px]">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                输入源
              </span>
              <h4 className="text-sm font-bold text-white mb-1">
                业务目标与真实材料
              </h4>
              <p className="text-[11px] text-slate-400">
                PDF标书、非标询盘、POS流水、发票凭证
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-slate-600 font-mono text-xs">
              → 目标拆解 →
            </div>

            {/* 2: Multi-Agent Center */}
            <div className="rounded-2xl border border-blue-500/40 bg-blue-950/30 p-5 text-center flex flex-col items-center justify-center min-h-[140px] ring-1 ring-blue-500/30">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-blue-300">
                  HAFlow 协同引擎
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                多 Agent 专业分工与推理
              </h4>
              <p className="text-[11px] text-slate-300">
                解析要素 · 比选规则 · 穿透调用工具
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-slate-600 font-mono text-xs">
              → 关键把关 →
            </div>

            {/* 3: Human in the Loop */}
            <div className="rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4 text-center flex flex-col items-center justify-center min-h-[140px]">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                Human in the loop
              </span>
              <h4 className="text-sm font-bold text-white mb-1">
                人类专家终审确认
              </h4>
              <p className="text-[11px] text-slate-400">
                阈值审核 · 异常纠偏 · 商业终裁
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-center flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span>对接：ERP / 财务核算 / TMS / 邮件服务器 / 本地网盘</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400">
              最终输出：可直接用于业务交付的高置信度结果
            </span>
          </div>
        </div>

        {/* 8 Core Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {capabilities.map((cap, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-6 hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-4">
                {cap.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {cap.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-400">
            想要详细了解 HAFlow 的技术架构、安全性规范与集成方案？
          </p>
          <Link
            href="/haflow"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span>进入 HAFlow 独立产品页面</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
