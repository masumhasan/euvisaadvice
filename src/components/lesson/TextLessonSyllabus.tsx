import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";
import type { TEXT_LESSON } from "@/constants/mock/textLesson";

type Syllabus = (typeof TEXT_LESSON)["syllabus"];

const ROW = "flex items-start gap-2.5 p-2 rounded-md transition-all";

export function TextLessonSyllabus({ syllabus, courseSlug }: { syllabus: Syllabus; courseSlug: string }) {
  return (
    <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24 flex flex-col gap-space-md">
      <div className="bg-surface-level-1 p-space-md rounded-xl shadow-md flex flex-col gap-space-sm">
        <div className="flex items-center gap-space-xs text-primary font-label-caps text-label-caps">
          <Icon className="text-[15px]" filled name="workspace_premium" />
          <span>Core Syllabus</span>
        </div>
        <div>
          <h2 className="font-headline-sm text-headline-sm text-text-primary">{syllabus.title}</h2>
          <p className="font-body-muted text-body-muted text-text-secondary mt-0.5">{syllabus.subtitle}</p>
        </div>
        <div className="bg-surface-level-2 p-space-sm rounded-lg flex flex-col gap-space-xs mt-1">
          <div className="flex justify-between items-center font-label-code text-[11px]">
            <span className="text-on-surface-variant">Course Progress</span>
            <span className="text-primary font-semibold">
              {syllabus.progress.done} / {syllabus.progress.total} ({syllabus.progress.percent}%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-surface-variant rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${syllabus.progress.percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-surface-level-1 rounded-xl shadow-md p-space-xs space-y-1">
        <div className="rounded-lg bg-surface-level-2 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-space-sm hover:bg-surface-elevated transition-colors">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded bg-primary text-surface-base font-label-code text-[11px] font-bold flex items-center justify-center">
                {syllabus.activeModule.index}
              </span>
              <span className="font-title-card text-[0.875rem] text-text-primary font-semibold">
                {syllabus.activeModule.title}
              </span>
            </div>
            <Icon className="text-text-muted text-[18px]" name="expand_less" />
          </div>
          <div className="px-space-xs pb-space-xs space-y-1">
            {syllabus.lessons.map((lesson) => {
              const content = (
                <>
                  <Icon
                    className={cn("text-[17px] mt-0.5", lesson.current || lesson.highlight ? "text-primary" : "text-text-muted")}
                    filled={lesson.filled}
                    name={lesson.icon}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "font-body-muted text-[0.8125rem] leading-snug",
                        lesson.current && "font-semibold text-text-primary",
                        lesson.highlight && "font-medium",
                      )}
                    >
                      {lesson.title}
                    </p>
                    {lesson.current ? (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-label-code text-[10px] text-primary bg-primary/10 px-1 rounded">{lesson.meta}</span>
                        <span className="font-label-code text-[10px] text-text-muted">{lesson.length}</span>
                      </div>
                    ) : (
                      <span
                        className={cn(
                          "font-label-code text-[10px] mt-0.5 block",
                          lesson.highlight ? "text-text-secondary" : "text-text-muted",
                        )}
                      >
                        {lesson.meta}
                      </span>
                    )}
                  </div>
                </>
              );
              return lesson.current || !lesson.href ? (
                <div key={lesson.title} className={cn(ROW, "bg-gold-subtle-fill text-text-primary shadow-inner")}>
                  {content}
                </div>
              ) : (
                <Link
                  key={lesson.title}
                  className={cn(ROW, "hover:bg-surface-variant/40 text-on-surface-variant hover:text-text-primary")}
                  href={ROUTES.lesson(courseSlug, lesson.href)}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
        {syllabus.modules.map((module) => (
          <Link
            key={module.index}
            className="flex items-center justify-between p-space-sm rounded-lg hover:bg-surface-level-2 text-on-surface-variant transition-colors"
            href={ROUTES.courseOverview(courseSlug)}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded bg-surface-level-2 text-text-muted font-label-code text-[11px] font-semibold flex items-center justify-center">
                {module.index}
              </span>
              <span className="font-body-muted text-[0.8125rem]">{module.title}</span>
            </div>
            <Icon className="text-text-muted text-[16px]" name="chevron_right" />
          </Link>
        ))}
        <div className="pt-space-xs px-space-sm space-y-2">
          {syllabus.locked.map((label) => (
            <div key={label} className="flex items-center justify-between py-1 text-text-muted font-body-muted text-[0.75rem]">
              <span>{label}</span>
              <Icon className="text-[14px]" name="lock" />
            </div>
          ))}
        </div>
      </div>

      <div className="p-space-md rounded-xl bg-surface-level-1 shadow-sm flex items-center gap-space-sm">
        <Icon className="text-primary text-[22px]" name="auto_stories" />
        <div>
          <p className="font-title-card text-[0.8125rem] text-text-primary font-semibold">Comprehensive Syllabus</p>
          <p className="font-body-muted text-[0.75rem] text-text-secondary">Updated for 2026 Auslandsportal rollouts</p>
        </div>
      </div>
    </div>
  );
}
