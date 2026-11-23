import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizView } from "@/components/quiz/QuizView";
import { TextLessonView } from "@/components/lesson/TextLessonView";
import { VideoLessonHeader } from "@/components/lesson/VideoLessonHeader";
import { VideoStage } from "@/components/lesson/VideoStage";
import { VideoTabs } from "@/components/lesson/VideoTabs";
import { VIDEO_LESSON } from "@/constants/mock/videoLesson";
import { getCourseDetail } from "@/constants/mock/courseDetail";
import { findLesson, getNextLessonHref } from "@/lib/lessons";

interface PageProps {
  params: Promise<{ slug: string; lessonId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lessonId } = await params;
  const course = getCourseDetail(slug);
  const lesson = course && findLesson(course, lessonId);
  return { title: lesson?.title ?? "Lesson" };
}

/** One route for every lesson; the lesson kind selects which player template renders. */
export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonId } = await params;
  const course = getCourseDetail(slug);
  const lesson = course && findLesson(course, lessonId);
  if (!course || !lesson) notFound();

  const nextHref = getNextLessonHref(course, lessonId);

  switch (lesson.kind) {
    case "video":
      return (
        <>
          <VideoLessonHeader lesson={VIDEO_LESSON} nextHref={nextHref} />
          <VideoStage lesson={VIDEO_LESSON} />
          <VideoTabs lesson={VIDEO_LESSON} />
        </>
      );
    case "quiz":
      return <QuizView courseSlug={slug} />;
    default:
      return <TextLessonView courseSlug={slug} nextHref={nextHref} />;
  }
}
