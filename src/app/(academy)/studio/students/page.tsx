import type { Metadata } from "next";
import { StudentsView } from "@/components/studio/students/StudentsView";

export const metadata: Metadata = { title: "Students & Dossiers" };

export default function StudentsPage() {
  return <StudentsView initialTab="students" />;
}
