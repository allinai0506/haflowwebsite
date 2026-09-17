import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  MapPin,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { COMPANY_INFO } from "@/data/company";

export const metadata: Metadata = {
  title: "联系我们 · 业务诊断与技术交流预约",
  description:
    "上海共事智能科技有限公司联系方式。欢迎企业客户预约业务诊断、咨询每周日免费公益培训。地址：上海市普陀区曹杨路1888号星光耀广场1号楼1005室，电话：+86-153-1727-0756。",
  keywords: ["联系共事", "共事智能联系方式", "HAFlow咨询", "AI应用诊断预约"],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "联系我们" }]} />

        {/* Page Hero */}
        <div className="py-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 mb-4">
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
          {/* WeChat Advisor Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div className="flex flex-col flex-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-xs">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold block mb-1">
                最快响应途径
              </span>
              <h2 className="text-xl font-bold text-slate-950 mb-2">
                添加顾问微信
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 min-h-[2.5rem]">
                发送您的业务痛点或培训咨询，资深工程师 30 分钟内一对一在线答复。
              </p>

              <div className="flex-1 flex flex-col justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-500 block mb-2 w-full text-left">
                    扫码添加顾问微信：
                  </span>
                  <a
                    href="/wechat-qrcode.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="点击查看完整微信二维码名片"
                    className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs inline-flex items-center justify-center transition-transform hover:scale-105"
                  >
                    <Image
                      src="/wechat-qrcode-clean.png"
                      alt="顾问微信二维码"
                      width={104}
                      height={104}
                      className="rounded-lg object-contain"
                    />
                  </a>
                </div>
                <span className="text-xs text-slate-500 block pt-2 text-center">
                  备注：“业务诊断”或“免费培训”
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
              工作日 09:30 - 20:00 在线支持
            </div>
          </div>

          {/* Phone Hotline Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div className="flex flex-col flex-1">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-6">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                电话直连通道
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                服务咨询热线
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 min-h-[2.5rem]">
                欢迎直接致电，与技术及解决方案顾问即时沟通，快速评估实际业务需求。
              </p>

              <div className="flex-1 flex flex-col justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">全国统一服务热线：</span>
                  <a
                    href="tel:+8615317270756"
                    className="font-mono text-base sm:text-lg font-bold text-blue-600 hover:text-blue-700 transition-colors block leading-snug"
                  >
                    {COMPANY_INFO.contact.phone}
                  </a>
                </div>
                <span className="text-xs text-slate-500 block pt-2">
                  服务时间：工作日 09:30 - 18:30
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
              工作日 09:30 - 18:30 专属顾问接听
            </div>
          </div>

          {/* Office Address Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div className="flex flex-col flex-1">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
                办公地点
              </span>
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                预约来访交流
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 min-h-[2.5rem]">
                欢迎企业团队与决策者莅临现场，进行深度闭门推演与面对面交流。
              </p>

              <div className="flex-1 flex flex-col justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">公司注册与研发地址：</span>
                  <p className="text-base sm:text-lg font-bold text-blue-600 leading-snug">
                    <span className="block">上海市普陀区曹杨路1888号</span>
                    <span className="block">星光耀广场1号楼1005室</span>
                  </p>
                </div>
                <span className="text-xs text-slate-500 block pt-2">
                  来访前请提前 1-2 天与顾问预约，以便安排工程师参会。
                </span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
              上海市普陀区 · 星光耀广场
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
            className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shrink-0 shadow-md shadow-blue-500/20 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span>前往在线问题诊断</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
