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

  return pageSeo({
    path: `/cases/${item.slug}`,
    title: `${item.headline.slice(0, 20)}_企业AI落地案例`,
    description: `${item.summary}客户：${item.customerProfile.who}。${item.metrics
      .map((metric) => `${metric.value} ${metric.label}`)
      .join("，")}。`,
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
