import { IMAGES } from "@/constants/images";

export type BuilderLessonKind = "video" | "audio" | "quiz";

export interface BuilderLesson {
  id: string;
  number: string;
  title: string;
  kind: BuilderLessonKind;
  kindLabel: string;
  detail: string;
  transcoded?: boolean;
}

export interface BuilderModule {
  id: string;
  label: string;
  title: string;
  summary: string;
  freePreview?: boolean;
  locked?: boolean;
  dimmed?: boolean;
  lessons: BuilderLesson[];
}

export const LESSON_KIND_ICONS: Record<BuilderLessonKind, string> = {
  video: "play_arrow",
  audio: "headphones",
  quiz: "quiz",
};

export const LESSON_FORMATS = [
  "Video Lesson (VOD)",
  "Audio Masterclass",
  "Interactive Case Reading",
  "Knowledge Gateway Quiz",
];

export const KIND_TO_FORMAT: Record<BuilderLessonKind, string> = {
  video: LESSON_FORMATS[0],
  audio: LESSON_FORMATS[1],
  quiz: LESSON_FORMATS[3],
};

export const BUILDER_MODULES: BuilderModule[] = [
  {
    id: "m0",
    label: "Module 00",
    title: "How the System Really Works",
    summary: "22 min",
    freePreview: true,
    lessons: [
      {
        id: "0.1",
        number: "0.1",
        title: "The Practical Architecture & The 3 Powers of German Immigration",
        kind: "video",
        kindLabel: "Video Masterclass",
        detail: "08:14",
        transcoded: true,
      },
      {
        id: "0.2",
        number: "0.2",
        title: "The Core Regulatory Framework in 5 Provisions (AufenthG Rules)",
        kind: "audio",
        kindLabel: "Audio + Course Dossier",
        detail: "09:50",
      },
      {
        id: "0.3",
        number: "0.3",
        title: "Module 00 Verification & Gateway Check",
        kind: "quiz",
        kindLabel: "Mandatory Gateway Quiz",
        detail: "3 Questions (80% Pass)",
      },
    ],
  },
  {
    id: "m1",
    label: "Module 01",
    title: "Creating Your Auslandsportal Account & Flawless Lodgement",
    summary: "3 Lessons • 34 min",
    locked: true,
    lessons: [],
  },
  {
    id: "m2",
    label: "Module 02",
    title: "Appointment Securing & Logistics Layer Management",
    summary: "3 Lessons • 30 min",
    locked: true,
    lessons: [],
  },
  {
    id: "m3",
    label: "Module 03",
    title: "The Ironclad Dossier Assembly & Apostille Verification",
    summary: "4 Lessons • 52 min",
    locked: true,
    lessons: [],
  },
  {
    id: "m4",
    label: "Module 04",
    title: "Consular Interview Protocol & Objection Defenses",
    summary: "4 Lessons • 45 min",
    locked: true,
    dimmed: true,
    lessons: [],
  },
];

export const BUILDER_TABS = [
  { icon: "account_tree", label: "Curriculum Outline", badge: "27", active: true },
  { icon: "tune", label: "Course Settings" },
  { icon: "payments", label: "Payoneer Pricing & Tiers" },
  { icon: "folder_special", label: "Dossier Resources", badge: "14" },
  { icon: "fact_check", label: "Completion Rules & Exam" },
];

export const LESSON_VIDEO = {
  poster: IMAGES.builderPoster,
  file: "M00_L01_ConsularArchitecture_v3_master.mp4",
  meta: "Filesize: 412.8 MB • Audio: 320kbps AAC Stereo • Video: H.264 CRF 18",
  tags: ["Multi-Bitrate (1080p / 720p / 480p)", "Adaptive Bitrate Ready"],
  duration: "08:14",
  actions: [
    { icon: "file_upload", label: "Replace Master Video" },
    { icon: "image", label: "Poster Frame" },
  ],
};

export const LESSON_ASSETS = [
  {
    name: "BA_Mangelberufe_2026_Index.pdf",
    size: "2.4 MB",
    visibility: "Public PDF",
    icon: "picture_as_pdf",
    iconBox: "bg-status-danger-bg text-status-danger",
    visibilityClass: "text-tertiary",
  },
  {
    name: "AufenthG_Consular_Jurisdiction_Matrix.docx",
    size: "140 KB",
    visibility: "Editable Template",
    icon: "description",
    iconBox: "bg-primary/10 text-primary",
    visibilityClass: "text-primary",
  },
];

export const LESSON_COMMENTARY = {
  heading: "1. The Tripartite Institutional Architecture",
  intro:
    "Applicants must dismantle the common misconception that the German Embassy or Consulate possesses total unilateral authority over long-term D-Visa adjudication. Pursuant to ",
  statute: "§ 71 AufenthG (Aufenthaltsgesetz)",
  introEnd: ", administrative decision-making operates across three discrete sovereign organs:",
  organs: [
    { title: "1. Auswärtiges Amt (AA)", text: "Diplomatic Missions & Visastellen abroad. Formal lodgement & identity authentication." },
    { title: "2. Ausländerbehörde (LEA)", text: "Internal municipal foreigners authority. Substantive statutory clearance for residence." },
    { title: "3. Bundesagentur für Arbeit (BA)", text: "Federal Employment Agency. Labor market testing (ZAV) under § 39 AufenthG." },
  ],
  noteTitle: "Advisory Guidance Note (§ 71 Abs. 2 AufenthG)",
  noteBefore:
    "External outsourced commercial intake providers (e.g., VFS Global, TLScontact) serve exclusively as postal couriers and document-receiving depots. They have ",
  noteStrong: "strictly zero adjudicative authority",
  noteAfter:
    ". Any claim by intake clerks demanding non-statutory documents must be politely contested using our provided Pre-Clearance Citation Sheet.",
};
