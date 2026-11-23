import { Icon } from "@/components/ui/Icon";

export function PipelineBanner() {
  return (
    <div className="bg-surface-level-1 rounded-xl p-space-md flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm">
      <div className="flex items-center gap-space-md">
        <div className="w-12 h-12 rounded-xl bg-surface-level-2 flex items-center justify-center text-primary flex-shrink-0">
          <Icon className="text-[24px]" name="currency_exchange" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-title-card text-title-card text-text-primary">Payoneer Institutional Merchant Pipeline</h2>
            <span className="font-label-caps text-label-caps text-status-success bg-status-success-bg px-2 py-0.5 rounded-full font-bold">
              SETTLEMENT ENGINE OPERATIONAL
            </span>
          </div>
          <p className="font-body-muted text-body-muted text-text-secondary mt-0.5">
            Target IBAN: DE89 **** **** **** 4410 (Deutsche Bank AG Frankfurt). Instant SEPA sweep threshold: €10,000.00.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-space-xs self-stretch md:self-auto justify-end">
        <button
          className="px-space-md py-2 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-text-primary font-label-interactive text-label-interactive transition-all"
          type="button"
        >
          Audit Settlement Logs
        </button>
        <button
          className="px-space-md py-2 rounded-lg bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-label-interactive transition-all"
          type="button"
        >
          Initiate Manual Sweep
        </button>
      </div>
    </div>
  );
}
