import React from "react";

/**
 * 26 小时任务时间线（insights 文章配图）。
 *
 * 原文是一段纯文本日志，横条长度对应实际耗时，最深处是「彻底卡死」。
 * 改用 CSS 渲染为竖向时间轴：横条按耗时比例缩放，卡死阶段单独用红色标出，
 * 读者一眼能看出「7.7 小时空转」和「4 轮返工」才是时间黑洞。
 */

interface TimelineStep {
  time: string;
  phase: string;
  title: string;
  /** 实际耗时（小时），用于横条长度；null 表示该阶段未正常收敛 */
  hours: number | null;
  /** 失败原因说明 */
  reason?: string;
  dead?: boolean;
}

/** 全部阶段耗时之和（小时），用于横条宽度归一化 */
const MAX_HOURS = 7.7;

const STEPS: TimelineStep[] = [
  {
    time: "10-09 20:38",
    phase: "阶段 1",
    title: "需求分析",
    hours: 1.5,
    reason: "派发 2 个 Agent 互相辩论，禁止碰代码",
  },
  {
    time: "10-09 22:23",
    phase: "阶段 2",
    title: "首次编码与夜间失控",
    hours: 7.7,
    reason: "Agent 陷入沉思与全量回归，空转挂起",
  },
  {
    time: "10-10 09:46",
    phase: "阶段 3",
    title: "返工第 2 轮",
    hours: 2,
    reason: "目标仓库门禁拦截，反复报错",
  },
  {
    time: "10-10 11:39",
    phase: "阶段 4",
    title: "返工第 3 轮",
    hours: 4,
    reason: "终端崩溃、Git 锁冲突",
  },
  {
    time: "10-10 16:28",
    phase: "阶段 5",
    title: "返工第 4 轮",
    hours: 5,
    reason: "Agent 隔离池耗尽，候选代码过期",
  },
  {
    time: "10-10 21:43",
    phase: "阶段 6",
    title: "终局死锁",
    hours: null,
    reason: "重放提交被平台自身防篡改红线拦截",
    dead: true,
  },
];

export function InsightTimeline() {
  return (
    <figure className="my-2">
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-5">
        <ol className="space-y-3">
          {STEPS.map((step, i) => (
            <li key={step.time} className="flex gap-3">
              {/* 时间轴竖线 */}
              <div className="flex flex-col items-center shrink-0 w-9 sm:w-11">
                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 border-2 ${
                    step.dead
                      ? "bg-red-500 border-red-500"
                      : "bg-blue-600 border-blue-600"
                  }`}
                />
                {i < STEPS.length - 1 ? (
                  <span className="flex-1 w-px bg-slate-200 mt-1" />
                ) : null}
              </div>

              {/* 内容 */}
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-mono text-[10px] text-slate-400">{step.time}</span>
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                    {step.phase}
                  </span>
                  <p className="text-xs font-bold text-slate-900">{step.title}</p>
                </div>

                {step.reason ? (
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                    {step.reason}
                  </p>
                ) : null}

                {/* 耗时横条：宽度按实际耗时归一化 */}
                {step.hours !== null ? (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-200/70 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${Math.max(8, (step.hours / MAX_HOURS) * 100)}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 whitespace-nowrap shrink-0">
                      {step.hours} 小时
                    </span>
                  </div>
                ) : (
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="flex-1 h-1.5 rounded-full bg-red-100" />
                    <span className="font-mono text-[10px] font-bold text-red-600 whitespace-nowrap shrink-0">
                      彻底卡死
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* 汇总 */}
        <div className="mt-4 pt-3 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { label: "累计耗时", value: "26.2 h" },
            { label: "派出子任务", value: "25 个" },
            { label: "报错类型", value: "16 种" },
            { label: "业务代码改动", value: "6 个 Commit" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white border border-slate-200 px-2.5 py-2">
              <p className="text-[10px] text-slate-400">{stat.label}</p>
              <p className="text-sm font-bold text-slate-900 font-mono">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <figcaption className="mt-3 text-center text-xs text-slate-500 leading-relaxed">
        26.2 小时的实际执行时间线 · 横条长度对应各阶段耗时
      </figcaption>
    </figure>
  );
}