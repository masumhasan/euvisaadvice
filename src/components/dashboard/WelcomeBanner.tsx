import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { DASHBOARD } from "@/constants/mock/dashboard";

export function WelcomeBanner() {
  const { welcome } = DASHBOARD;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-2xl bg-surface-level-1 p-space-lg rounded-xl shadow-xl">
      <div className="flex flex-col gap-space-2xs min-w-0">
        <div className="flex items-center gap-space-xs flex-wrap">
          <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary px-space-xs py-0.5 rounded bg-gold-subtle-fill font-semibold">
            {welcome.badge}
          </span>
          <span className="font-label-code text-label-code text-text-muted">{welcome.dossierId}</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight">{welcome.title}</h1>
        <div className="flex items-center gap-space-xs text-text-secondary font-body-muted text-body-muted flex-wrap">
          <Icon className="text-status-success text-[18px]" filled name="verified" />
          <span className="text-on-surface font-medium">{welcome.verified}</span>
          <span className="text-text-muted">•</span>
          <span className="font-label-code text-text-secondary text-[0.8125rem]">{welcome.target}</span>
        </div>
      </div>
      <div className="flex items-center gap-space-md flex-shrink-0">
        <button
          className="bg-surface-level-2 text-text-primary hover:bg-surface-elevated font-label-interactive text-label-interactive px-space-md py-3 rounded-lg shadow-sm transition-all flex items-center gap-space-xs"
          type="button"
        >
          <Icon className="text-[18px] text-primary" name="download" />
          <span>Dossier ZIP Export</span>
        </button>
        <Link
          className="bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-label-interactive px-space-lg py-3 rounded-lg shadow-md transition-all flex items-center gap-space-xs"
          href={welcome.continueHref}
        >
          <span>Continue Active Track</span>
          <Icon className="text-[18px]" name="arrow_forward" />
        </Link>
      </div>
    </div>
  );
}
