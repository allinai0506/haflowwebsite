"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Workflow,
  Cpu,
  Bot,
  Users,
  Sparkles,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

type Stage = {
  step: string;
  title: string;
  desc: string;
  role: string;
  isHAFlow?: boolean;
  icon: React.ReactNode;
};

const STAGES: Stage[] = [
  {
    step: "01",
    title: "企业数字化",
    desc: "ERP / CRM / PLM 基础资产与系统交易数据沉淀",
    role: "数据与记录底座",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    step: "02",
    title: "业务流程数字化",
    desc: "跨部门审批、合同台账与合规证据链状态机",
    role: "流程标准化贯通",
    icon: <Workflow className="w-5 h-5" />,
  },
  {
    step: "03",
    title: "AI 进入业务",
    desc: "非结构化文档解析、多源数据归因与动态预测",
    role: "认知与理解增强",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    step: "04",
    title: "Agent 进入流程",
    desc: "多智能体自主拆解任务、工具调用与协作执行",
    role: "自主协作工作流",
    icon: <Bot className="w-5 h-5" />,
  },
  {
    step: "05",
    title: "人与 Agent 共事",
    desc: "人类把关终审、纠偏决策、算法模型持续进化",
    role: "确定性人机闭环",
    icon: <Users className="w-5 h-5" />,
  },
  {
    step: "06",
    title: "HAFlow",
    desc: "让人和 Agent 共同把事情做完的统一方法论与工程底座",
    role: "人机共事终局形态",
    isHAFlow: true,
    icon: <Sparkles className="w-5 h-5" />,
  },
];

function PathLink({
  axis,
  beat,
  firing,
}: {
  axis: "h" | "v";
  beat: number;
  firing: boolean;
}) {
  const Icon = axis === "h" ? ChevronRight : ChevronDown;
  return (
    <span
      className={`evo-link evo-link-${axis} evo-link-b${beat}${firing ? " is-firing" : ""}`}
      aria-hidden
    >
      <span className="evo-link-rail" />
      <span className="evo-link-packet" />
      <Icon className="evo-link-chevron" strokeWidth={2.4} />
    </span>
  );
}

