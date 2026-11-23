import type { Metadata } from "next";
import { CatalogFilterProvider } from "@/components/courses/CatalogFilterContext";
import { CatalogHero } from "@/components/courses/CatalogHero";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { FeaturedCourseCard } from "@/components/courses/FeaturedCourseCard";
import { PdfBooksSection } from "@/components/books/PdfBooksSection";
import { RetainerBanner } from "@/components/courses/RetainerBanner";
import { WhyLearnSection } from "@/components/courses/WhyLearnSection";
import { COURSES, FEATURED_COURSE } from "@/constants/mock/courses";

export const metadata: Metadata = { title: "Visa & Immigration Courses & PDF Books" };

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function CoursesPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  return (
    <div className="flex flex-col w-full">
      <CatalogFilterProvider courses={COURSES} initialQuery={q ?? ""}>
        <CatalogHero />
        <FeaturedCourseCard course={FEATURED_COURSE} />
        <CourseGrid />
      </CatalogFilterProvider>
      <PdfBooksSection />
      <WhyLearnSection />
      <RetainerBanner />
    </div>
  );
}
