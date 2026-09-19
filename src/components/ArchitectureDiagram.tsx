"use client";

import React, { useEffect, useRef } from "react";
import {
  Target,
  ArrowDown,
  ArrowRight,
  Database,
  Layers,
  Workflow,
  Cpu,
  Route,
  ShieldCheck,
  History,
  UserCheck,
  Bot,
  Wrench,
  FileText,
  RefreshCw,
  Building2,
  Boxes,
  Briefcase,
  FolderOpen,
  Mail,
} from "lucide-react";

/** 空节点：轨线 + 数据包 + 箭头 + 可选的流程说明 */
function Connector({ label, delay }: { label?: string; delay: number }) {
  return (
    <div
      data-arch-reveal
      className="arch-reveal flex flex-col items-center py-1.5"
      style={
        {
          ["--arch-delay" as string]: `${delay}ms`,
          ["--arch-rise" as string]: "10px",
        } as React.CSSProperties
      }
    >
      <span className="arch-rail" aria-hidden="true">
        <span className="arch-rail-line" />
        <span className="arch-packet" />
        <ArrowDown className="arch-chevron" strokeWidth={2.5} />
      </span>
      {label ? (
        <span className="mt-1 text-[10px] font-mono text-slate-400 tracking-wide">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/** Runtime 内部节点之间的流转箭头：宽屏向右，窄屏向下 */
function FlowArrow() {
  return (
    <div className="flex items-center justify-center shrink-0 py-0.5 lg:py-0">
      <ArrowRight
        className="w-4 h-4 text-blue-400 hidden lg:block"
        aria-hidden="true"
      />
      <ArrowDown className="w-4 h-4 text-blue-400 lg:hidden" aria-hidden="true" />
    </div>
  );
}

/** 每一层的标题行：层号 + 中文名 + 英文名 */
function LayerHeader({
  num,
  title,
  en,
  tone = "light",
}: {
  num: string;
  title: string;
  en: string;
  tone?: "light" | "dark";
}) {
  const badge =
    tone === "dark"
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-slate-100 text-slate-600 border-slate-200";

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
      <span
        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-md border ${badge}`}
      >
        {num}
      </span>
      <h3
        className={`text-sm font-bold ${
          tone === "dark" ? "text-blue-950" : "text-slate-900"
        }`}
      >
        {title}
      </h3>
      <span
        className={`font-mono text-[10px] ${
          tone === "dark" ? "text-blue-500" : "text-slate-400"
        }`}
      >
        {en}
      </span>
    </div>
  );
}

/** 层内的最小单元卡片 */
function LayerNode({
  icon,
  title,
  sub,
  desc,
  tone = "slate",
  className,
  style,
}: {
  icon?: React.ReactNode;
  title: string;
  sub?: string;
  desc?: string;
  tone?: "slate" | "blue" | "amber" | "emerald";
  className?: string;
  style?: React.CSSProperties;
}) {
  const tones = {
    slate: {
      box: "bg-slate-50/80 border-slate-200",
      title: "text-slate-800",
      sub: "text-slate-400",
      desc: "text-slate-500",
    },
    blue: {
      box: "bg-white border-blue-200 shadow-2xs",
      title: "text-slate-900",
      sub: "text-blue-500",
      desc: "text-slate-500",
    },
    amber: {
      box: "bg-amber-50/70 border-amber-200",
      title: "text-amber-950",
      sub: "text-amber-600",
      desc: "text-amber-800/70",
    },
    emerald: {
      box: "bg-emerald-50/70 border-emerald-200",
      title: "text-emerald-950",
      sub: "text-emerald-700",
      desc: "text-emerald-800/70",
    },
  }[tone];

  return (
    <div
      className={`rounded-xl border px-3.5 py-2.5 ${tones.box}${
        className ? ` ${className}` : ""
      }`}
      style={style}
    >
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
        {icon}
        <p className={`text-xs font-bold ${tones.title}`}>{title}</p>
        {sub ? (
          <span className={`font-mono text-[10px] ${tones.sub}`}>{sub}</span>
        ) : null}
      </div>
      {desc ? (
        <p className={`text-[11px] leading-relaxed mt-1 ${tones.desc}`}>{desc}</p>
      ) : null}
    </div>
  );
}

const GOAL_EXAMPLES = [
  "给客户生成一份报价",
  "评审一份合同条款",
  "完成一次投标响应",
];

type DiagramLayer = {
  num: string;
  title: string;
  en: string;
  grid: string;
  nodes: { title: string; desc?: string }[];
};

const CONTEXT_LAYERS: DiagramLayer[] = [
  {
    num: "L1",
    title: "企业知识与数据层",
    en: "Knowledge & Data",
    grid: "grid-cols-1 sm:grid-cols-3",
    nodes: [
      { title: "公共知识", desc: "公司介绍 / 产品 / 定价 / 案例 / 政策" },
      { title: "业务数据", desc: "客户 / 合同 / 订单 / 项目 / 文档" },
      { title: "外部系统数据", desc: "CRM / ERP / OA / 邮件 / 文件库" },
    ],
  },
  {
    num: "L2",
    title: "业务上下文层 Workspace",
    en: "Workspace",
    grid: "grid-cols-1 sm:grid-cols-3",
    nodes: [
      { title: "客户 Workspace", desc: "客户档案 / 联系人 / 商机 / 历史沟通" },
      { title: "项目 Workspace", desc: "目标 / 计划 / 任务 / 风险 / 文档" },
      { title: "事项 Workspace", desc: "合同 / 投标 / 报价 / 工单" },
    ],
  },
  {
    num: "L3",
    title: "工作流模板层 Workflow Library",
    en: "Workflow Library",
    grid: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
    nodes: [
      { title: "销售报价 Workflow" },
      { title: "合同评审 Workflow" },
      { title: "投标 Workflow" },
      { title: "客户跟进 Workflow" },
      { title: "客服处理 Workflow" },
    ],
  },
];

const RUNTIME_STAGES = [
  {
    icon: <Layers className="w-3.5 h-3.5 text-blue-600" />,
    title: "上下文组装",
    sub: "Context Assembly",
    desc: "按当前任务，从知识与 Workspace 中装配所需材料",
  },
  {
    icon: <Workflow className="w-3.5 h-3.5 text-blue-600" />,
    title: "工作流编排",
    sub: "Workflow Orchestrator",
    desc: "装载模板，把目标拆解为有序的节点与分支",
  },
  {
    icon: <Cpu className="w-3.5 h-3.5 text-blue-600" />,
    title: "任务与节点运行时",
    sub: "Task / Node Runtime",
    desc: "逐个节点推进，派活给人、Agent 或工具",
  },
];

const RUNTIME_SUPPORTS = [
  {
    icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />,
    title: "规则与门禁",
    sub: "Policy / Gate",
    desc: "硬性条件不满足不流转，关键节点强制人工确认",
  },
  {
    icon: <History className="w-3.5 h-3.5 text-blue-600" />,
    title: "状态与执行证据",
    sub: "State / Evidence",
    desc: "每一步的输入、依据与结论全程留痕可追溯",
  },
];

const EXECUTORS = [
  {
    icon: <UserCheck className="w-4 h-4 text-amber-600" />,
    title: "人",
    sub: "Human",
    desc: "在关键节点把关、纠偏与终审",
    tone: "amber" as const,
  },
  {
    icon: <Bot className="w-4 h-4 text-blue-600" />,
    title: "智能体",
    sub: "Agent",
    desc: "按专业分工并行处理与交叉复核",
    tone: "blue" as const,
  },
  {
    icon: <Wrench className="w-4 h-4 text-emerald-600" />,
    title: "工具 / 连接器",
    sub: "Tool / Connector",
    desc: "以受控权限调用确定性工具与接口",
    tone: "emerald" as const,
  },
];

const LEGACY_SYSTEMS = [
  { icon: <Building2 className="w-3.5 h-3.5" />, name: "CRM" },
  { icon: <Boxes className="w-3.5 h-3.5" />, name: "ERP" },
  { icon: <Briefcase className="w-3.5 h-3.5" />, name: "OA" },
  { icon: <Database className="w-3.5 h-3.5" />, name: "数据库" },
  { icon: <FolderOpen className="w-3.5 h-3.5" />, name: "文件系统" },
  { icon: <Mail className="w-3.5 h-3.5" />, name: "邮件 / IM" },
];

export function ArchitectureDiagram() {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveals = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-arch-reveal]"),
    );

    // 关闭动效偏好 / 不支持时，直接落定终态，不留下隐藏内容
    if (motion.matches) {
      reveals.forEach((el) => el.classList.add("arch-in"));
      return;
    }

    const revealIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("arch-in");
          revealIo.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    reveals.forEach((el) => revealIo.observe(el));

    // 离开视口时停掉常驻动画，避免后台空转
    const pauseIo = new IntersectionObserver(
      ([entry]) => stage.classList.toggle("arch-paused", !entry.isIntersecting),
      { threshold: 0 },
    );
    pauseIo.observe(stage);

    return () => {
      revealIo.disconnect();
      pauseIo.disconnect();
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className="arch-diagram my-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-lg shadow-slate-100"
    >
      {/* Section Header */}
      <div
        data-arch-reveal
        className="arch-reveal max-w-3xl mb-8"
        style={{ ["--arch-delay" as string]: "0ms" }}
      >
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
          平台架构全景 · Architecture
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          一张图看懂 HAFlow 如何把一件事做完
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          从一句业务目标出发，经过企业知识与上下文、工作流模板、Runtime
          编排与人机协同执行，最终交付有依据的结果并回写企业系统 ——
          七个层次各司其职，形成可循环的闭环。
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* 起点：业务目标 */}
        <div
          data-arch-reveal
          className="arch-reveal rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 px-5 py-4 shadow-lg shadow-blue-500/25"
          style={{ ["--arch-delay" as string]: "120ms" }}
        >
          <div className="flex items-center justify-center gap-2">
            <Target className="w-4 h-4 text-blue-100" aria-hidden="true" />
            <span className="text-sm font-bold text-white">
              业务目标 / 用户需求
            </span>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
            {GOAL_EXAMPLES.map((goal) => (
              <span
                key={goal}
                className="text-[11px] font-mono text-white bg-white/15 border border-white/25 rounded-full px-2.5 py-1"
              >
                例如：{goal}
              </span>
            ))}
          </div>
        </div>

        <Connector delay={220} />

        {/* L1–L3：并列的输入层，用左侧虚线归组，避免被误读为先后顺序 */}
        <div className="border-l-2 border-dashed border-slate-200 pl-3 sm:pl-5 space-y-3">
          {CONTEXT_LAYERS.map((layer) => (
            <div
              key={layer.num}
              data-arch-reveal
              className="arch-reveal rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
              style={{ ["--arch-delay" as string]: "0ms" }}
            >
              <LayerHeader num={layer.num} title={layer.title} en={layer.en} />
              <div className={`grid gap-2.5 ${layer.grid}`}>
                {layer.nodes.map((node, idx) => (
                  <LayerNode
                    key={node.title}
                    className="arch-node"
                    style={
                      {
                        ["--arch-node-delay" as string]: `${60 + idx * 40}ms`,
                      } as React.CSSProperties
                    }
                    title={node.title}
                    desc={node.desc}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <Connector label="组装上下文 · 装载模板 · 派发任务" delay={120} />

        {/* L4 Runtime 执行引擎 */}
        <div
          data-arch-reveal
          className="arch-reveal arch-runtime relative rounded-2xl border-2 border-blue-300 bg-blue-50/60 p-4 sm:p-5"
          style={{ ["--arch-delay" as string]: "0ms" }}
        >
          <span className="arch-runtime-glow" aria-hidden="true" />
          <LayerHeader
            num="L4"
            title="HAFlow Runtime 执行引擎"
            en="Runtime"
            tone="dark"
          />

          <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            {RUNTIME_STAGES.map((stage, idx) => (
              <React.Fragment key={stage.title}>
                {idx > 0 ? <FlowArrow /> : null}
                <div className="flex-1">
                  <LayerNode
                    className="arch-stage"
                    style={
                      {
                        ["--arch-stage-delay" as string]: `${idx * 1200}ms`,
                      } as React.CSSProperties
                    }
                    icon={stage.icon}
                    title={stage.title}
                    sub={stage.sub}
                    desc={stage.desc}
                    tone="blue"
                  />
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="mt-2.5 pt-2.5 border-t border-blue-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {RUNTIME_SUPPORTS.map((item, idx) => (
              <LayerNode
                key={item.title}
                className="arch-node"
                style={
                  {
                    ["--arch-node-delay" as string]: `${200 + idx * 40}ms`,
                  } as React.CSSProperties
                }
                icon={item.icon}
                title={item.title}
                sub={item.sub}
                desc={item.desc}
                tone="blue"
              />
            ))}
          </div>

          <p className="mt-2.5 text-[10px] font-mono text-blue-500 text-center">
            规则门禁与执行证据贯穿全流程，而非流程中的某一步
          </p>
        </div>

        <Connector label="人机协同执行" delay={120} />

        {/* L5 执行层 */}
        <div
          data-arch-reveal
          className="arch-reveal rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          style={{ ["--arch-delay" as string]: "0ms" }}
        >
          <LayerHeader num="L5" title="执行层" en="Execution" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {EXECUTORS.map((executor, idx) => (
              <LayerNode
                key={executor.title}
                className="arch-node"
                style={
                  {
                    ["--arch-node-delay" as string]: `${60 + idx * 40}ms`,
                  } as React.CSSProperties
                }
                icon={executor.icon}
                title={executor.title}
                sub={executor.sub}
                desc={executor.desc}
                tone={executor.tone}
              />
            ))}
          </div>
        </div>

        <Connector label="产出交付物" delay={120} />

        {/* L6 结果回写层 */}
        <div
          data-arch-reveal
          className="arch-reveal rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"
          style={{ ["--arch-delay" as string]: "0ms" }}
        >
          <LayerHeader num="L6" title="结果回写层" en="Write-back" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <LayerNode
              className="arch-node"
              style={{ ["--arch-node-delay" as string]: "60ms" }}
              icon={<FileText className="w-3.5 h-3.5 text-blue-600" />}
              title="业务结果"
              sub="Deliverables"
              desc="报价单 / 方案 / 合同意见 / 投标产物"
            />
            <LayerNode
              className="arch-node"
              style={{ ["--arch-node-delay" as string]: "100ms" }}
              icon={<RefreshCw className="w-3.5 h-3.5 text-emerald-600" />}
              title="更新企业状态"
              sub="State Write-back"
              desc="更新 Workspace / 业务数据 / 历史记录"
            />
          </div>
        </div>

        <Connector label="受控回写" delay={120} />

        {/* L7 企业现有系统 */}
        <div
          data-arch-reveal
          className="arch-reveal rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5"
          style={{ ["--arch-delay" as string]: "0ms" }}
        >
          <LayerHeader num="L7" title="企业现有系统" en="Existing Systems" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {LEGACY_SYSTEMS.map((system, idx) => (
              <div
                key={system.name}
                className="arch-node flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-3 text-[11px] font-semibold text-slate-700"
                style={
                  {
                    ["--arch-node-delay" as string]: `${60 + idx * 40}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="text-slate-400" aria-hidden="true">
                  {system.icon}
                </span>
                <span>{system.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 闭环说明 */}
        <div
          data-arch-reveal
          className="arch-reveal mt-4 flex items-start gap-2.5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3.5"
          style={{ ["--arch-delay" as string]: "0ms" }}
        >
          <Route
            className="w-4 h-4 text-blue-600 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-900">闭环回写：</strong>
            任务结果与执行证据会更新回 Workspace
            与企业业务数据，成为下一次任务的上下文起点。HAFlow
            以松耦合方式外挂运行，不替换企业既有的信息化系统。
          </p>
        </div>
      </div>
    </section>
  );
}
