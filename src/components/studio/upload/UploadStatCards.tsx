import { Icon } from "@/components/ui/Icon";
import { STORAGE_USAGE_PERCENT, UPLOAD_STATS } from "@/constants/mock/upload";

const LABEL = "font-label-caps text-label-caps text-text-secondary uppercase tracking-wider";
const ICON_BOX = "w-11 h-11 rounded-lg bg-surface-level-2 flex items-center justify-center";
const CARD = "bg-surface-level-1 p-space-md rounded-xl";

export function UploadStatCards() {
  const [footage, pipeline, storage] = UPLOAD_STATS;

  return (
    <section className="w-full px-space-lg py-space-md">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div className={`${CARD} flex items-center justify-between`}>
          <div className="flex flex-col">
            <span className={LABEL}>{footage.label}</span>
            <span className="font-headline-sm text-headline-sm text-text-primary mt-1">{footage.value}</span>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="font-label-code text-label-code text-primary">{footage.detail}</span>
              <span className="text-text-muted text-xs">•</span>
              <span className="font-body-muted text-body-muted text-text-secondary">27 Published</span>
            </div>
          </div>
          <div className={`${ICON_BOX} text-primary`}>
            <Icon className="text-[24px]" name="movie" />
          </div>
        </div>

        <div className={`${CARD} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className={LABEL}>{pipeline.label}</span>
            <span className="flex items-center gap-1 font-label-caps text-label-caps text-tertiary bg-status-success-bg px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse" /> eu-central-1
            </span>
          </div>
          <div className="mt-2">
            <span className="font-label-interactive text-label-interactive text-text-primary">{pipeline.value}</span>
            <p className="font-label-code text-label-code text-text-muted mt-0.5">{pipeline.detail}</p>
          </div>
        </div>

        <div className={`${CARD} flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <span className={LABEL}>{storage.label}</span>
            <span className="font-label-code text-label-code text-text-primary">{STORAGE_USAGE_PERCENT}%</span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="font-headline-sm text-headline-sm text-text-primary">{storage.value}</span>
              <span className="font-label-code text-label-code text-text-muted">{storage.detail}</span>
            </div>
            <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
              <div className="h-full bg-primary-container rounded-full" style={{ width: `${STORAGE_USAGE_PERCENT}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
