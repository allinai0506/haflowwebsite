import React from "react";
import {
  Code2,
  PenLine,
  RefreshCw,
  Users,
  ShieldCheck,
  Filter,
  ScanEye,
  GitPullRequest,
  Repeat,
} from "lucide-react";

/**
 * 双环自治架构流程图（insights 文章配图）。
 *
 * 为什么不用 ASCII 图：双环是带层级、分支和数据流的流程，
 * 字符框线既难读又在中文等宽字体下必然错位。改用 CSS 结构化渲染，
 * 复用 /haflow 页 ArchitectureDiagram 的视觉语言（节点卡片 + 图标 + 连接器）。
 *
 * 结构：左右两环并排。
 *   内环 = 主 Agent 独占工位，TDD 三步循环（Red→Green→Refactor）+ 旁路只读专家；
 *   外环 = 洁净室沙盒四步串行门禁（编译→差量→双透镜→PR）。
 * 两环之间仅一条「交付代码」箭头：内环全部搞定后才进入外环。
 * 窄屏由 grid 自动堆叠为上下，语义不变。
 */

const INNER_TDD_STEPS = [
  {
    icon: <PenLine className="w-3.5 h-3.5 text-blue-600" />,
    tag: "Red",
    title: "写失败测试",
    desc: "先写出能复现缺陷的用例",
  },
  {
    icon: <Code2 className="w-3.5 h-3.5 text-blue-600" />,
    tag: "Green",
    title: "调实现代码",
    desc: "秒级试错，把用例跑绿",
  },
  {
    icon: <RefreshCw className="w-3.5 h-3.5 text-blue-600" />,
    tag: "Refactor",
    title: "局部重构",
    desc: "保持绿灯下整理结构",
  },
];

/** 旁路专家：只读顾问，不抢方向盘 */
const SPOKE_EXPERTS = [
  {
    icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
    title: "安全专家",
    desc: "3 秒返回敏感路径建议",
  },
  {
    icon: <ScanEye className="w-3.5 h-3.5 text-emerald-600" />,
    title: "边界专家",
    desc: "3 秒推演并发与边界用例",
  },
];

const OUTER_STEPS = [
  {
    icon: <Code2 className="w-3.5 h-3.5 text-slate-600" />,
    num: "1",
    title: "原生全量编译与回归",
    desc: "在洁净沙盒跑项目原生命令",
  },
  {
    icon: <Filter className="w-3.5 h-3.5 text-slate-600" />,
    num: "2",
    title: "差量测试过滤",
    desc: "自动豁免主干历史失败项",
  },
  {
    icon: <ScanEye className="w-3.5 h-3.5 text-slate-600" />,
    num: "3",
    title: "双透镜只读审查",
    desc: "规范透镜 + 需求完备性透镜",
  },
  {
    icon: <GitPullRequest className="w-3.5 h-3.5 text-slate-600" />,
    num: "4",
    title: "平台自动生成 PR",
    desc: "合规校验并写入元数据闭环",
  },
];

/** 竖向连接器：向下箭头 + 可选说明。紧凑版避免两环之间出现过大的空隙。 */
function DownArrow({ label }: { label?: string }) {
  return (
    <div
      className="flex flex-col items-center py-0.5"
      aria-hidden={label ? undefined : true}
    >
      <span className="flex flex-col items-center">
        <span className="h-2.5 w-px bg-slate-300" />
        <svg width="9" height="5" viewBox="0 0 9 5" fill="none" className="text-slate-300 -mt-px">
          <path d="M1 1l3.5 3L8 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {label ? (
        <span className="mt-0.5 text-[10px] font-mono text-slate-400">{label}</span>
      ) : null}
    </div>
  );
}

/** 环的标题条 */
function LoopHeader({
  badge,
  title,
  en,
  tone,
}: {
  badge: string;
  title: string;
  en: string;
  tone: "blue" | "slate";
}) {
  return (
    <div
      className={`rounded-xl px-3.5 py-2.5 border ${
        tone === "blue"
          ? "bg-blue-50 border-blue-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${
            tone === "blue"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-slate-600 text-white border-slate-600"
          }`}
        >
          {badge}
        </span>
        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
      </div>
      <p
        className={`mt-0.5 font-mono text-[10px] tracking-wide ${
          tone === "blue" ? "text-blue-500" : "text-slate-400"
        }`}
      >
        {en}
      </p>
    </div>
  );
}

