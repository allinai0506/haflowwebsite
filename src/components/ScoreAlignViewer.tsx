"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import "./ScoreAlignViewer.css";
import { SCORE_ALIGN_BODY_HTML } from "./score-align-body";
import { initScoreAlignViewer } from "./score-align-script";

/**
 * AI 评分标准解析 · 标书原文左右双屏联动查看器（静态高保真移植）
 * DOM/CSS/交互逻辑与 HTML 原型保持一致，仅做站内嵌入适配（固定高度卡片 + 作用域隔离）。
 * 确定性联动（focusClause / jumpToPage / switchPhase）保留在代码里；
 * 后续接 TypeSafe live 时，在这里按 citation_check 口径加 Choice 校验与 confidence 门禁。
 */
export function ScoreAlignViewer() {
  const shellRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    initScoreAlignViewer();
  }, []);

  useEffect(() => {
    const onChange = () => {
      setIsFullscreen(document.fullscreenElement === shellRef.current);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await shellRef.current?.requestFullscreen();
      }
    } catch {
      // 用户拒绝或浏览器不支持时保持内嵌态，不打断体验
    }
  }, []);

  return (
    <div ref={shellRef} className="score-align-demo-shell">
      <div className="score-align-demo-toolbar">
        <span className="score-align-demo-toolbar-title">
          AI 评分标准解析 · 双屏联动演示
        </span>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="score-align-demo-toolbar-btn"
        >
          {isFullscreen ? (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>退出全屏</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>全屏查看</span>
            </>
          )}
        </button>
      </div>
      <div className="score-align-demo-scroll">
        <div
          className="score-align-demo"
          dangerouslySetInnerHTML={{ __html: SCORE_ALIGN_BODY_HTML }}
        />
      </div>
    </div>
  );
}
