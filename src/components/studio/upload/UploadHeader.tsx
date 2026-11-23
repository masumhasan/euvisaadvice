import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";

interface UploadHeaderProps {
  courseId: string;
  courseTitle: string;
}

const CRUMB = "font-label-caps text-label-caps uppercase tracking-wider";

export function UploadHeader({ courseId, courseTitle }: UploadHeaderProps) {
  return (
    <section className="w-full bg-surface-level-1 px-space-lg py-space-md shadow-sm">
      <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-1">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-space-2xs text-text-muted">
            <Link className={`${CRUMB} text-text-muted hover:text-primary transition-colors`} href={ROUTES.studio.courses}>
              Courses
            </Link>
            <Icon className="text-[14px]" name="chevron_right" />
            <Link className={`${CRUMB} text-text-secondary hover:text-primary transition-colors`} href={ROUTES.studio.curriculum(courseId)}>
              {courseTitle}
            </Link>
            <Icon className="text-[14px]" name="chevron_right" />
            <span className={`${CRUMB} text-text-secondary`}>Video Asset Studio</span>
            <Icon className="text-[14px]" name="chevron_right" />
            <span className={`${CRUMB} text-primary tracking-widest font-semibold`}>Topic-Wise Uploader</span>
          </nav>
          <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight">Topic-Wise Video Upload &amp; Transcode Center</h1>
          <p className="font-body-muted text-body-muted text-text-secondary max-w-3xl">
            Batch ingest masterclass footage, tag statutory legal topics (§ 18a/b, § 20a, BAMF, Auslandsportal), configure multi-bitrate HLS transcoding
            (Frankfurt AWS S3), and map directly into curriculum modules.
          </p>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap self-start xl:self-center">
          <button
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-on-surface hover:text-text-primary transition-all font-label-interactive text-label-interactive shadow-sm"
            type="button"
          >
            <Icon className="text-[18px] text-text-muted" name="cloud_sync" />
            <span>Sync from Vimeo / Cloudflare</span>
          </button>
          <button
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-primary-container hover:bg-gold-hover text-on-primary-container transition-all font-label-interactive text-label-interactive shadow-md"
            type="button"
          >
            <Icon className="text-[18px]" name="cloud_upload" />
            <span>+ Upload New Topic Videos</span>
          </button>
        </div>
      </div>
    </section>
  );
}
