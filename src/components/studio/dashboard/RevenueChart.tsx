"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { STUDIO_DASHBOARD } from "@/constants/mock/studioDashboard";

const GRID_LINES = [30, 80, 130, 180];

export function RevenueChart() {
  const [period, setPeriod] = useState("12M");
  const { chart, periods } = STUDIO_DASHBOARD;

  return (
    <div className="lg:col-span-7 bg-surface-level-2 p-space-lg rounded-xl border border-gold-hairline flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-md border-b border-border-neutral gap-space-xs">
          <div>
            <h2 className="font-title-card text-title-card text-text-primary">Settlement &amp; Enrollment Trajectory</h2>
            <p className="font-body-muted text-body-muted text-text-muted">
              Payoneer Institutional Payouts vs Gross Intake (2026 AUDIT)
            </p>
          </div>
          <div className="flex items-center bg-surface-level-1 p-1 rounded-lg border border-border-neutral text-xs font-label-code">
            {periods.map((item) => (
              <button
                key={item}
                className={cn(
                  "px-2.5 py-1 transition-colors",
                  item === period
                    ? "bg-primary text-on-primary font-semibold rounded shadow-sm"
                    : "text-text-muted hover:text-text-primary",
                )}
                onClick={() => setPeriod(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-space-md py-space-sm text-xs font-label-code">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-primary" />
            <span className="text-text-secondary">Gross Course Receipts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-tertiary" />
            <span className="text-text-secondary">Payoneer Transferred (€112,400)</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto text-text-muted">
            <Icon className="text-[14px] text-primary" name="verified_user" />
            <span>EU VAT OSS: Compliant (19% DE / 21% ES)</span>
          </div>
        </div>
        <div className="relative w-full pt-4 pb-2">
          <svg aria-label="Revenue trajectory chart" className="w-full h-56 overflow-visible" preserveAspectRatio="none" role="img" viewBox="0 0 700 240">
            <defs>
              <linearGradient id="goldGrossGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop className="[stop-color:var(--color-primary-container)]" offset="0%" stopOpacity="0.32" />
                <stop className="[stop-color:var(--color-primary-container)]" offset="100%" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="tertiaryPayoutGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop className="[stop-color:var(--color-tertiary-container)]" offset="0%" stopOpacity="0.22" />
                <stop className="[stop-color:var(--color-tertiary-container)]" offset="100%" stopOpacity="0" />
              </linearGradient>
            </defs>
            {GRID_LINES.map((y) => (
              <line key={y} className="stroke-border-neutral" strokeDasharray="4,4" x1="0" x2="700" y1={y} y2={y} />
            ))}
            <line className="stroke-border-neutral" x1="0" x2="700" y1="220" y2="220" />
            {chart.gridLabels.map((label) => (
              <text key={label.text} className="fill-text-muted font-label-code" fontSize="10" x="5" y={label.y}>
                {label.text}
              </text>
            ))}
            <polygon fill="url(#goldGrossGrad)" points={`${chart.gross} 660,220 40,220`} />
            <polyline className="stroke-primary-container" fill="none" points={chart.gross} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            <polygon fill="url(#tertiaryPayoutGrad)" points={`${chart.payout} 660,220 40,220`} />
            <polyline className="stroke-tertiary-container" fill="none" points={chart.payout} strokeDasharray="2,2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <circle cx="380" cy="85" className="fill-primary-container stroke-surface-base" r="4" strokeWidth="2" />
            <circle cx="520" cy="55" className="fill-primary-container stroke-surface-base" r="4" strokeWidth="2" />
            <circle cx="660" cy="32" className="fill-gold-highlight stroke-surface-base" r="5" strokeWidth="2" />
            <g transform="translate(580, 8)">
              <rect className="fill-surface-elevated stroke-primary-container" height="28" rx="4" strokeWidth="0.8" width="85" />
              <text className="fill-text-primary font-label-code" fontSize="10.5" fontWeight="bold" x="8" y="18">
                €24,890.00
              </text>
            </g>
          </svg>
          <div className="flex justify-between px-6 pt-2 text-[10px] font-label-code text-text-muted">
            {chart.months.map((month, index) => (
              <span key={month} className={index === chart.months.length - 1 ? "text-primary font-bold" : undefined}>
                {month}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-space-md pt-space-sm border-t border-border-neutral/60 flex items-center justify-between text-xs text-text-muted font-body-muted">
        <span>Fiscal clearing cycle: Daily via Frankfurt SEPA + Payoneer Multi-Currency IBAN</span>
        <span className="text-primary font-label-code">SEPA Core: DE88 5007 ... 9042</span>
      </div>
    </div>
  );
}
