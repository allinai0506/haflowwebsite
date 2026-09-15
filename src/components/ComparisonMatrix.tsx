import React from "react";
import { Check, X, ArrowRight, AlertCircle, Sparkles, Database, Bot } from "lucide-react";

export function ComparisonMatrix() {
  const traditionalPoints = [
    {
      title: "依赖固定字段与表单",
      desc: "漏填一个字段系统直接报错，无法容纳灵活多样的非标业务表述",
    },
    {
      title: "依赖写死的前提流程",
      desc: "必须严格按 A -> B -> C 顺序流转，遇到任何例外情况流程直接熔断",
    },
    {
      title: "规则必须提前全部写好",
      desc: "面对千变万化的运价附加费、招标文件隐性条款，if-else 永远写不全",
    },
    {
      title: "只能事后记录发生的事情",
      desc: "记录‘昨天卖了多少、下了什么单’，无法在事前直接给出高依据的决策建议",
    },
    {
      title: "遇到异常全靠人脑再算一遍",
      desc: "只要业务发生变动，员工不得不重新退回到手工 Excel 和微信群沟通",
    },
  ];

  const aiNativePoints = [
    {
      title: "理解非结构化文档与上下文",
      desc: "能读懂长篇 PDF、扫描单据、聊天截图与模糊口语描述，提取核心业务要素",
    },
    {
      title: "综合多源动态因素进行推理",
      desc: "将天气、历史经验、库存、多路线时效等几十项离散变量统一纳入考量",
    },
    {
      title: "面对没有固定答案的复杂局面",
      desc: "在规则无法写死的模糊地带，给出有逻辑支撑的最优解或备选方案",
    },
    {
      title: "主动调用工具并连接现有系统",
      desc: "不是空谈聊天，而是调用计算公式、比对算法并可安全回写现有 ERP/TMS",
    },
    {
      title: "人在关键节点确认与持续演进",
      desc: "每一笔人工确认与纠偏都在增强当前业务流，系统越用越贴合团队习惯",
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative subtle grid */}
      <div className="absolute inset-0 dark-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-slate-800 text-emerald-400 border border-slate-700 mb-4">
            <span>客观认知 · 不贬低传统软件</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
            有些事情，不是再增加一个功能就能解决。
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            传统软件擅长确定性的记录和流程，AI 更适合处理需要理解、判断和变化的任务。
            <br className="hidden sm:inline" />
            两者应该<span className="text-emerald-400 font-semibold underline underline-offset-4 decoration-emerald-400/50">连接</span>，而不是互相替代。
          </p>
        </div>

        {/* Side by Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Traditional Software */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-200">
                      传统管理软件
                    </h3>
                    <span className="text-xs font-mono text-slate-300">
                      ERP / OA / CRM / 财务核算系统
                    </span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  确定性记录系统
                </span>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                为标准交易流程而生，保证账务平衡与流程合规。但在规则无法穷尽的复杂判断面前存在天然边界：
              </p>

              <ul className="space-y-4">
                {traditionalPoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono">
                      ×
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800/80 bg-slate-900/50 -mx-7 -mb-7 p-6 rounded-b-2xl">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1">
                结论定位：
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                不可替代的“事实数据库”。我们决不建议客户推翻现有 ERP 或核心账套。
              </p>
            </div>
          </div>

          {/* Right: AI Native Applications */}
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/90 p-7 sm:p-9 flex flex-col justify-between ring-1 ring-emerald-500/20 shadow-xl shadow-emerald-950/10">
            <div>
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>共事 AI Native 应用</span>
                      <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        交付结果
                      </span>
                    </h3>
                    <span className="text-xs font-mono text-emerald-400">
                      轻量外挂 · 专注解决单一具体业务卡点
                    </span>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                  理解与执行层
                </span>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                在既有系统之上，专门处理非结构化信息理解、多源推理与经验判断，直接输出有依据的结果：
              </p>

              <ul className="space-y-4">
                {aiNativePoints.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-5 border-t border-emerald-500/20 bg-emerald-950/20 -mx-7 -mb-7 p-6 rounded-b-2xl border-x border-b border-emerald-500/20">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                落地策略：
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                无需推倒重来。读取现有系统的数据，由 AI 做分析推理，人在关键节点把关，最终把结果回写进现有系统。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
