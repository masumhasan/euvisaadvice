import type { Metadata } from "next";
import { NewCourseForm } from "@/components/studio/new-course/NewCourseForm";

export const metadata: Metadata = { title: "Create New Course" };

export default function NewCoursePage() {
  return <NewCourseForm />;
}
