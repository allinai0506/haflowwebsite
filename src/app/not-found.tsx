import Link from "next/link";
import { Home, Search } from "lucide-react";

export const metadata = {
  title: "页面不存在_404",
  description: "抱歉，您访问的页面不存在或已被移动。",
  robots: "noindex, nofollow",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-extrabold text-slate-200 font-mono tracking-tight">404</h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
          页面未找到
        </h2>
        <p className="text-slate-600 leading-relaxed">
          抱歉，您访问的页面不存在，可能已被移动或输入有误。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md shadow-blue-500/20"
          >
            <Home className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50/60 rounded-full border border-blue-200 transition-colors shadow-2xs"
          >
            <Search className="w-4 h-4" />
            <span>提交业务诊断</span>
          </Link>
        </div>
        <p className="text-xs text-slate-400">
          共事智能 · 不做大系统，只解决一个具体问题
        </p>
      </div>
    </div>
  );
}