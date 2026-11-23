export type CourseFormat = "video" | "ebook" | "bundle";

export type CategoryKey =
  | "all"
  | "video"
  | "ebook"
  | "work"
  | "bluecard"
  | "chancenkarte"
  | "student"
  | "family"
  | "relocation";

export interface CourseCategory {
  key: CategoryKey;
  label: string;
}

export interface CourseSummary {
  slug: string;
  title: string;
  /** Short category badge shown on the card image. */
  badge: string;
  categories: CategoryKey[];
  /** Regulation or guide reference shown above the title. */
  reference: string;
  format?: CourseFormat;
  formatLabel?: string;
  pageCount?: number;
  rating: number;
  reviewCount: number;
  moduleCount: number;
  lessonCount: number;
  description: string;
  perks: string[];
  price: number;
  image: string;
}

export interface FeaturedCourse extends CourseSummary {
  /** Highlight tags shown above the title. */
  tags: { icon?: string; label: string }[];
  runtime: string;
  instructors: string;
  priceNote: string;
  previewLabel: string;
  attachmentsNote: string;
}
