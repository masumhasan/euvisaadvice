import { Icon } from "@/components/ui/Icon";
import { INSPECTOR } from "@/constants/mock/upload";

export function ChapterList() {
  return (
    <div className="pt-space-xs space-y-space-xs">
      <div className="flex items-center justify-between">
        <span className="font-label-caps text-label-caps text-text-secondary uppercase tracking-wider">Statutory Chapters &amp; Timestamps</span>
        <button
          className="font-label-caps text-label-caps text-primary hover:text-gold-hover uppercase tracking-wider flex items-center gap-0.5"
          type="button"
        >
          <Icon className="text-[14px]" name="add" /> Add Marker
        </button>
      </div>
      <ul className="space-y-1.5">
        {INSPECTOR.chapters.map((chapter) => (
          <li key={chapter.time} className="p-2 rounded-lg bg-surface-level-2 flex items-center justify-between hover:bg-surface-elevated transition-colors">
            <div className="flex items-center gap-space-xs min-w-0">
              <span className="font-label-code text-label-code text-primary bg-primary-container/20 px-1.5 py-0.5 rounded font-semibold">{chapter.time}</span>
              <span className="font-body-muted text-body-muted text-text-primary truncate">{chapter.title}</span>
            </div>
            <button aria-label={`Edit chapter ${chapter.title}`} className="text-text-muted hover:text-text-primary" type="button">
              <Icon className="text-[16px]" name="edit" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
