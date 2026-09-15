"use client";

import React, { useState } from "react";
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Truck,
  Store,
  FileCheck,
  Receipt,
  UserCheck,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  icon: React.ReactNode;
  rawInput: string;
  traditionalPain: string;
  aiBreakdown: {
    agent1: { name: string; action: string };
    agent2: { name: string; action: string };
    humanCheckpoint: string;
    finalDeliverable: string;
    evidence: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "quote",
    name: "国际货代复杂报价",
    icon: <Truck className="w-4 h-4" />,
    rawInput: "“30吨精密机床，从苏州发德国斯图加特，要求18天内到达，需代办进出口清关及落地卸车，怎么报价？”",
    traditionalPain: "老调度员手工翻查 6 张 Excel，打电话问船司最新运价并计算 14 项附加费，耗时 40 分钟且极易漏算港杂费倒亏。",
    aiBreakdown: {
      agent1: {
        name: "路线比选 Agent",
        action: "快速测算‘上海港海运快船+汉堡内陆卡航’(22天) vs ‘中欧班列直达+斯图加特驳运’(16天)，锁定班列为唯一满足 18 天时效方案。",
      },
      agent2: {
        name: "成本测算 Agent",
        action: "实时抓取班列最新即期舱位费，自动叠加国内短驳、欧洲清关关税与重货绑扎费，测算底线成本 €18,400，建议报价 €21,200。",
      },
      humanCheckpoint: "业务主管审核：确认当前班列境外段拥堵风险，将毛利率微调至 14%，点击‘批准发送’。",
      finalDeliverable: "输出中英双语精准报价单 PDF，明列费用拆解与时效依据，耗时 2 分钟完成抢单。",
      evidence: "出处依据：中欧班列最新费率通函第 4 组 / 德国斯图加特口岸特种设备清关附加规程",
    },
  },
  {
    id: "order",
    name: "门店鲜品日订货",
    icon: <Store className="w-4 h-4" />,
    rawInput: "“明天上海全市有大暴雨且气温骤降 8℃，静安寺写字楼店明天应该订多少鲜果、鲜奶与热饮原料？”",
    traditionalPain: "系统默认‘按上周同期销量平均值’推荐订货，如果直接下单，明天冷饮原料将严重过剩报损，热饮原料断货。",
    aiBreakdown: {
      agent1: {
        name: "气象客流推理 Agent",
        action: "识别‘暴雨+写字楼店属性’特征，结合历史同类天气行为，预测堂食减少、外卖激增，冷饮总需求下滑 35%，热饮需求上升 40%。",
      },
      agent2: {
        name: "库存与保质期 Agent",
        action: "读取当前在架鲜奶仅剩 1 天保质期，结合 MOQ 计算建议：鲜奶下调 4 箱，热饮浓缩浆增订 3 箱，避免临期报废。",
      },
      humanCheckpoint: "店长手机端核对：确认周边写字楼无临时停工通知，点击‘一键同步至供应链采购单’。",
      finalDeliverable: "凌晨 02:00 自动生成千店千面订货单并完成回传，店长只需 3 分钟审核。",
      evidence: "出处依据：POS流水气象关联模型 / 易损原料保质期安全水位阈值",
    },
  },
  {
    id: "bid",
    name: "300页标书合规核查",
    icon: <FileCheck className="w-4 h-4" />,
    rawInput: "“280页医疗设备采购招标文件，核查我们的投标响应标书是否存在任何漏项、负偏离或废标陷阱。”",
    traditionalPain: "3名员工通宵肉眼逐页对照，人脑疲惫时极易看漏‘附件4未盖骑缝章视为无效’等隐性一票否决条款。",
    aiBreakdown: {
      agent1: {
        name: "废标条款提取 Agent",
        action: "全篇抓取 42 项实质性‘*号条款’与隐性否定句，生成严苛的合规核查清单。",
      },
      agent2: {
        name: "响应穿透比对 Agent",
        action: "逐页检索我方标书应答内容，发现技术指标第 14 项‘工作温度范围’比招标要求窄了 2℃，标红预警‘潜在负偏离’。",
      },
      humanCheckpoint: "技术总监把关：确认该设备实测支持更宽温度，重新调取第三方检测报告附在第 86 页替换，消除扣分风险。",
      finalDeliverable: "生成完整的《标书自检核查报告》，所有对应条款附带原文精准页码，废标风险清零。",
      evidence: "出处依据：招标文件第 42 页 3.2 条款 vs 我方响应文件第 86 页检测证明",
    },
  },
  {
    id: "voucher",
    name: "财务发票凭证穿透",
    icon: <Receipt className="w-4 h-4" />,
    rawInput: "“ERP 凭证记账摘要写着‘付A公司办公耗材款’，但发票开的是‘得力A4纸与碳粉’，合同在OA审批附件里。”",
    traditionalPain: "传统财务软件按字符串精确匹配直接失败，财务每月要翻找几百个文件夹和纸质档案盒，人工对账。",
    aiBreakdown: {
      agent1: {
        name: "语义对齐 Agent",
        action: "理解‘办公耗材’与发票‘A4纸、碳粉’属于包含关系，解析发票金额、税率与采购合同付款批次完全吻合。",
      },
      agent2: {
        name: "证据链聚合 Agent",
        action: "跨系统抽取银行电子回单流水号、OA 审批流通过时间戳与仓库签收记录，自动拼装成完整证据链。",
      },
      humanCheckpoint: "出纳员批量审核：看到置信度 99.2% 的关联证据链，点击‘批准归档入电子会计档案’。",
      finalDeliverable: "凭证背后一键穿透查看全套原始合同、发票与收发单据，审计调阅时间降至秒级。",
      evidence: "出处依据：ERP凭证号 202508-0194 与增值税发票代码 031002300... 拓扑吻合",
    },
  },
];

