import { Icon } from "@/components/ui/Icon";
import { TARGET_MODULES } from "@/constants/mock/upload";

const LABEL = "font-label-caps text-label-caps text-text-secondary uppercase tracking-wider";
const CHECK = "w-4 h-4 rounded bg-surface-level-2 accent-primary-container";

export function IngestPanel({ courseTitle }: { courseTitle: string }) {
  return (
    <div className="bg-surface-level-1 rounded-xl p-space-lg space-y-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <Icon className="text-primary text-[20px]" name="upload_file" />
          <span className="font-title-card text-title-card text-text-primary">Batch Ingest Master Video Assets</span>
        </div>
        <span className="font-label-code text-label-code text-text-muted">Direct S3 Multi-Part Pipeline</span>
      </div>

      <div className="bg-surface-level-2/60 rounded-xl p-space-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-level-2 transition-all">
        <div className="w-12 h-12 rounded-full bg-surface-level-1 flex items-center justify-center text-primary mb-space-sm shadow-inner">
          <Icon className="text-[26px]" name="video_call" />
        </div>
        <p className="font-title-card text-title-card text-text-primary">Drag &amp; Drop Topic Master Video Files</p>
        <p className="font-body-muted text-body-muted text-text-secondary mt-1">Supports ProRes 422, MP4, MOV (H.264/HEVC) up to 10GB per asset.</p>
        <div className="mt-space-md flex items-center gap-space-sm">
          <span className="px-space-md py-2 rounded-lg bg-surface-elevated text-text-primary font-label-interactive text-label-interactive hover:bg-surface-container transition-all">
            Browse Files
          </span>
          <span className="font-label-code text-label-code text-text-muted">or paste Cloudflare / S3 URI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
        <div className="flex flex-col gap-1.5">
          <span className={LABEL}>Target Course Blueprint</span>
          <div className="bg-surface-level-2 px-space-sm py-2 rounded-lg text-text-primary font-body-default text-body-default flex items-center justify-between">
            <span className="truncate">{courseTitle}</span>
            <Icon className="text-text-muted text-[18px]" name="lock" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={LABEL} htmlFor="target-module">
            Auto-Assign to Statutory Module
          </label>
          <div className="relative">
            <select
              className="w-full bg-surface-level-2 text-text-primary px-space-sm py-2 rounded-lg font-body-default text-body-default focus:outline-none appearance-none pr-8"
              defaultValue={TARGET_MODULES[1]}
              id="target-module"
            >
              {TARGET_MODULES.map((module) => (
                <option key={module}>{module}</option>
              ))}
            </select>
            <Icon className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted text-[18px] pointer-events-none" name="expand_more" />
          </div>
        </div>
      </div>

      <div className="pt-space-xs flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-lg flex-wrap">
          <label className="flex items-center gap-space-xs cursor-pointer select-none">
            <input className={CHECK} defaultChecked type="checkbox" />
            <span className="font-body-muted text-body-muted text-text-primary">Auto-capture 16:9 4K Thumbnail Poster</span>
          </label>
        </div>
        <span className="font-label-code text-label-code text-tertiary flex items-center gap-1">
          <Icon className="text-[14px]" name="bolt" /> Instant HLS Chunking
        </span>
      </div>
    </div>
  );
}
