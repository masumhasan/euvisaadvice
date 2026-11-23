import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import type { QUIZ } from "@/constants/mock/quiz";

export function QuizTrackPanel({ track, courseSlug }: { track: (typeof QUIZ)["track"]; courseSlug: string }) {
  return (
    <aside className="w-full xl:w-[340px] flex-shrink-0 flex flex-col gap-space-md bg-surface-level-1 p-4 sm:p-space-lg rounded-xl shadow-xl">
      <div className="flex flex-col gap-space-2xs">
        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
          Active Curriculum Track
        </span>
        <h2 className="font-title-card text-title-card text-text-primary">{track.title}</h2>
        <p className="font-body-muted text-body-muted text-text-secondary mt-1">{track.subtitle}</p>
      </div>
      <div className="bg-surface-level-2 p-space-md rounded-lg flex flex-col gap-space-xs">
        <div className="flex justify-between items-center">
          <span className="font-label-code text-[0.75rem] text-text-muted">Module 00 Progress</span>
          <span className="font-label-code text-[0.75rem] text-primary font-semibold">{track.progressLabel}</span>
        </div>
        <div className="w-full h-1.5 bg-border-neutral rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-container rounded-full transition-all duration-500"
            style={{ width: `${track.percent}%` }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 mt-space-xs">
        {track.lessons.map((lesson) => (
          <Link
            key={lesson.title}
            className="flex items-center justify-between p-space-sm rounded-lg bg-surface-base text-text-secondary hover:text-text-primary transition-colors"
            href={ROUTES.lesson(courseSlug, lesson.lessonId)}
          >
            <span className="flex items-center gap-space-sm min-w-0">
              <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center text-status-success flex-shrink-0">
                <Icon className="text-[14px]" name="check" />
              </span>
              <span className="font-body-muted text-body-muted truncate">{lesson.title}</span>
            </span>
            <span className="font-label-code text-[11px] text-text-muted">{lesson.length}</span>
          </Link>
        ))}
        <div className="flex items-center justify-between p-space-sm rounded-lg bg-gold-subtle-fill text-text-primary shadow-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
              <Icon className="text-[14px]" name="quiz" />
            </span>
            <span className="font-body-muted text-body-muted font-semibold truncate text-primary">{track.activeLabel}</span>
          </div>
          <span className="inline-flex px-1.5 py-0.5 rounded bg-primary/20 text-primary font-label-code text-[10px] uppercase font-bold">
            Active
          </span>
        </div>
      </div>
      <div className="mt-space-sm flex flex-col gap-space-2xs bg-surface-base/50 p-space-sm rounded-lg">
        <span className="font-label-caps text-[10px] text-text-muted uppercase tracking-wider">Locked Next Module</span>
        <div className="flex items-center gap-space-sm text-text-muted">
          <Icon className="text-[16px]" name="lock" />
          <span className="font-body-muted text-body-muted truncate">{track.lockedModule}</span>
        </div>
      </div>
    </aside>
  );
}
