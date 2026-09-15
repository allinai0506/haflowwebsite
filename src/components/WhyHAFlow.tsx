import React from "react";
import {
  ArrowDown,
  ArrowRight,
  User,
  Monitor,
  FileText,
  MessageSquare,
  Sparkles,
  Bot,
  CheckCircle2,
} from "lucide-react";

export function WhyHAFlow() {
  return (
    <section className="py-20 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Title & Subtitle */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
              - WHY HAFLOW
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              为什么需要 HAFlow？
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              AI 不应该只回答问题，而应该进入企业真实工作流。
            </p>
          </div>

          {/* Right Column: 3 Evolution Stages */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Stage 1: 过去 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-between text-center min-h-[260px] shadow-2xs">
              <span className="text-xs font-bold text-slate-400 font-mono mb-4">
                过去
              </span>

              <div className="flex flex-col items-center space-y-3 w-full my-auto">
                <div className="flex items-center gap-2 text-slate-700 text-xs font-medium">
                  <User className="w-5 h-5 text-blue-500" />
                  <span>人</span>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
                <div className="flex items-center gap-2 text-slate-700 text-xs font-medium">
                  <Monitor className="w-5 h-5 text-blue-500" />
                  <span>软件</span>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
                <div className="flex items-center gap-2 text-slate-700 text-xs font-medium">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <span>流程</span>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                纯手工搬运数据
              </div>
            </div>

            {/* Stage 2: AI 初期 */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col items-center justify-between text-center min-h-[260px] shadow-2xs">
              <span className="text-xs font-bold text-slate-400 font-mono mb-4">
                AI 初期
              </span>

              <div className="flex flex-col items-center space-y-3 w-full my-auto">
                <div className="flex items-center gap-2 text-slate-700 text-xs font-medium">
                  <User className="w-5 h-5 text-blue-500" />
                  <span>人</span>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
                <div className="flex items-center gap-2 text-slate-700 text-xs font-medium">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <span>聊天框</span>
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
                <div className="flex items-center gap-2 text-slate-700 text-xs font-medium">
                  <Sparkles className="w-5 h-5 text-cyan-500" />
                  <span>AI 给答案</span>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                仅作文字参考无法执行
              </div>
            </div>

            {/* Stage 3: 现在 · HAFlow (Highlighted Active Card) */}
            <div className="bg-blue-50/40 rounded-2xl border-2 border-blue-500/80 p-6 flex flex-col items-center justify-between text-center min-h-[260px] shadow-md shadow-blue-500/5 relative ring-2 ring-blue-500/10">
              <span className="text-xs font-bold text-blue-600 font-mono mb-4 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>现在 · HAFlow</span>
              </span>

              <div className="flex items-center justify-center gap-2.5 w-full my-auto">
                {/* Left: 人 + Agent */}
                <div className="flex flex-col items-center space-y-2.5">
                  <div className="flex items-center gap-1.5 text-slate-800 text-xs font-semibold">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>人</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-800 text-xs font-semibold">
                    <Bot className="w-5 h-5 text-blue-600" />
                    <span>Agent</span>
                  </div>
                </div>

                {/* Bracket symbol */}
                <span className="text-2xl font-thin text-blue-400 select-none">
                  &#125;
                </span>

                {/* Middle: 工作流 */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 mt-1">
                    工作流
                  </span>
                </div>

                {/* Arrow */}
                <ArrowRight className="w-4 h-4 text-blue-500" />

                {/* Right: 业务结果 */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 mt-1">
                    业务结果
                  </span>
                </div>
              </div>

              <div className="w-full pt-3 border-t border-blue-200/60 text-[11px] text-blue-800 font-medium">
                让人与 Agent 共同把事情做完
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
