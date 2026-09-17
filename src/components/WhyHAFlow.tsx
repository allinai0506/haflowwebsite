"use client";

import React, { useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowRight,
  User,
  Monitor,
  FileText,
  MessageSquare,
  Sparkles,
  Bot,
  CheckCircle2,
} from "lucide-react";

function StackArrow({ beat }: { beat: 1 | 2 | 3 | 4 }) {
  return (
    <span className={`why-chain why-chain-b${beat}`} aria-hidden>
      <span className="why-chain-rail" />
      <span className="why-chain-packet" />
      <ArrowDown className="why-chain-chevron w-3.5 h-3.5 text-slate-300" />
    </span>
  );
}

export function WhyHAFlow() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let wasPlaying = false;
    const restartStory = () => {
      stage.classList.remove("why-haflow-live");
      void stage.offsetWidth;
      stage.classList.add("why-haflow-live");
    };
    const syncPlaying = (visible: boolean) => {
      const play = visible && !motion.matches;
      if (play && !wasPlaying) restartStory();
      stage.classList.toggle("why-haflow-paused", !play);
      if (!play) stage.classList.remove("why-haflow-live");
      wasPlaying = play;
    };

    const io = new IntersectionObserver(
      ([entry]) => syncPlaying(entry.isIntersecting),
      { threshold: 0.12 },
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

  return (
    <section className="py-20 bg-slate-50/60 border-t border-slate-100">
      <p className="sr-only">
        示意图：过去与 AI 初期是人到工具的单向传递，入视后下行一次即停；现在人与 Agent 持续进入工作流并交付业务结果。
      </p>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
              - WHY HAFLOW
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              为什么需要 HAFlow？
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              AI 不应该只回答问题，而应该进入企业真实工作流。
            </p>
          </div>

          <div
            ref={stageRef}
            className="why-haflow lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5"
          >
            <div className="why-card bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-between text-center min-h-[260px] shadow-2xs">
              <span className="text-xs font-bold text-slate-400 font-mono mb-4">
                过去
              </span>

              <div className="flex flex-col items-center space-y-3 w-full my-auto">
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <User className="w-5 h-5 text-blue-500" />
                  <span>人</span>
                </div>
                <StackArrow beat={1} />
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <Monitor className="w-5 h-5 text-blue-500" />
                  <span>软件</span>
                </div>
                <StackArrow beat={2} />
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <span>流程</span>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-slate-100 text-xs text-slate-400">
                纯手工搬运数据
              </div>
            </div>

            <div className="why-card bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-between text-center min-h-[260px] shadow-2xs">
              <span className="text-xs font-bold text-slate-400 font-mono mb-4">
                AI 初期
              </span>

              <div className="flex flex-col items-center space-y-3 w-full my-auto">
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <User className="w-5 h-5 text-blue-500" />
                  <span>人</span>
                </div>
                <StackArrow beat={3} />
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <span>聊天框</span>
                </div>
                <StackArrow beat={4} />
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <Sparkles className="w-5 h-5 text-cyan-500" />
                  <span>AI 给答案</span>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-slate-100 text-xs text-slate-400">
                仅作文字参考无法执行
              </div>
            </div>

            <div className="why-card why-card-now bg-blue-50/40 rounded-2xl border-2 border-blue-500/80 p-6 flex flex-col items-center justify-between text-center min-h-[260px] shadow-md shadow-blue-500/5 relative ring-2 ring-blue-500/10">
              <span className="text-xs font-bold text-blue-600 font-mono mb-4 flex items-center gap-1.5">
                <span className="why-now-dot w-2 h-2 rounded-full bg-blue-600" />
                <span>现在 · HAFlow</span>
              </span>

              <div className="flex items-center justify-center gap-2.5 w-full my-auto">
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="flex items-center gap-1.5 text-slate-800 text-sm font-semibold">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>人</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-800 text-sm font-semibold">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span>Agent</span>
                  </div>
                </div>

                <span className="text-2xl font-thin text-blue-400 select-none">
                  &#125;
                </span>

                <div className="flex flex-col items-center">
                  <div className="why-now-flow w-10 h-10 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 mt-1 whitespace-nowrap">
                    工作流
                  </span>
                </div>

                <span className="why-now-track" aria-hidden>
                  <span className="why-now-rail" />
                  <span className="why-now-packet" />
                  <ArrowRight className="why-now-chevron w-4 h-4 text-blue-500" />
                </span>

                <div className="flex flex-col items-center">
                  <div className="why-now-result-icon w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-emerald-800 mt-1 whitespace-nowrap">
                    业务结果
                  </span>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-blue-200/60 text-xs text-blue-800 font-medium">
                让人与 Agent 共同把事情做完
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
