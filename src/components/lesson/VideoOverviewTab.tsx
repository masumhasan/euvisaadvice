import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { VIDEO_LESSON } from "@/constants/mock/videoLesson";

type Lesson = typeof VIDEO_LESSON;

export function VideoOverviewTab({ lesson }: { lesson: Lesson }) {
  const { briefing, nextUp } = lesson;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
      <div className="lg:col-span-8 flex flex-col gap-space-lg">
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Procedural Briefing</span>
          <h2 className="font-headline-sm text-headline-sm text-text-primary">{briefing.heading}</h2>
          <p className="font-body-default text-body-default text-text-secondary">{briefing.text}</p>
        </div>
        <div className="p-space-md rounded-lg bg-status-danger-bg flex items-start gap-space-md">
          <div className="p-2 rounded bg-status-danger/20 text-status-danger flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="text-[22px]" name="warning" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-label-interactive text-label-interactive text-status-danger uppercase tracking-wider">
              {briefing.hazardTitle}
            </span>
            <p className="font-body-muted text-body-muted text-on-surface">{briefing.hazardText}</p>
          </div>
        </div>
        <div className="flex flex-col gap-space-sm">
          <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-wider">
            Legal Framework Core Directives
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {briefing.directives.map((item) => (
              <div key={item.tag} className="p-space-md rounded-lg bg-surface-level-2 flex flex-col justify-between gap-space-sm">
                <div className="flex items-center justify-between">
                  <span className="font-label-code text-[0.75rem] text-primary">{item.tag}</span>
                  <Icon className="text-primary text-[18px]" name={item.icon} />
                </div>
                <div>
                  <h3 className="font-title-card text-[0.9375rem] text-text-primary mb-1">{item.title}</h3>
                  <p className="font-body-muted text-[0.8125rem] text-text-secondary">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-space-sm pt-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-wider">
              Lesson Chapters &amp; Timecodes
            </span>
            <span className="font-label-code text-[0.75rem] text-primary">{lesson.chapters.length} Key Segments</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {lesson.chapters.map((chapter) => {
              const current = chapter.state === "current";
              return (
                <button
                  key={chapter.time}
                  className={cn(
                    "w-full flex items-center justify-between p-space-sm rounded-lg text-left transition-colors group",
                    current ? "bg-gold-subtle-fill" : "bg-surface-level-2 hover:bg-surface-elevated",
                  )}
                  type="button"
                >
                  <div className="flex items-center gap-space-md">
                    <span
                      className={cn(
                        "font-label-code text-[0.8125rem]",
                        current ? "text-primary font-bold" : "text-text-muted group-hover:text-primary transition-colors",
                      )}
                    >
                      {chapter.time}
                    </span>
                    <span
                      className={cn(
                        "font-body-default text-body-default text-text-primary",
                        current && "font-semibold",
                      )}
                    >
                      {chapter.title}
                    </span>
                  </div>
                  {chapter.state === "done" && (
                    <span className="font-label-code text-[0.75rem] text-status-success flex items-center gap-1">
                      <Icon className="text-[16px]" name="check_circle" /> Completed
                    </span>
                  )}
                  {current && (
                    <span className="font-label-code text-[0.75rem] text-primary flex items-center gap-1 bg-surface-base/60 px-2 py-0.5 rounded">
                      <Icon className="text-[16px] animate-spin" name="sync" /> Current Chapter
                    </span>
                  )}
                  {chapter.state === "todo" && (
                    <span className="font-label-code text-[0.75rem] text-text-muted">{chapter.length}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 flex flex-col gap-space-lg">
        <div className="p-space-md rounded-xl bg-surface-level-2 flex flex-col gap-space-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-caps text-label-caps text-text-muted uppercase">Lesson Attachments</span>
            <span className="font-label-code text-[0.6875rem] text-primary">{lesson.attachments.length} Included Files</span>
          </div>
          {lesson.attachments.map((file) => (
            <div
              key={file.name}
              className="p-space-sm rounded-lg bg-surface-elevated flex items-center justify-between gap-space-sm hover:bg-surface-bright transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="p-2 rounded bg-primary-container/20 text-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="text-[20px]" name={file.icon} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-card text-[0.8125rem] text-text-primary truncate">{file.name}</span>
                  <span className="font-label-code text-[0.6875rem] text-text-muted">{file.meta}</span>
                </div>
              </div>
              <span className="p-2 rounded text-text-muted group-hover:text-primary transition-colors">
                <Icon className="text-[20px]" name="download" />
              </span>
            </div>
          ))}
        </div>

        <div className="p-space-md rounded-xl bg-surface-level-2 flex flex-col gap-space-sm">
          <span className="font-label-caps text-label-caps text-text-muted uppercase">Next Up in Module 01</span>
          <div className="p-space-sm rounded-lg bg-surface-elevated flex flex-col gap-2">
            <div className="flex items-center justify-between text-text-muted">
              <span className="font-label-code text-[0.6875rem]">{nextUp.label}</span>
              <span className="font-label-code text-[0.6875rem] text-primary">{nextUp.duration}</span>
            </div>
            <h5 className="font-title-card text-[0.875rem] text-text-primary">{nextUp.title}</h5>
            <p className="font-body-muted text-[0.75rem] text-text-secondary line-clamp-2">{nextUp.text}</p>
            <div className="pt-1 flex items-center justify-between">
              <span className="text-[0.75rem] text-primary font-semibold flex items-center gap-1">
                <Icon className="text-[16px]" name="play_circle" /> Preview Topic
              </span>
              <Icon className="text-[18px] text-text-muted" name="chevron_right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
