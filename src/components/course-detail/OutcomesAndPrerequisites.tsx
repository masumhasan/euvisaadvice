import { Icon } from "@/components/ui/Icon";
import type { CourseDetail } from "@/types/courseDetail";

export function OutcomesSection({ outcomes }: { outcomes: CourseDetail["outcomes"] }) {
  return (
    <section className="p-space-lg rounded-xl bg-surface-level-1 border border-gold-hairline shadow-md space-y-space-md">
      <div className="flex items-center justify-between border-b border-border-neutral pb-space-sm">
        <div className="flex items-center gap-2">
          <Icon className="text-primary text-[20px]" name="verified" />
          <h2 className="font-title-card text-title-card text-text-primary">What You Will Master</h2>
        </div>
        <span className="font-label-code text-[11px] text-text-muted uppercase tracking-wider">
          Statutory Competencies
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {outcomes.map((outcome) => (
          <div
            key={outcome.title}
            className="flex items-start gap-3 p-3 rounded-lg bg-surface-level-2/50 border border-border-neutral/60"
          >
            <Icon className="text-primary flex-shrink-0 text-[18px] mt-0.5" filled name="check_circle" />
            <div className="space-y-0.5">
              <p className="font-title-card text-[0.875rem] text-text-primary leading-tight">{outcome.title}</p>
              <p className="font-body-muted text-body-muted text-text-secondary text-[0.8125rem]">{outcome.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PrerequisitesSection({ items }: { items: CourseDetail["prerequisites"] }) {
  return (
    <section className="p-space-lg rounded-xl bg-surface-level-1 border border-border-neutral space-y-space-md">
      <h2 className="font-title-card text-title-card text-text-primary flex items-center gap-2">
        <Icon className="text-text-secondary text-[20px]" name="assignment_turned_in" />
        <span>Requirements &amp; Prerequisites</span>
      </h2>
      <ul className="space-y-space-xs font-body-default text-body-default text-on-surface-variant">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5">
            <Icon className="text-primary text-[18px] mt-1" name="arrow_forward" />
            <span>
              <strong>{item.label}</strong> {item.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
