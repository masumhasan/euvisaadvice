import { Icon } from "@/components/ui/Icon";

export function StudentsHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-md pb-space-lg">
      <div className="flex flex-col">
        <div className="flex items-center gap-space-xs mb-1">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Academy Administration</span>
          <span className="text-text-muted text-xs">•</span>
          <span className="font-label-code text-label-code text-text-secondary">Reference ID: EUA-2026-REG</span>
        </div>
        <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight">Students Management</h1>
        <p className="font-body-muted text-body-muted text-text-secondary max-w-3xl mt-0.5">
          Audit applicant dossier progression, active enrollments, course completions, and cross-border Payoneer settlements under EU VAT compliance
          directives.
        </p>
      </div>
      <div className="flex items-center gap-space-sm flex-wrap">
        <button
          className="flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-text-primary text-label-interactive font-label-interactive transition-all shadow-sm"
          type="button"
        >
          <Icon className="text-[18px] text-primary" name="download" />
          <span>Export VIES / OSS Tax Report</span>
        </button>
        <button
          className="flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-primary-container hover:bg-gold-hover text-on-primary-container font-label-interactive text-label-interactive shadow-md transition-all"
          type="button"
        >
          <Icon className="text-[18px]" name="person_add" />
          <span>Manual Student Enrollment</span>
        </button>
      </div>
    </div>
  );
}
