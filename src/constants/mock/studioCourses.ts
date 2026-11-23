import { IMAGES } from "@/constants/images";

export type StudioCourseStatus = "published" | "draft" | "archived";

export interface StudioCourse {
  id: string;
  status: StudioCourseStatus;
  statusLabel: string;
  tier?: string;
  title: string;
  author: string;
  image?: string;
  /** Icon + label shown instead of an image (drafts and archived courses). */
  placeholder?: { icon: string; label?: string };
  duration: string;
  domain: string;
  statute: string;
  depth: string;
  depthPercent?: number;
  depthNote: string;
  enrollments: string;
  enrollmentsNote: string;
  price: string;
  listPrice?: string;
  priceNote: string;
  version: string;
  versionNote: string;
}

export const STUDIO_COURSES: StudioCourse[] = [
  {
    id: "german-national-visa-playbook",
    status: "published",
    statusLabel: "Published",
    tier: "Core Tier",
    title: "The German National Visa Playbook & Opportunity Card Masterclass",
    author: "Instructor: EUVisaAdvice Expert Team",
    image: IMAGES.studioPlaybook,
    duration: "4.5h",
    domain: "Work & Relocation",
    statute: "§ 18a/b AufenthG",
    depth: "8 Modules • 27 Lessons",
    depthPercent: 100,
    depthNote: "100% video",
    enrollments: "480 Students",
    enrollmentsNote: "98.4% Completion",
    price: "€189.00",
    listPrice: "€299",
    priceNote: "€90,720.00 Gross",
    version: "Today, 08:30 CET",
    versionNote: "2026 Regulations Revisions",
  },
  {
    id: "eu-blue-card-application-masterclass",
    status: "published",
    statusLabel: "Published",
    title: "EU Blue Card Directive 2021/1883 Implementation Guide",
    author: "Lead Contributor: Dr. Elena Rostova",
    image: IMAGES.studioBlueCard,
    duration: "3.2h",
    domain: "High-Skilled Labor Mobility",
    statute: "Directive (EU) 2021/1883",
    depth: "6 Modules • 19 Lessons",
    depthPercent: 100,
    depthNote: "Templates inc.",
    enrollments: "264 Students",
    enrollmentsNote: "94.1% Completion",
    price: "€199.00",
    priceNote: "€52,536.00 Gross",
    version: "14 Oct 2024",
    versionNote: "Threshold § 18g salary update",
  },
  {
    id: "germany-opportunity-card-points-system",
    status: "published",
    statusLabel: "Published",
    title: "Chancenkarte (Opportunity Card) § 20a Scoring & Points Dossier",
    author: "Instructor: EUVisaAdvice Advisory Team",
    image: IMAGES.studioChancenkarte,
    duration: "2.8h",
    domain: "Points-Based Job Seeker",
    statute: "§ 20a/b AufenthG",
    depth: "5 Modules • 14 Lessons",
    depthPercent: 100,
    depthNote: "Interactive calc",
    enrollments: "102 Students",
    enrollmentsNote: "91.8% Completion",
    price: "€189.00",
    priceNote: "€19,278.00 Gross",
    version: "02 Oct 2024",
    versionNote: "FEA validation tables",
  },
  {
    id: "administrative-remonstration-consular-appeals-toolkit",
    status: "draft",
    statusLabel: "Draft - Quality Review",
    title: "Administrative Remonstration & Consular Appeals Toolkit",
    author: "Editorial & Compliance Review",
    placeholder: { icon: "rate_review", label: "Review" },
    duration: "2.0h",
    domain: "Remonstrations & Status Inquiries",
    statute: "§ 70 VwGO / Remonstration",
    depth: "4 Modules • 11 Lessons",
    depthPercent: 70,
    depthNote: "70% ready",
    enrollments: "0 (Pre-launch)",
    enrollmentsNote: "Waitlist: 43",
    price: "€249.00",
    priceNote: "Target Launch Q1",
    version: "Yesterday, 16:45 CET",
    versionNote: "Editorial Check",
  },
  {
    id: "schengen-business-multi-entry-c-visa-protocol",
    status: "archived",
    statusLabel: "Archived",
    title: "Schengen Business & Multi-Entry C-Visa Protocol",
    author: "Sunsetted: Visas 2023 edition",
    placeholder: { icon: "archive" },
    duration: "",
    domain: "Short-Stay Mobility",
    statute: "Visa Code (EC) 810/2009",
    depth: "3 Modules • 8 Lessons",
    depthNote: "Static Archive",
    enrollments: "58 Students",
    enrollmentsNote: "Legacy access",
    price: "€99.00",
    priceNote: "Sales Inactive",
    version: "12 Jan 2024",
    versionNote: "Superseded",
  },
];

export function findStudioCourse(id: string): StudioCourse | undefined {
  return STUDIO_COURSES.find((course) => course.id === id);
}

export const COURSE_STATS = [
  { label: "Total Active Cohorts", icon: "groups", iconClass: "text-primary", glow: "bg-primary/5", value: "904", tag: { kind: "trend", text: "+14.2%" }, note: "Cross-border candidates" },
  { label: "Gross Ledger Receipts", icon: "payments", iconClass: "text-tertiary", glow: "bg-tertiary/5", value: "€162,534", tag: { kind: "success", text: "Payoneer Rails" }, note: "Net settled via EUR IBAN" },
  { label: "Regulatory Sync Rate", icon: "sync", iconClass: "text-primary", glow: "bg-primary/5", value: "100%", tag: { kind: "gold", text: "2026 Ready" }, note: "§ 18a/b AufenthG Compliance" },
  { label: "Active Playbooks", icon: "auto_stories", iconClass: "text-gold-highlight", glow: "bg-gold-highlight/5", value: "5 / 6", tag: { kind: "muted", text: "1 Review Pending" }, note: "Catalog health optimal" },
] as const;

export const COURSE_FILTER_TABS = [
  { id: "all", label: "All Courses (6)" },
  { id: "published", label: "Published (4)" },
  { id: "draft", label: "Drafts / In Review", badge: "1" },
  { id: "archived", label: "Archived (1)" },
] as const;

export const STATUTORY_CLUSTERS = [
  "Work Visa (§ 18a/b)",
  "EU Blue Card Directive",
  "Opportunity Card (§ 20a)",
  "Family Reunification (§ 28-36)",
  "Appeals & Remonstration",
];
