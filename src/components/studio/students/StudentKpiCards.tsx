import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { STUDENT_KPIS } from "@/constants/mock/studioStudents";

export function StudentKpiCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pb-space-md">
      {STUDENT_KPIS.map((kpi) => (
        <div key={kpi.label} className="bg-surface-level-1 p-space-md rounded-xl flex items-center justify-between gap-space-xs">
          <div className="min-w-0">
            <span className="font-label-caps text-label-caps text-text-muted uppercase">{kpi.label}</span>
            <div className="font-headline-sm text-headline-sm text-text-primary font-semibold mt-0.5">{kpi.value}</div>
            <span className={cn("font-label-code text-label-code flex items-center gap-1 mt-0.5", kpi.footerTone)}>
              {kpi.footerIcon && <Icon className="text-[14px]" name={kpi.footerIcon} />}
              {kpi.footerDot && <span className={cn("w-1.5 h-1.5 rounded-full", kpi.footerDot)} />}
              {kpi.footer}
            </span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-surface-level-2 flex items-center justify-center text-primary shrink-0">
            <Icon className="text-[20px]" name={kpi.icon} />
          </div>
        </div>
      ))}
    </div>
  );
}
