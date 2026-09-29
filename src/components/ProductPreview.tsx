"use client";

import { useEffect, useRef, useState } from "react";

export function ProductPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setScale(containerWidth / 1280);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        style={{
          width: "1280px",
          height: "860px",
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
  );
}