export function InteractiveFlowSim() {
  const [activeTab, setActiveTab] = useState<string>("quote");
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: input, 1: agents running, 2: human check, 3: result delivered
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const scenario = SCENARIOS.find((s) => s.id === activeTab) || SCENARIOS[0];

  const runSimulation = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setTimeout(() => {
      setCurrentStep(2);
      setTimeout(() => {
        setCurrentStep(3);
        setIsRunning(false);
      }, 900);
    }, 900);
  };

  const resetSim = () => {
    setCurrentStep(0);
    setIsRunning(false);
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950 text-white p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden relative">
      {/* Top Bar: Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            交互式任务推演 · 实机体验
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            看看共事如何把一个具体问题做完
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                setActiveTab(s.id);
                setCurrentStep(0);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === s.id
                  ? "bg-slate-800 text-white shadow-xs border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {s.icon}
              <span>{s.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Raw Input & Traditional Pain (4 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real problem input box */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">
              业务现场原始输入：
            </span>
            <p className="text-sm text-slate-200 font-medium leading-relaxed italic">
              {scenario.rawInput}
            </p>
          </div>

          {/* Traditional Software Pain */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/30 text-xs">
            <div className="flex items-center gap-1.5 text-rose-400 font-semibold mb-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>传统软件与人工现状痛点：</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {scenario.traditionalPain}
            </p>
          </div>

          {/* Execution Controls */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={runSimulation}
              disabled={isRunning}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 transition-all shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? "正在协同执行..." : "运行 HAFlow 协同推演"}</span>
            </button>
            {currentStep > 0 && (
              <button
                type="button"
                onClick={resetSim}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800"
                title="重置"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Live HAFlow Execution Pipeline (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-slate-200">
                HAFlow 执行流水线
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Human + Agent, in Flow
            </span>
          </div>

          {/* Step 1: Agents Working */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              currentStep >= 1
                ? "bg-blue-950/30 border-blue-500/40 text-slate-200"
                : "bg-slate-950/40 border-slate-800/60 text-slate-500"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-blue-400 flex items-center gap-1.5">
                <span>01. 多 Agent 专业分工与推理</span>
                {currentStep >= 1 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                自主解析与工具调用
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <p className="leading-relaxed">
                <strong className="text-slate-300">[{scenario.aiBreakdown.agent1.name}]：</strong>
                {scenario.aiBreakdown.agent1.action}
              </p>
              <p className="leading-relaxed">
                <strong className="text-slate-300">[{scenario.aiBreakdown.agent2.name}]：</strong>
                {scenario.aiBreakdown.agent2.action}
              </p>
            </div>
          </div>

          {/* Step 2: Human in the Loop Checkpoint */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              currentStep >= 2
                ? "bg-amber-950/30 border-amber-500/40 text-slate-200 ring-1 ring-amber-500/20"
                : "bg-slate-950/40 border-slate-800/60 text-slate-500"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>02. 人工关键节点审核确认（Human in the loop）</span>
                {currentStep >= 2 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </span>
              <span className="text-[10px] font-mono text-amber-400/80">
                把关 · 纠偏 · 终审
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              {scenario.aiBreakdown.humanCheckpoint}
            </p>
          </div>

          {/* Step 3: Verifiable Result Delivered */}
          <div
            className={`p-3.5 rounded-xl border transition-all ${
              currentStep >= 3
                ? "bg-emerald-950/30 border-emerald-500/40 text-slate-200"
                : "bg-slate-950/40 border-slate-800/60 text-slate-500"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <span>03. 交付有依据的业务结果</span>
                {currentStep >= 3 && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </span>
              <span className="text-[10px] font-mono text-emerald-400/80">
                可追溯 · 回写系统
              </span>
            </div>
            <p className="text-xs font-semibold text-white mb-1 leading-relaxed">
              {scenario.aiBreakdown.finalDeliverable}
            </p>
            <p className="text-[11px] font-mono text-slate-400">
              {scenario.aiBreakdown.evidence}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p>
          面对规则写不死的问题，AI 负责综合多方信息推演，人负责关键节点裁决确认。
        </p>
        <span className="text-emerald-400 font-mono">
          让事情在真实工作流中流转完成
        </span>
      </div>
    </div>
  );
}
