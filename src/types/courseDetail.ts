export type LessonKind = "video" | "article" | "quiz" | "assignment";

export interface CurriculumLesson {
  id: string;
  kind: LessonKind;
  title: string;
  /** Format caption shown under the title, e.g. "Video Lesson". */
  format?: string;
  duration?: string;
  freePreview?: boolean;
}

export interface CurriculumModule {
  id: string;
  title: string;
  lessonCount: number;
  minutes: number;
  freePreview?: boolean;
  lessons?: CurriculumLesson[];
  /** Teaser shown while the lessons are locked. */
  lockedNote?: string;
}

export interface CourseOutcome {
  title: string;
  /** May contain emphasised text; rendered as plain string. */
  text: string;
}

export interface CourseReview {
  author: string;
  role: string;
  context: string;
  quote: string;
}

export interface CourseFaq {
  question: string;
  answer: string;
}

export interface CourseInstructor {
  name: string;
  title: string;
  location: string;
  bio: string;
  stats: { icon: string; label: string; value?: string; tone?: "primary" | "success" | "muted" }[];
}

export interface CoursePurchase {
  price: number;
  listPrice: number;
  discountLabel: string;
  kitNote: string;
  guarantee: string;
  features: { strong?: string; text: string }[];
  image: string;
  previewLabel: string;
}

export interface CourseDetail {
  slug: string;
  overline: string;
  title: string;
  subtitle: string;
  rating: number;
  reviewCountLabel: string;
  lead: string;
  leadCredential: string;
  updated: string;
  language: string;
  specs: string[];
  moduleCount: number;
  lessonCount: number;
  totalDuration: string;
  outcomes: CourseOutcome[];
  prerequisites: { label: string; text: string }[];
  modules: CurriculumModule[];
  instructor: CourseInstructor;
  reviews: CourseReview[];
  faqs: CourseFaq[];
  legalNotice: string;
  purchase: CoursePurchase;
}
