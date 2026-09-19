"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Wrench,
} from "lucide-react";
import {
  CASE_CATEGORY_FILTERS,
  CaseStudy,
  CaseType,
} from "@/data/cases";

interface CasesClientViewProps {
  initialCases: CaseStudy[];
}

const ATOMIC_TOOLS = [
  {
    id: "ad-compliance",
    badge: "Agent 方案 · 合规审核",
    title: "广告合规审核助手",
    englishTitle: "Ad Compliance Reviewer",
    desc: "粘贴营销文案，秒级标红「最/首/国家级」等违禁表述，并给出符合《广告法》要求的合规替换建议。",
    tags: ["广告法 §9/16/17/18/46", "医药·器械·医美·保健品", "内置违禁词检测"],
    target: "适用：市场 / 品牌 / 法务",
    highlight: "共命中 7 处违规表述，秒级标红给出法规条款改写建议",
  },
  {
    id: "ai-data-analyst",
    badge: "产品原型 PRD · 数据智能",
    title: "AI 数据分析助手",
    englishTitle: "AI Data Analyst",
    desc: "上传 Excel → AI 理解数据结构 → 自然语言提问 → 自动出图，让不懂 SQL 的业务人员直接问数据。",
    tags: ["xlsx 单链路", "AI 数据理解", "自动出图表"],
    target: "适用：业务 / 运营 / 中小团队",
    highlight: "无需编写复杂 SQL 与透视表，自然语言对话即时生成动态可视化图表",
  },
  {
    id: "sentiment-report",
    badge: "单文件可视化 · 品牌洞察",
    title: "品牌舆情分析报告",
    englishTitle: "Sentiment Analysis Report",
    desc: "品牌声誉深度分析，多维情感归因与图表化呈现，单 HTML 免部署打开即用。",
    tags: ["Chart.js", "情感多维归因", "单文件轻量化"],
    target: "适用：品牌 / PR / 管理层",
    highlight: "多维情感归因与声誉波动热力图，单文件秒开即用",
  },
  {
    id: "channel-roi-report",
    badge: "单文件报表 · 投放决策",
    title: "渠道投放分析报表",
    englishTitle: "Channel ROI Report",
    desc: "各渠道投放效果与转化归因的轻量报表，实时剔除水分数据，直接支撑投放预算策略优化。",
    tags: ["投放归因", "免登录即用", "边际 ROI"],
    target: "适用：市场 / 投放 / 增长",
    highlight: "真实成交穿透计算，各渠道边际投产比秒级对齐",
  },
];

export function CasesClientView({ initialCases }: CasesClientViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [selectedType, setSelectedType] = useState<"全部" | CaseType>("全部");
  const [activeTab, setActiveTab] = useState<"systems" | "tools">("systems");

  const categoryCounts = useMemo(() => {
    return CASE_CATEGORY_FILTERS.map((cat) => ({
      ...cat,
      count:
        cat.value === "全部"
          ? initialCases.length
          : initialCases.filter((item) => item.category === cat.value).length,
    }));
  }, [initialCases]);

  const filteredCases = initialCases.filter((item) => {
    const matchesCategory =
      selectedCategory === "全部" || item.category === selectedCategory;
    const matchesType = selectedType === "全部" || item.type === selectedType;
    const q = searchQuery.trim().toLowerCase();
    const haystack = [
      item.title,
      item.headline,
      item.englishTitle,
      item.industry,
      item.summary,
      item.tag,
      item.roiHighlight,
      item.customerProfile.who,
      ...item.metrics.map((metric) => `${metric.value} ${metric.label}`),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchesSearch = !q || haystack.includes(q);
    return matchesCategory && matchesType && matchesSearch;
  }).sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

  return (
    <div className="my-6 space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="−95%" label="形式废标风险" hint="招投标合规核查" />
        <StatCard value="5 分钟" label="国际询价响应" hint="原先平均超过 4 小时" />
        <StatCard value="−60%" label="门店缺货率" hint="店长 3 分钟确认订货" />
        <StatCard value="秒级" label="凭证穿透调阅" hint="原先按天去仓库翻找" />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="inline-flex p-1 bg-slate-200/80 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("systems")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "systems"
                ? "bg-white text-blue-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            落地案例（{initialCases.length}）
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tools")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "tools"
                ? "bg-white text-blue-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>可体验的小工具</span>
          </button>
        </div>

        <span className="text-xs text-slate-500 font-mono">
          {activeTab === "systems"
            ? `当前显示 ${filteredCases.length} 个案例`
            : "打开即用，用来感受共事如何处理一类具体问题"}
        </span>
      </div>

      {activeTab === "systems" && (
        <div className="space-y-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="按结果、行业、客户角色或系统名称检索案例"
              placeholder="按结果、行业、客户角色、系统名称检索..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="清空搜索内容"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-full cursor-pointer"
              >
                清空
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["全部", "实践场景", "方案示例"] as const).map((type) => {
              const isActive = selectedType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {type === "全部" ? "全部类型" : type}
                </button>
              );
            })}
            <span className="w-px h-4 bg-slate-200 mx-1 hidden sm:inline-block" />
            {categoryCounts.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 rounded-full font-mono ${
                      isActive ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {filteredCases.map((item) => (
                <Link
                  key={item.slug}
                  href={`/cases/${item.slug}`}
                  className="group relative bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex flex-col hover:shadow-xl hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer block outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {item.customerProfile.who}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-sm ${
                        item.type === "实践场景"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-950 group-hover:text-blue-600 transition-colors leading-snug">
                    {item.headline}
                  </h2>
                  <p className="text-[11px] font-mono text-slate-400 mt-1.5">
                    {item.title}
                    {item.englishTitle ? ` · ${item.englishTitle}` : ""}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mt-3 line-clamp-2">
                    {item.challengeStakes}
                  </p>

                  <dl className="mt-5 grid grid-cols-3 gap-2">
                    {item.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl bg-slate-50 border border-slate-100 px-2.5 py-2.5"
                      >
                        <dt className="text-[10px] text-slate-500 leading-tight">
                          {metric.label}
                        </dt>
                        <dd className="text-sm sm:text-base font-black text-slate-950 mt-1 tracking-tight">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <blockquote className="mt-4 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    “{item.quote.text}”
                  </blockquote>
                  <p className="text-[11px] text-slate-400 mt-1">{item.quote.role}</p>

                  <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px] truncate pr-3">
                      {item.customerProfile.buyerRoles[0]}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 shrink-0">
                      <span>查看案例</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 text-sm mb-3">
                没有找到与 “{searchQuery}” 匹配的案例
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("全部");
                  setSelectedType("全部");
                }}
                className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl text-xs font-semibold cursor-pointer"
              >
                重置筛选条件
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === "tools" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ATOMIC_TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href="/diagnose"
              className="group rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer block outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {tool.badge}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{tool.target}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                    {tool.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400 block mb-3">
                    {tool.englishTitle}
                  </span>
                  <p className="text-sm text-slate-600 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  <strong className="font-bold block mb-0.5 text-blue-950">
                    核心特性
                  </strong>
                  {tool.highlight}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">轻量免部署 · 即开即用</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>申请在线体验演示</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  value,
  label,
  hint,
}: {
  value: string;
  label: string;
  hint: string;
}) {
  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
      <span className="text-2xl sm:text-3xl font-extrabold text-slate-950 block mb-0.5 font-display tabular-nums">
        {value}
      </span>
      <span className="text-xs font-bold text-slate-900 block">{label}</span>
      <span className="text-[11px] text-slate-500">{hint}</span>
    </div>
  );
}
