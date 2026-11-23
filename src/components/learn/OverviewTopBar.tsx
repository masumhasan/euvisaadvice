import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function OverviewTopBar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-space-sm mb-space-lg text-text-secondary">
      <nav className="flex items-center gap-space-xs font-label-code text-[0.8125rem]">
        <Link className="hover:text-primary transition-colors" href={ROUTES.myLearning}>
          Curriculum Portal
        </Link>
        <span>/</span>
        <Link className="hover:text-primary transition-colors" href={ROUTES.courses}>
          National Visa Tracks
        </Link>
        <span>/</span>
        <span className="text-text-primary">DE-NAT-2026</span>
      </nav>
      <div className="flex items-center gap-space-md">
        <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded bg-status-success-bg text-status-success font-label-code text-[0.75rem]">
          <span className="w-1.5 h-1.5 rounded-full bg-status-success" /> Regulations Corpus 2026 • Verified
        </span>
        <span className="font-label-code text-[0.75rem] text-text-muted">Rev: 26.4.19</span>
      </div>
    </div>
  );
}
