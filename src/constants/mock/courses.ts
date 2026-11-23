import { IMAGES } from "@/constants/images";
import type { CourseCategory, CourseSummary, FeaturedCourse } from "@/types/course";

export const TOTAL_COURSE_COUNT = 15;

export const COURSE_CATEGORIES: CourseCategory[] = [
  { key: "all", label: `All Curriculums (${TOTAL_COURSE_COUNT})` },
  { key: "video", label: "Video Masterclasses" },
  { key: "ebook", label: "E-Books & PDF Guides" },
  { key: "work", label: "Work & Employment Visa" },
  { key: "bluecard", label: "EU Blue Card" },
  { key: "chancenkarte", label: "Opportunity Card (Chancenkarte)" },
  { key: "student", label: "Student & Prep Visa" },
  { key: "family", label: "Family Reunification" },
  { key: "relocation", label: "Relocation & Settlement" },
];

export const FEATURED_COURSE: FeaturedCourse = {
  slug: "german-national-visa-playbook",
  title: "The German National Visa Playbook & Opportunity Card Masterclass",
  badge: "Video Course + E-Book (PDF)",
  categories: ["video", "ebook", "work", "chancenkarte"],
  format: "bundle",
  formatLabel: "Video Masterclass + Complete E-Book (PDF)",
  pageCount: 180,
  reference: "§ 20a & § 18b AufenthG",
  rating: 4.9,
  reviewCount: 480,
  moduleCount: 8,
  lessonCount: 27,
  description:
    "Complete procedural curriculum covering point calculation, ZAB degree equivalency, blocked accounts (Sperrkonto), embassy dossier assembly, and fast-track processing avenues. Includes full 180-page companion e-book.",
  perks: [],
  price: 189,
  image: IMAGES.courseFeatured,
  tags: [
    { icon: "verified", label: "Most Comprehensive • Updated for 2026 Regulations" },
    { label: "Bilingual DE/EN" },
  ],
  runtime: "4h 30m",
  instructors: "EUVisaAdvice Expert Team",
  priceNote: "or Included with Retainer",
  previewLabel: "Preview Lesson 01 (09:42)",
  attachmentsNote: "Includes 180-Page E-Book (PDF) & 14 Dossier Blueprints",
};

