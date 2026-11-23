import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailHero } from "@/components/course-detail/CourseDetailHero";
import { CurriculumAccordion } from "@/components/course-detail/CurriculumAccordion";
import { FaqAccordion } from "@/components/course-detail/FaqAccordion";
import { InstructorSection } from "@/components/course-detail/InstructorSection";
import { LegalNotice } from "@/components/course-detail/LegalNotice";
import { OutcomesSection, PrerequisitesSection } from "@/components/course-detail/OutcomesAndPrerequisites";
import { PurchaseCard } from "@/components/course-detail/PurchaseCard";
import { COURSES, FEATURED_COURSE } from "@/constants/mock/courses";
import { getCourseDetail } from "@/constants/mock/courseDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [FEATURED_COURSE, ...COURSES].map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseDetail(slug);
  return { title: course?.title ?? "Course not found" };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseDetail(slug);
  if (!course) notFound();

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[600px] -left-48 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-gutter py-space-xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          <div className="lg:col-span-7 xl:col-span-8 space-y-space-2xl min-w-0">
            <div>
              <CourseDetailHero course={course} />
            </div>
            <OutcomesSection outcomes={course.outcomes} />
            {course.prerequisites.length > 0 && <PrerequisitesSection items={course.prerequisites} />}
            <CurriculumAccordion course={course} />
            <InstructorSection instructor={course.instructor} />
            <FaqAccordion faqs={course.faqs} />
            <LegalNotice text={course.legalNotice} />
          </div>
          <PurchaseCard course={course} />
        </div>
      </div>
    </div>
  );
}
