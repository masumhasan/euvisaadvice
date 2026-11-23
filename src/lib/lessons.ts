import { ROUTES } from "@/constants/routes";
import type { CourseDetail, CurriculumLesson } from "@/types/courseDetail";

export function flattenLessons(course: CourseDetail): CurriculumLesson[] {
  return course.modules.flatMap((module) => module.lessons ?? []);
}

export function findLesson(course: CourseDetail, lessonId: string): CurriculumLesson | undefined {
  return flattenLessons(course).find((lesson) => lesson.id === lessonId);
}

/** Link target for "Complete & Next": the following lesson, or the course overview at the end. */
export function getNextLessonHref(course: CourseDetail, lessonId: string): string {
  const lessons = flattenLessons(course);
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  const next = lessons[index + 1];
  return next ? ROUTES.lesson(course.slug, next.id) : ROUTES.courseOverview(course.slug);
}
