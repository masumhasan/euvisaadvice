import { Icon } from "@/components/ui/Icon";
import type { TEXT_LESSON } from "@/constants/mock/textLesson";

interface LessonArtifactsProps {
  artifacts: (typeof TEXT_LESSON)["artifacts"];
  sources: (typeof TEXT_LESSON)["sources"];
}

export function LessonArtifacts({ artifacts, sources }: LessonArtifactsProps) {
  return (
    <>
      <div className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-text-primary">Lesson Artifacts &amp; Briefs</h3>
          <span className="font-label-caps text-label-caps text-text-muted">Available in High-Resolution PDF</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          {artifacts.map((file) => (
            <div
              key={file.name}
              className="p-space-md rounded-xl bg-surface-level-2 shadow-md flex items-center justify-between gap-space-md group hover:bg-surface-elevated transition-colors"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <Icon className="text-primary text-[28px]" filled name={file.icon} />
                <div className="truncate">
                  <p className="font-title-card text-[0.875rem] text-text-primary font-bold truncate">{file.name}</p>
                  <p className="font-label-code text-[11px] text-text-secondary">{file.meta}</p>
                </div>
              </div>
              <button
                className="px-space-md py-1.5 rounded-lg bg-surface-level-1 text-primary font-label-interactive text-[0.8125rem] font-semibold hover:bg-primary hover:text-surface-base transition-all flex-shrink-0"
                type="button"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="p-space-md rounded-xl bg-surface-level-1 shadow-sm text-text-secondary space-y-space-xs">
        <p className="font-label-caps text-label-caps text-text-muted uppercase">Statutory Sources &amp; Official Precedents</p>
        <ul className="space-y-1 font-label-code text-[11px] text-on-surface-variant list-disc pl-4">
          {sources.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
