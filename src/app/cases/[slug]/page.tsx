import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseBySlug, getRelatedCases } from "@/data/cases";
import { CaseStoryView } from "@/components/CaseStoryView";
import { pageSeo } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return {};

  // 百度SERP约30字截断：headline已压缩至18字内，后缀精简为7字，品牌后缀确保可见；
  // description按“结论+摘要”重组并截断至100字，核心信息前置
  const descBase = `${item.headline}。${item.summary}`;
  const description =
    descBase.length > 100
      ? (() => {
          const cut = descBase.slice(0, 100);
          const lastStop = Math.max(cut.lastIndexOf("。"), cut.lastIndexOf("，"));
          // 句号结尾保留，逗号结尾换成句号，避免摘要以逗号收尾
          return lastStop > 60 ? `${cut.slice(0, lastStop)}。` : cut;
        })()
      : descBase;

  return pageSeo({
    path: `/cases/${item.slug}`,
    title: item.headline,
    titleSuffix: "企业AI案例",
    description,
    keywords: [item.title, item.headline, item.industry, item.tag, "共事案例", "HAFlow落地"],
    ogType: "article",
  });
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return <CaseStoryView item={item} related={getRelatedCases(item.slug)} />;
}
