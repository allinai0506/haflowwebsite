"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

const RING_WORDS = [
  { id: "goal", label: "目标", left: "50%", top: "22%" },
  { id: "think", label: "思考", left: "21.5%", top: "61%" },
  { id: "collab", label: "协作", left: "71%", top: "29%" },
  { id: "create", label: "创造", left: "72%", top: "70%" },
  { id: "do", label: "执行", left: "50%", top: "78%" },
] as const;

export function InfinityHeroVisual() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlaying = (visible: boolean) => {
      stage.classList.toggle("hero-flow-paused", !(visible && !motion.matches));
    };

    const io = new IntersectionObserver(
      ([entry]) => syncPlaying(entry.isIntersecting),
      { threshold: 0.12 },
    );
    io.observe(stage);

    const onMotion = () => {
      const box = stage.getBoundingClientRect();
      syncPlaying(box.bottom > 0 && box.top < window.innerHeight);
    };
    motion.addEventListener("change", onMotion);
    onMotion();

    return () => {
      io.disconnect();
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const stage = stageRef.current;
    if (!stage || stage.classList.contains("hero-flow-paused")) return;
    const box = stage.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    stage.style.setProperty("--tilt-x", `${(py * -6).toFixed(2)}deg`);
    stage.style.setProperty("--tilt-y", `${(px * 8).toFixed(2)}deg`);
  };

  const onPointerLeave = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--tilt-x", "0deg");
    stage.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="hero-flow-stage relative w-full max-w-[880px] mx-auto select-none flex items-center justify-center overflow-hidden sm:overflow-visible"
    >
      <p className="sr-only">
        示意图：人与智能体一次性汇入中心共事，再回到左右。目标、思考、协作、创造、执行保持静止。
      </p>
      <div className="hero-flow-blob hero-flow-blob-a" aria-hidden />

      <div className="hero-orbit relative w-full aspect-[1200/896] max-h-[560px] flex items-center justify-center">
        <div className="hero-ring-spin absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image
            src="/irregular-flow-ring.webp"
            alt="HAFlow人机共事流程图_人和Agent协同"
            width={960}
            height={717}
            priority
            sizes="(max-width: 1024px) 100vw, 640px"
            className="w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(37,99,235,0.12)]"
          />
        </div>

        <svg
          viewBox="0 0 1200 896"
          className="absolute inset-0 z-10 w-full h-full pointer-events-none overflow-visible"
          aria-hidden
        >
          <path
            className="hero-collab-rail"
            d="M 400 378 C 460 405 500 425 500 438"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            className="hero-collab-rail"
            d="M 820 428 C 760 440 740 442 724 438"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {RING_WORDS.map((word) => (
          <div
            key={word.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 font-bold text-slate-900 text-xs sm:text-sm tracking-wide whitespace-nowrap"
            style={{ left: word.left, top: word.top }}
          >
            <span className="bg-white/90 backdrop-blur-sm px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg shadow-sm border border-slate-100">
              {word.label}
            </span>
          </div>
        ))}

        <div className="hero-merge-human absolute z-20 cursor-pointer">
          <div className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-white/95 via-white/85 to-blue-50/80 backdrop-blur-md border border-white/90 shadow-[0_8px_25px_rgba(37,99,235,0.18)] flex flex-col items-center justify-center p-1.5 sm:p-3 text-center group transition-transform duration-300 hover:scale-105">
            <div className="absolute top-1.5 sm:top-2 left-2 sm:left-4 w-5 sm:w-8 h-2.5 sm:h-4 rounded-full bg-gradient-to-b from-white to-transparent opacity-80" />
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 mb-0.5 sm:mb-1 shadow-[0_0_8px_rgba(37,99,235,0.6)] hero-flow-node-dot" />
            <span className="text-[10px] sm:text-sm font-semibold tracking-wider text-slate-500 uppercase">
              Human
            </span>
            <span className="text-sm sm:text-2xl font-black text-slate-900 mt-0.5 group-hover:text-blue-600 transition-colors">
              人
            </span>
          </div>
        </div>

        <div className="hero-merge-agent absolute z-20 cursor-pointer">
          <div className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-white/95 via-white/85 to-cyan-50/80 backdrop-blur-md border border-white/90 shadow-[0_8px_25px_rgba(2,132,199,0.18)] flex flex-col items-center justify-center p-1.5 sm:p-3 text-center group transition-transform duration-300 hover:scale-105">
            <div className="absolute top-1.5 sm:top-2 left-2 sm:left-4 w-5 sm:w-8 h-2.5 sm:h-4 rounded-full bg-gradient-to-b from-white to-transparent opacity-80" />
            <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-500 mb-0.5 sm:mb-1 shadow-[0_0_8px_rgba(6,182,212,0.6)] hero-flow-node-dot" />
            <span className="text-[10px] sm:text-sm font-semibold tracking-wider text-cyan-600 uppercase">
              Agent
            </span>
            <span className="text-sm sm:text-2xl font-black text-slate-900 mt-0.5 group-hover:text-cyan-600 transition-colors">
              智能体
            </span>
          </div>
        </div>

        <div className="hero-merge-core absolute z-30 cursor-pointer">
          <div className="hero-flow-core relative px-3 py-1.5 sm:px-6 sm:py-3.5 rounded-full bg-white/95 backdrop-blur-lg border border-blue-100/90 shadow-[0_10px_30px_rgba(15,23,42,0.12)] flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105">
            <span className="text-[9px] sm:text-xs font-bold tracking-widest text-slate-500 uppercase">
              In Flow
            </span>
            <span className="text-sm sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 mt-0.5">
              共事
            </span>
          </div>
        </div>

        <div className="hidden sm:flex absolute -bottom-2 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-100 shadow-sm text-xs font-semibold text-slate-700 items-center gap-2 select-none z-10">
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>更高效的组织 · 源于更好的共事方式</span>
        </div>
      </div>
    </div>
  );
}
