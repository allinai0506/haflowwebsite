"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Workflow,
  Database,
  BookOpen,
  Wrench,
  User,
  Users,
} from "lucide-react";

function FlowConnector({
  direction,
  beat,
}: {
  direction: "down" | "up";
  beat: 1 | 2 | 3;
}) {
  const Icon = direction === "down" ? ArrowDown : ArrowUp;
  return (
    <div
      className={`haflow-flow-connector haflow-flow-${direction} haflow-beat-${beat}`}
      aria-hidden
    >
      <span className="haflow-flow-rail" />
      <span className="haflow-flow-packet" />
      <Icon className="haflow-flow-chevron" strokeWidth={2.25} />
    </div>
  );
}

export function WhatIsHAFlow() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let wasPlaying = false;
    const restartStory = () => {
      stage.classList.remove("haflow-diagram-live");
      void stage.offsetWidth;
      stage.classList.add("haflow-diagram-live");
    };
    const syncPlaying = (visible: boolean) => {
      const play = visible && !motion.matches;
      if (play && !wasPlaying) restartStory();
      stage.classList.toggle("haflow-diagram-paused", !play);
      if (!play) stage.classList.remove("haflow-diagram-live");
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

  const coreElements = [
    { label: "流程", icon: <Workflow className="w-5 h-5 text-blue-600" /> },
    { label: "数据", icon: <Database className="w-5 h-5 text-blue-600" /> },
    { label: "知识", icon: <BookOpen className="w-5 h-5 text-blue-600" /> },
    { label: "工具", icon: <Wrench className="w-5 h-5 text-blue-600" /> },
    { label: "人员", icon: <User className="w-5 h-5 text-blue-600" /> },
    { label: "组织", icon: <Users className="w-5 h-5 text-blue-600" /> },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
              - WHAT IS HAFLOW
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              HAFlow 是什么？
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              HAFlow 不是一个聊天机器人，也不是一个单独的 Agent。它是一套把企业任务拆成工作流，让人和不同 Agent 共同参与，并最终工程化落地为业务系统的方法与底座。
            </p>

            <div>
              <Link
                href="/haflow"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50/60 rounded-full border border-blue-200 transition-colors shadow-2xs cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              >
                <span>了解 HAFlow</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div
            ref={stageRef}
            className="haflow-diagram lg:col-span-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-50/50 p-6 sm:p-10 rounded-3xl border border-slate-100"
          >
            <p className="sr-only">
              示意图：业务目标经业务流程流入 HAFlow，真实业务系统从下方接入。入视后汇流一次，随后中枢保持轻呼吸。文字保持静止。
            </p>

            <div className="flex-1 w-full max-w-md flex flex-col items-center space-y-3">
              <div className="w-full max-w-xs py-2.5 px-6 rounded-xl bg-blue-50/80 text-blue-950 text-center font-bold text-sm border border-blue-100/80 shadow-2xs">
                业务目标
              </div>

              <FlowConnector direction="down" beat={1} />

              <div className="w-full max-w-xs py-2.5 px-6 rounded-xl bg-blue-50/80 text-blue-950 text-center font-bold text-sm border border-blue-100/80 shadow-2xs">
                业务流程
              </div>

              <FlowConnector direction="down" beat={2} />

              <div className="haflow-hub relative w-full rounded-2xl bg-white border border-blue-200/80 p-6 text-center shadow-md shadow-blue-500/5 ring-1 ring-blue-500/10">
                <span className="haflow-hub-ring" aria-hidden />
                <div className="relative flex items-center justify-center gap-2 mb-2">
                  <div className="h-7 w-auto relative flex items-center justify-center">
                    <Image
                      src="/logo-icon.png"
                      alt="HAFlow Logo"
                      width={52}
                      height={28}
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                    HAFlow
                  </span>
                </div>

                <div className="relative text-sm font-semibold text-blue-600 mb-3 font-mono">
                  人 + Agent + Workflow
                </div>

                <div className="relative text-xs text-slate-500 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  <span>任务分解</span>
                  <span className="text-slate-300">|</span>
                  <span>多智能体协同</span>
                  <span className="text-slate-300">|</span>
                  <span>人机协作</span>
                  <span className="text-slate-300">|</span>
                  <span>执行闭环</span>
                </div>
              </div>

              <FlowConnector direction="up" beat={3} />

              <div className="w-full max-w-xs py-2.5 px-6 rounded-xl bg-blue-50/80 text-blue-950 text-center font-bold text-sm border border-blue-100/80 shadow-2xs">
                真实业务系统
              </div>
            </div>

            <div className="w-full md:w-56 shrink-0 border-t md:border-t-0 md:border-l border-slate-200/80 pt-6 md:pt-0 md:pl-8">
              <h3 className="text-sm font-bold text-slate-900 mb-4 text-center md:text-left">
                覆盖企业核心要素
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {coreElements.map((el, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-slate-100 flex flex-col items-center justify-center gap-1.5 shadow-2xs hover:border-blue-200 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50/80 flex items-center justify-center">
                      {el.icon}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      {el.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
