import React from "react";
import Link from "next/link";
import Image from "next/image";
import { QrCode } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-100 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-slate-100">
          {/* Col 1: Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <Image
                  src="/logo-transparent.png"
                  alt="共事 Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  共事
                </span>
                <span className="text-slate-300 font-light text-lg">|</span>
                <span className="text-xl font-bold tracking-tight text-blue-600 font-sans">
                  HAFlow
                </span>
              </div>
            </div>

            <div className="space-y-1 text-sm text-slate-500 pt-2">
              <p className="font-medium text-slate-700">
                上海共事智能科技有限公司
              </p>
              <p>让企业进入人机共事时代</p>
              <p className="font-mono text-xs text-blue-600 pt-0.5">
                Human + Agent, in Flow.
              </p>
            </div>
          </div>

          {/* Col 2: 产品与方案 (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              产品与方案
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-500">
              <li>
                <Link href="/haflow" className="hover:text-blue-600 transition-colors">
                  HAFlow
                </Link>
              </li>
              <li>
                <Link href="/problems" className="hover:text-blue-600 transition-colors">
                  行业解决方案
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-blue-600 transition-colors">
                  客户案例
                </Link>
              </li>
              <li>
                <Link href="/training" className="hover:text-blue-600 transition-colors">
                  方法论
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: 关于我们 (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">
              关于我们
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-500">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  公司介绍
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-blue-600 transition-colors">
                  新闻动态
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  加入我们
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: 关注我们 (3 cols with QR Code) */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end space-y-3">
            {/* QR Code Container */}
            <div className="w-28 h-28 p-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-slate-900"
                fill="currentColor"
              >
                {/* Clean realistic QR code matrix representation */}
                <rect x="0" y="0" width="30" height="30" rx="3" fill="#0f172a" />
                <rect x="5" y="5" width="20" height="20" rx="2" fill="#ffffff" />
                <rect x="10" y="10" width="10" height="10" rx="1" fill="#0f172a" />

                <rect x="70" y="0" width="30" height="30" rx="3" fill="#0f172a" />
                <rect x="75" y="5" width="20" height="20" rx="2" fill="#ffffff" />
                <rect x="80" y="10" width="10" height="10" rx="1" fill="#0f172a" />

                <rect x="0" y="70" width="30" height="30" rx="3" fill="#0f172a" />
                <rect x="5" y="75" width="20" height="20" rx="2" fill="#ffffff" />
                <rect x="10" y="80" width="10" height="10" rx="1" fill="#0f172a" />

                {/* Internal pixel clusters */}
                <rect x="36" y="8" width="8" height="8" fill="#0f172a" />
                <rect x="48" y="8" width="6" height="6" fill="#0f172a" />
                <rect x="38" y="24" width="6" height="6" fill="#0f172a" />
                <rect x="50" y="24" width="8" height="8" fill="#0f172a" />

                <rect x="8" y="38" width="8" height="8" fill="#0f172a" />
                <rect x="22" y="42" width="6" height="6" fill="#0f172a" />
                <rect x="38" y="38" width="10" height="10" fill="#2563eb" />
                <rect x="54" y="40" width="8" height="8" fill="#0f172a" />
                <rect x="72" y="38" width="8" height="8" fill="#0f172a" />
                <rect x="86" y="44" width="8" height="8" fill="#0f172a" />

                <rect x="40" y="56" width="6" height="6" fill="#0f172a" />
                <rect x="54" y="54" width="8" height="8" fill="#0f172a" />
                <rect x="70" y="58" width="10" height="10" fill="#0f172a" />

                <rect x="38" y="72" width="8" height="8" fill="#0f172a" />
                <rect x="52" y="74" width="6" height="6" fill="#0f172a" />
                <rect x="72" y="76" width="8" height="8" fill="#0f172a" />
                <rect x="86" y="74" width="6" height="6" fill="#0f172a" />
                <rect x="46" y="86" width="8" height="8" fill="#0f172a" />
                <rect x="64" y="88" width="8" height="8" fill="#0f172a" />
                <rect x="80" y="86" width="8" height="8" fill="#0f172a" />
              </svg>
            </div>

            <div className="text-left md:text-right">
              <span className="text-xs font-bold text-slate-800 block">
                关注我们
              </span>
              <span className="text-[11px] text-slate-400">
                一起探索人机共事的更多可能
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching reference image */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2024-2026 上海共事智能科技有限公司 沪ICP备xxxxxx号
          </div>
          <div className="font-mono text-slate-500">
            Human + Agent, in Flow.
          </div>
        </div>
      </div>
    </footer>
  );
}
