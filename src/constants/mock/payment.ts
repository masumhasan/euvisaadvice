import { IMAGES } from "@/constants/images";
import { ROUTES } from "@/constants/routes";
import { FEATURED_COURSE } from "@/constants/mock/courses";
import { DEMO_LESSON_IDS } from "@/constants/learnSidebar";

const slug = FEATURED_COURSE.slug;

export const PAYMENT = {
  gatewayLabel: "Payment Confirmed via Payoneer Official Gateway",
  headline: { lead: "You're Enrolled in", accent: "The Masterclass" },
  intro:
    "Your academic enrollment dossier has been authenticated and provisioned under EU Directive standards. You can begin learning immediately or inspect your verified statutory documents.",
  email: "alexander.vonberg@example.com",
  course: {
    dossierId: "DOSSIER ID: DE-2026-8841-B",
    image: IMAGES.paymentCourse,
    series: "BERLIN MASTERCLASS SERIES • INCL. AUFENTHG 2026 UPDATE",
    moduleTitle: "Module 00: System Logic",
    moduleMeta: "UNLOCKED • 34 MIN LECTURE",
    quality: "4K UHD",
    title: "The German National Visa Playbook & Opportunity Card Masterclass (2026 Edition)",
    instructorName: "EUVisaAdvice Expert Team",
    instructorRole: "(Head of Visa Advisory & Relocation) and team.",
    description:
      "Comprehensive preparation for Section 18a/18b AufenthG, EU Blue Card threshold updates, and Chancenkarte scoring procedures.",
    stats: [
      { icon: "menu_book", label: "Curriculum", value: "8 Modules", note: "27 Chapters" },
      { icon: "folder_special", label: "Dossier Kit", value: "14 Templates + E-Book", note: "PDF & DOCX Guides" },
      { icon: "verified", label: "Accreditation", value: "Official CPD", note: "Recognized Standards" },
    ],
    advisor: {
      avatar: IMAGES.advisorAvatar,
      name: "Clara Becker, Senior Advisor",
      role: "Assigned Personal Advisory Proctor • Desk Active",
    },
    syllabusHref: ROUTES.courseOverview(slug),
  },
  receipt: {
    rows: [
      { label: "Order Reference", value: "#EUA-2026-8841X", tone: "gold" },
      { label: "Transaction ID", value: "PAY-99281-EU", tone: "code" },
      { label: "Timestamp", value: "24 May 2026 • 14:32 CET", tone: "text" },
    ],
    method: "Payoneer Secure Payment (EUR)",
    billingName: "Alexander von Berg",
    billingPlace: "Munich, Bavaria, DE",
    net: "€158.82",
    vat: "€30.18",
    total: "€189.00",
    taxNote: "One-Stop-Shop Tax ID: DE318992011",
    taxNoteRest: ". Digital service delivered under Council Directive (EU) 2017/2455 regulations.",
    invoiceSize: "142 KB",
    warrantyTitle: "14-Day Money-Back Warranty",
    warrantyText: "Full refund eligibility if coursework fails compliance check against updated German immigration directives.",
  },
  nextSteps: [
    {
      number: "01",
      icon: "play_circle",
      iconClass: "text-primary",
      title: "Access Course Player",
      lead: "Module 00: How the System Really Works",
      body: " is unlocked and streaming ready with integrated terminology tags.",
      cta: "Launch Video Player",
      ctaIcon: "chevron_right",
      href: ROUTES.lesson(slug, DEMO_LESSON_IDS.video),
    },
    {
      number: "02",
      icon: "folder_zip",
      iconClass: "text-gold-highlight",
      title: "Download Dossier Kit & E-Book",
      body: "14 German consular-compliant PDF & DOCX templates and the 180-page companion e-book ready in your locker.",
      cta: "Open Document Locker",
      ctaIcon: "download",
      href: ROUTES.myLearning,
    },
    {
      number: "03",
      icon: "support_agent",
      iconClass: "text-tertiary",
      title: "Assigned Advisory Proctor",
      body: "Senior Advisor Clara Becker is assigned to oversee course progress and ensure your dossier kits align with updated consular requirements.",
      cta: "Open Course Player",
      ctaIcon: "play_circle",
      href: ROUTES.lesson(slug, DEMO_LESSON_IDS.video),
    },
  ],
  startHref: ROUTES.lesson(slug, "0-1"),
  trust: {
    tls: "256-bit TLS Encrypted Transaction",
    bar: "European Educational Quality Standard Compliance",
    ledger: "Verified Registration on EU Educational Ledger",
  },
};
