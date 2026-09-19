import React from "react";
import type { Metadata } from "next";
import {
  Calendar,
  Clock,
  CheckCircle2,
  Video,
  HelpCircle,
  Users,
} from "lucide-react";
import { TRAINING_OVERVIEW } from "@/data/training";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrainingBookingForm } from "@/components/TrainingBookingForm";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  path: "/training",
  title: "企业AI免费培训_每月四场公益公开课",
  description:
    "共事智能每月四场免费公益培训：每周日上午11点，零基础业务人员与开发者可学。任务提示词、多Agent协作流水线、AICoding入门，完全免费。",
  keywords: [
    "企业AI培训",
    "免费AI公开课",
    "AI应用实战培训",
    "AI Coding入门",
    "多Agent协作",
    "共事智能培训",
    "HAFlow培训",
  ],
});

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "免费培训" }]} />

        {/* Page Hero */}
        <div className="py-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              公益科普 · 技能普惠
            </span>
            <span className="text-xs font-mono text-slate-500">
              每月4场 · 每周日上午 11:00
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            {TRAINING_OVERVIEW.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-6">
            {TRAINING_OVERVIEW.subtitle}
          </p>

          {/* Core Attitude Manifesto Box */}
          <div className="p-6 rounded-3xl bg-blue-50/70 text-slate-900 border border-blue-200 shadow-xs space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold block">
              共事的承诺与态度
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
              “{TRAINING_OVERVIEW.attitude}”
            </p>
          </div>
        </div>

        {/* Schedule & Format Bar */}
        <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <Calendar className="w-5 h-5 text-blue-600 mb-2" />
            <span className="text-xs text-slate-500 block">开讲周期</span>
            <span className="text-sm font-bold text-slate-900">每月固定 4 场</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <Clock className="w-5 h-5 text-blue-600 mb-2" />
            <span className="text-xs text-slate-500 block">开课时间</span>
            <span className="text-sm font-bold text-slate-900">周日上午 11:00</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <Video className="w-5 h-5 text-indigo-600 mb-2" />
            <span className="text-xs text-slate-500 block">授课方式</span>
            <span className="text-sm font-bold text-slate-900">线上直播 + 实操带练</span>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200">
            <Users className="w-5 h-5 text-teal-600 mb-2" />
            <span className="text-xs text-slate-500 block">收费与门槛</span>
            <span className="text-sm font-bold text-blue-700">100% 免费 · 零基础</span>
          </div>
        </div>

        {/* 4 Training Principles */}
        <div className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              课程特色
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              为什么这门培训适合普通业务人员？
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINING_OVERVIEW.principles.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold flex items-center justify-center text-xs mb-3">
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Syllabus (4 Sessions) */}
        <div className="my-12">
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
              教学大纲
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              四场系列实战培训内容
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              每一场独立成章，层层递进，从单个任务到多 Agent 协作，再到做出独立小应用。
            </p>
          </div>

          <div className="space-y-6">
            {TRAINING_OVERVIEW.sessions.map((session) => (
              <div
                key={session.sessionNumber}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col lg:flex-row items-start justify-between gap-8 shadow-xs"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-100 text-blue-700">
                      第 {session.sessionNumber} 场
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {session.dateStr} · {session.timeStr}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      时长：{session.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {session.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong>适合对象：</strong>{session.targetAudience}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-semibold text-slate-700 block">
                      本场核心讲授要点：
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {session.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      动手实操任务：
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {session.handsOnPractice}
                    </p>
                  </div>
                </div>

                {/* Right: Deliverable outcome box */}
                <div className="w-full lg:w-72 p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex flex-col justify-between shrink-0">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-blue-800 font-bold block mb-1">
                      本场学习结果
                    </span>
                    <p className="text-sm font-bold text-blue-950 leading-snug mb-4">
                      {session.coreDeliverable}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-blue-200/60 text-center">
                    <span className="inline-block w-full py-2 text-xs font-semibold text-blue-800 bg-blue-100 rounded-lg">
                      {session.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Form (Client Component) */}
        <TrainingBookingForm />

        {/* Past Sessions & Handouts */}
        <div className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              课程资料归档
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              往期讲义与复习提纲
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              每场直播结束后，核心实操步骤与思维导图提纲将在此处整理归档。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  《第一讲：日常工作任务结构化提示词模版.pdf》
                </span>
                <span className="text-[11px] text-slate-400">
                  状态：直播结束后统一开放下载
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded-sm bg-slate-200/80 text-slate-600">
                待发布
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  《第二讲：极简多 Agent 协作流水线排布手记.pdf》
                </span>
                <span className="text-[11px] text-slate-400">
                  状态：直播结束后统一开放下载
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded-sm bg-slate-200/80 text-slate-600">
                待发布
              </span>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="my-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10">
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span>关于免费培训的常见问题</span>
          </h3>

          <div className="space-y-4">
            {TRAINING_OVERVIEW.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  Q: {faq.q}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A: {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
