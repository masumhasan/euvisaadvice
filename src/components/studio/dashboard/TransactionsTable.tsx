import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { STUDIO_DASHBOARD } from "@/constants/mock/studioDashboard";
import { ROUTES } from "@/constants/routes";

const HEADERS = ["Identifier", "Applicant / Student", "Curriculum", "Amount", "Status", "Invoice"];

export function TransactionsTable() {
  return (
    <div className="col-span-12 bg-surface-level-2 p-space-lg rounded-xl border border-gold-hairline flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-border-neutral">
          <div>
            <h2 className="font-title-card text-title-card text-text-primary">Recent Payoneer Transactions &amp; Settlements</h2>
            <p className="font-body-muted text-body-muted text-text-muted">Direct platform course debits &amp; automated receipting</p>
          </div>
          <button className="text-text-muted hover:text-text-primary text-xs font-label-code flex items-center gap-1 transition-colors" type="button">
            <Icon className="text-[16px]" name="refresh" />
            <span>Poll Rails</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-neutral font-label-caps text-[11px] text-text-muted uppercase tracking-wider">
                {HEADERS.map((header, index) => (
                  <th key={header} className={cn("py-2.5 px-2", (index === 3 || index === 5) && "text-right")}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-neutral/50 font-body-default text-xs">
              {STUDIO_DASHBOARD.transactions.map((tx) => {
                const hold = tx.status !== "Settled";
                return (
                  <tr key={tx.id} className="hover:bg-surface-level-1/60 transition-colors">
                    <td className="py-3 px-2 font-label-code text-primary">{tx.id}</td>
                    <td className="py-3 px-2 text-text-primary font-medium">{tx.student}</td>
                    <td className="py-3 px-2 text-text-secondary truncate max-w-[160px]">{tx.course}</td>
                    <td className="py-3 px-2 text-right font-label-code text-text-primary font-semibold">{tx.amount}</td>
                    <td className="py-3 px-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-label-code uppercase tracking-wider",
                          hold ? "bg-status-warning-bg text-status-warning" : "bg-status-success-bg text-status-success",
                        )}
                      >
                        <span className={cn("w-1.5 h-1.5 rounded-full", hold ? "bg-status-warning" : "bg-status-success")} />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button
                        aria-label={`Download VAT invoice for ${tx.id}`}
                        className="p-1 text-text-muted hover:text-primary transition-colors"
                        title="Download VAT Invoice PDF"
                        type="button"
                      >
                        <Icon className="text-[16px]" name="receipt" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-space-md pt-space-xs border-t border-border-neutral/60 flex items-center justify-between text-xs font-label-code text-text-muted">
        <span>Showing latest 4 of 846 ledger items</span>
        <Link className="text-primary hover:underline flex items-center gap-1" href={ROUTES.studio.students}>
          <span>Open Student &amp; Escrow Registry</span>
          <Icon className="text-[14px]" name="arrow_forward" />
        </Link>
      </div>
    </div>
  );
}
