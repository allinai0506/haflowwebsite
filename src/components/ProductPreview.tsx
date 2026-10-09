"use client";

import { useEffect, useRef, useState } from "react";

// 工作台预览画布的原始设计尺寸（iframe 内容按此尺寸排版）
const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 860;
// 移动端若等比缩满宽度，10px 的正文会被压到约 3px 完全不可读。
// 因此窄屏保底一个可读缩放比，超出部分横向滑动查看。
const MIN_READABLE_SCALE = 0.65;
const MOBILE_BREAKPOINT = 768;

export function ProductPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const fitScale = containerWidth / DESIGN_WIDTH;
      // 窄屏取「可读下限」与「等比适配」的较大值
      setScale(
        containerWidth < MOBILE_BREAKPOINT
          ? Math.max(fitScale, MIN_READABLE_SCALE)
          : fitScale
      );
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const scaledWidth = DESIGN_WIDTH * scale;
  const scaledHeight = DESIGN_HEIGHT * scale;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-auto overflow-y-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      style={{ height: `${scaledHeight}px` }}
    >
      {/* 这一层承担"缩放后"的真实占位尺寸，宽度可超出容器以支持横向滑动 */}
      <div style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }}>
        <div
          style={{
            width: `${DESIGN_WIDTH}px`,
            height: `${DESIGN_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <iframe
            src="/haflow-workbench.html"
            title="HAFlow 工作台界面预览"
            className="w-[1280px] h-[860px] border-0 pointer-events-none select-none"
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
