import React from "react";
import type { Metadata } from "next";
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
  Lock,
  Eye,
  Database,
  Terminal,
  FileCheck,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { COMPANY_INFO } from "@/data/company";

export const metadata: Metadata = {
  title: "HAFlow · 人机协同任务执行平台 | Human + Agent, in Flow",
  description:
    "HAFlow 是共事解决不同业务问题时使用的人机协同执行平台。把人、Agent、数据、工具和现有业务系统组织起来，让复杂任务持续推进并交付有依据的结果。",
  keywords: [
    "HAFlow",
    "人机协同",
    "Agent执行平台",
    "多Agent协作",
    "Human in the loop",
    "共事智能",
  ],
};

export default function HAFlowPage() {
  const capabilities = [
    {
      num: "01",
      icon: <Workflow className="w-5 h-5 text-blue-600" />,
      title: "根据目标拆解任务",
      summary: "将复杂业务目标分解为结构化、可校验的步骤图谱",
      desc: "单一大模型面对复合长指令极易出现偏离与遗漏。HAFlow 的图引擎能够将诸如‘完成一份复杂多维报价’自动拆解为询价解析、航线比选、多项附加费核算、毛利测算与风险提示等相互制衡的子任务。",
    },
    {
      num: "02",
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      title: "多个 Agent 专业分工协作",
      summary: "不同 Agent 各司其职，如同企业内不同专业岗位的员工",
      desc: "不把全部希望寄托在一个全知全能的超级 Prompt 上。信息提取 Agent、业务规则比对 Agent、计算 Agent 与合规质检 Agent 独立运行并通过结构化协议通信，互相挑刺复核，大幅降低幻觉率。",
    },
    {
      num: "03",
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
      title: "人在关键节点进行确认",
      summary: "Human-in-the-loop：让人保有终审裁决权",
      desc: "我们坚信企业业务不能交由 AI 盲盒运行。HAFlow 在关键风险敞口（如毛利率超界、废标硬性条款存疑、超期未归集凭证）设置强制人工审批拦截点，支持人工一键纠偏，把风险锁死在可控范围内。",
    },
    {
      num: "04",
      icon: <Server className="w-5 h-5 text-indigo-600" />,
      title: "安全调用工具与业务系统",
      summary: "打通 ERP、TMS、数据库与第三方公共 API",
      desc: "Agent 不仅停留在文字生成，而是被赋予受限的确定性工具调用权：执行复杂运费数学公式计算、查询企业内部数据库只读视图、调取第三方天气预报与船期行情。",
    },
    {
      num: "05",
      icon: <Activity className="w-5 h-5 text-teal-600" />,
      title: "任务过程持续透明反馈",
      summary: "可视化流水线，每一步都清晰看得见",
      desc: "拒绝无从知晓的漫长黑盒等待。每一步处理的当前状态、输入材料、命中的规则条目与中间计算结果均在工作台上实时流水式呈现，便于现场审计与调试排查。",
    },
    {
      num: "06",
      icon: <Cpu className="w-5 h-5 text-violet-600" />,
      title: "异常自动发现与纠偏机制",
      summary: "材料矛盾或缺失时主动预警，不硬猜硬编",
      desc: "当出现数据冲突（如发票金额与银行流水不一致）或必要附件缺失时，Agent 不会强行编造猜测答案，而是主动标红中断并生成《待澄清问题清单》，引导人员补齐材料。",
    },
    {
      num: "07",
      icon: <History className="w-5 h-5 text-cyan-600" />,
      title: "结果有依据、过程全可追溯",
      summary: "每一条结论均附带证据链与原文引用出处",
      desc: "在严肃企业场景中，‘凭什么得出这个结论’比结论本身更重要。HAFlow 的输出结果强制关联原文出处锚点（如标书第 82 页），支持随时点击穿透审查原始单据。",
    },
    {
      num: "08",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      title: "可对完成结果进行闭环验收",
      summary: "确定性质量门禁与业务系统回写",
      desc: "任务交付阶段内置结构化质检门禁。只有当所有硬性指标均达到合规阈值并经人工点击签字后，数据才会正式回写至企业现有的生产系统（如 ERP/TMS），形成完整闭环。",
    },
  ];

  const securityFeatures = [
    {
      title: "数据严格本地化或私有云部署",
      desc: "核心业务文档、合同与财务单据可在企业私有网络（VPC）或内部机房内流转，数据不出企业边界。",
    },
    {
      title: "严禁用于公共模型二次训练",
      desc: "严格遵守商业保密合规标准，签署法律级保密协议，绝不会将客户商业数据用于公开模型的后续训练。",
    },
    {
      title: "精细化基于角色的权限控制（RBAC）",
      desc: "完整继承企业现有组织架构与权限系统，不同部门、不同层级员工只能查阅授权范围内的 Agent 任务结果。",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "HAFlow 平台" }]} />

        {/* Page Hero */}
        <div className="py-8 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
              底层协同底座
            </span>
            <span className="text-xs font-mono text-slate-500">
              {COMPANY_INFO.sloganEn}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            HAFlow：人机协同任务执行平台
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-6">
            HAFlow 是共事解决不同业务问题时使用的人机协同执行平台。它把人、Agent、数据、工具和现有业务系统组织起来，让复杂任务可以持续推进并交付有依据的结果。
          </p>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">非聊天工具说明：</span>
            HAFlow 不是网页上的普通 AI 聊天对话框，不夸大宣传，不使用脱离实际的宏大叙事。它是一套把人的业务经验与多 Agent 执行能力编排到企业真实系统中的工程调度平台。
          </div>
        </div>

        {/* 8 Core Capabilities */}
        <div className="my-10">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              平台核心能力
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              HAFlow 的八项核心工程能力
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              围绕“把复杂业务做完”而设计，兼顾自动化效率与企业风控底线。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.num}
                className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {cap.icon}
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-300">
                      {cap.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    {cap.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mb-3">
                    {cap.summary}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Integration Topology */}
        <div className="my-14 bg-slate-950 text-white rounded-3xl border border-slate-800 p-8 sm:p-12">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
              集成架构
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              如何与企业既有业务系统轻量连接
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              共事坚决不主张推翻既有信息化设施。HAFlow 设计为松耦合的外挂执行层，通过标准接口与内部系统进行安全、受控的双向交互：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <Database className="w-6 h-6 text-blue-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-2">
                1. 输入层：只读连接
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                通过数据库只读账户、企业网盘共享目录或 API，读取待处理的非结构化合同、报表、单据或历史价格表，不修改源数据。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <Cpu className="w-6 h-6 text-emerald-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-2">
                2. 计算层：多 Agent 编排
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                在隔离环境中完成要素提取、跨系统多表联查、算法综合推演，并呈现人机协同审核工作台，由员工完成终审确认。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-6 h-6 text-teal-400 mb-3" />
              <h3 className="text-base font-bold text-white mb-2">
                3. 输出层：受控回写
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                人工点击验收后，将生成的报价单、订货指令或标书风险报告，通过标准化 Webhook/API 规范回写进现有 ERP/TMS 中。
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Security Principles */}
        <div className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <Lock className="w-5 h-5" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                安全与合规
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              企业级数据安全与合规保障
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityFeatures.map((sec, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {sec.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="my-16 p-8 sm:p-10 rounded-3xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              想了解 HAFlow 如何适配您企业的具体业务？
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              带着一个具体问题来，我们为您梳理多 Agent 拆解与人机协同流程方案。
            </p>
          </div>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <span>预约平台技术诊断</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
