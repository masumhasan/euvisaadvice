import { Icon } from "@/components/ui/Icon";
import { DASHBOARD } from "@/constants/mock/dashboard";

export function LiveCohortBanner() {
  const { liveCohort } = DASHBOARD;

  return (
    <div className="bg-surface-level-1 p-space-lg rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-space-md min-w-0">
        <div className="w-12 h-12 rounded-lg bg-surface-level-2 text-primary flex items-center justify-center flex-shrink-0">
          <Icon className="text-[28px]" name="groups" />
        </div>
        <div>
          <h4 className="font-title-card text-title-card text-text-primary">{liveCohort.title}</h4>
          <p className="font-body-muted text-body-muted text-text-secondary">{liveCohort.text}</p>
        </div>
      </div>
      <button
        className="bg-surface-elevated hover:bg-surface-container-high text-primary font-label-interactive text-label-interactive px-space-md py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-space-xs flex-shrink-0"
        type="button"
      >
        <Icon className="text-[18px]" name="event_available" />
        <span>Reserve Seat (Free)</span>
      </button>
    </div>
  );
}
