"use client";

import React, { useState } from "react";
import { CheckCircle2, Send, Loader2 } from "lucide-react";
import { TRAINING_OVERVIEW } from "@/data/training";
import { COMPANY_INFO } from "@/data/company";

export function TrainingBookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    companyOrRole: "",
    selectedSessions: ["1"],
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "reserved">("idle");

  const handleCheckbox = (numStr: string) => {
    if (formData.selectedSessions.includes(numStr)) {
      setFormData({
        ...formData,
        selectedSessions: formData.selectedSessions.filter((s) => s !== numStr),
      });
    } else {
      setFormData({
        ...formData,
        selectedSessions: [...formData.selectedSessions, numStr],
      });
    }
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.companyOrRole || "学员个人",
          contact: formData.contact,
          department: "每月免费培训公开课",
          problem: `申请预约参加培训场次：第 ${formData.selectedSessions.sort().join("、")} 场`,
          currentProcess: `学员身份/角色：${formData.companyOrRole || "未填写"}`,
        }),
      });
    } catch (err) {
      console.error("[Training Booking] submission error:", err);
    } finally {
      setSubmitting(false);
      setBookingStatus("reserved");
    }
  };

  return (
    <div id="booking" tabIndex={-1} className="my-14 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm scroll-mt-24 outline-none">
      <div className="max-w-2xl mb-8">
        <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
          在线登记预约
        </span>
        <h2 className="text-2xl font-bold text-slate-900">
          预约参加本期免费公开课
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          登记后，我们将在每周五下午向您的手机号或微信发送腾讯会议邀请链接与实操材料包。
        </p>
      </div>

      {bookingStatus === "idle" ? (
        <form onSubmit={handleBooking} className="space-y-6 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="training-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                您的姓名 <span className="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="training-name"
                required
                autoComplete="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="例如：王工 / 李经理"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="training-contact" className="block text-xs font-semibold text-slate-700 mb-1.5">
                手机号或微信号 <span className="text-rose-500" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="training-contact"
                required
                autoComplete="tel"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="接收会议室链接与讲义"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label htmlFor="training-role" className="block text-xs font-semibold text-slate-700 mb-1.5">
              企业名称或当前主要工作角色
            </label>
            <input
              type="text"
              id="training-role"
              value={formData.companyOrRole}
              onChange={(e) =>
                setFormData({ ...formData, companyOrRole: e.target.value })
              }
              placeholder="例如：某连锁餐饮营运主管 / 独立财务会计"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
            />
          </div>

          {/* Session check items */}
          <fieldset>
            <legend className="block text-xs font-semibold text-slate-700 mb-2">
              选择希望预约的场次（可多选）：
            </legend>
            <div className="space-y-2">
              {TRAINING_OVERVIEW.sessions.map((s) => (
                <label
                  key={s.sessionNumber}
                  className="flex items-center gap-3 p-3.5 min-h-[48px] rounded-xl border border-slate-200 hover:bg-slate-50 active:bg-slate-100 cursor-pointer text-xs sm:text-sm text-slate-800"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedSessions.includes(
                      String(s.sessionNumber)
                    )}
                    onChange={() => handleCheckbox(String(s.sessionNumber))}
                    className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500 w-5 h-5 shrink-0"
                  />
                  <span className="font-mono font-bold text-slate-500">
                    第 {s.sessionNumber} 场：
                  </span>
                  <span>{s.title}</span>
                  <span className="ml-auto text-[11px] text-slate-400 hidden sm:inline">
                    {s.dateStr}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[48px] rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 transition-colors shadow-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" aria-hidden="true" />
                <span>正在提交登记...</span>
              </>
            ) : (
              <>
                <span>提交免费预约登记</span>
                <Send className="w-4 h-4 text-white" aria-hidden="true" />
              </>
            )}
          </button>
        </form>
      ) : (
        <div role="status" className="p-6 rounded-2xl bg-blue-50 text-slate-900 border border-blue-200 space-y-4 max-w-2xl shadow-xs">
          <div className="flex items-center gap-2 text-blue-700">
            <CheckCircle2 className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <h4 className="text-base font-bold">预约登记已成功提交</h4>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            感谢您的参与！我们已为您登记（{formData.name || "学员"}，{formData.contact}）。开课前我们会通过短信或微信向您发送腾讯会议室链接与当堂讲义。
          </p>
          <div className="p-3.5 rounded-xl bg-white border border-blue-200 text-xs text-slate-800">
            您也可以直接添加共事课程助理微信：
            <strong className="text-blue-600 font-mono ml-1">
              {COMPANY_INFO.contact.wechat}
            </strong>
            （备注“免费培训”），助理将直接邀请您进入当周腾讯会议交流群并提前发送预习资料。
          </div>
          <button
            type="button"
            onClick={() => setBookingStatus("idle")}
            className="inline-flex items-center min-h-[44px] px-2 -ml-2 text-xs text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer"
          >
            返回修改登记信息
          </button>
        </div>
      )}
    </div>
  );
}
