"use client";

import React, { useEffect, useState } from "react";
import { METHODOLOGY_DATA } from "@/data/methodology";
import { Compass, ChevronRight } from "lucide-react";

export function MethodologyChapterNav() {
  const [activeId, setActiveId] = useState<string>("c01");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const chapters = METHODOLOGY_DATA.chapters;

      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveId(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      // 键盘/读屏用户：把焦点移入章节标题，避免焦点滞留 pill
      const heading = el.querySelector("h2, h3, [tabindex]");
      if (heading instanceof HTMLElement) {
        if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      } else if (el instanceof HTMLElement) {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
    }
  };

  return (
    <nav
      aria-label="方法论核心章节快速导航"
      className="sticky top-16 sm:top-18 z-30 w-full py-2.5 bg-white/95 backdrop-blur-md border-y border-slate-200/80 shadow-2xs transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Label */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono font-bold text-slate-500 shrink-0">
          <Compass className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
          <span>8大核心章节目录</span>
          <ChevronRight className="w-3 h-3 text-slate-300" aria-hidden="true" />
        </div>

        {/* Scrollable Chapter Pills：横滑区对键盘可达，pill 命中 44px */}
        <div
          role="region"
          aria-label="章节横滑列表"
          tabIndex={0}
          className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg"
        >
          {METHODOLOGY_DATA.chapters.map((chapter) => {
            const isActive = activeId === chapter.id;
            return (
              <button
                key={chapter.id}
                type="button"
                onClick={() => scrollToChapter(chapter.id)}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 px-3.5 py-2.5 min-h-[44px] rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  isActive
                    ? "bg-blue-600 text-white font-bold shadow-xs shadow-blue-500/20"
                    : "bg-slate-100/80 hover:bg-slate-200/70 text-slate-700 hover:text-slate-900"
                }`}
              >
                <span>{chapter.shortNavLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Right Counter */}
        <div className="hidden lg:block text-[11px] font-mono font-medium text-slate-400 shrink-0">
          <span className="text-blue-600 font-bold">
            {METHODOLOGY_DATA.chapters.findIndex((c) => c.id === activeId) + 1}
          </span>
          <span> / {METHODOLOGY_DATA.chapters.length}</span>
        </div>
      </div>
    </nav>
  );
}