export function EvolutionPath() {
  const stageRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef(false);
  const pinnedIndexRef = useRef(0);
  const walkDoneRef = useRef(false);
  const fireTimerRef = useRef<number | null>(null);
  const [live, setLive] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [active, setActive] = useState(0);
  const [firing, setFiring] = useState<number | null>(null);

  const goTo = (idx: number) => {
    setActive(idx);
    if (idx <= 0) {
      setFiring(null);
      return;
    }
    setFiring(idx - 1);
    if (fireTimerRef.current) window.clearTimeout(fireTimerRef.current);
    fireTimerRef.current = window.setTimeout(() => setFiring(null), 720);
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let wasPlaying = false;

    const syncPlaying = (visible: boolean) => {
      const play = visible && !motion.matches;
      if (play && !wasPlaying) {
        walkDoneRef.current = false;
        pinnedRef.current = false;
        setActive(0);
        setFiring(null);
        setCycle((c) => c + 1);
        setLive(true);
      }
      setPaused(!play);
      if (!play) setLive(false);
      wasPlaying = play;
    };

    const io = new IntersectionObserver(
      ([entry]) => syncPlaying(entry.isIntersecting),
      { threshold: 0.08, rootMargin: "80px 0px" },
    );
    io.observe(stage);

    const onMotionPref = () => {
      const box = stage.getBoundingClientRect();
      syncPlaying(box.bottom > 0 && box.top < window.innerHeight);
    };
    motion.addEventListener("change", onMotionPref);

    return () => {
      io.disconnect();
      motion.removeEventListener("change", onMotionPref);
    };
  }, []);

  useEffect(() => {
    if (!live) return;
    let step = 0;
    const id = window.setInterval(() => {
      if (pinnedRef.current) {
        step = pinnedIndexRef.current;
        return;
      }
      if (walkDoneRef.current) {
        window.clearInterval(id);
        return;
      }
      step += 1;
      if (step >= 5) {
        setActive(5);
        setFiring(4);
        if (fireTimerRef.current) window.clearTimeout(fireTimerRef.current);
        fireTimerRef.current = window.setTimeout(() => setFiring(null), 720);
        walkDoneRef.current = true;
        window.clearInterval(id);
        return;
      }
      setActive(step);
      setFiring(step - 1);
      if (fireTimerRef.current) window.clearTimeout(fireTimerRef.current);
      fireTimerRef.current = window.setTimeout(() => setFiring(null), 720);
    }, 1000);
    return () => {
      window.clearInterval(id);
      if (fireTimerRef.current) window.clearTimeout(fireTimerRef.current);
    };
  }, [cycle, live]);

  const pin = (idx: number) => {
    pinnedRef.current = true;
    pinnedIndexRef.current = idx;
    goTo(idx);
  };

  const onStageLeave = () => {
    pinnedRef.current = false;
    if (walkDoneRef.current) {
      goTo(5);
      pinnedIndexRef.current = 5;
    }
  };

  const current = STAGES[active] ?? STAGES[0];

  return (
    <div
      ref={stageRef}
      className={`evo-path scroll-mt-24 mb-14 p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-50/70 border border-slate-200/80 shadow-xs${
        live ? " evo-path-live" : ""
      }${paused ? " evo-path-paused" : ""}`}
      onPointerLeave={onStageLeave}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onStageLeave();
        }
      }}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
        <div className="space-y-2 max-w-3xl">
          <span className="block text-sm font-bold text-blue-600">
            清晰的数字化演进路线
          </span>
          <span className="block font-mono text-[11px] tracking-widest text-slate-400">
            THE EVOLUTIONARY PATH
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug tracking-tight">
            系统不是散落的项目，而是从“传统记录”到“人机共事”的进化链路
          </h3>
        </div>
        <span className="text-sm text-slate-500 font-mono tabular-nums shrink-0">
          {current.step} / 06 · {current.title}
        </span>
      </div>

      <div className="h-1 bg-slate-200/90 rounded-full overflow-hidden mb-8">
        <div
          className="evo-progress-fill h-full origin-left bg-blue-600 rounded-full"
          style={{ transform: `scaleX(${(active + 1) / STAGES.length})` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {STAGES.map((stage, idx) => (
          <React.Fragment key={stage.step}>
            <div
              className="evo-card-slot relative h-full"
              style={{ ["--evo-delay" as string]: `${idx * 80}ms` }}
            >
              <button
                type="button"
                data-evo-idx={idx}
                aria-pressed={active === idx}
                aria-label={`第 ${stage.step} 步：${stage.title}。${stage.desc}`}
                onPointerEnter={() => pin(idx)}
                onFocus={() => pin(idx)}
                onClick={() => pin(idx)}
                className={`evo-card w-full h-full min-h-[220px] p-6 rounded-2xl flex flex-col text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                  stage.isHAFlow
                    ? "evo-card-haflow bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/20"
                    : "bg-white border border-slate-200/80 shadow-2xs"
                }${active === idx ? " is-active" : ""}`}
              >
                {stage.isHAFlow && <span className="evo-glow" aria-hidden />}
                {stage.isHAFlow && <span className="evo-sheen" aria-hidden />}

                <div className="relative z-10 flex items-center justify-between mb-4">
                  <span
                    className={`font-mono text-2xl font-bold tabular-nums tracking-tight ${
                      stage.isHAFlow ? "text-white/80" : "text-slate-300"
                    }`}
                  >
                    {stage.step}
                  </span>
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      stage.isHAFlow
                        ? "bg-white/15 text-white"
                        : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}
                  >
                    {stage.icon}
                  </span>
                </div>

                <h4
                  className={`relative z-10 text-xl font-bold mb-4 tracking-tight ${
                    stage.isHAFlow ? "text-white" : "text-slate-900"
                  }`}
                >
                  {stage.title}
                </h4>
                <p
                  className={`relative z-10 text-base leading-relaxed mb-6 flex-1 ${
                    stage.isHAFlow ? "text-blue-50" : "text-slate-600"
                  }`}
                >
                  {stage.desc}
                </p>
                <span
                  className={`relative z-10 text-sm px-3 py-2 rounded-md self-start ${
                    stage.isHAFlow
                      ? "bg-white text-blue-700 font-bold"
                      : "bg-blue-50 text-blue-700 border border-blue-100 font-medium"
                  }`}
                >
                  {stage.role}
                </span>
              </button>

              {idx % 3 !== 2 && idx < STAGES.length - 1 && (
                <span className="hidden lg:flex absolute top-1/2 left-full -translate-y-1/2 z-10">
                  <PathLink axis="h" beat={idx} firing={firing === idx} />
                </span>
              )}
              {idx % 2 === 0 && idx < STAGES.length - 1 && (
                <span className="hidden md:flex lg:hidden absolute top-1/2 left-full -translate-y-1/2 z-10">
                  <PathLink axis="h" beat={idx} firing={firing === idx} />
                </span>
              )}
              {idx < STAGES.length - 1 && (
                <span className="flex md:hidden absolute left-1/2 top-full -translate-x-1/2 z-10">
                  <PathLink axis="v" beat={idx} firing={firing === idx} />
                </span>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
