import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { COURSE_STATS } from "@/constants/mock/studioCourses";

const TAG_CLASSES = {
  trend: "text-tertiary flex items-center gap-0.5",
  success: "text-tertiary bg-status-success-bg px-1.5 py-0.5 rounded",
  gold: "text-primary bg-primary/10 px-1.5 py-0.5 rounded",
  muted: "text-text-muted",
} as const;

export function CourseStatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
      {COURSE_STATS.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface-level-2 p-space-md rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between"
        >
          <div className={cn("absolute -right-6 -bottom-6 w-24 h-24 rounded-full pointer-events-none", stat.glow)} />
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-text-secondary uppercase tracking-wider">{stat.label}</span>
            <Icon className={cn("text-[20px]", stat.iconClass)} name={stat.icon} />
          </div>
          <div className="mt-space-sm flex items-baseline justify-between">
            <span className="font-headline-md text-headline-md text-text-primary font-bold">{stat.value}</span>
            <span className={cn("font-label-code text-label-code", TAG_CLASSES[stat.tag.kind])}>
              {stat.tag.kind === "trend" && <Icon className="text-[14px]" name="trending_up" />}
              {stat.tag.text}
            </span>
          </div>
          <span className="font-body-muted text-body-muted text-text-muted mt-1">{stat.note}</span>
        </div>
      ))}
    </div>
  );
}
