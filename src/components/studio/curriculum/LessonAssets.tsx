import { Icon } from "@/components/ui/Icon";
import { LESSON_ASSETS } from "@/constants/mock/curriculumBuilder";

export function LessonAssets() {
  return (
  <div className="flex flex-col gap-space-sm">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-space-xs">
        <Icon className="text-primary text-[20px]" name="attachment" />
        <span className="font-title-card text-title-card text-text-primary font-semibold">Attached Juridical Assets &amp; Templates</span>
        <span className="font-label-code text-label-code text-text-muted bg-surface-container-high px-2 py-0.5 rounded">2 FILES</span>
      </div>
      <button
        className="px-3 py-1.5 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-primary font-label-interactive text-label-interactive transition-colors flex items-center gap-1.5 shadow-sm text-[13px]"
        type="button"
      >
        <Icon className="text-[16px]" name="upload_file" />
        <span>Attach Legal Template / PDF</span>
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
      {LESSON_ASSETS.map((asset) => (
        <div key={asset.name} className="bg-surface-level-2 rounded-xl p-space-sm flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${asset.iconBox}`}>
              <Icon className="text-[22px]" name={asset.icon} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-interactive text-label-interactive text-text-primary font-medium truncate">{asset.name}</span>
              <div className="flex items-center gap-2 font-label-code text-label-code text-text-muted text-[11px]">
                <span>{asset.size}</span>
                <span>•</span>
                <span className={asset.visibilityClass}>{asset.visibility}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button aria-label={`Download ${asset.name}`} className="p-1.5 rounded hover:bg-surface-container-high text-text-muted hover:text-text-primary transition-colors" title="Download Asset" type="button">
              <Icon className="text-[18px]" name="download" />
            </button>
            <button aria-label={`Remove ${asset.name}`} className="p-1.5 rounded hover:bg-surface-container-high text-text-muted hover:text-status-danger transition-colors" title="Remove Asset" type="button">
              <Icon className="text-[18px]" name="delete" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}