import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";

interface CurriculumHeaderProps {
  title: string;
  previewHref: string;
}

export function CurriculumHeader({ title, previewHref }: CurriculumHeaderProps) {
  return (
    <div className="bg-surface-level-1 px-4 sm:px-space-lg py-space-md shadow-md border-b border-border-neutral">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
        <div className="flex flex-col gap-space-2xs min-w-0">
          <div className="flex items-center gap-space-xs text-text-muted font-body-muted text-body-muted">
            <Link className="hover:text-primary transition-colors" href={ROUTES.studio.courses}>
              Courses
            </Link>
            <Icon className="text-[14px]" name="chevron_right" />
            <span className="text-text-secondary truncate">{title}</span>
            <Icon className="text-[14px]" name="chevron_right" />
            <span className="text-primary font-label-code text-label-code uppercase tracking-wider">Curriculum Studio</span>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm pt-0.5">
            <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight">{title}</h1>
            <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-label-code text-label-code flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live v2026.4
            </span>
            <span className="text-text-muted text-[13px] font-body-muted">8 Modules • 27 Lessons • 14 Juridical Assets</span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs sm:gap-space-sm flex-wrap">
          <Link
            className="px-space-md py-2 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-on-surface hover:text-text-primary transition-all font-label-interactive text-label-interactive flex items-center gap-1.5 shadow-sm"
            href={previewHref}
          >
            <Icon className="text-[18px] text-text-secondary" name="open_in_new" />
            <span>Preview Student View</span>
          </Link>
          <button
            className="px-space-md py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-text-secondary hover:text-text-primary transition-all font-label-interactive text-label-interactive flex items-center gap-1.5"
            type="button"
          >
            <Icon className="text-[18px]" name="save" />
            <span>Save Draft</span>
          </button>
          <button
            className="px-space-lg py-2 rounded-lg bg-primary hover:bg-gold-hover text-surface-base font-label-interactive text-label-interactive transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            type="button"
          >
            <Icon className="text-[18px]" filled name="verified" />
            <span>Publish Statutory Update</span>
          </button>
        </div>
      </div>
    </div>
  );
}
