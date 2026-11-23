import { IMAGES } from "@/constants/images";
import { COURSES, FEATURED_COURSE, findCourse } from "@/constants/mock/courses";
import type { CourseDetail, CurriculumModule } from "@/types/courseDetail";

const MODULES: CurriculumModule[] = [
  {
    id: "m0",
    title: "Module 00: How the System Really Works",
    lessonCount: 3,
    minutes: 22,
    freePreview: true,
    lessons: [
      {
        id: "0-1",
        kind: "video",
        title: "0.1 The Practical Architecture & The 3 Powers of German Immigration",
        format: "Video Lesson",
        duration: "08:14",
        freePreview: true,
      },
      {
        id: "0-2",
        kind: "article",
        title: "0.2 The Core Regulatory Framework in 5 Provisions (AufenthG Rules)",
        format: "Overview Brief & Audio Guide",
        duration: "09:50",
      },
      {
        id: "0-3",
        kind: "quiz",
        title: "0.3 Module 00 Verification & Institutional Check",
        format: "Interactive Checkpoint",
        duration: "04:00",
      },
    ],
  },
  {
    id: "m1",
    title: "Module 01: Creating Your Auslandsportal Account & Flawless Lodgement",
    lessonCount: 3,
    minutes: 34,
    lessons: [
      { id: "1-1", kind: "video", title: "1.1 Digital Portal Prerequisites & Account Provisioning" },
      { id: "1-2", kind: "video", title: "1.2 Data Validation & Avoiding Instant Reject Flags" },
      { id: "1-3", kind: "assignment", title: "1.3 Submission Checksum & Consular Acknowledgement Receipt" },
    ],
  },
  {
    id: "m2",
    title: "Module 02: Appointment Securing & Logistics Layer Management",
    lessonCount: 3,
    minutes: 30,
    lessons: [
      { id: "2-1", kind: "video", title: "2.1 VFS / TLScontact vs Direct Embassy Appointment Scheduling" },
      { id: "2-2", kind: "video", title: "2.2 Defeating Black-Market Appointment Bots Legally" },
      { id: "2-3", kind: "quiz", title: "2.3 Slot Acquisition Scenario Test" },
    ],
  },
  {
    id: "m3",
    title: "Module 03: The Ironclad Dossier Assembly & Apostille Verification",
    lessonCount: 3,
    minutes: 32,
    lockedNote: "3 comprehensive dossier construction modules & PDF templates locked until enrollment.",
  },
  {
    id: "m4",
    title: "Module 04: The Consular Interview Day & Biometric Lodgement",
    lessonCount: 3,
    minutes: 28,
    lockedNote: "Consular interview preparation, counter psychology, and biometric security steps.",
  },
  {
    id: "m5",
    title: "Module 05: After Submission — Tracking Your File Across Agencies",
    lessonCount: 4,
    minutes: 34,
    lockedNote: "Inter-agency routing tracking (BAMF, BA Vorabzustimmung, and local Ausländerbehörde).",
  },
  {
    id: "m6",
    title: "Module 06: Remedying Stalls, Delays & Remonstration Actions",
    lessonCount: 4,
    minutes: 30,
    lockedNote: "Remonstration (Widerspruch) legal drafting templates, deadlines, and § 75 VwGO pressure letters.",
  },
  {
    id: "m7",
    title: "Module 07: Post-Arrival Formalities: Anmeldung & Final Residence Card",
    lessonCount: 4,
    minutes: 24,
    lockedNote: "Registration at the Bürgeramt, public health insurance activation, and physical eAT card collection.",
  },
];

