export type StudentsTab = "students" | "payoneer";

export type PathwayFilter = "all" | "blue-card" | "opportunity-card" | "student" | "other";

export type DossierStatus = "active" | "completed" | "appeal";

export type StatusFilter = "all" | DossierStatus;

export interface StudentProgress {
  status: DossierStatus;
  /** Headline shown above the bar, e.g. "68% Progression". */
  label: string;
  percent: number;
  /** Current checkpoint line under the bar. */
  note: string;
}

export interface StudentCaseNote {
  author: string;
  initials: string;
  when: string;
  body: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  location: string;
  avatar: string;
  verified?: boolean;
  courseTitle: string;
  pathway: string;
  pathwayKey: PathwayFilter;
  progress: StudentProgress;
  enrolledDate: string;
  enrolledTime: string;
  amount: string;
  rail: string;
  /** Dossier detail panel. */
  detail: {
    reference: string;
    avatar: string;
    statusLabel: string;
    statutoryBasis: string;
    jurisdiction: string;
    modules: string;
    completed: string;
    settlementRef: string;
    taxBreakdown: string;
    paymentRail: string;
    viesStatus: string;
    caseNote?: StudentCaseNote;
  };
}

export interface StudentKpi {
  label: string;
  value: string;
  icon: string;
  footerIcon?: string;
  footerDot?: string;
  footer: string;
  footerTone: string;
}
