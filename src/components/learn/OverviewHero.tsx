import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { DEMO_LESSON_IDS } from "@/constants/learnSidebar";
import type { LearnOverview } from "@/types/learn";

const STATS = [
  { label: "Modules", value: "08", note: "Sequential chapters", valueClass: "text-text-primary" },
  { label: "Lessons", value: "27", note: "High-impact deep dives", valueClass: "text-primary" },
  { label: "Run Time", value: "234", unit: "m", note: "Video & audio notes", valueClass: "text-text-primary" },
  { label: "Compliance", value: "2026", note: "Active consular code", valueClass: "text-tertiary" },
];

export function OverviewHero({ overview, courseSlug }: { overview: LearnOverview; courseSlug: string }) {
  const startHref = ROUTES.lesson(courseSlug, "0-1");
  return (
    <>
      <div className="relative bg-surface-level-1 rounded-2xl p-space-xl lg:p-space-2xl shadow-xl overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-space-sm mb-space-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">
              Self-Paced Course • {overview.lessonCount} Lessons
            </span>
          </div>
          <h1 className="font-display-hero text-headline-lg lg:text-display-hero text-text-primary tracking-tight leading-[1.08] mb-space-md">
            {overview.title} <span className="text-primary">{overview.titleAccent}</span>
          </h1>
          <p className="font-body-legal text-body-legal text-text-secondary leading-relaxed mb-space-xl">
            {overview.summary}
          </p>
          <div className="flex flex-wrap items-center gap-space-md">
            <Button
              className="gap-space-xs bg-primary-container shadow-md hover:shadow-lg duration-150"
              href={startHref}
              size="lg"
            >
              <span>Start Module 00</span>
              <Icon className="text-[18px]" name="arrow_forward" />
            </Button>
            <Button
              className="gap-space-xs px-space-md py-3 bg-surface-level-2 text-text-primary hover:bg-surface-elevated shadow-sm duration-150 border-0"
              href={ROUTES.lesson(courseSlug, DEMO_LESSON_IDS.textAudio)}
              variant="ghost"
            >
              <Icon className="text-[18px] text-primary" name="download" />
              <span>Download Course Dossier</span>
            </Button>
            <div className="flex items-center gap-2 ml-auto text-text-muted font-label-code text-[0.75rem]">
              <Icon className="text-[16px] text-tertiary" name="schedule" />
              <span>Est. completion: 4 hours</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-surface-level-2 p-space-md rounded-xl shadow-sm">
            <span className="font-label-caps text-label-caps uppercase text-text-muted">{stat.label}</span>
            <div className={`font-headline-lg text-headline-md lg:text-headline-lg mt-1 ${stat.valueClass}`}>
              {stat.value}
              {stat.unit && <span className="text-sm font-normal text-text-muted">{stat.unit}</span>}
            </div>
            <p className="font-body-muted text-[0.75rem] text-text-secondary mt-0.5">{stat.note}</p>
          </div>
        ))}
      </div>
    </>
  );
}
