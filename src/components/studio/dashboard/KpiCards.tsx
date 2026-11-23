import { Icon } from "@/components/ui/Icon";
import { STUDIO_DASHBOARD } from "@/constants/mock/studioDashboard";

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-md">
      {STUDIO_DASHBOARD.kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-surface-level-2 p-space-md rounded-xl flex flex-col justify-between relative overflow-hidden border border-gold-hairline hover:border-gold-hairline-bright transition-all"
        >
          <div className="flex items-start justify-between">
            <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-wider">{kpi.label}</span>
            <Icon className="text-primary text-[20px]" name={kpi.icon} />
          </div>
          <div className="my-space-sm">
            <div className="font-headline-md text-headline-md text-text-primary font-bold tracking-tight">
              {kpi.value}
              {kpi.unit && (
                <>
                  {" "}
                  <span className="font-body-muted text-body-muted text-text-muted font-normal">{kpi.unit}</span>
                </>
              )}
            </div>
            {kpi.trend && (
              <div className="flex items-center gap-1 font-label-code text-label-code text-status-success mt-1">
                <Icon className="text-[14px]" name={kpi.trend.icon} />
                <span>{kpi.trend.text}</span>
              </div>
            )}
            {kpi.note && <div className="font-body-muted text-body-muted text-text-secondary mt-1">{kpi.note}</div>}
          </div>
          {kpi.footer && (
            <div className="pt-space-xs border-t border-border-neutral/60 text-text-secondary font-label-code text-[11px] leading-relaxed">
              {kpi.footer.map((row) => (
                <div key={row.label}>
                  {row.label} <span className={`${row.valueClass} font-medium`}>{row.value}</span>
                </div>
              ))}
            </div>
          )}
          {kpi.split && (
            <div className="pt-space-xs border-t border-border-neutral/60 font-label-code text-[11px] text-text-secondary flex justify-between items-center">
              <span>{kpi.split.label}</span>
              <span className="text-primary font-semibold">{kpi.split.value}</span>
            </div>
          )}
          {kpi.badge && (
            <div className="pt-space-xs border-t border-border-neutral/60 font-label-code text-[11px] text-text-muted flex items-center justify-between">
              <span>{kpi.badge.label}</span>
              <span className="text-status-success font-medium bg-status-success-bg px-1.5 py-0.5 rounded">
                {kpi.badge.value}
              </span>
            </div>
          )}
          {kpi.plain && (
            <div className="pt-space-xs border-t border-border-neutral/60 font-label-code text-[11px] text-text-muted">
              <span>{kpi.plain.label}</span>
              <span className="text-text-primary">{kpi.plain.value}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
