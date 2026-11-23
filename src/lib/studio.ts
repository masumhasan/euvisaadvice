import { findStudioCourse } from "@/constants/mock/studioCourses";
import { getCourseDetail } from "@/constants/mock/courseDetail";
import { ROUTES } from "@/constants/routes";

/** "chancenkarte-opportunity-card" -> "Chancenkarte Opportunity Card" (used for newly created courses). */
function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getStudioCourseTitle(courseId: string): string {
  return findStudioCourse(courseId)?.title ?? (titleFromSlug(courseId) || "Untitled Course");
}

/** Student-facing overview link for a studio course, falling back to the flagship course when none exists yet. */
export function getStudentPreviewHref(courseId: string): string {
  return getCourseDetail(courseId) ? ROUTES.courseOverview(courseId) : ROUTES.courseOverview("german-national-visa-playbook");
}