const PLAYBOOK_DETAIL: CourseDetail = {
  slug: FEATURED_COURSE.slug,
  overline: "Immigration & Expedition Track • 2026 Regulations Update",
  title: FEATURED_COURSE.title,
  subtitle:
    "The authoritative relocation and visa masterclass for skilled workers, IT specialists, and international professionals navigating the Auslandsportal, ZAB equivalence, and consular interviews without procedural delays or administrative rejection.",
  rating: 4.9,
  reviewCountLabel: "(480+ enrolled applicants)",
  lead: "EUVisaAdvice Expert Team",
  leadCredential: "(Visa & Relocation Specialists)",
  updated: "Jan 2026 (§ 20a & § 18b AufenthG)",
  language: "Bilingual DE/EN Official Templates",
  specs: [
    "8 Modules",
    "27 Lessons",
    "4h 30m Runtime",
    "Lifetime Course Access",
    "Full Procedural Dossier Pack",
  ],
  moduleCount: 8,
  lessonCount: 27,
  totalDuration: "4 hours 30 minutes",
  outcomes: [
    {
      title: "Consular Services Portal Lodgement",
      text: "Navigate the Auslandsportal with zero fatal data-entry mistakes, metadata flaws, or mismatched field types.",
    },
    {
      title: "The 3 Layers of Institutional Power",
      text: "Map jurisdictions precisely: Embassy/Consulate vs Logistics Contractor (VFS Global/TLScontact) vs Ausländerbehörde.",
    },
    {
      title: "BA Employment Declaration Architecture",
      text: "Structure the Erklärung zum Beschäftigungsverhältnis to breeze through Federal Employment Agency checks.",
    },
    {
      title: "Embassy Slot Securing & Bot Defense",
      text: "Circumvent third-party broker cartels to schedule legitimate consular appointments without risking cancellation.",
    },
    {
      title: "ZAB & Anabin Fast-Track Equivalence",
      text: "Obtain rapid Statement of Comparability validation for foreign qualifications under updated 2026 guidelines.",
    },
    {
      title: "Administrative Remonstration (Widerspruch)",
      text: "Draft structured administrative challenges and diplomatic inquiries if an application is stalled or rejected.",
    },
  ],
  prerequisites: [
    {
      label: "Target Pathway Identification:",
      text: "General intention to pursue the EU Blue Card (§ 18b), Qualified Employment (§ 18a), or the points-based Opportunity Card (Chancenkarte § 20a).",
    },
    {
      label: "No Prior Immigration Knowledge Needed:",
      text: "All regulatory requirements (AufenthG, BeschV, VwVfG) are deconstructed into practical step-by-step checklists and bilingual dossier files.",
    },
    {
      label: "Document Readiness:",
      text: "Access to standard personal identification, university degree/vocational diplomas, and draft or confirmed employment offers for instant dossier audit.",
    },
  ],
  modules: MODULES,
  instructor: {
    name: "EUVisaAdvice Expert Team",
    title: "Senior Relocation & Visa Advisory Specialists",
    location: "Advisory Liaison • Berlin & Frankfurt",
    bio: "Specializing in high-skilled corporate migration, qualification recognition, and administrative visa pathways across Germany and the European Union for more than 14 years.",
    stats: [
      { icon: "workspace_premium", value: "500+", label: "Successful Relocations", tone: "primary" },
      { icon: "task_alt", value: "98.2%", label: "Consular Approval Rate", tone: "success" },
      { icon: "menu_book", label: "Authors, German Relocation Practice Guide", tone: "muted" },
    ],
  },
  reviews: [
    {
      author: "Aarav M.",
      role: "Senior Cloud Architect → Munich",
      context: "Embassy New Delhi • Blue Card",
      quote:
        "The breakdown of the Auslandsportal file upload requirements saved me weeks. My colleague filed on his own and was rejected due to an incorrect declaration form. This course provided the exact DOCX template the consulate accepted without a single follow-up.",
    },
    {
      author: "Camila R., MD",
      role: "Clinical Researcher → Berlin",
      context: "Consulate São Paulo • Chancenkarte",
      quote:
        "Module 06's Remonstration guide is gold. When my qualification points were miscalculated by the logistics processor, I used the team's formal administrative clarification letter. My visa was approved 8 calendar days later.",
    },
  ],
  faqs: [
    {
      question: "Is this course fully updated with the 2026 German Immigration revisions?",
      answer:
        "Yes. All modules, checklists, and document templates include the recent modifications to the Chancenkarte points schedule (§ 20a AufenthG), lowered salary thresholds for the EU Blue Card, and updated Federal Employment Agency (BA) internal testing rules.",
    },
    {
      question: "Are document checklists and templates regularly reviewed?",
      answer:
        "Yes. All document organizers, bilingual exhibits, and cover letter templates are routinely audited by accredited visa specialists against updated BMI and Auswärtiges Amt procedural directives.",
    },
    {
      question: "How long do I maintain access to the masterclass content and updates?",
      answer:
        "Enrollment grants lifetime access. As German immigration regulations shift or embassy digital portals evolve, masterclass videos, e-books, and documentation kits are refreshed at no additional charge.",
    },
    {
      question: "What if my planned visa category differs (e.g., Freelance § 21 or Family Reunion § 28)?",
      answer:
        "While Modules 02 through 07 cover the universal mechanics common to all German national D-visas (Auslandsportal submission, apostilles, consular interviews, and remonstrations), specialized freelance revenue plans and family integration proofs are detailed in our specialized track add-ons.",
    },
  ],
  legalNotice:
    "EUVisaAdvice Academy is an educational and document preparation platform, not a law firm. This masterclass constitutes specialized procedural training, educational materials, and practical filing frameworks. It does not establish an attorney-client relationship, nor constitute formal legal representation or legal advice. While curriculum templates reflect official standards of the German Federal Foreign Office (Auswärtiges Amt), official visa issuance remains subject to sovereign consular discretion.",
  purchase: {
    price: 189,
    listPrice: 299,
    discountLabel: "36% OFF",
    kitNote: "Full 2026 Dossier Kit + E-Book (PDF) Included",
    guarantee: "14-day money-back guarantee",
    features: [
      { strong: "4.5 hours", text: " on-demand video & audio breakdowns" },
      { strong: "180-page E-Book (PDF)", text: " with complete relocation blueprints" },
      { strong: "14 downloadable templates", text: " & checklists (PDF & DOCX)" },
      { strong: "Lifetime Access", text: " with ongoing immigration updates" },
      { text: "Cross-platform access: Web, iPadOS, iOS & Android" },
      { text: "Bundesagentur für Arbeit compliance updates feed" },
    ],
    image: IMAGES.courseFeatured,
    previewLabel: "Preview Lesson 01 (09:42)",
  },
};

