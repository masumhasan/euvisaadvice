import { Icon } from "@/components/ui/Icon";
import {
  KIND_TO_FORMAT,
  LESSON_FORMATS,
  LESSON_VIDEO,
  type BuilderLesson,
} from "@/constants/mock/curriculumBuilder";
import { LessonAssets } from "./LessonAssets";
import { LessonCommentary } from "./LessonCommentary";
import { LessonVideoAsset } from "./LessonVideoAsset";

const SWITCH =
  "w-11 h-6 bg-primary rounded-full relative transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary";

interface LessonEditorProps {
  courseId: string;
  lesson: BuilderLesson;
  title: string;
  onTitleChange: (title: string) => void;
  commentaryHtml: string;
  /** Changing this remounts the editor with fresh content (lesson switch / discard). */
  commentaryKey: string;
  onCommentaryChange: (html: string) => void;
  onSave: () => void;
  onDiscard: () => void;
  revision: number;
}

export function LessonEditor({
  courseId,
  lesson,
  title,
  onTitleChange,
  commentaryHtml,
  commentaryKey,
  onCommentaryChange,
  onSave,
  onDiscard,
  revision,
}: LessonEditorProps) {
  const format = KIND_TO_FORMAT[lesson.kind];
  const formatLabel = format.replace(/ \(.*\)$/, "");

  return (
    <div className="bg-surface-level-1 rounded-xl p-space-lg shadow-md space-y-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
        <div className="flex items-center gap-space-xs">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
            <Icon className="text-[20px]" filled name="movie" />
          </div>
          <div>
            <span className="font-label-caps text-label-caps text-primary uppercase font-bold tracking-wider">Active Workspace</span>
            <h2 className="font-title-card text-title-card text-text-primary">
              Editing Lesson {lesson.number} • {formatLabel}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-space-xs self-start sm:self-auto">
          <span className="font-label-code text-label-code text-text-muted text-[12px] flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-status-success" /> Cloud Auto-Saved
          </span>
          <span className="text-text-muted">•</span>
          <span className="font-label-code text-label-code text-text-muted text-[12px]">UUID: de-nat-{lesson.id.replace(".", "-0")}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
        <div className="md:col-span-8 flex flex-col gap-1.5">
          <label className="font-label-interactive text-label-interactive text-text-secondary flex items-center justify-between" htmlFor="lesson-title">
            <span>Lesson Title</span>
            <span className="font-label-code text-label-code text-text-muted text-[11px]">Visible on syllabus</span>
          </label>
          <input
            className="w-full bg-surface-container-low text-text-primary px-space-md py-2.5 rounded-lg font-body-default text-body-default focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
            id="lesson-title"
            onChange={(event) => onTitleChange(event.target.value)}
            type="text"
            value={title}
          />
        </div>
        <div className="md:col-span-4 flex flex-col gap-1.5">
          <label className="font-label-interactive text-label-interactive text-text-secondary" htmlFor="lesson-format">
            Lesson Format
          </label>
          <div className="relative">
            <select
              key={lesson.id}
              className="w-full bg-surface-container-low text-text-primary px-space-md py-2.5 rounded-lg font-body-default text-body-default appearance-none focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
              defaultValue={format}
              id="lesson-format"
            >
              {LESSON_FORMATS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none text-[18px]" name="expand_more" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm bg-surface-level-2 p-space-sm rounded-lg">
        {[
          { title: "Free Public Preview", text: "Available prior to purchase", label: "Toggle Free Preview" },
          { title: "Enforce Minimum Watch", text: "Required for module completion", label: "Toggle Minimum Watch" },
        ].map((item) => (
          <div key={item.title} className="flex items-center justify-between px-space-sm py-1.5">
            <div className="flex flex-col">
              <span className="font-label-interactive text-label-interactive text-text-primary">{item.title}</span>
              <span className="font-body-muted text-body-muted text-[12px] text-text-muted">{item.text}</span>
            </div>
            <button aria-label={item.label} aria-pressed className={SWITCH} type="button">
              <span className="w-5 h-5 bg-surface-base rounded-full absolute right-0.5 top-0.5" />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between px-space-sm py-1.5">
          <div className="flex flex-col">
            <span className="font-label-interactive text-label-interactive text-text-primary">Estimated Duration</span>
            <span className="font-label-code text-label-code text-primary">{LESSON_VIDEO.duration} (Scanned)</span>
          </div>
          <Icon className="text-text-muted text-[20px]" name="timer" />
        </div>
      </div>

      <LessonVideoAsset courseId={courseId} />

      <LessonCommentary key={commentaryKey} initialHtml={commentaryHtml} onChange={onCommentaryChange} />

      <LessonAssets />

      <div className="pt-space-sm flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs text-text-muted font-label-code text-label-code text-[12px]">
          <Icon className="text-[18px] text-text-muted" name="history" />
          <span>Revision {revision} saved 2 mins ago by Editorial Team</span>
        </div>
        <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
          <button
            className="px-space-md py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-text-secondary hover:text-text-primary font-label-interactive text-label-interactive transition-all"
            onClick={onDiscard}
            type="button"
          >
            Discard Changes
          </button>
          <button
            className="px-space-lg py-2.5 rounded-lg bg-primary hover:bg-gold-hover text-surface-base font-label-interactive text-label-interactive transition-all flex items-center gap-2 shadow-lg shadow-primary/25 font-bold"
            onClick={onSave}
            type="button"
          >
            <Icon className="text-[18px]" name="check" />
            <span>Save &amp; Update Lesson</span>
          </button>
        </div>
      </div>
    </div>
  );
}