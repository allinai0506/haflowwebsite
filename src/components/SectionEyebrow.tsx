import React from "react";

/**
 * 全站统一的分区眉题：白底蓝字 pill 胶囊。
 * Testimonials / OurBelief 的 pill 与此同语言（带图标的特例保留原样）。
 */
export function SectionEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-white border border-blue-100 rounded-full px-3.5 py-1.5 ${className}`}
    >
      {children}
    </span>
  );
}
