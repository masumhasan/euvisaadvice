export interface QuizQuestion {
  id: string;
  label: string;
  prompt: string;
  options: string[];
  correct: number;
  /** Statutory reasoning shown after the question is answered. */
  precedent?: { title: string; text: string };
}

export const QUIZ = {
  track: {
    title: "The German National Visa Playbook",
    subtitle: "Foundational consular mechanics & statutory standards.",
    progressLabel: "3 of 4 Done • 75%",
    percent: 75,
    lessons: [
      { title: "1. Three layers, three authorities", length: "8 min", lessonId: "0-2" },
      { title: "2. The regulatory framework in 5 provisions", length: "14 min", lessonId: "0-2" },
      { title: "3. 2025/2026 Reforms & common errors", length: "12 min", lessonId: "0-2" },
    ],
    activeLabel: "Module Check • 3 questions",
    lockedModule: "Module 01: Create account & file file",
  },
  header: {
    kicker: "Module 00",
    type: "Knowledge Assessment",
    title: "Check yourself: How the system really works",
    introTitle: "Regulatory Knowledge Assessment",
    intro:
      "Three questions. Every answer choice comes with practical reasoning, so a wrong pick is worth more than a right one. Complete all 3 validation checks with 100% precision to unlock Module 01.",
  },
  questions: [
    {
      id: "q1",
      label: "Question 1 of 3 • Jurisdictional Competence",
      prompt: "Who decides your national visa application?",
      options: [
        "The service provider that took your biometric file (VFS Global / TLScontact)",
        "The German mission (embassy/consulate), after any required consent of the Ausländerbehörde",
        "The Bundesverwaltungsamt (BVA) central register in Cologne",
      ],
      correct: 1,
      precedent: {
        title: "Statutory Precedent: § 71 Abs. 2 AufenthG",
        text: "Under § 71 Abs. 2 of the German Residence Act (AufenthG), diplomatic missions are exclusively competent for national visa issuance abroad in coordination with domestic immigration authorities. Outsourced visa facilitation centers perform mere intake logistics.",
      },
    },
    {
      id: "q2",
      label: "Question 2 of 3 • Available Remedies & Timelines",
      prompt: "You receive a formal refusal notice dated 12 March 2026. What official remedy is immediately available?",
      options: [
        "Informal remonstration within a one-year statutory window",
        "Formal remonstration within one month (or direct administrative action before VG Berlin)",
        "Immediate re-application at a consular post of an alternate Schengen Member State",
      ],
      correct: 1,
    },
    {
      id: "q3",
      label: "Question 3 of 3 • Filing Status & Dates",
      prompt:
        "Does registering an account and submitting metadata in the Consular Services Portal count as officially filing the application?",
      options: [
        "Yes, the exact timestamp of portal profile transmission constitutes official filing",
        "No — the application becomes effective upon biometric verification and in-person lodgement",
        "Only for applicants operating under expedited corporate Blue Card agency accords",
      ],
      correct: 1,
    },
  ] satisfies QuizQuestion[],
  /** Question 1 is shown answered in the design. */
  initialAnswers: { q1: 1 } as Record<string, number>,
  disclaimer:
    "EUVisaAdvice Academy is an educational platform providing structured relocation guides and procedural breakdowns on European immigration. It is not a law firm and does not provide legal advice or legal representation. Visa regulations, processing times, and mission directives are subject to regional variations.",
};
