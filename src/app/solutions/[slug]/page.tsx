import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SolutionDetailSections } from "@/components/SolutionDetailSections";
import { CASE_STUDIES, getCaseBySlug } from "@/data/cases";
import { getProblemBySlug } from "@/data/problems";
import { getSolutionBySlug, SOLUTIONS } from "@/data/solutions";
import { pageSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};

  return pageSeo({
    path: `/solutions/${solution.slug}`,
    title: solution.seoTitle,
    description: solution.seoDescription,
    keywords: solution.searchTerms,
  });
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const problem = getProblemBySlug(solution.problemSlug);
  const relatedCases = solution.caseSlugs
    .map(getCaseBySlug)
    .filter((item): item is (typeof CASE_STUDIES)[number] => Boolean(item));

  if (!problem || relatedCases.length === 0) notFound();

  // 百度SEO：解决方案详情页补 Article 结构化数据（与 problems/cases/insights 对齐）
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: solution.seoTitle,
    description: solution.seoDescription,
    articleSection: solution.eyebrow,
    about: solution.title,
    image: "https://www.haflow.cn/og-cover-v9.jpg",
    author: {
      "@type": "Organization",
      name: "上海共事智能科技有限公司",
    },
    publisher: {
      "@type": "Organization",
      name: "共事智能",
    },
    mainEntityOfPage: `https://www.haflow.cn/solutions/${solution.slug}`,
  };

  return (
    <div className="min-h-screen bg-slate-50 py-5 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "解决方案", href: "/solutions" },
            { label: solution.title },
          ]}
        />

        <header className="max-w-4xl py-4 sm:py-8">
          <p className="mb-4 text-xs font-mono font-bold uppercase tracking-wider text-blue-700">
            {solution.eyebrow}
          </p>
          <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {solution.title}
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-slate-600">{solution.audience}</p>
          <div className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-950">
            业务问题：{solution.businessQuestion}
          </div>
        </header>

        <SolutionDetailSections
          solution={solution}
          problem={problem}
          relatedCases={relatedCases}
        />

        <section className="my-16 flex flex-col items-center justify-between gap-6 rounded-3xl bg-blue-600 p-8 text-center text-white shadow-xl shadow-blue-900/10 sm:flex-row sm:text-left sm:p-10">
          <div className="max-w-2xl">
            <h2 className="mb-2 text-2xl font-extrabold tracking-tight">带着一份真实材料来判断</h2>
            <p className="text-sm leading-relaxed text-blue-100">
              先从当前场景的输入、规则和验收标准开始，不预设必须采购大系统。
            </p>
          </div>
          <Link
            href="/diagnose"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          >
            预约场景诊断
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
}
