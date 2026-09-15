import React from "react";
import Image from "next/image";

export function OurBeliefBanner() {
  return (
    <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
      {/* Background Mountain Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
          alt="Mountain background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 mix-blend-luminosity filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Belief manifesto */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 block uppercase">
              OUR BELIEF
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              更大的可能，始于更好的共事
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              我们相信，人与 Agent 的协同，不只是提升效率，更是释放创造力，让企业拥有面向未来的能力。
            </p>
          </div>

          {/* Right Column: Quote */}
          <div className="lg:col-span-6 flex items-start justify-center lg:justify-end">
            <div className="relative max-w-lg p-6 sm:p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
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
