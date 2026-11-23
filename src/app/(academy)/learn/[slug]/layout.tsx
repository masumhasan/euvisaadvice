import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LearnShell } from "@/components/layout/LearnShell";
import { getCourseDetail } from "@/constants/mock/courseDetail";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function LearnLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  if (!getCourseDetail(slug)) notFound();
  return <LearnShell courseSlug={slug}>{children}</LearnShell>;
}
