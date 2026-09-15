"use client";

import React, { useState } from "react";
import {
  Send,
  AlertCircle,
  Copy,
  Check,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  MessageSquare,
  Building2,
  Mail,
  Phone,
  User,
  Layers,
} from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

export function DiagnoseForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    contact: "",
    department: "",
    problem: "",
    currentProcess: "",
    systemsAndDocs: "",
    expectedOutcome: "",
    riskAndHumanRole: "",
  });

  const [submittedStatus, setSubmittedStatus] = useState<"idle" | "pending_config">("idle");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Honest handling: no fake backend call, show clear pending state with copyable summary
    console.log("Diagnose form submission intent:", formData);
    setSubmittedStatus("pending_config");
  };

  const copySummary = () => {
    const text = `【共事智能 · 业务诊断意向】\n姓名：${formData.name || "未填"}\n公司：${
      formData.company || "未填"
    }\n联系方式：${formData.contact || "未填"}\n所属部门：${
      formData.department || "未填"
    }\n想解决的问题：${formData.problem || "未填"}\n目前处理方式：${
      formData.currentProcess || "未填"
    }\n涉及系统与资料：${formData.systemsAndDocs || "未填"}\n期望达成的结果：${
      formData.expectedOutcome || "未填"
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
      {submittedStatus === "idle" ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              填写您的业务痛点
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              请尽可能具体地描述一个当前最耗时、最依赖人工经验的具体环节。我们将在 1 个工作日内由资深顾问给出可行性诊断与实施路径。
            </p>
          </div>

          {/* Contact Base Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                您的姓名 <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="例如：张先生 / 李女士"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 leading-relaxed"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 leading-relaxed"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 transition-colors shadow-xs"
          >
            <span>提交业务问题评估</span>
            <Send className="w-4 h-4 text-emerald-400" />
          </button>
        </form>
      ) : (
        /* Honest Pending Integration State - Do not forge fake success */
        <div className="py-6 space-y-6 text-center sm:text-left">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="font-bold text-amber-950 block text-sm mb-1">
                【表单待正式接入状态说明】
              </strong>
              根据共事工程规范，当前演示阶段线上提交服务尚未绑定生产数据库接口，因此系统不作虚假“提交成功”伪装。您的输入内容已安全暂存在当前浏览器中。
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">
                您所填写的业务诊断内容预览：
              </span>
              <button
                type="button"
                onClick={copySummary}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>已复制到剪贴板</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>一键复制信息</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-600"><strong>企业：</strong>{formData.company || "未填写"}</p>
            <p className="text-slate-600"><strong>联系人：</strong>{formData.name || "未填写"}（{formData.contact || "未填写"}）</p>
            <p className="text-slate-600"><strong>想解决的问题：</strong>{formData.problem || "未填写"}</p>
            <p className="text-slate-600"><strong>期望结果：</strong>{formData.expectedOutcome || "未填写"}</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>快速获取诊断方案的直通方式：</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              复制上述信息后，通过以下官方渠道直接发送给我们的技术顾问，可立即在 30 分钟内收到针对性答复：
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1 text-xs">
              <div className="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[11px]">顾问微信：</span>
                <span className="font-mono font-bold text-emerald-400">{COMPANY_INFO.contact.wechat}</span>
              </div>
              <div className="px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700">
                <span className="text-slate-400 block text-[11px]">官方邮箱：</span>
                <span className="font-mono font-bold text-slate-200">{COMPANY_INFO.contact.email}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center sm:text-left">
            <button
              type="button"
              onClick={() => setSubmittedStatus("idle")}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4"
            >
              返回重新编辑表单
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
