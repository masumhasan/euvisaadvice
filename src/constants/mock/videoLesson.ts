import { IMAGES } from "@/constants/images";

export const VIDEO_LESSON = {
  moduleLabel: "Module 01",
  lessonLabel: "Lesson 1.2",
  title: "Sample Master Course",
  duration: "16 Min 40 Sec",
  statutes: "AufenthG § 18b • BeschV § 2",
  verified: "Verified for Q1 2026 Standards",
  bookmarkAt: "08:24",
  totalTime: "16:40",
  progress: 50.4,
  buffered: 68,
  markers: [
    { left: 18, title: "03:15 Portal Setup", active: false },
    { left: 50.4, title: "08:24 § 18b Salary Verification", active: true },
    { left: 78, title: "13:10 Document Formatting", active: false },
  ],
  chapterLabel: "Chapter 3: § 18b Field Traps",
  thumbnail: IMAGES.videoThumb,
  briefing: {
    heading: "Consular Services Portal Guidelines (Auswärtiges Amt)",
    text: "In this masterclass unit, our senior relocation specialists dissect the machine-readable input mechanics of the German Federal Foreign Office portal. A minor discrepancy between your job specification (Erklärung zum Beschäftigungsverhältnis) and line 4 of the digital form will trigger an automated consular refusal.",
    hazardTitle: "Fatal Invalidation Hazard: Annex A Discrepancy",
    hazardText:
      "Uploading an un-flattened PDF or misaligning your gross Euro compensation by even €1 below the statutory annual cap (€45,300 for bottleneck positions) immediately drops your application into the non-recoverable backlog. Always confirm machine-readable OCR tags prior to execution.",
    directives: [
      {
        tag: "01 / PRE-CHECK",
        icon: "verified_user",
        title: "Pre-Validation Run",
        text: "Execute the sandbox verification tool before finalizing your final consular booking submission.",
      },
      {
        tag: "02 / BIOMETRIC ID",
        icon: "fingerprint",
        title: "ICAO 9303 Compliance",
        text: "Passport scans must retain standard lighting metadata without automatic mobile filter artifacts.",
      },
      {
        tag: "03 / SALARY RULE",
        icon: "euro",
        title: "§ 18b Salary Alignment",
        text: "Federal Employment Agency (BA) requires unequivocal contract terms matching employment classification.",
      },
    ],
  },
  chapters: [
    { time: "00:00", title: "Consular Portal Architecture & System Upgrades", state: "done" },
    { time: "03:15", title: "Account Provisioning & Two-Factor Authentication", state: "done" },
    { time: "08:24", title: "Job Specification Input & Salary Validation Pitfalls", state: "current" },
    { time: "11:50", title: "Proof of Health Insurance (§ 11 AufenthG Standards)", state: "todo", length: "03:10" },
    { time: "15:00", title: "Final Submission Checksum & Consular Acknowledgement Slip", state: "todo", length: "01:40" },
  ] as const,
  instructor: {
    name: "EUVisaAdvice Expert Team",
    role: "Senior Relocation & Visa Advisory",
    bar: "Accredited Relocation Advisors",
    bio: "Specializing in high-skilled expatriate mobility, Section 18 AufenthG petitions, and relocation guidance for over 14 years.",
    avatar: IMAGES.instructorAvatar,
  },
  attachments: [
    { icon: "picture_as_pdf", name: "Portal-Field-Validation-CheatSheet-2026.pdf", meta: "1.4 MB • Checklist" },
    { icon: "description", name: "German-Consular-Upload-Standards.pdf", meta: "840 KB • Technical Spec" },
  ],
  nextUp: {
    label: "LESSON 1.3",
    duration: "12 Min 15 Sec",
    title: "Booking Bot Scams & Authentic RK-Termin Intake Scheduling",
    text: "Avoid black-market calendar reservation traps and configure legitimate embassy appointment alerts.",
  },
  resources: [
    { icon: "article", name: "Erklärung zum Beschäftigungsverhältnis Form 2026", meta: "PDF • 1.8 MB • Annotated by Advisory Team" },
    { icon: "description", name: "Consular Document Formatting Guidelines", meta: "PDF • 620 KB • Technical Resolution Specs" },
    { icon: "table_chart", name: "Salary Threshold Matrix § 18b (All 16 Bundesländer)", meta: "XLSX • 410 KB • Updated January 2026" },
    { icon: "fact_check", name: "Pre-Submission Dossier Completeness Rubric", meta: "PDF • 890 KB • Self-Audit Standard" },
  ],
  questions: [
    {
      initials: "AK",
      author: "Artemis K.",
      when: "2 days ago",
      timestamp: "08:24",
      question:
        "If my employment contract lists an on-call allowance in addition to the base salary, does the visa office count this towards the § 18b minimum threshold?",
      answerer: "EUVisaAdvice Team • Verified Answer",
      answer:
        "No. Discretionary or conditional bonus allowances cannot be applied toward the threshold. Only guaranteed, fixed gross Euro compensation is admissible under current BeschV § 2 directives.",
    },
  ],
  note: {
    savedAt: "Saved at 08:24",
    created: "Created today at 14:15",
    text: "Verify with our German employer HR whether the gross base salary without the Munich cost-of-living stipend exceeds the 45,300 Euro threshold before submitting Annex A.",
  },
};