export const COURSES: CourseSummary[] = [
  {
    slug: "eu-blue-card-application-masterclass",
    title: "EU Blue Card Application Masterclass",
    badge: "High-Skilled Employment",
    categories: ["video", "bluecard", "work"],
    format: "video",
    formatLabel: "Video Course",
    reference: "Section 18g AufenthG",
    rating: 4.95,
    reviewCount: 312,
    moduleCount: 6,
    lessonCount: 22,
    description:
      "Step-by-step navigation of the 2024–2026 lowered salary thresholds, IT specialist exemptions without degree, fast-track PR after 21 months, and family inclusion pathways.",
    perks: [
      "Pre-formatted employment declaration (Erklärung zum Beschäftigungsverhältnis)",
      "ZAB Statement of Comparability filing toolkit",
    ],
    price: 149,
    image: IMAGES.courseBlueCard,
  },
  {
    slug: "germany-relocation-complete-ebook-guide",
    title: "Moving to Germany: The Complete Relocation Playbook (E-Book & PDF Edition)",
    badge: "Official E-Book (PDF)",
    categories: ["ebook", "relocation", "work"],
    format: "ebook",
    formatLabel: "E-Book & PDF Guide (168 Pages)",
    pageCount: 168,
    reference: "Comprehensive 2026 Edition",
    rating: 4.96,
    reviewCount: 380,
    moduleCount: 6,
    lessonCount: 24,
    description:
      "A complete 168-page downloadable PDF and ePub guide with actionable checklists, filled-out form exhibits, embassy templates, and step-by-step relocation timelines.",
    perks: [
      "168-Page High-Resolution PDF & ePub Edition",
      "Instant offline access and printable checklists",
    ],
    price: 49,
    image: IMAGES.courseRelocation,
  },
  {
    slug: "germany-opportunity-card-points-system",
    title: "Germany Opportunity Card (Chancenkarte) — Step-by-Step Points System",
    badge: "Job Seeker Visa",
    categories: ["video", "chancenkarte", "work"],
    format: "video",
    formatLabel: "Video Course",
    reference: "Section 20a • Points System",
    rating: 4.88,
    reviewCount: 260,
    moduleCount: 5,
    lessonCount: 18,
    description:
      "Master the mandatory 6-point evaluation matrix, secure English/German language scoring certs, assemble financial proof, and land probationary part-time work compliance.",
    perks: [
      "Official Points Calculation Audit Spreadsheet",
      "Embassy Motivation Letter (Motivationsschreiben) templates",
    ],
    price: 129,
    image: IMAGES.courseChancenkarte,
  },
  {
    slug: "german-student-university-prep-visa",
    title: "German Student & University Prep Visa Guide",
    badge: "Higher Education",
    categories: ["video", "student"],
    format: "video",
    formatLabel: "Video Course",
    reference: "Section 16b AufenthG",
    rating: 4.92,
    reviewCount: 190,
    moduleCount: 4,
    lessonCount: 15,
    description:
      "Uni-Assist documentation review, Studienkolleg pathways, German conditional offers, blocked account funding requirements, and working student permitted hours.",
    perks: [
      "VPD & APS validation workflow for non-EU degrees",
      "140 full days work permit compliance guide",
    ],
    price: 99,
    image: IMAGES.courseStudent,
  },
  {
    slug: "family-reunification-dependent-visa-dossier",
    title: "Family Reunification & Dependent Visa Dossier",
    badge: "Family Relocation",
    categories: ["video", "family"],
    format: "video",
    formatLabel: "Video Course",
    reference: "Section 27-36 AufenthG",
    rating: 4.91,
    reviewCount: 145,
    moduleCount: 5,
    lessonCount: 16,
    description:
      "Full dossier structuring for spouses, minor children, and parent relocation, covering A1 German language certification waivers and living space (Wohnfläche) calculations.",
    perks: [
      "Adequate housing square-meter confirmation template",
      "Apostille verification and certified sworn translation checklist",
    ],
    price: 139,
    image: IMAGES.courseFamily,
  },
  {
    slug: "schengen-multi-entry-business-travel-compliance",
    title: "Schengen Multi-Entry & Business Travel Compliance",
    badge: "Mobility & Business",
    categories: ["video", "relocation", "work"],
    format: "video",
    formatLabel: "Video Course",
    reference: "Schengen Visa Code (Regulation EC 810/2009)",
    rating: 4.85,
    reviewCount: 118,
    moduleCount: 3,
    lessonCount: 11,
    description:
      "Avoid unlawful overstays with automated 90/180-day calculations, obtain 1-to-5 year Type C multi-entry visas, and ensure bilateral treaty compliance across EU borders.",
    perks: [
      "Automated 90/180-Day Calculator & Border Log Sheet",
      "Corporate invitation and business guarantee formats",
    ],
    price: 89,
    image: IMAGES.courseSchengen,
  },
  {
    slug: "moving-to-germany-housing-insurance-anmeldung",
    title: "Moving to Germany — Housing, Health Insurance & Anmeldung",
    badge: "Settlement & Integration",
    categories: ["video", "relocation"],
    format: "video",
    formatLabel: "Video Course",
    reference: "First 90 Days in Germany",
    rating: 4.97,
    reviewCount: 520,
    moduleCount: 4,
    lessonCount: 14,
    description:
      "Actionable survival protocol for securing residential registration (Anmeldung), navigating public (GKV) vs. private (PKV) healthcare, and generating your German Tax ID.",
    perks: [
      "Landlord Confirmation (Wohnungsgeberbestätigung) template",
      "SCHUFA credit generation & bank setup blueprint",
    ],
    price: 79,
    image: IMAGES.courseRelocation,
  },
];

export function findCourse(slug: string): CourseSummary | undefined {
  return slug === FEATURED_COURSE.slug ? FEATURED_COURSE : COURSES.find((c) => c.slug === slug);
}
