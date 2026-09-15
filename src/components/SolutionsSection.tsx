import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function SolutionsSection() {
  const solutions = [
    {
      id: "auto-crm",
      badge: "汽车",
      title: "汽车 CRM",
      desc: "从线索到服务的全生命周期客户管理",
      href: "/cases",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "plm",
      badge: "制造",
      title: "PLM",
      desc: "产品全生命周期管理",
      href: "/cases",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "accounting",
      badge: "财务",
      title: "电子会计档案",
      desc: "让档案管理更智能、更高效",
      href: "/problems/voucher-link",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "bidding",
      badge: "企业服务",
      title: "投标管理",
      desc: "从招标文件解析到标书生成的 AI 工作流",
      href: "/problems/bid-audit",
      imageUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "staffai",
      badge: "组织",
      title: "StaffAI",
      desc: "面向企业员工的 AI 工作平台",
      href: "/problems/knowledge-reuse",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "smart-order",
      badge: "新消费",
      title: "智能订货",
      desc: "让供应链决策更智能",
      href: "/problems/order-forecast",
      imageUrl: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block">
              - SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              基于 HAFlow 的行业解决方案
            </h2>
            <p className="text-base text-slate-600">
              同一套方法，已在多个行业的真实业务中验证。
            </p>
          </div>

          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors shrink-0"
          >
            <span>查看全部案例</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Solution Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {solutions.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200/80 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Photo Image Container */}
              <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 16vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Blue Badge overlay */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-sm bg-blue-600/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
