import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { COMPANY_INFO } from "@/data/company";

export const metadata: Metadata = {
  title: "联系我们 · 带着一个业务问题来交流 | 共事智能",
  description:
    "上海共事智能科技有限公司联系方式。欢迎企业客户预约业务诊断、咨询每周日免费公益培训。地址：上海市浦东新区张江高科技园区。",
  keywords: ["联系共事", "共事智能联系方式", "HAFlow咨询", "AI应用诊断预约"],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "联系我们" }]} />

        {/* Page Hero */}
        <div className="py-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-100 text-emerald-800 border border-emerald-200 mb-4">
            <span>开放交流 · 快速响应</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            联系共事团队
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            带着一个具体业务问题来，我们为您做一次 30 分钟的技术可行性诊断；或者随时向我们咨询每周日免费培训。
          </p>
        </div>

        {/* Contact Information Grid */}
        <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* WeChat Advisor Card (Fastest) */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                最快响应途径
              </span>
              <h2 className="text-xl font-bold text-white mb-2">
                添加顾问微信
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                发送您的业务痛点或培训咨询，资深工程师 30 分钟内一对一在线答复。
              </p>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400">微信号：</span>
                <p className="font-mono text-base font-bold text-emerald-400">
                  {COMPANY_INFO.contact.wechat}
                </p>
                <span className="text-[11px] text-slate-500 block pt-1">
                  备注：“业务诊断”或“免费培训”
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-400">
              工作日 09:30 - 20:00 在线支持
            </div>
          </div>

          {/* Email & Phone Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                正式联络通道
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                官方邮箱与电话
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                适合发送详细脱敏材料、项目技术说明书或商务合作意向。
              </p>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">业务与技术咨询邮箱：</span>
                  <p className="font-mono font-bold text-slate-900 text-sm">
                    {COMPANY_INFO.contact.email}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block mb-0.5">服务咨询热线：</span>
                  <p className="font-mono font-bold text-slate-900 text-sm">
                    {COMPANY_INFO.contact.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
              邮件通常在 1 个工作日内正式答复
            </div>
          </div>

          {/* Office Address Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                办公地点
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                预约来访交流
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                欢迎企业团队与决策者莅临现场，进行深度闭门推演与面对面交流。
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <span className="text-slate-400 block">公司注册与研发地址：</span>
                <p className="font-medium text-slate-900 leading-relaxed">
                  {COMPANY_INFO.contact.address}
                </p>
                <span className="text-slate-500 block pt-1">
                  来访前请提前 1-2 天与顾问预约，以便安排工程师参会。
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
              上海市浦东新区 · 张江科学城核心区
            </div>
          </div>
        </div>

        {/* Action Direct Portal */}
        <div className="my-12 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              不知道怎么开始？直接提交一个问题
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              用我们准备好的 8 维度表单快速梳理您的业务痛点，我们会为您准备一份针对性的诊断建议。
            </p>
          </div>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <span>前往在线问题诊断</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
