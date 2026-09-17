"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { EvolutionPath } from "@/components/EvolutionPath";

export function SolutionsSection() {
  // The 6 curated flagship cases representing the evolution
  const flagshipSolutions = [
    {
      id: "automotive-crm",
      slug: "automotive-crm",
      badge: "汽车 Tier-1 · 制造工业",
      title: "多工厂报价漏损下降 15%，索赔闭环缩短 60%",
      englishTitle: "Automotive CRM (Japan Tier-1)",
      evolutionStep: "企业数字化 → 跨法人多组织协同",
      painPoint: "多工厂与销售中心权限混淆、一客多档割裂、从 RFQ 到量产长周期脱节、多轮报价利润漏水",
      roi: "报价毛利漏水减少 15% · 跨基地提效 3 倍 · 索赔 8D 闭环缩短 60%",
      schematic: (
        <div className="w-full h-full bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/50 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SIMULATION READY
            </span>
            <span className="text-blue-700 font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-blue-100">
              汽车 Tier-1
            </span>
          </div>
          <div className="my-2 flex items-center justify-center gap-1.5 text-[10px] font-mono">
            <div className="px-2 py-1 bg-white rounded-md border border-blue-200 text-blue-700 font-bold shadow-2xs">
              RFQ 询价
            </div>
            <span className="text-blue-400">→</span>
            <div className="px-2 py-1 bg-white rounded-md border border-indigo-200 text-indigo-700 font-bold shadow-2xs">
              多工厂核价
            </div>
            <span className="text-blue-400">→</span>
            <div className="px-2 py-1 bg-blue-600 text-white rounded-md font-bold shadow-2xs">
              量产闭环
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
            <span>8D 索赔状态机</span>
            <span className="text-blue-600 font-semibold">毛利漏水 -15%</span>
          </div>
        </div>
      ),
    },
    {
      id: "enterprise-plm",
      slug: "enterprise-plm",
      badge: "高端制造 · 精密工业",
      title: "图纸错乱返工止损上百万元，变更从 5 天压到 1.5 天",
      englishTitle: "Enterprise PLM Platform",
      evolutionStep: "业务流程数字化 → 多级 BOM 与变更穿透",
      painPoint: "研发与制造数据割裂、BOM/图纸多版本错乱引发批量生产事故、工程变更影响范围无法评估",
      roi: "彻底杜绝图纸错乱返工（年均止损上百万元）· 变更响应缩短 70%",
      schematic: (
        <div className="w-full h-full bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SIMULATION READY
            </span>
            <span className="text-indigo-700 font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-indigo-100">
              多级 BOM
            </span>
          </div>
          <div className="my-2 flex items-center justify-center gap-1.5 text-[10px] font-mono">
            <div className="px-2 py-1 bg-white rounded-md border border-indigo-200 text-indigo-700 font-bold shadow-2xs">
              EBOM 树
            </div>
            <span className="text-indigo-400">↔</span>
            <div className="px-2 py-1 bg-indigo-50 border border-indigo-300 text-indigo-800 rounded-md font-bold shadow-2xs">
              ECO 变更穿透
            </div>
            <span className="text-indigo-400">↔</span>
            <div className="px-2 py-1 bg-blue-600 text-white rounded-md font-bold shadow-2xs">
              MBOM 生产
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
            <span>图纸防呆防错</span>
            <span className="text-indigo-600 font-semibold">年均止损上百万元</span>
          </div>
        </div>
      ),
    },
    {
      id: "voucher-matching",
      slug: "voucher-matching",
      badge: "财务合规 · 国密 SM2",
      title: "月 8 万笔凭证从按天翻仓，变成秒级穿透归档",
      englishTitle: "NexusArchive (DA/T 104 Compliance)",
      evolutionStep: "规则凭证 → 国家法定合规封装",
      painPoint: "纸电发票海量混管、无合规标准归档包（DA/T 94）、纸电混合保管成本高昂、证据链断裂",
      roi: "凭证合规归档成本降低 65% · 检索秒级穿透 · 100% 杜绝财税违规风险",
      schematic: (
        <div className="w-full h-full bg-gradient-to-br from-blue-50/80 via-white to-teal-50/60 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SIMULATION READY
            </span>
            <span className="text-teal-700 font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-teal-100">
              DA/T 104-2024
            </span>
          </div>
          <div className="my-2 flex items-center justify-center gap-1.5 text-[10px] font-mono">
            <div className="px-2 py-1 bg-white rounded-md border border-slate-200 text-slate-700 font-bold shadow-2xs">
              海量纸电单据
            </div>
            <span className="text-teal-500">→</span>
            <div className="px-2 py-1 bg-teal-50 text-teal-800 border border-teal-300 rounded-md font-bold shadow-2xs">
              国密 SM2 封装
            </div>
            <span className="text-teal-500">→</span>
            <div className="px-2 py-1 bg-blue-600 text-white rounded-md font-bold shadow-2xs">
              秒级穿透调阅
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
            <span>防篡改证据链</span>
            <span className="text-teal-600 font-semibold">归档成本 -65%</span>
          </div>
        </div>
      ),
    },
    {
      id: "bid-compliance",
      slug: "bid-compliance",
      badge: "招投标 · 装备制造",
      title: "标书形式废标风险下降 95%，保证金逾期清零",
      englishTitle: "Xiyu Tender Platform",
      evolutionStep: "AI 进入业务 → 标书红线穿透比对",
      painPoint: "数百页招标文件人工阅读极易疏漏废标项、企业案例资质复用率低、保证金逾期退还沉淀资金",
      roi: "标书初稿编排提效 80% · 废标风险降低 95% · 保证金逾期滞留清零",
      schematic: (
        <div className="w-full h-full bg-gradient-to-br from-emerald-50/80 via-slate-50 to-blue-50/60 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SIMULATION READY
            </span>
            <span className="text-emerald-700 font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-emerald-100">
              AI 标书防线
            </span>
          </div>
          <div className="my-2 flex items-center justify-center gap-1.5 text-[10px] font-mono">
            <div className="px-2 py-1 bg-white rounded-md border border-slate-200 text-slate-700 font-bold shadow-2xs">
              300页招标文件
            </div>
            <span className="text-emerald-500">→</span>
            <div className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-md font-bold shadow-2xs">
              废标红线扫描
            </div>
            <span className="text-emerald-500">→</span>
            <div className="px-2 py-1 bg-blue-600 text-white rounded-md font-bold shadow-2xs">
              0废标交付
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
            <span>保证金催退状态机</span>
            <span className="text-emerald-600 font-semibold">废标风险 -95%</span>
          </div>
        </div>
      ),
    },
    {
      id: "staffai-agent-os",
      slug: "staffai-agent-os",
      badge: "组织协同 · 144+ Agent",
      title: "把对话框换成有岗位的数字员工，跨部门交付压缩 80%",
      englishTitle: "StaffAI Agent OS",
      evolutionStep: "Agent 进入流程 → 职能分工自主协同",
      painPoint: "传统大模型单点单轮对话无法交付复杂业务、缺乏团队分工与组织架构、任务无量化验收标准",
      roi: "日常文书与分析人工介入减少 70% · 复杂跨部门时效压缩 80% · 超级外脑",
      schematic: (
        <div className="w-full h-full bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/60 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SIMULATION READY
            </span>
            <span className="text-indigo-700 font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-indigo-100">
              144+ AI 员工
            </span>
          </div>
          <div className="my-2 flex items-center justify-center gap-1 text-[10px] font-mono">
            <div className="px-1.5 py-0.5 bg-white rounded border border-indigo-200 text-indigo-700 font-bold shadow-2xs">
              规划 Director
            </div>
            <span className="text-indigo-400">→</span>
            <div className="px-1.5 py-0.5 bg-indigo-50 text-indigo-800 border border-indigo-300 rounded font-bold shadow-2xs">
              专业 Specialist
            </div>
            <span className="text-indigo-400">→</span>
            <div className="px-1.5 py-0.5 bg-blue-600 text-white rounded font-bold shadow-2xs">
              核验 Critic
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
            <span>DAG 任务编排引擎</span>
            <span className="text-indigo-600 font-semibold">人工介入减少 70%</span>
          </div>
        </div>
      ),
    },
    {
      id: "store-inventory",
      slug: "store-inventory",
      badge: "连锁零售 · 供应链",
      title: "千店订货店长 3 分钟确认，缺货降 60%、损耗降 30%",
      englishTitle: "Smart Order Agent System",
      evolutionStep: "人与 Agent 共事 → 每日智能决策闭环",
      painPoint: "门店店长经验参差不齐导致缺货脱销或短保生鲜积压损耗、多级审批链漫长、库存周转缓慢",
      roi: "门店缺货率降低 60% · 鲜食品类损耗压降 30% · 单店处理人效提 4 倍",
      schematic: (
        <div className="w-full h-full bg-gradient-to-br from-blue-50/80 via-slate-50 to-emerald-50/60 p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              SIMULATION READY
            </span>
            <span className="text-emerald-700 font-semibold bg-white/90 px-2 py-0.5 rounded-md border border-emerald-100">
              单店日级预测
            </span>
          </div>
          <div className="my-2 flex items-center justify-center gap-1.5 text-[10px] font-mono">
            <div className="px-2 py-1 bg-white rounded-md border border-slate-200 text-slate-700 font-bold shadow-2xs">
              气象 + POS 流水
            </div>
            <span className="text-emerald-500">→</span>
            <div className="px-2 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-md font-bold shadow-2xs">
              单店日级测算
            </div>
            <span className="text-emerald-500">→</span>
            <div className="px-2 py-1 bg-blue-600 text-white rounded-md font-bold shadow-2xs">
              店长3分钟确认
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 pt-1.5">
            <span>千店鲜品损耗止损</span>
            <span className="text-emerald-600 font-semibold">损耗压降 -30%</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100" id="solutions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with user-directed positioning */}
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
            <span>- SOLUTIONS & EVOLUTION PATH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            让企业进入人机共事时代
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            从企业管理软件到 AI Agent 工作流，重新设计人与 AI 共同工作的方式。
          </p>
        </div>

        <EvolutionPath />

        {/* Curated 6 Flagship Cases Grid (Clean & Uncluttered) */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
              精选落地结果 · FLAGSHIP CASES
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              先看这六个已经做成的结果
            </h3>
          </div>
          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>找和您最像的案例</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flagshipSolutions.map((item) => (
            <Link
              key={item.id}
              href={`/cases/${item.slug}`}
              className="group flex flex-col rounded-3xl overflow-hidden border border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              {/* SVG Visual Schematic Header (100% Reliable Offline, No Broken Images) */}
              <div className="w-full h-36 border-b border-slate-100">
                {item.schematic}
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-semibold text-blue-700 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200">
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.evolutionStep.split("→")[0]}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400 block mb-3">
                    {item.englishTitle}
                  </span>

                  {/* Pain Point */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1 mb-3">
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>传统核心痛点：</span>
                    </span>
                    <p className="line-clamp-2 leading-relaxed">
                      {item.painPoint}
                    </p>
                  </div>

                  {/* Quantified ROI */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 space-y-1">
                    <span className="font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>商业量化收益 ROI：</span>
                    </span>
                    <p className="font-medium leading-relaxed line-clamp-2">
                      {item.roi}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">
                    查看案例
                  </span>
                  <span className="font-semibold text-blue-600 group-hover:text-blue-700 inline-flex items-center gap-1">
                    <span>查看结果与做法</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Dedicated "More Cases" Portal to /cases page */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border border-blue-200/80 flex flex-col lg:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>已在现场跑通</span>
            </div>
            <h4 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight">
              您卡住的这件事，可能已经有人做成了
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              打开案例，对上您的行业：卡住什么、怎么做、结果怎么验收。
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs">
                <strong className="font-extrabold text-slate-950">−95%</strong>
                <span className="text-slate-600">废标风险</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs">
                <strong className="font-extrabold text-slate-950">5 分钟</strong>
                <span className="text-slate-600">国际询价</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs">
                <strong className="font-extrabold text-slate-950">−60%</strong>
                <span className="text-slate-600">门店缺货</span>
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md shadow-blue-500/20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <span>找和您最像的案例</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
