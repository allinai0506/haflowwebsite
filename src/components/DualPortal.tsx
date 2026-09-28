import React from "react";
import Link from "next/link";
import { ArrowRight, Wrench, GraduationCap, CheckCircle2 } from "lucide-react";

export function DualPortal() {
  return (
    <section className="py-12 sm:py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-100 mb-3">
            <span>两种并列开始方式</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 mb-4">
            无论你选择哪种方式，我们都全力支持。
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            你可以直接把棘手的业务问题交给我们定制解决，也可以先参加我们每周日的免费培训。
            <br className="hidden sm:inline" />
            <strong className="text-slate-900 font-semibold">学会了自己做，我们也同样由衷欢迎。</strong>
          </p>
        </div>

        {/* Dual Entrance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Channel 1: Let Gongshi Solve (Clean White with Blue Accent) */}
          <div className="relative rounded-3xl border-2 border-blue-600/30 bg-blue-50/20 p-8 sm:p-10 flex flex-col justify-between shadow-lg shadow-blue-500/5">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Wrench className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200 tracking-wider uppercase">
                  方式一 · 专属定制
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-2">
                一个问题，一个应用
              </h3>
              <p className="text-xs font-mono text-blue-600 font-bold mb-5">
                让共事来诊断与落地
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                我们先诊断你的业务问题，再连接你已有的数据和系统，用 AI 做出一个能够真实运行的小应用。不搞大工程，两周内完成可用性验证。
              </p>

              <ul className="space-y-3 pt-4 border-t border-blue-100 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>针对性解决复杂报价、订货预测、标书质检等单一具体难题</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>无缝挂接现有 ERP、OA、财务系统，绝不要求推倒重来</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>资深工程团队全流程交付，提供持续业务调优与运维保障</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/diagnose"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-md shadow-blue-500/20"
              >
                <span>提交问题诊断</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/problems"
                className="inline-flex items-center justify-center py-3 px-5 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50/60 rounded-full border border-blue-200 transition-colors shadow-2xs"
              >
                <span>看看解决过什么问题</span>
              </Link>
            </div>
          </div>

          {/* Channel 2: Learn For Free First (Clean White with Green Accent) */}
          <div className="relative rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 flex flex-col justify-between hover:border-blue-200 transition-all shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 tracking-wider uppercase">
                  方式二 · 零门槛公益
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                每月四场免费培训
              </h3>
              <p className="text-xs font-mono text-emerald-700 font-bold mb-5">
                每周日上午 11:00 准时开讲 · 40分钟
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                如果暂时不放心，可以先参加我们的培训。面向零基础企业人，不推销产品、不堆砌术语。即使最后不购买共事的服务，学会以后决定自己做，我们也由衷欢迎。
              </p>

              <ul className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>第 1 场：别只和 AI 聊天，让它替你完成一个真实任务</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>第 2 场：一个 AI 不够，怎样让多个 Agent 一起工作</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>第 3 场：不会写代码，也能做出自己的专属业务小应用</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>第 4 场：把 AI 放进真实工作，而不是停在演示里</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/training"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shadow-sm"
              >
                <span>查看本月课表与预约</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>
              <span className="text-xs text-emerald-800 font-semibold text-center sm:text-left sm:px-2">
                100% 免费 · 零基础友好
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