export function InsightDualLoop() {
  return (
    <figure className="my-2">
      {/* 双环并排：宽屏左右分栏，窄屏由 grid-cols-1 自动堆叠为上下。
          items-stretch 让两环等高，交付箭头垂直居中。 */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-0 items-stretch">
        {/* ───────── 内环 ───────── */}
        <section className="rounded-2xl border-2 border-blue-200 bg-blue-50/40 p-4 flex flex-col">
          <LoopHeader
            badge="内环"
            title="高频紧反馈工坊"
            en="INNER LOOP · 自由 · 高频 · 秒级自测"
            tone="blue"
          />

          <div className="mt-3 flex flex-1 flex-col">
            {/* 工位独占：主 Agent */}
            <div className="rounded-xl border border-blue-200 bg-white px-3 py-2.5">
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <p className="text-xs font-bold text-slate-900">Primary Agent</p>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                单工位独占写权限，实现 / 单测 / 回归全在一个工作记忆里
              </p>
            </div>

            {/* TDD 主干：Red → Green → Refactor */}
            <div className="mt-3 flex-1 flex flex-col rounded-xl border border-blue-100 bg-white/70 px-3 py-2.5">
              <p className="font-mono text-[10px] font-bold text-blue-600 mb-2">
                TDD 主干 · 秒级循环
              </p>
              {/* TDD 三步均匀撑满该区块，与外环节奏一致 */}
              <div className="flex flex-1 flex-col justify-between gap-0.5">
                {INNER_TDD_STEPS.map((step, i) => (
                  <React.Fragment key={step.tag}>
                    {i > 0 ? <DownArrow /> : null}
                    <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                      <span className="shrink-0 mt-0.5">{step.icon}</span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-1.5">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {step.tag}
                          </span>
                          <p className="text-xs font-bold text-slate-900">{step.title}</p>
                        </div>
                        <p className="text-[11px] leading-relaxed text-slate-500 mt-0.5">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {/* 循环回边：Refactor 之后回到起点 */}
              <div className="mt-2 flex items-center gap-1.5 rounded-lg border border-dashed border-blue-200 bg-blue-50/60 px-2.5 py-1.5">
                <Repeat className="w-3.5 h-3.5 shrink-0 text-blue-600" />
                <p className="text-[11px] text-blue-900">
                  不收敛就<b className="font-bold">继续原地试错</b>，不换人、不交接
                </p>
              </div>
            </div>

            {/* 旁路专家：只读顾问 */}
            <div className="mt-3 shrink-0 rounded-xl border border-emerald-200 bg-emerald-50/50 px-3 py-2.5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                  HUB
                </span>
                <p className="text-[11px] font-bold text-emerald-950">
                  旁路专家只读支持
                </p>
                <span className="font-mono text-[10px] text-emerald-600">
                  Hub-and-Spoke
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SPOKE_EXPERTS.map((expert) => (
                  <div
                    key={expert.title}
                    className="flex items-start gap-1.5 rounded-lg border border-emerald-200 bg-white px-2 py-1.5"
                  >
                    <span className="shrink-0 mt-0.5">{expert.icon}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-slate-900">{expert.title}</p>
                      <p className="text-[10px] leading-snug text-slate-500">{expert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-1.5 text-[10px] text-emerald-800/80 leading-relaxed">
                只读顾问原地给建议，绝不抢走方向盘。
              </p>
            </div>
          </div>
        </section>

        {/* ───────── 两环之间的交付箭头 ───────── */}
        <div className="flex items-center justify-center py-1 lg:w-14 lg:py-0">
          <div className="flex items-center gap-2 lg:flex-col lg:gap-1.5">
            <span className="font-mono text-[10px] font-bold text-slate-500 whitespace-nowrap">
              交付代码
            </span>
            <span className="flex items-center text-blue-500">
              {/* 窄屏：向下；宽屏：向右 */}
              <svg width="7" height="20" viewBox="0 0 7 20" fill="none" className="lg:hidden" aria-hidden="true">
                <path d="M3.5 0v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M1 15.5L3.5 18.5 6 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" className="hidden lg:block" aria-hidden="true">
                <path d="M0 5h17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14.5 1.5L18 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[10px] text-slate-400 lg:hidden whitespace-nowrap">
              进入门禁
            </span>
          </div>
        </div>

        {/* ───────── 外环 ───────── */}
        <section className="rounded-2xl border-2 border-slate-200 bg-slate-50/60 p-4 flex flex-col">
          <LoopHeader
            badge="外环"
            title="洁净室差量门禁"
            en="OUTER LOOP · 独立沙盒 · 客观 · 差量防护"
            tone="slate"
          />

          {/* justify-between 让 4 步在剩余高度内均匀分布，避免底部大片留白 */}
          <div className="mt-3 flex-1 flex flex-col justify-between gap-1">
            {OUTER_STEPS.map((step, i) => (
              <React.Fragment key={step.num}>
                {i > 0 ? <DownArrow /> : null}
                <div className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white px-2.5 py-2">
                  <span className="shrink-0 mt-0.5 font-mono text-[10px] font-bold w-5 h-5 rounded bg-slate-100 text-slate-600 flex items-center justify-center">
                    {step.num}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-1.5">
                      <span className="shrink-0 mt-0.5">{step.icon}</span>
                      <p className="text-xs font-bold text-slate-900">{step.title}</p>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500 mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="mt-3 rounded-lg border border-dashed border-slate-300 bg-white px-2.5 py-2">
            <p className="text-[11px] text-slate-600 leading-relaxed">
              历史失败项<b className="text-slate-900">不扣在当前贡献者头上</b>
              ：主干挂 3 个、当前仍只挂 3 个即判通过。
            </p>
          </div>
        </section>
      </div>

      <figcaption className="mt-3 text-center text-xs text-slate-500 leading-relaxed">
        双环自治架构：内环求敏捷，外环求确定
      </figcaption>
    </figure>
  );
}