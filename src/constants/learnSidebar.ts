import { ROUTES } from "@/constants/routes";

/** Fixed lesson ids used by the sidebar shortcuts (one per lesson template). */
export const DEMO_LESSON_IDS = {
  video: "1-2",
  textAudio: "0-2",
  quiz: "0-3",
} as const;

export const LEARN_SIDEBAR = {
  progress: 42,
  items: [
    { label: "Module 1: Legal Frameworks", icon: "folder_open", href: ROUTES.courseOverview },
    {
      label: "Lesson 1.2: Consular Evidence",
      icon: "play_circle",
      href: (slug: string) => ROUTES.lesson(slug, DEMO_LESSON_IDS.video),
    },
    {
      label: "Statutory Precedents & Notes",
      icon: "description",
      href: (slug: string) => ROUTES.lesson(slug, DEMO_LESSON_IDS.textAudio),
    },
    {
      label: "Module Assessment & Quiz",
      icon: "quiz",
      href: (slug: string) => ROUTES.lesson(slug, DEMO_LESSON_IDS.quiz),
    },
    { label: "Application Dossier Builder", icon: "checklist", href: () => ROUTES.myLearning },
  ],
} as const;
