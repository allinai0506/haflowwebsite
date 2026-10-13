import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO } from "@/data/company";

export function Footer() {
  return (
    <footer aria-label="页脚" className="bg-white text-slate-600 border-t border-slate-100 pt-10 sm:pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-8 md:gap-10 pb-10 md:pb-16 border-b border-slate-100">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-start gap-3.5">
              <div className="h-9 w-auto relative flex items-center justify-center shrink-0 pt-0.5">
                <Image
                  src="/logo-icon.png"
                  alt="共事智能HAFlow_企业AI落地"
                  width={65}
                  height={36}
                  className="h-9 w-auto object-contain"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 font-sans">
                    共事
                  </span>
                  <span className="text-slate-300 font-normal text-xl">|</span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-600 font-sans">
                    HAFlow
                  </span>
                </div>

                <div className="space-y-1 text-slate-500">
                  <p className="text-sm text-slate-600">
                    让企业进入人机共事时代
                  </p>
                  <p className="text-xs font-sans font-medium text-slate-400 tracking-wide">
                    Human + Agent, in Flow.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: 产品与方案 (2 cols) */}
          <nav aria-label="产品与方案" className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              产品与方案
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-500">
              <li>
                <Link href="/haflow" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  HAFlow
                </Link>
              </li>
              <li>
                <Link href="/problems" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  行业解决方案
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  客户案例
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  共事方法论
                </Link>
              </li>
              <li>
                <Link href="/methodology#training" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  公益实战培训
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 3: 关于我们 (2 cols) */}
          <nav aria-label="关于我们" className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              关于我们
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-slate-500">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  公司介绍
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  观点与实践
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  HAFlow 实验室
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  加入我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors inline-flex items-center min-h-[44px] py-1">
                  联系我们
                </Link>
              </li>
            </ul>
          </nav>

          {/* Col 4: 关注我们 (3 cols with QR Code)：移动端横向排布，不占纵向长度 */}
          <div className="col-span-2 md:col-span-3 flex flex-row items-center gap-4 md:flex-col md:items-end md:gap-0 md:space-y-3">
            {/* QR Code Container */}
            <a
              href="/wechat-official.png"
              target="_blank"
              rel="noopener noreferrer"
              title="点击查看公众号二维码大图"
              aria-label="查看共事智能官方公众号二维码大图"
              className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 p-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center transition-transform hover:scale-105 cursor-pointer block"
            >
              <Image
                src="/wechat-official.png"
                alt="共事智能官方公众号二维码"
                width={96}
                height={96}
                className="w-full h-full object-contain rounded-lg"
              />
            </a>

            <div className="text-left md:text-right">
              <span className="text-xs font-bold text-slate-800 block">
                关注官方公众号
              </span>
              <span className="text-[11px] text-slate-400">
                微信扫一扫 · 探索人机共事
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching reference image */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {COMPANY_INFO.contact.copyrightYear} {COMPANY_INFO.name}</span>
            <span className="text-slate-200">|</span>
            {COMPANY_INFO.contact.icp ? (
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-600 transition-colors inline-flex items-center min-h-[44px]"
              >
                {COMPANY_INFO.contact.icp}
              </a>
            ) : (
              <span className="text-slate-300">ICP备案审核中</span>
            )}
          </div>
          <div className="font-sans text-slate-400">
            {COMPANY_INFO.sloganEn}
          </div>
        </div>
      </div>
    </footer>
  );
}
