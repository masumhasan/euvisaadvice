import { Icon } from "@/components/ui/Icon";
import type { Student } from "@/types/students";

function Line({ label, value, valueClass }: { label: string; value: string; valueClass: string }) {
  return (
    <div className="flex items-center justify-between gap-space-sm text-xs text-text-muted">
      <span>{label}</span>
      <span className={`font-label-code text-label-code text-right ${valueClass}`}>{value}</span>
    </div>
  );
}

export function SettlementCard({ student }: { student: Student }) {
  const { detail } = student;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="font-label-caps text-label-caps text-primary uppercase font-bold tracking-wider">Payoneer Transaction Dossier</span>
        <span className="font-label-code text-label-code text-status-success bg-status-success-bg px-2 py-0.5 rounded font-semibold">SETTLED</span>
      </div>
      <div className="bg-surface-level-2 rounded-lg p-space-sm flex flex-col gap-space-xs">
        <div className="flex items-center justify-between pb-1.5 border-b border-border-neutral/30">
          <span className="font-label-code text-label-code text-text-muted">Settlement Ref</span>
          <span className="font-label-code text-label-code text-text-primary font-bold">{detail.settlementRef}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body-muted text-body-muted text-text-secondary">Gross Amount</span>
          <span className="font-headline-sm text-headline-sm text-text-primary font-bold">{student.amount}</span>
        </div>
        <Line label="Tax Breakdown" value={detail.taxBreakdown} valueClass="text-text-muted" />
        <Line label="Payment Rail" value={detail.paymentRail} valueClass="text-text-secondary" />
        <Line label="VIES VAT Status" value={detail.viesStatus} valueClass="text-tertiary" />
        <div className="pt-2">
          <button
            className="w-full flex items-center justify-center gap-space-xs py-2 px-space-sm rounded-lg bg-surface-level-1 hover:bg-surface-elevated text-primary font-label-interactive text-label-interactive transition-colors shadow-sm"
            type="button"
          >
            <Icon className="text-[18px]" name="picture_as_pdf" />
            <span>Download VAT Receipt (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
