import { ROUTES } from "@/constants/routes";

/** Course the sidebar "Curriculum Builder" shortcut opens (the flagship masterclass). */
export const STUDIO_DEFAULT_COURSE_ID = "german-national-visa-playbook";

export interface StudioNavItem {
  label: string;
  icon: string;
  href: string;
  /** Returns true when the current pathname belongs to this nav item. */
  isActive: (pathname: string) => boolean;
}

const COURSES_BASE = ROUTES.studio.courses;
const isCurriculumPath = (pathname: string) => /^\/studio\/courses\/[^/]+\/(curriculum|upload)/.test(pathname);

export const STUDIO_NAV: StudioNavItem[] = [
  {
    label: "Dashboard",
    icon: "grid_view",
    href: ROUTES.studio.dashboard,
    isActive: (pathname) => pathname === ROUTES.studio.dashboard,
  },
  {
    label: "Course Management",
    icon: "auto_stories",
    href: COURSES_BASE,
    isActive: (pathname) => pathname.startsWith(COURSES_BASE) && !isCurriculumPath(pathname),
  },
  {
    label: "Curriculum Builder",
    icon: "layers",
    href: ROUTES.studio.curriculum(STUDIO_DEFAULT_COURSE_ID),
    isActive: isCurriculumPath,
  },
  {
    label: "Students & Dossiers",
    icon: "group",
    href: ROUTES.studio.students,
    isActive: (pathname) => pathname.startsWith(ROUTES.studio.students),
  },
  {
    label: "Settings",
    icon: "tune",
    href: ROUTES.studio.settings,
    isActive: (pathname) => pathname.startsWith(ROUTES.studio.settings),
  },
];
