import { Icon } from "@/components/ui/Icon";
import type { VIDEO_LESSON } from "@/constants/mock/videoLesson";

export function VideoResourcesTab({ resources }: { resources: (typeof VIDEO_LESSON)["resources"] }) {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-space-sm">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-text-primary">
            Downloadable Legal Checklists &amp; Templates
          </h3>
          <p className="font-body-muted text-body-muted text-text-secondary">
            Official consular filing templates verified against federal administrative guidelines.
          </p>
        </div>
        <button
          className="px-space-md py-2 rounded-lg bg-primary-container text-on-primary font-label-interactive text-label-interactive flex items-center gap-2"
          type="button"
        >
          <Icon className="text-[18px]" name="folder_zip" />
          <span>Download All Bundle (4.2 MB)</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {resources.map((item) => (
          <div key={item.name} className="p-space-md rounded-lg bg-surface-level-2 flex items-center justify-between">
            <div className="flex items-center gap-space-md">
              <Icon className="text-primary text-[28px]" name={item.icon} />
              <div>
                <p className="font-title-card text-title-card text-text-primary">{item.name}</p>
                <p className="font-label-code text-[0.75rem] text-text-muted">{item.meta}</p>
              </div>
            </div>
            <button
              aria-label={`Download ${item.name}`}
              className="p-2 rounded bg-surface-elevated text-primary hover:bg-primary hover:text-on-primary transition-all"
              type="button"
            >
              <Icon className="text-[20px]" name="download" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
