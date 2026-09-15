import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MessageSquare, ShieldCheck, Mail, MapPin, Sparkles } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";
import { PROBLEMS } from "@/data/problems";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Manifesto Box */}
        <div className="border border-slate-800 bg-slate-900/60 rounded-2xl p-6 sm:p-8 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                务实落地准则
              </span>
              <span className="text-xs text-slate-400">不做大系统 · 交付真实结果</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              我们不建议企业推倒现有系统，只解决一个具体问题。
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              如果你正在面对规则写不死、多变复杂、过去只能依赖人工经验判断的业务卡点，欢迎带着脱敏材料来找我们交流。
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/diagnose"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-xs"
            >
              <span>诊断你的业务问题</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/training"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <span>免费参加本周日培训</span>
            </Link>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Col 1: Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo-transparent.png"
                  alt="共事 Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white tracking-tight font-sans">
                  共事
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-800 text-slate-300 border border-slate-700">
                  GONGSHI AI
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-6">
              {COMPANY_INFO.name}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed pr-6">
              中文主张：{COMPANY_INFO.sloganZh}
              <br />
              英文主张：{COMPANY_INFO.sloganEn}
            </p>
            <div className="pt-2 text-xs text-slate-400 border-t border-slate-800/80">
              <p>核心定位：{COMPANY_INFO.corePositioning}</p>
            </div>
          </div>

          {/* Col 2: Problems */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              解决具体问题
            </h4>
            <ul className="space-y-2 text-sm">
              {PROBLEMS.map((problem) => (
                <li key={problem.slug}>
                  <Link
                    href={`/problems/${problem.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {problem.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/problems"
                  className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <span>查看全部问题场景</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product & Cases */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              平台与实践
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/haflow" className="hover:text-white transition-colors">
                  HAFlow 任务执行平台
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-white transition-colors">
                  实践案例库
                </Link>
              </li>
              <li>
                <Link href="/diagnose" className="hover:text-white transition-colors">
                  AI 应用可行性诊断
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  观点与落地思考
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Public & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200">
              公益与交流
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/training"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>每月免费培训</span>
                  <span className="text-[10px] px-1 py-0.2 rounded-sm bg-emerald-950 text-emerald-400 border border-emerald-800">
                    每周日
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  关于共事
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
            <div className="pt-3 border-t border-slate-800/80">
              <div className="text-xs text-slate-400">
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{COMPANY_INFO.contact.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center sm:text-left">
            <span>© {COMPANY_INFO.contact.copyrightYear} {COMPANY_INFO.name} 保留所有权利</span>
            <span className="text-slate-400">|</span>
            <span>{COMPANY_INFO.contact.icp}</span>
            <span className="text-slate-400">|</span>
            <span>品牌定位：不做大系统 · 只解决一个具体问题</span>
          </div>

          <div className="text-slate-400 text-right">
            <span>Human + Agent, in Flow.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
