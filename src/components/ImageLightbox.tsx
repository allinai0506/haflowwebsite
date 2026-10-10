"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ZoomOut } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  /** 触发放大��图片缩略信息（caption），显示在底部 */
  caption?: string;
}

/**
 * 路线图类宽图在窄屏不可读，点击可全屏查看。
 * 遵循 DESIGN.md：遮罩用深色（对话框场景而非内容区块），内容区无深色底。
 * 支持 Esc 关闭、点击背景关闭、打开时锁定 body 滚动。
 */
export function ImageLightbox({ src, alt, caption }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`放大查看：${alt}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-slate-200"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full h-auto" />
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <ZoomOut className="w-3.5 h-3.5" />
          <span>点击放大</span>
        </span>
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex flex-col bg-slate-950/92 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div className="flex items-center justify-between px-4 py-3 shrink-0">
              <span className="text-xs text-slate-300 line-clamp-1 pr-4">{caption ?? alt}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white bg-white/10 hover:bg-white/20 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div
              className="flex-1 overflow-auto px-4 pb-6 flex items-start justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="max-w-none w-auto h-auto rounded-lg"
                style={{ minWidth: "min(100%, 1100px)" }}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}