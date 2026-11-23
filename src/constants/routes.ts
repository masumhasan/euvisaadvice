/** Main-site pages live in this same app now, so links are relative. */
export const MAIN_SITE_URL = "";

export const ROUTES = {
  home: "/",
  courses: "/courses",
  course: (slug: string) => `/courses/${slug}`,
  courseOverview: (slug: string) => `/learn/${slug}`,
  myLearning: "/my-learning",
  lesson: (course: string, lesson: string) => `/learn/${course}/${lesson}`,
  paymentSuccess: "/payment/success",
  studio: {
    dashboard: "/studio",
    courses: "/studio/courses",
    newCourse: "/studio/courses/new",
    curriculum: (id: string) => `/studio/courses/${id}/curriculum`,
    upload: (id: string) => `/studio/courses/${id}/upload`,
    students: "/studio/students",
    settings: "/studio/settings",
  },
} as const;

export const MAIN_SITE_LINKS = {
  aiVisaAdvice: `${MAIN_SITE_URL}/legalchat`,
  services: `${MAIN_SITE_URL}/services`,
  howItWorks: `${MAIN_SITE_URL}/how-it-works`,
  about: `${MAIN_SITE_URL}/about-us`,
  terms: `${MAIN_SITE_URL}/terms-of-service`,
  privacy: `${MAIN_SITE_URL}/privacy-policy`,
  imprint: `${MAIN_SITE_URL}/imprint`,
} as const;
