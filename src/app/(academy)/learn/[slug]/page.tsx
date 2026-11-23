import type { Metadata } from "next";
import { CounselNotice, FirstModuleCta } from "@/components/learn/OverviewCtaAndNotice";
import { ModuleCards } from "@/components/learn/ModuleCards";
import { OutcomeCards } from "@/components/learn/OutcomeCards";
import { OverviewHero } from "@/components/learn/OverviewHero";
import { OverviewTopBar } from "@/components/learn/OverviewTopBar";
import { SyllabusPanel } from "@/components/learn/SyllabusPanel";
import { getCourseDetail } from "@/constants/mock/courseDetail";
import { LEARN_OVERVIEW } from "@/constants/mock/learnOverview";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Course Overview | ${getCourseDetail(slug)?.title ?? LEARN_OVERVIEW.shortTitle}` };
}

export default async function CourseOverviewPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div className="w-full max-w-[1440px] mx-auto pb-space-3xl">
      <OverviewTopBar />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
        <SyllabusPanel courseSlug={slug} overview={LEARN_OVERVIEW} />
        <section className="lg:col-span-8 xl:col-span-9 space-y-space-2xl">
          <OverviewHero courseSlug={slug} overview={LEARN_OVERVIEW} />
          <OutcomeCards outcomes={LEARN_OVERVIEW.outcomes} />
          <ModuleCards courseSlug={slug} modules={LEARN_OVERVIEW.modules} />
          <FirstModuleCta courseSlug={slug} />
          <CounselNotice />
        </section>
      </div>
    </div>
  );
}
