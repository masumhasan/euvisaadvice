export const TEXT_LESSON = {
  syllabus: {
    title: "German National Visa Playbook",
    subtitle: "Statutory Path • Residence Act §18b / §19c",
    progress: { done: 1, total: 27, percent: 4 },
    activeModule: { index: "00", title: "How the system works" },
    lessons: [
      { icon: "play_circle", filled: true, title: "1. Three layers, three powers", meta: "Audio + Text", length: "12 min", current: true },
      { icon: "article", title: "2. The regulatory framework in 5 provisions", meta: "8 min read", href: "0-2" },
      { icon: "history_edu", title: "3. Key 2025/2026 Reforms", meta: "14 min", href: "0-2" },
      { icon: "quiz", highlight: true, title: "Module 00 Verification", meta: "3 Questions • Mandatory", href: "0-3" },
    ],
    modules: [
      { index: "01", title: "Create Account & File" },
      { index: "02", title: "Secure Appointment & Hold" },
      { index: "03", title: "The Complete Dossier File" },
    ],
    locked: [
      "04. Consular Interview Day",
      "05. Tracking File Jurisdictions",
      "06. Formal Remonstrance (Widerspruch)",
      "07. Post-Landing Registration (§81)",
    ],
  },
  header: {
    module: "Module 00",
    moduleTitle: "How the System Really Works",
    position: "Lesson 1 of 3",
    status: "Status: In Progress",
    title: "Three layers, three different powers",
    summary:
      "The single most widespread cause of consular delays and outright refusals is confusing who does what. The German visa infrastructure is divided into three distinct operational walls.",
  },
  audio: {
    src: "/assets/m0l1.mp3",
    fallbackSrc: "/assets/m0l1.mp3.mpeg",
    title: "Listen to this lesson",
    total: "12:45",
    subtitle: "Official audio lecture • High-speed summary for visa dossiers",
    elapsed: "00:00",
    chapter: "The Administrative Firewall",
    percent: 0,
    speeds: ["1.0x", "1.25x", "1.5x"],
    /** Waveform bar heights (Tailwind h-* steps); first `playedBars` are filled. */
    bars: [2, 4, 6, 3, 7, 5, 8, 6, 4, 7, 3, 5, 7, 4, 8, 2, 5, 6, 3, 7, 5, 2, 6, 4, 8, 3, 6, 2],
    playedBars: 0,
  },
  principle:
    "“Most applicants lose months because they argue with the wrong layer. The portal, the service provider, and the consular visa section are three separate entities with fundamentally non-overlapping statutory powers.”",
  layers: [
    {
      index: "01",
      tag: "Auslandsportal",
      title: "Layer 1: The Application Layer",
      text: "Hosted directly at **digital.diplo.de** by the Federal Foreign Office. This is where your master electronic record is ingested, validated, and held in escrow prior to dispatch.",
      footer: "Scope: Universal since Jan 1, 2025",
      tone: "primary",
    },
    {
      index: "02",
      tag: "Logistics Contractor",
      title: "Layer 2: The Intake Layer",
      text: "Private commercial vendors (TLScontact, VFS Global, iDATA, BLS) or embassy booking software (RK-Termin). They only collect physical passports, take biometrics, and collect handling fees.",
      footer: "Power: 0% Discretionary Authority",
      tone: "warning",
    },
    {
      index: "03",
      tag: "Sovereign Authority",
      title: "Layer 3: The Deciding Layer",
      text: "The German Diplomatic Mission (Visa Section / Botschaft) acting strictly alongside the domestic immigration office (Ausländerbehörde) and the Federal Employment Agency (BA).",
      footer: "Official Adjudication Organ",
      tone: "success",
    },
  ],
  realities: [
    {
      index: "04",
      title: "The Intake Layer Has Exactly Zero Sovereign Leverage",
      text: 'Consulates demand that private service partners explicitly publish disclaimers. Türkiye mission states: **"iDATA and IOM-FAP have no influence on the decision of any visa application."** Dhaka Embassy notes: **"VFS has no means to modify queues or accelerate files."** Never purchase third-party "fast track" promises.',
    },
    {
      index: "05",
      title: "National Visa (D) vs. Schengen (C) Segregation",
      text: "The Consular Services Portal covers long-stay purposes (>90 days: Blue Card, Opportunity Card, Employment, Family Reunion). Short-stay Schengen visas adhere to entirely separate processing rails and must not be blended within this portal stream.",
    },
    {
      index: "06",
      title: "Joint Dossier Architecture (Family Groups)",
      text: "Under recent digital consular revisions, a single authenticated primary account can tie accompanying family members into a synchronized application dossier, preserving joint interview scheduling slots.",
    },
  ],
  warning: {
    kicker: "The Fatal Assumption That Costs Applicants Months",
    title: "Online submission is NOT final lodgement",
    text: "Treating your Auslandsportal document upload as having filed the application is dangerous. Consular provisions confirm: official processing timelines commence **only upon physical passport presentation, biometric capture, and consular fee payment** at your assigned appointment.",
  },
  checkpoint: {
    title: "Prerequisite Checkpoint",
    subtitle: "Verify your comprehension before unlocking Lesson 1.2",
    items: [
      "I can pinpoint which external provider (TLS, VFS, iDATA, or Embassy directly) manages intake in my country of residence.",
      "I understand that the external vendor cannot alter decisions, expedite files, or waive statutory document requirements.",
      "I have confirmed my petition falls strictly under the National Category D visa regime and not a 90-day Schengen short-stay.",
    ],
  },
  artifacts: [
    { icon: "picture_as_pdf", name: "Three-Layers-Decision-Tree.pdf", meta: "Official Matrix • 1.4 MB" },
    { icon: "account_tree", name: "Embassy-Jurisdiction-Index-2026.pdf", meta: "Statutory Index • 890 KB" },
  ],
  sources: [
    "Auswärtiges Amt — Consular Services Portal Directives (digital.diplo.de integration)",
    "German Missions in Turkey & Bangladesh — Official External Service Provider Memoranda",
    "Aufenthaltsgesetz (AufenthG) §§ 18a, 18b, 81 Abs. 3 — Lodgement and Procedure Formalities",
  ],
};
