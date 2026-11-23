import type { Metadata } from "next";
import { CurriculumBuilder } from "@/components/studio/curriculum/CurriculumBuilder";
import { CurriculumHeader } from "@/components/studio/curriculum/CurriculumHeader";
import { getStudentPreviewHref, getStudioCourseTitle } from "@/lib/studio";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Curriculum Builder" };

export default async function CurriculumPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col w-full">
      <CurriculumHeader previewHref={getStudentPreviewHref(id)} title={getStudioCourseTitle(id)} />
      <CurriculumBuilder courseId={id} />
    </div>
  );
}
