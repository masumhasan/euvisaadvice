import { Icon } from "@/components/ui/Icon";
import { DASHBOARD } from "@/constants/mock/dashboard";

type Stat = (typeof DASHBOARD.stats)[number];

function StatExtra({ extra }: { extra: Stat["extra"] }) {
  switch (extra.kind) {
    case "split":
      return (
        <>
          <span className="font-body-muted text-body-muted text-text-secondary">{extra.a}</span>
          <span className="text-text-muted">/</span>
          <span className="font-body-muted text-body-muted text-status-success font-medium">{extra.b}</span>
        </>
      );
    case "hours":
      return (
        <>
          <span className="font-body-muted text-body-muted text-text-secondary">{extra.unit}</span>
          <span className="font-label-code text-label-code text-status-success ml-auto">{extra.delta}</span>
        </>
      );
    default:
      return <span className="font-body-muted text-body-muted text-text-secondary">{extra.text}</span>;
  }
}

export function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-2xl">
      {DASHBOARD.stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-level-2 p-space-lg rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-caps text-label-caps text-text-secondary uppercase">{stat.label}</span>
            <span className={`w-8 h-8 rounded-lg bg-surface-level-1 flex items-center justify-center ${stat.iconClass}`}>
              <Icon className="text-[18px]" name={stat.icon} />
            </span>
          </div>
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-text-primary tracking-tight font-bold">
              {stat.value}
            </span>
            <StatExtra extra={stat.extra} />
          </div>
          {"percent" in stat ? (
            <div className="mt-space-md w-full bg-surface-container rounded-full h-1 overflow-hidden">
              <div className={`${stat.barClass} h-full rounded-full`} style={{ width: `${stat.percent}%` }} />
            </div>
          ) : (
            <div className="mt-space-md flex items-center gap-space-xs text-status-success font-label-code text-[0.8125rem]">
              <Icon className="text-[14px]" name="lock_open" />
              <span>{stat.footnote}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
