import type { Metadata } from "next";
import { Icon } from "@/components/ui/Icon";
import { KpiCards } from "@/components/studio/dashboard/KpiCards";
import { RevenueChart } from "@/components/studio/dashboard/RevenueChart";
import { TopTracks } from "@/components/studio/dashboard/TopTracks";
import { TransactionsTable } from "@/components/studio/dashboard/TransactionsTable";

export const metadata: Metadata = { title: "Dashboard" };

export default function StudioDashboardPage() {
  return (
    <div className="px-space-md lg:px-space-xl py-space-lg space-y-space-xl max-w-[1440px] mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs text-text-muted font-label-caps text-label-caps uppercase tracking-widest mb-1">
            <span>Academy Studio Ops</span>
            <span className="text-primary font-bold">/</span>
            <span>Executive Intelligence &amp; Payout Rails</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight flex items-center gap-space-xs">
            Academy Yield &amp; Advisory Matrix
            <span className="bg-primary/10 text-primary font-label-code text-label-code px-2 py-0.5 rounded-full border border-primary/20">
              Q4-AUDITED
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-space-xs flex-wrap">
          <div className="bg-surface-level-1 px-3 py-2 rounded-lg flex items-center gap-2 border border-border-neutral">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span className="font-label-code text-label-code text-text-secondary">
              Auslandsportal Rail: <strong className="text-text-primary">Synced 4m ago</strong>
            </span>
          </div>
          <button
            className="bg-primary-container hover:bg-gold-hover text-on-primary-container px-space-md py-2 rounded-lg font-label-interactive text-label-interactive flex items-center gap-1.5 transition-all shadow-md"
            type="button"
          >
            <Icon className="text-[18px]" name="download_for_offline" />
            <span>Export Academy Report</span>
          </button>
        </div>
      </div>
      <KpiCards />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <RevenueChart />
        <TopTracks />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <TransactionsTable />
      </div>
    </div>
  );
}
