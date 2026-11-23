import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import type { VIDEO_LESSON } from "@/constants/mock/videoLesson";

type Lesson = typeof VIDEO_LESSON;

export function VideoLessonHeader({ lesson, nextHref }: { lesson: Lesson; nextHref: string }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 font-label-code text-[0.75rem] text-text-muted">
          <Link className="hover:text-primary transition-colors" href={ROUTES.myLearning}>
            Curriculum Portal
          </Link>
          <span>/</span>
          <Link className="hover:text-primary transition-colors" href={ROUTES.courses}>
            National Visa Tracks
          </Link>
          <span>/</span>
          <span className="text-text-secondary">{lesson.moduleLabel}</span>
          <span>/</span>
          <span className="text-primary font-semibold">{lesson.lessonLabel}</span>
        </div>
        <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight">{lesson.title}</h1>
        <div className="flex flex-wrap items-center gap-space-xs mt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-level-2 text-primary font-label-code text-[0.6875rem] uppercase tracking-wider">
            <Icon className="text-[14px]" name="videocam" /> {lesson.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-level-2 text-text-secondary font-label-code text-[0.6875rem]">
            <Icon className="text-[14px] text-primary" name="menu_book" /> {lesson.statutes}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-level-2 text-text-muted font-label-code text-[0.6875rem]">
            <Icon className="text-[14px] text-status-success" name="verified" /> {lesson.verified}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-space-sm flex-shrink-0 self-start lg:self-center">
        <label className="hidden sm:flex items-center gap-2 text-body-muted font-body-muted text-text-muted cursor-pointer pr-space-xs">
          <span className="text-[0.75rem] font-label-code">AUTOPLAY</span>
          <input
            className="w-4 h-4 rounded bg-surface-level-1 text-primary focus:ring-0 cursor-pointer accent-primary"
            defaultChecked
            type="checkbox"
          />
        </label>
        <button
          className="px-space-md py-2.5 rounded-lg bg-surface-level-2 text-on-surface hover:text-text-primary hover:bg-surface-elevated font-label-interactive text-label-interactive flex items-center gap-2 transition-all"
          type="button"
        >
          <Icon className="text-primary text-[18px]" name="bookmark" />
          <span className="hidden md:inline">Bookmark ({lesson.bookmarkAt})</span>
        </button>
        <Button
          className="px-space-lg py-2.5 gap-2 bg-primary-container shadow-lg shadow-primary-container/20"
          href={nextHref}
        >
          <span>Complete &amp; Next</span>
          <Icon className="text-[18px]" name="arrow_forward" />
        </Button>
      </div>
    </div>
  );
}
