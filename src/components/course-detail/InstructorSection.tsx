import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { CourseInstructor } from "@/types/courseDetail";

const TONE_CLASSES = {
  primary: "text-primary",
  success: "text-status-success",
  muted: "text-text-secondary",
} as const;

export function InstructorSection({ instructor }: { instructor: CourseInstructor }) {
  return (
    <section className="p-space-lg rounded-xl bg-surface-level-1 border border-gold-hairline space-y-space-md">
      <div className="flex items-center justify-between border-b border-border-neutral pb-space-sm">
        <span className="font-label-code text-[11px] text-primary uppercase tracking-widest">Faculty Leadership</span>
        <span className="font-label-code text-[11px] text-text-muted">{instructor.location}</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-space-md items-start">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-surface-level-2 border border-gold-hairline overflow-hidden flex items-center justify-center">
            <Icon className="text-primary text-[48px]" name="school" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-1 rounded-full bg-surface-base border border-gold-hairline">
            <Icon className="text-status-success text-[16px]" filled name="verified" />
          </div>
        </div>
        <div className="space-y-space-xs flex-1">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-text-primary">{instructor.name}</h3>
            <p className="font-body-muted text-body-muted text-primary">{instructor.title}</p>
          </div>
          <p className="font-body-default text-body-default text-text-secondary leading-relaxed">{instructor.bio}</p>
          <div className="pt-2 flex flex-wrap gap-4 font-label-code text-[12px] text-text-muted">
            {instructor.stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-1.5">
                <Icon className={cn("text-[16px]", TONE_CLASSES[stat.tone ?? "muted"])} name={stat.icon} />
                <span>
                  {stat.value && <strong className="text-text-primary">{stat.value}</strong>} {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
