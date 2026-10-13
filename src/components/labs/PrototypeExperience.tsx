"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";

const SOURCE = "/labs/enterprise-runtime-v1.html";

export function PrototypeExperience() {
  const container = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (frame.current?.contentDocument?.readyState === "complete") setLoaded(true);
    const sync = () => setExpanded(document.fullscreenElement === container.current);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.fullscreenElement) setExpanded(false);
    };
    document.addEventListener("fullscreenchange", sync);
    window.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      window.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);

  async function toggleFullscreen() {
    if (expanded) {
      if (document.fullscreenElement) await document.exitFullscreen();
      setExpanded(false);
      return;
    }
    try {
      if (container.current?.requestFullscreen) await container.current.requestFullscreen();
      setExpanded(true);
    } catch {
      setExpanded(true);
    }
  }

  return (
    <div ref={container} id="experience" className={`${expanded ? "fixed inset-0 z-[100] flex h-dvh flex-col" : "scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200"} bg-white`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
        <div><h2 className="text-sm font-semibold text-slate-900">产品主界面 · 直接操作</h2><p className="mt-1 text-xs text-slate-500">交互原型 / 模拟业务数据</p></div>
        <div className="flex items-center gap-3 text-xs font-medium">
          <button type="button" onClick={toggleFullscreen} aria-pressed={expanded} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-blue-600">{expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}{expanded ? "退出全屏" : "全屏体验"}</button>
          <a href={SOURCE} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-slate-600 hover:bg-slate-100">独立打开 <ExternalLink size={14} /></a>
        </div>
      </div>
      {!loaded && <p role="status" className="px-6 py-3 text-sm text-slate-500">正在加载交互原型…</p>}
      <iframe ref={frame} src={SOURCE} title="HAFlow 下一代企业运行空间交互原型" onLoad={() => setLoaded(true)} allow="fullscreen" className={expanded ? "min-h-0 w-full flex-1 border-0" : "h-[80dvh] min-h-[600px] w-full border-0 sm:min-h-[760px]"} />
    </div>
  );
}
