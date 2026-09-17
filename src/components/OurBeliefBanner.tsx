import React from "react";

export function OurBeliefBanner() {
  return (
    <section className="relative py-20 lg:py-24 bg-slate-950 text-white overflow-hidden">
      {/* Serene Mountain Night Landscape - Pure SVG vector & CSS gradients, zero network dependency */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none flex items-end">
        <svg viewBox="0 0 1440 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-slate-700">
          <path d="M0 280L80 180L180 210L320 120L460 190L600 100L740 170L880 80L1020 150L1160 110L1300 180L1440 130V280H0Z" fill="currentColor" opacity="0.5" />
          <path d="M0 280L120 160L260 200L400 90L540 170L680 70L820 140L960 60L1100 130L1240 90L1380 160L1440 120V280H0Z" fill="currentColor" opacity="0.8" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/80 pointer-events-none z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Belief manifesto */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 block uppercase">
              OUR BELIEF
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              更大的可能，始于更好的
              <span className="whitespace-nowrap">共事</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              我们相信，人与 Agent 的协同，不只是提升效率，更是释放创造力，让企业拥有面向未来的能力。
            </p>
          </div>

          {/* Right Column: Glassmorphic Quote Card on Dark */}
          <div className="lg:col-span-6 flex items-start justify-center lg:justify-end">
            <div className="relative max-w-lg p-6 sm:p-8 rounded-3xl bg-white/[0.06] backdrop-blur-md border border-white/10 shadow-2xl">
              <span className="text-4xl sm:text-5xl font-serif text-slate-400 block leading-none select-none mb-2">
                “
              </span>
              <p className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed italic pr-4">
                未来的组织，不是被 AI 取代的人，而是懂得与 AI 共事的人。
              </p>
              <span className="text-4xl sm:text-5xl font-serif text-slate-400 block text-right leading-none select-none mt-2">
                ”
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
