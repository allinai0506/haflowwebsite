import React from "react";

export function OurBeliefBanner() {
  return (
    <section className="relative py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-blue-50/70 via-white to-white border-t border-slate-100 overflow-hidden">
      {/* 浅色装饰：两团淡蓝光晕，替代原来的暗夜山形 SVG */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 sm:w-96 sm:h-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -bottom-32 right-0 w-56 h-56 sm:w-[28rem] sm:h-[28rem] rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Belief manifesto */}
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-flex items-center text-xs font-mono font-bold tracking-widest text-blue-700 bg-white border border-blue-100 rounded-full px-3.5 py-1.5 uppercase">
              Our Belief
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-950">
              更大的可能，
              <br />
              始于更好的<span className="text-blue-600">共事</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              我们相信，人与 Agent
              的协同不只是提升效率，更是释放创造力。
            </p>
          </div>

          {/* Right Column: Quote Card */}
          <div className="lg:col-span-6 flex items-start justify-center lg:justify-end">
            <figure className="relative max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-blue-200 shadow-lg shadow-blue-500/10">
              <span
                className="text-4xl sm:text-5xl font-serif text-blue-200 block leading-none select-none mb-2"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="text-lg sm:text-xl font-medium text-blue-950 leading-relaxed pr-4">
                未来的组织，不是被 AI 取代的人，而是懂得与 AI 共事的人。
              </blockquote>
              <span
                className="text-4xl sm:text-5xl font-serif text-blue-200 block text-right leading-none select-none mt-2"
                aria-hidden="true"
              >
                ”
              </span>
              <figcaption className="mt-4 pt-4 border-t border-dashed border-blue-100 text-xs text-slate-500">
                —— 共事智能
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
