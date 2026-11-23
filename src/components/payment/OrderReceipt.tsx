import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { PAYMENT } from "@/constants/mock/payment";
import { InvoiceDownloadButton } from "./InvoiceDownloadButton";

const TONES: Record<string, string> = {
  gold: "font-label-code text-label-code text-gold-highlight font-semibold",
  code: "font-label-code text-label-code text-text-primary",
  text: "text-text-primary font-medium",
};

export function OrderReceipt() {
  const { receipt } = PAYMENT;

  return (
    <div className="lg:col-span-5 flex flex-col gap-space-md">
      <div className="bg-surface-level-2 rounded-xl border border-gold-hairline p-space-lg shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between pb-space-sm border-b border-border-neutral mb-space-md">
          <div>
            <span className="font-label-caps text-label-caps text-gold-highlight uppercase tracking-wider block mb-1">
              Tax Clearance
            </span>
            <h3 className="font-headline-sm text-headline-sm text-text-primary">Order Receipt</h3>
          </div>
          <div className="flex items-center gap-1 bg-surface-level-1 px-space-xs py-1 rounded border border-border-neutral">
            <Icon className="text-tertiary text-[18px]" name="verified_user" />
            <span className="font-label-code text-[11px] text-text-primary">PAID &amp; SETTLED</span>
          </div>
        </div>
        <dl className="space-y-space-sm font-body-muted text-body-muted">
          {receipt.rows.map((row) => (
            <div key={row.label} className="flex justify-between items-center py-1">
              <dt className="text-text-secondary">{row.label}</dt>
              <dd className={cn(TONES[row.tone])}>{row.value}</dd>
            </div>
          ))}
          <div className="flex justify-between items-center py-1">
            <dt className="text-text-secondary">Payment Method</dt>
            <dd className="inline-flex items-center gap-1.5 text-text-primary font-medium">
              <span className="h-2 w-2 rounded-full bg-status-success" /> {receipt.method}
            </dd>
          </div>
          <div className="flex justify-between items-center py-1">
            <dt className="text-text-secondary">Billing Entity</dt>
            <dd className="text-right text-text-primary text-[13px] leading-tight">
              {receipt.billingName}
              <br />
              <span className="text-text-muted text-[11px]">{receipt.billingPlace}</span>
            </dd>
          </div>
          <div className="mt-space-md pt-space-sm border-t border-dashed border-border-neutral space-y-1.5">
            <div className="flex justify-between text-[13px] text-text-secondary">
              <span>Tuition Base (Net)</span>
              <span>{receipt.net}</span>
            </div>
            <div className="flex justify-between text-[13px] text-text-secondary">
              <span>German MwSt (19% Statutory)</span>
              <span>{receipt.vat}</span>
            </div>
            <div className="flex justify-between items-baseline pt-space-xs text-text-primary font-bold">
              <span className="font-title-card text-title-card">Total Charged</span>
              <div className="text-right">
                <span className="font-headline-md text-headline-md text-gold-highlight">{receipt.total}</span>
                <span className="block text-[11px] font-normal text-text-muted">EUR Currency Complete</span>
              </div>
            </div>
          </div>
        </dl>
        <div className="mt-space-md p-space-xs bg-surface-level-1 rounded-lg border border-border-neutral text-[11px] text-text-muted leading-relaxed font-body-muted">
          <span className="text-on-surface-variant font-medium">{receipt.taxNote}</span>
          {receipt.taxNoteRest}
        </div>
        <div className="mt-space-lg">
          <InvoiceDownloadButton size={receipt.invoiceSize} />
        </div>
      </div>
      <div className="bg-surface-level-1/60 rounded-lg border border-border-neutral p-space-sm flex items-center gap-space-sm">
        <div className="w-8 h-8 rounded-full bg-gold-subtle-fill border border-gold-hairline flex items-center justify-center text-gold-highlight shrink-0">
          <Icon className="text-[18px]" name="security" />
        </div>
        <div className="text-[12px] leading-tight text-text-secondary">
          <span className="text-text-primary font-medium">{receipt.warrantyTitle}</span>
          <br /> {receipt.warrantyText}
        </div>
      </div>
    </div>
  );
}