/** Per-course sales page sections to hide. A hidden section gets an empty list, and the page skips empty sections. */
const HIDDEN_SECTIONS: Record<string, { reviews?: boolean; prerequisites?: boolean }> = {
  "eu-blue-card-application-masterclass": { reviews: true, prerequisites: true },
  "germany-opportunity-card-points-system": { reviews: true },
};

/**
 * Returns the detail page content for a course slug.
 * Only the flagship playbook has bespoke content in the designs; other courses
 * reuse its structure with their own title, price and stats until real data exists.
 */
export function getCourseDetail(slug: string): CourseDetail | null {
  if (slug === PLAYBOOK_DETAIL.slug) return PLAYBOOK_DETAIL;
  const summary = COURSES.find((course) => course.slug === slug) ?? findCourse(slug);
  if (!summary) return null;
  const hidden = HIDDEN_SECTIONS[summary.slug] ?? {};
  return {
    ...PLAYBOOK_DETAIL,
    slug: summary.slug,
    title: summary.title,
    subtitle: summary.description,
    overline: `${summary.badge} • ${summary.reference}`,
    rating: summary.rating,
    reviews: hidden.reviews ? [] : PLAYBOOK_DETAIL.reviews,
    prerequisites: hidden.prerequisites ? [] : PLAYBOOK_DETAIL.prerequisites,
    reviewCountLabel: `(${summary.reviewCount} enrolled applicants)`,
    moduleCount: summary.moduleCount,
    lessonCount: summary.lessonCount,
    specs: PLAYBOOK_DETAIL.specs.map((spec, i) =>
      i === 0 ? `${summary.moduleCount} Modules` : i === 1 ? `${summary.lessonCount} Lessons` : spec,
    ),
    purchase: {
      ...PLAYBOOK_DETAIL.purchase,
      price: summary.price,
      listPrice: Math.round(summary.price * 1.58),
      image: summary.image,
    },
  };
}
