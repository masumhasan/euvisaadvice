import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import type { LearnOverview } from "@/types/learn";

export function SyllabusPanel({ overview, courseSlug }: { overview: LearnOverview; courseSlug: string }) {
  const [current, ...rest] = overview.modules;
  const firstLessons = ["0.1 The Statutory Architecture", "0.2 Federal Agency Pathways", "0.3 Consular Operational Mandates"];

  return (
    <aside className="lg:col-span-4 xl:col-span-3 space-y-space-md lg:sticky lg:top-24">
      <div className="bg-surface-level-1 rounded-xl p-space-md shadow-md">
        <div className="flex items-center justify-between gap-space-xs mb-space-xs">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Course Syllabus</span>
          <span className="font-label-code text-[0.75rem] text-text-primary">0 / {overview.lessonCount} Completed</span>
        </div>
        <h2 className="font-title-card text-title-card text-text-primary mb-space-sm">{overview.shortTitle}</h2>
        <div className="w-full bg-surface-level-2 h-1.5 rounded-full overflow-hidden mb-space-xs">
          <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
        </div>
        <p className="font-body-muted text-[0.75rem] text-text-muted flex justify-between">
          <span>Overall Progress</span>
          <span className="font-label-code text-text-secondary">0%</span>
        </p>
      </div>

      <div className="bg-surface-level-1 rounded-xl overflow-hidden shadow-md">
        <div className="p-space-xs space-y-1">
          <Link
            className="flex items-center justify-between px-space-md py-space-sm rounded-lg bg-gold-subtle-fill text-primary shadow-sm"
            href={ROUTES.courseOverview(courseSlug)}
          >
            <div className="flex items-center gap-space-sm min-w-0">
              <Icon className="text-[18px]" name="menu_book" />
              <span className="font-label-interactive text-label-interactive truncate">Course Overview</span>
            </div>
            <Icon className="text-[16px]" name="chevron_right" />
          </Link>
          <div className="rounded-lg bg-surface-level-2/60 p-space-sm">
            <div className="flex items-start justify-between gap-space-xs">
              <div>
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-code text-[0.6875rem] text-primary px-1 rounded bg-primary/10">
                    MOD {current.index}
                  </span>
                  <span className="font-label-code text-[0.6875rem] text-text-muted">
                    {current.lessons} Lessons • {current.minutes}m
                  </span>
                </div>
                <h4 className="font-label-interactive text-[0.8125rem] text-text-primary mt-1">
                  {current.syllabusTitle}
                </h4>
              </div>
              <Icon className="text-primary text-[18px]" name="play_circle" />
            </div>
            <div className="mt-space-xs pt-space-xs pl-space-xs space-y-1 text-[0.75rem] text-text-muted">
              {firstLessons.map((lesson, index) => (
                <div key={lesson} className={index === 0 ? "flex items-center gap-2 text-text-secondary" : "flex items-center gap-2"}>
                  <span className={index === 0 ? "w-1.5 h-1.5 rounded-full bg-primary" : "w-1.5 h-1.5 rounded-full bg-border-neutral"} />
                  <span>{lesson}</span>
                </div>
              ))}
            </div>
          </div>
          {rest.map((module) => (
            <div
              key={module.index}
              className="flex items-center justify-between px-space-md py-space-sm rounded-lg text-text-muted hover:text-text-secondary transition-colors"
            >
              <div className="min-w-0 pr-2">
                <div className="font-label-code text-[0.6875rem]">
                  {module.index} • {module.lessons} Lessons ({module.minutes}m)
                </div>
                <div className="font-label-interactive text-[0.8125rem] truncate">{module.syllabusTitle}</div>
              </div>
              <Icon className="text-[16px] text-text-muted" name="lock" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface-level-2/40 rounded-xl p-space-md text-text-muted flex items-start gap-space-sm">
        <Icon className="text-primary text-[20px] shrink-0 mt-0.5" name="verified_user" />
        <div>
          <p className="font-label-interactive text-[0.8125rem] text-text-primary">Federal Chancellery Standard</p>
          <p className="font-body-muted text-[0.75rem] text-text-muted mt-1 leading-relaxed">
            Updated to 18a/b AufenthG &amp; Skilled Immigration Act revisions.
          </p>
        </div>
      </div>
    </aside>
  );
}
