import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { DASHBOARD } from "@/constants/mock/dashboard";
const CARD = "bg-surface-level-2 p-space-lg rounded-xl shadow-md flex flex-col gap-space-md";
const CARD_TITLE = "font-label-caps text-label-caps uppercase text-text-secondary font-semibold";

function ConsultantCard() {
  const { consultant } = DASHBOARD;
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <span className="font-label-caps text-label-caps uppercase text-primary font-semibold">
          Assigned Legal Consultant
        </span>
        <span className="flex items-center gap-1.5 text-status-success font-label-code text-[0.75rem]">
          <span className="w-2 h-2 rounded-full bg-status-success" />
          <span>Online Now</span>
        </span>
      </div>
      <div className="flex items-center gap-space-md">
        <div className="w-14 h-14 rounded-full bg-surface-level-1 flex items-center justify-center text-primary flex-shrink-0">
          <Icon className="text-[32px]" name="support_agent" />
        </div>
        <div className="min-w-0">
          <h4 className="font-title-card text-title-card text-text-primary font-bold">{consultant.name}</h4>
          <p className="font-body-muted text-body-muted text-text-secondary truncate">{consultant.registry}</p>
          <div className="flex items-center gap-1 text-text-muted font-label-code text-[0.75rem] mt-0.5">
            <Icon className="text-[14px]" name="timer" />
            <span>{consultant.response}</span>
          </div>
        </div>
      </div>
      <div className="bg-surface-level-1 p-space-sm rounded-lg text-text-secondary font-body-muted text-[0.8125rem] leading-relaxed">
        {consultant.note}
      </div>
    </div>
  );
}

function MilestonesCard() {
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <span className={CARD_TITLE}>Critical Milestones</span>
        <Icon className="text-text-muted text-[18px]" name="calendar_today" />
      </div>
      <div className="flex flex-col gap-space-sm">
        {DASHBOARD.milestones.map((milestone) => (
          <div key={milestone.title} className="p-space-sm rounded-lg bg-surface-level-1 flex items-start gap-space-sm">
            <div
              className={cn(
                "w-10 h-10 rounded flex flex-col items-center justify-center flex-shrink-0 font-label-code text-center leading-none",
                milestone.urgent ? "bg-status-warning-bg text-status-warning" : "bg-surface-container text-text-muted",
              )}
            >
              <span className="text-[0.6875rem] font-bold">IN</span>
              <span className="text-headline-sm font-bold">{milestone.days}</span>
              <span className="text-[0.6rem]">DAYS</span>
            </div>
            <div className="min-w-0">
              <span
                className={cn(
                  "font-label-code text-[0.75rem]",
                  milestone.urgent ? "text-status-warning font-semibold" : "text-text-muted",
                )}
              >
                {milestone.place}
              </span>
              <h5 className="font-body-default text-body-default text-text-primary font-semibold truncate">
                {milestone.title}
              </h5>
              <p className="font-body-muted text-body-muted text-text-secondary text-[0.8125rem]">{milestone.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsCard() {
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <span className={CARD_TITLE}>Course &amp; Relocation Documents</span>
        <span className="font-label-code text-text-muted text-[0.75rem]">2 Verified</span>
      </div>
      <div className="flex flex-col gap-space-xs">
        {DASHBOARD.documents.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between p-space-sm rounded-lg bg-surface-level-1 hover:bg-surface-elevated transition-colors"
          >
            <div className="flex items-center gap-space-sm min-w-0">
              <Icon className={cn("text-[22px] flex-shrink-0", doc.iconClass)} name={doc.icon} />
              <div className="min-w-0">
                <h6 className="font-body-muted text-body-muted text-on-surface font-medium truncate">{doc.name}</h6>
                <span className="font-label-code text-[0.6875rem] text-text-muted">{doc.meta}</span>
              </div>
            </div>
            <button
              aria-label={`Download ${doc.name}`}
              className="p-1.5 text-text-secondary hover:text-primary transition-colors flex-shrink-0"
              type="button"
            >
              <Icon className="text-[18px]" name="download" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  return (
    <div className="lg:col-span-4 flex flex-col gap-space-lg">
      <ConsultantCard />
      <MilestonesCard />
      <DocumentsCard />
    </div>
  );
}
