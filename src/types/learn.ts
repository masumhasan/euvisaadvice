export interface OverviewModule {
  index: string;
  /** Short sidebar title. */
  syllabusTitle: string;
  title: string;
  lessons: number;
  minutes: number;
  description: string;
  /** Module `00` is unlocked; the rest unlock after the previous module. */
  unlocked: boolean;
}

export interface OverviewOutcome {
  title: string;
  text: string;
}

export interface LearnOverview {
  title: string;
  titleAccent: string;
  shortTitle: string;
  summary: string;
  lessonCount: number;
  modules: OverviewModule[];
  outcomes: OverviewOutcome[];
}
