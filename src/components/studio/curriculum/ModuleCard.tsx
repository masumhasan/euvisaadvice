import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { LESSON_KIND_ICONS, type BuilderLesson, type BuilderModule } from "@/constants/mock/curriculumBuilder";

interface ModuleCardProps {
  module: BuilderModule;
  expanded: boolean;
  activeLessonId: string;
  onToggle: () => void;
  onSelectLesson: (lessonId: string) => void;
  onDeleteLesson: (lessonId: string) => void;
  onAddLesson: () => void;
}

function LessonRow({
  lesson,
  active,
  onSelect,
  onDelete,
}: {
  lesson: BuilderLesson;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={cn(
        "group rounded-lg p-space-sm flex items-center justify-between transition-all",
        active ? "bg-surface-level-2 shadow-sm" : "bg-surface-container-low hover:bg-surface-level-2",
      )}
    >
      <button className="flex items-center gap-space-xs min-w-0 flex-1 text-left" onClick={onSelect} type="button">
        <Icon className="text-text-muted cursor-grab hover:text-text-primary text-[16px]" name="drag_indicator" />
        <div
          className={cn(
            "w-7 h-7 rounded flex items-center justify-center flex-shrink-0",
            active ? "bg-primary/20 text-primary" : "bg-surface-container-high text-text-secondary",
          )}
        >
          <Icon className="text-[16px]" filled={active} name={LESSON_KIND_ICONS[lesson.kind]} />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={cn("font-label-code text-label-code", active ? "text-primary font-bold" : "text-text-secondary")}>
              {lesson.number}
            </span>
            <span
              className={cn(
                "font-body-default text-body-default truncate",
                active ? "text-text-primary font-medium" : "text-text-secondary group-hover:text-text-primary",
              )}
            >
              {lesson.title}
            </span>
          </div>
          <div className="flex items-center gap-space-xs font-label-code text-label-code text-text-muted text-[11px]">
            <span>{lesson.kindLabel}</span>
            <span>•</span>
            <span>{lesson.detail}</span>
            {lesson.transcoded && <span className="text-tertiary bg-tertiary/10 px-1 rounded">Transcoded</span>}
          </div>
        </div>
      </button>
      {active ? (
        <span className="px-2 py-0.5 rounded bg-primary text-surface-base font-label-caps text-label-caps uppercase font-bold tracking-wider">
          Editing
        </span>
      ) : (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <button aria-label={`Edit lesson ${lesson.number}`} className="p-1 hover:text-text-primary text-text-muted" onClick={onSelect} type="button">
            <Icon className="text-[18px]" name="edit" />
          </button>
          <button aria-label={`Delete lesson ${lesson.number}`} className="p-1 hover:text-status-danger text-text-muted" onClick={onDelete} type="button">
            <Icon className="text-[18px]" name="delete" />
          </button>
        </div>
      )}
    </div>
  );
}

export function ModuleCard({
  module,
  expanded,
  activeLessonId,
  onToggle,
  onSelectLesson,
  onDeleteLesson,
  onAddLesson,
}: ModuleCardProps) {
  if (!expanded) {
    return (
      <div
        className={cn(
          "bg-surface-level-1 rounded-xl p-space-md shadow-sm hover:bg-surface-container-high/30 transition-all",
          module.dimmed && "opacity-60 hover:opacity-100",
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs min-w-0">
            <Icon className="text-text-muted cursor-grab hover:text-text-primary text-[18px]" name="drag_indicator" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-label-code text-label-code text-text-secondary uppercase">{module.label}</span>
                <span className="text-text-muted text-[11px] font-label-code">{module.summary}</span>
              </div>
              <div className="font-title-card text-title-card text-text-primary font-medium truncate pt-0.5">{module.title}</div>
            </div>
          </div>
          <div className="flex items-center gap-space-xs">
            {module.locked && <Icon className="text-[16px] text-text-muted" name="lock" />}
            <button
              aria-label={`Expand ${module.label}`}
              className="p-1 text-text-muted hover:text-text-primary rounded hover:bg-surface-level-2 transition-colors"
              onClick={onToggle}
              type="button"
            >
              <Icon className="text-[20px]" name="keyboard_arrow_down" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-level-1 rounded-xl p-space-md shadow-md relative overflow-hidden transition-all">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-space-xs min-w-0">
          <Icon className="text-text-muted cursor-grab hover:text-text-primary text-[18px]" name="drag_indicator" />
          <span className="font-label-code text-label-code text-primary uppercase font-bold tracking-wider">{module.label}</span>
          <span className="text-text-muted">•</span>
          <span className="font-label-code text-label-code text-text-secondary">{module.summary}</span>
        </div>
        <div className="flex items-center gap-space-xs">
          {module.freePreview && (
            <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-caps text-label-caps uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary" /> Free Preview
            </span>
          )}
          <button
            aria-label={`Collapse ${module.label}`}
            className="p-1 text-text-muted hover:text-text-primary rounded hover:bg-surface-level-2 transition-colors"
            onClick={onToggle}
            type="button"
          >
            <Icon className="text-[20px]" name="keyboard_arrow_up" />
          </button>
        </div>
      </div>
      <div className="font-title-card text-title-card text-text-primary pb-space-sm font-semibold pl-space-xs">{module.title}</div>
      <div className="flex flex-col gap-space-xs pl-space-xs">
        {module.lessons.map((lesson) => (
          <LessonRow
            key={lesson.id}
            active={lesson.id === activeLessonId}
            lesson={lesson}
            onDelete={() => onDeleteLesson(lesson.id)}
            onSelect={() => onSelectLesson(lesson.id)}
          />
        ))}
        <button
          className="w-full py-2.5 mt-1 rounded-lg bg-surface-container-low hover:bg-surface-level-2 text-text-muted hover:text-primary transition-all font-label-interactive text-label-interactive flex items-center justify-center gap-1.5 shadow-sm"
          onClick={onAddLesson}
          type="button"
        >
          <Icon className="text-[16px]" name="add_circle" />
          <span>Add Lesson to {module.label}</span>
        </button>
      </div>
    </div>
  );
}
