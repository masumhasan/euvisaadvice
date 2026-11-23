import { Icon } from "@/components/ui/Icon";
import type { VIDEO_LESSON } from "@/constants/mock/videoLesson";

export function VideoNotesTab({ note }: { note: (typeof VIDEO_LESSON)["note"] }) {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-headline-sm text-text-primary">Personal Case Notes &amp; Timestamps</h3>
        <button
          className="px-space-md py-1.5 rounded-lg bg-primary-container text-on-primary font-label-interactive text-label-interactive flex items-center gap-1.5"
          type="button"
        >
          <Icon className="text-[18px]" name="add" />
          <span>Add Note at 08:24</span>
        </button>
      </div>
      <div className="p-space-md rounded-lg bg-surface-level-2 flex flex-col gap-2">
        <div className="flex items-center justify-between text-text-muted">
          <span className="font-label-code text-[0.75rem] text-primary">{note.savedAt}</span>
          <span className="font-label-code text-[0.6875rem]">{note.created}</span>
        </div>
        <p className="font-body-default text-body-default text-text-primary">{note.text}</p>
      </div>
    </div>
  );
}
