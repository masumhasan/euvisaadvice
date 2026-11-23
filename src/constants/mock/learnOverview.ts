import type { LearnOverview } from "@/types/learn";

/** Student-facing course overview content ("Course Overview & Curriculum" screen). */
export const LEARN_OVERVIEW: LearnOverview = {
  title: "The German National Visa",
  titleAccent: "Playbook",
  shortTitle: "The German National Visa Playbook",
  summary:
    "From the Consular Services Portal to the day your residence permit is in your hand — the sequence, the deadlines and the mistakes that quietly cost applicants months of processing time.",
  lessonCount: 27,
  outcomes: [
    {
      title: "Trace the Decision-Maker Chain",
      text: "Read the actual chain behind your dossier: the consular mission, the external service partner, the municipal **Ausländerbehörde**, and the Federal Employment Agency (**Bundesagentur für Arbeit**). Know precisely who holds jurisdiction.",
    },
    {
      title: "Execute Flawless Digital Submissions",
      text: "Register, file, and submit through the official Consular Services Portal without the common syntactic and data entry errors that render applications defective or cause unrecoverable resets.",
    },
    {
      title: "Survive Formal Completeness Checks",
      text: "Assemble an ironclad document file structured to pass consular scrutiny on round one. Master legalization, certified translations, and statutory order-of-exhibits to eliminate back-and-forth requests.",
    },
    {
      title: "Navigate File Stalls & Formal Queries",
      text: "Take the exact right administrative actions if your file stalls, if supplemental proof is demanded, or if facing an impending refusal. Invoke statutory timelines and procedural rights with certainty.",
    },
  ],
  modules: [
    {
      index: "00",
      syllabusTitle: "How the system really works",
      title: "How the system really works",
      lessons: 3,
      minutes: 22,
      description:
        "Stop guessing who decides what. Map the entire apparatus across embassies, service hubs, and domestic German authorities in 20 clear minutes.",
      unlocked: true,
    },
    {
      index: "01",
      syllabusTitle: "Create account & file application",
      title: "Create your account and file the application",
      lessons: 3,
      minutes: 34,
      description:
        "Step-by-step submission through the Consular Services Portal. Avoiding field errors that invalidate filings or forfeit waiting queue seniority.",
      unlocked: false,
    },
    {
      index: "02",
      syllabusTitle: "Get the appointment & keep it",
      title: "Get the appointment — and keep it",
      lessons: 3,
      minutes: 30,
      description:
        "Waiting lists, booking bots, third-party scams, rescheduling pitfalls, and the exact protocols required to safeguard your mission slot.",
      unlocked: false,
    },
    {
      index: "03",
      syllabusTitle: "Build the document file",
      title: "Build the document file",
      lessons: 3,
      minutes: 32,
      description:
        "Originals, certified copies, Hague apostilles, sworn translations, and why the physical sequence of your folder dictates the visa officer's mood.",
      unlocked: false,
    },
    {
      index: "04",
      syllabusTitle: "The appointment day protocol",
      title: "The appointment day",
      lessons: 3,
      minutes: 28,
      description:
        "Biometrics capture, window interview dynamics, fee receipts, distinguishing mandatory criteria from discretionary inquiries.",
      unlocked: false,
    },
    {
      index: "05",
      syllabusTitle: "Post-submission internal routing",
      title: "After submission — where your file actually is",
      lessons: 4,
      minutes: 34,
      description:
        "The physical and digital courier route to Cologne (BVA), domestic participation checks, the ten-day silence rule, and responding safely to RFIs.",
      unlocked: false,
    },
    {
      index: "06",
      syllabusTitle: "When it stalls, delays or fails",
      title: "When it stalls or fails",
      lessons: 4,
      minutes: 30,
      description:
        "Securing file access, formal follow-up paths, expedited remonstration guidance, and scrutinizing official refusal reasons.",
      unlocked: false,
    },
    {
      index: "07",
      syllabusTitle: "Arrival in Germany & Registration",
      title: "Arrival in Germany",
      lessons: 4,
      minutes: 24,
      description:
        "The 14-day address registration (**Anmeldung**), transitional certificates (**Fiktionsbescheinigung**), and finalizing the long-term eAT title.",
      unlocked: false,
    },
  ],
};
