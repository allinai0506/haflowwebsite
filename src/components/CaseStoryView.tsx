import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Server,
  UserCheck,
  Bot,
  Quote,
  Clock3,
  Building2,
  MapPin,
  Users,
  Workflow,
} from "lucide-react";
import { CaseStudy } from "@/data/cases";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ScoreAlignViewer } from "@/components/ScoreAlignViewer";

const CHAPTERS = [
  { href: "#challenge", label: "挑战" },
  { href: "#approach", label: "做法" },
  { href: "#collaboration", label: "人机协同" },
  { href: "#outcome", label: "结果" },
  { href: "#boundary", label: "边界" },
] as const;

const DEMO_CHAPTER = { href: "#demo", label: "交互演示" } as const;

export function CaseStoryView({
  item,
  related,
}: {
  item: CaseStudy;
  related: CaseStudy[];
}) {
  const showDemo = item.slug === "bid-compliance";
  const chapters = showDemo
    ? [CHAPTERS[0], CHAPTERS[1], DEMO_CHAPTER, CHAPTERS[2], CHAPTERS[3], CHAPTERS[4]]
    : CHAPTERS;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.headline,
    alternativeHeadline: item.title,
    description: item.summary,
    articleSection: item.category,
    about: item.industry,
    author: {
      "@type": "Organization",
      name: "上海共事智能科技有限公司",
    },
    publisher: {
      "@type": "Organization",
      name: "共事智能",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumb
          items={[
            { label: "落地案例", href: "/cases" },
            { label: item.title },
          ]}
        />
      </div>

      <div className="bg-gradient-to-b from-blue-50/80 via-white to-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pb-16">
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              {item.industry}
            </span>
            <span
              className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md border ${
                item.type === "实践场景"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {item.type}
            </span>
            <span className="text-[11px] text-slate-500 font-mono inline-flex items-center gap-1">
              <Clock3 className="w-3.5 h-3.5" />
              {item.timeline}
            </span>
          </div>

          <p className="text-xs font-mono tracking-widest text-blue-600 uppercase mb-3">
            {item.title}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.15] max-w-4xl text-slate-950">
            {item.headline}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            {item.summary}
          </p>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-200">
            {item.metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-white px-5 py-6 sm:px-6"
              >
                <dt className="text-[11px] font-semibold text-slate-500 tracking-wide">
                  {metric.label}
                </dt>
                <dd className="mt-2 text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-display tabular-nums">
                  {metric.value}
                </dd>
                {metric.context && (
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {metric.context}
                  </p>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 -mt-6 relative z-10">
          <ProfileChip
            icon={<Building2 className="w-4 h-4 text-blue-600" />}
            label="客户是谁"
            value={item.customerProfile.who}
          />
          <ProfileChip
            icon={<Users className="w-4 h-4 text-blue-600" />}
            label="规模"
            value={item.customerProfile.scale}
          />
          <ProfileChip
            icon={<MapPin className="w-4 h-4 text-blue-600" />}
            label="区域"
            value={item.customerProfile.region}
          />
          <ProfileChip
            icon={<UserCheck className="w-4 h-4 text-blue-600" />}
            label="决策角色"
            value={item.customerProfile.buyerRoles.join(" · ")}
          />
        </div>

        <nav
          aria-label="案例章节"
          className="sticky top-[72px] z-20 mt-8 -mx-4 sm:mx-0 px-4 sm:px-0 py-2 bg-slate-50/95 backdrop-blur-sm border-b border-slate-200"
        >
          <ul className="flex gap-1 overflow-x-auto text-xs font-semibold">
            {chapters.map((chapter) => (
              <li key={chapter.href}>
                <a
                  href={chapter.href}
                  className="inline-flex px-3 py-2 rounded-full text-slate-600 hover:text-blue-700 hover:bg-blue-50 whitespace-nowrap transition-colors"
                >
                  {chapter.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <figure className="my-10 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs">
          <Quote className="w-7 h-7 text-blue-500 mb-3" aria-hidden />
          <blockquote className="text-lg sm:text-xl font-medium text-slate-900 leading-relaxed">
            {item.quote.text}
          </blockquote>
          <figcaption className="mt-4 text-sm text-slate-600">
            <span className="font-semibold text-slate-900">{item.quote.role}</span>
            <span className="block text-xs text-slate-400 mt-1">{item.quote.note}</span>
          </figcaption>
        </figure>

        <div className="space-y-10 pb-4">
          <section id="challenge" className="scroll-mt-28">
            <ChapterEyebrow n="01" title="挑战" />
            <div className="mt-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                {item.challengeStakes}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {item.problemDescription}
              </p>
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  原有系统为何扛不住
                </h3>
                <ul className="space-y-3">
                  {item.whyOriginalSystemFailed.map((reason) => (
                    <li
                      key={reason}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ×
                      </span>
                      <span className="leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="approach" className="scroll-mt-28">
            <ChapterEyebrow n="02" title="做法" />
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
                <h3 className="text-sm font-bold text-slate-900">共事如何切入</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {item.howGongshiDiagnosed}
                </p>
                <ol className="space-y-3">
                  {item.approachSteps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-sky-600 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-lg shadow-blue-500/25">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-blue-100" />
                  用到的 HAFlow 能力
                </h3>
                <ul className="space-y-4">
                  {item.capabilitiesUsed.map((cap) => (
                    <li key={cap.name}>
                      <p className="text-sm font-semibold text-white">{cap.name}</p>
                      <p className="text-xs text-blue-100/85 leading-relaxed mt-1">
                        {cap.how}
                      </p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/haflow"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-white underline underline-offset-4 decoration-blue-200 hover:decoration-white pt-2"
                >
                  查看平台八项能力
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {showDemo && (
            <section id="demo" className="scroll-mt-28">
              <ChapterEyebrow n="02+" title="交互演示" />
              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-3xl">
                AI 评分标准解析 ·
                左侧是招标文件原文（P46–P49），右侧是逐条直抽的结构化评分表。点击右侧任意行定位左侧出处，点击左侧高亮条款反查评分项；顶部可在「预计得分（知识库对标）/ 实际打分（评审专家）」两种阶段间切换。每一条得分都带原文出处与依据，低置信的主观项留给专家终裁。
              </p>
              <div className="mt-4">
                <ScoreAlignViewer />
              </div>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed">
                演示数据为脱敏示例（中煤能源集团办公物资框架协议，100
                分闭环）。正式项目中，出处校验与置信度门禁由确定性对齐引擎 + 人工复核共同承担。
              </p>
            </section>
          )}

          <section id="collaboration" className="scroll-mt-28">
            <ChapterEyebrow n="03" title="人机协同" />
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50/70 rounded-3xl border border-emerald-100 p-6 sm:p-8">
                <h3 className="text-base font-bold text-emerald-950 mb-4 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-700" />
                  AI 判断与执行
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  {item.aiDecisionsAndActions.map((action) => (
                    <li key={action} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50/80 rounded-3xl border border-amber-200/80 p-6 sm:p-8">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-amber-700" />
                  人在关键节点
                </h3>
                <ul className="space-y-3 text-sm text-slate-700">
                  {item.humanInTheLoopRole.map((role) => (
                    <li key={role} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 shrink-0" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 mb-4">
                对接的现有业务系统
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {item.connectedSystems.map((sys) => (
                  <span
                    key={sys}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <Server className="w-3.5 h-3.5 text-indigo-600" />
                    {sys}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section id="outcome" className="scroll-mt-28">
            <ChapterEyebrow n="04" title="结果" />
            <div className="mt-4 space-y-6">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs">
                <table className="w-full text-sm">
                  <caption className="sr-only">实施前后对照</caption>
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="text-left font-semibold px-4 sm:px-6 py-3">维度</th>
                      <th className="text-left font-semibold px-4 sm:px-6 py-3">之前</th>
                      <th className="text-left font-semibold px-4 sm:px-6 py-3">之后</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.beforeAfter.map((row) => (
                      <tr key={row.dimension} className="border-t border-slate-100">
                        <td className="px-4 sm:px-6 py-4 font-semibold text-slate-900 align-top">
                          {row.dimension}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-slate-500 align-top">
                          {row.before}
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-emerald-800 font-medium align-top">
                          {row.after}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-4">业务结果</h3>
                <ul className="space-y-2.5 text-sm text-slate-800">
                  {item.businessResults.map((res) => (
                    <li key={res} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{res}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 pt-5 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-900">如何验证：</span>
                  {item.verificationMethod}
                </p>
              </div>
            </div>
          </section>

          <section id="boundary" className="scroll-mt-28">
            <ChapterEyebrow n="05" title="边界" />
            <div className="mt-4 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
              <p className="text-sm text-slate-600">
                已经在现场跑通的部分，和仍在扩大验证的部分，分开写清楚。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <p className="font-semibold text-emerald-800 flex items-center gap-1.5 mb-2 text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    已在真实业务中验证
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.dataAuthenticityDeclaration.realAspects.map((entry) => (
                      <li key={entry} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{entry}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <p className="font-semibold text-amber-800 flex items-center gap-1.5 mb-2 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    仍在演进或待规模化
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.dataAuthenticityDeclaration.pendingValidationAspects.map(
                      (entry) => (
                        <li key={entry} className="flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                          <span>{entry}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-slate-500 italic">
                {item.dataAuthenticityDeclaration.statement}
              </p>
            </div>
          </section>
        </div>

        {related.length > 0 && (
          <section className="mt-14 mb-6">
            <h2 className="text-lg font-extrabold text-slate-950 mb-4">相关案例</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((story) => (
                <Link
                  key={story.slug}
                  href={`/cases/${story.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <span className="text-[11px] font-semibold text-blue-700">
                    {story.industry}
                  </span>
                  <p className="mt-2 text-sm font-bold text-slate-900 leading-snug group-hover:text-blue-700">
                    {story.headline}
                  </p>
                  <p className="mt-3 text-xs font-mono text-emerald-700">
                    {story.metrics[0]?.value} {story.metrics[0]?.label}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="my-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
          <Link
            href="/cases"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            ← 返回案例列表
          </Link>
          <Link
            href="/diagnose"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm"
          >
            带着您的业务问题来诊断
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ChapterEyebrow({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-[11px] font-mono font-bold tracking-widest text-blue-600">
        {n}
      </span>
      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">{title}</h2>
    </div>
  );
}

function ProfileChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
      <p className="text-[11px] font-semibold text-slate-500 flex items-center gap-1.5 mb-1">
        {icon}
        {label}
      </p>
      <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
        {value}
      </p>
    </div>
  );
}
