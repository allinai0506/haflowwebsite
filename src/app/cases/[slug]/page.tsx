import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseBySlug, getRelatedCases } from "@/data/cases";
import { CaseStoryView } from "@/components/CaseStoryView";

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

  return {
    title: `${item.headline} · 落地案例`,
    description: `${item.summary} 客户：${item.customerProfile.who}。${item.metrics
      .map((metric) => `${metric.value} ${metric.label}`)
      .join(" · ")}。`,
    keywords: [item.title, item.headline, item.industry, item.tag, "共事案例", "HAFlow落地"],
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return <CaseStoryView item={item} related={getRelatedCases(item.slug)} />;
}
