"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  AlertCircle,
  MessageSquare,
  Loader2,
  ArrowRight,
  RotateCcw,
  Check,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

const INITIAL_FORM_DATA = {
  name: "",
  company: "",
  contact: "",
  department: "",
  problem: "",
  currentProcess: "",
  systemsAndDocs: "",
  expectedOutcome: "",
  riskAndHumanRole: "",
};

export function DiagnoseForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [leadId, setLeadId] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setLeadId(data.leadId || "");
        setSubmittedStatus("success");
      } else {
        setErrorMessage(data.error || "提交异常，请稍后重试或直接联系专属顾问。");
        setSubmittedStatus("error");
      }
    } catch (err) {
      console.error("[DiagnoseForm] Submission network error:", err);
      setErrorMessage("网络连接失败，请检查网络连接后重试，或直接拨打技术顾问热线。");
      setSubmittedStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmittedStatus("idle");
    setErrorMessage("");
    setLeadId("");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
      {submittedStatus === "idle" || submittedStatus === "error" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              填写您的业务痛点
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              请尽可能具体地描述一个当前最耗时、最依赖人工经验的具体环节。我们将在 1 个工作日内由资深顾问给出可行性诊断与实施路径。
            </p>
          </div>

          {/* Error Banner */}
          {submittedStatus === "error" && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong className="font-bold text-rose-950 block text-sm mb-0.5">
                  提交遇到问题
                </strong>
                {errorMessage}
              </div>
            </div>
          )}

          {/* Contact Base Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                您的姓名 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="例如：张先生 / 李女士"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                企业 / 机构全称 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="例如：某国际供应链物流有限公司"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                手机号或微信号 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="contact"
                required
                value={formData.contact}
                onChange={handleChange}
                placeholder="便于接收诊断报告与方案沟通"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                所属部门 / 业务条线
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="例如：财务部 / 招投标商务部 / 营运调度"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>

          {/* Problem Breakdown Fields */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                1. 想解决的具体业务问题是什么？ <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="problem"
                required
                rows={3}
                value={formData.problem}
                onChange={handleChange}
                placeholder="例如：我们每次做欧洲航线大件报价，涉及起运港、班列舱位和目的港清关多项变动杂费，业务员手工算表耗时 40 分钟，还经常漏算导致倒亏..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                2. 目前工作中是怎样处理的？最耗时的是哪一步？
              </label>
              <textarea
                name="currentProcess"
                rows={2}
                value={formData.currentProcess}
                onChange={handleChange}
                placeholder="例如：目前全靠 2 名老调度员肉眼对照船司通函与 Excel 表格手工核算，每天处理 30 笔询盘就严重饱和..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  3. 涉及哪些现有系统与文档材料？
                </label>
                <input
                  type="text"
                  name="systemsAndDocs"
                  value={formData.systemsAndDocs}
                  onChange={handleChange}
                  placeholder="例如：用友ERP、本地网盘PDF通告、微信群"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  4. 希望取得的理想交付结果是什么？
                </label>
                <input
                  type="text"
                  name="expectedOutcome"
                  value={formData.expectedOutcome}
                  onChange={handleChange}
                  placeholder="例如：单笔报价缩短至3分钟内，杂费漏算率降到1%以下"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-base sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Privacy & Honesty Statement */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-700">共事隐私与商业道德承诺：</span>
            本表单信息仅用于本次可行性诊断技术评估，严守商业机密，绝不向任何第三方泄露，更不用于公共 AI 模型训练。
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>正在提交评估需求...</span>
              </>
            ) : (
              <>
                <span>提交业务问题评估</span>
                <Send className="w-4 h-4 text-white" />
              </>
            )}
          </button>
        </form>
      ) : (
        /* Real Success State with Confirmation Receipt */
        <div className="py-4 space-y-6 text-left animate-in fade-in duration-300">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-base sm:text-lg font-bold text-emerald-950">
                  业务诊断需求已成功提交！
                </h4>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-900">
                  已分配技术顾问
                </span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                感谢您的信任。共事团队已收到您的问题描述，并已自动完成存盘。我们将在 <strong>1 个工作日内</strong> 组织行业顾问进行可行性初步评估，并通过您预留的联系方式与您联系。
              </p>
            </div>
          </div>

          {/* Submitted Summary Receipt */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <span className="font-bold text-slate-800 text-sm">
                诊断需求回执单
              </span>
              {leadId && (
                <span className="font-mono text-slate-400 text-[11px]">
                  线索单号: {leadId}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 pt-1">
              <p><strong>企业全称：</strong>{formData.company}</p>
              <p><strong>联系人：</strong>{formData.name}（{formData.contact}）</p>
              {formData.department && <p><strong>所属部门：</strong>{formData.department}</p>}
              {formData.expectedOutcome && <p><strong>期望结果：</strong>{formData.expectedOutcome}</p>}
            </div>
            <div className="text-slate-600 pt-1 border-t border-slate-200/60">
              <strong className="block text-slate-700 mb-1">具体问题描述：</strong>
              <p className="p-2.5 rounded-lg bg-white border border-slate-200 leading-relaxed whitespace-pre-wrap text-slate-700">
                {formData.problem}
              </p>
            </div>
          </div>

          {/* Urgent Fast-Track Contact Channel */}
          <div className="p-5 rounded-2xl bg-blue-50/80 text-slate-900 border border-blue-200 space-y-3 shadow-xs">
            <h5 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>需要紧急沟通？直通顾问微信与电话</span>
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              若您的需求涉及近期紧急投标、月度结账或核心系统升级，您也可以直接通过以下渠道联系技术顾问，告知您的企业名称即可享受快速诊断通道：
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1 text-xs">
              <div className="px-3.5 py-2 rounded-lg bg-white border border-blue-100 shadow-xs">
                <span className="text-slate-500 block text-[11px]">顾问微信：</span>
                <span className="font-mono font-bold text-blue-700">{COMPANY_INFO.contact.wechat}</span>
              </div>
              <div className="px-3.5 py-2 rounded-lg bg-white border border-blue-100 shadow-xs">
                <span className="text-slate-500 block text-[11px]">咨询热线：</span>
                <a
                  href={`tel:${COMPANY_INFO.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-mono font-bold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  {COMPANY_INFO.contact.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>提交另一个业务问题</span>
            </button>
            <div className="flex items-center gap-3">
              <Link
                href="/cases"
                className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
              >
                <span>查看其他客户落地案例</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
