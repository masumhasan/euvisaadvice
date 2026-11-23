import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PAYMENT } from "@/constants/mock/payment";

export function EnrolledCourseCard() {
  const { course } = PAYMENT;

  return (
    <div className="lg:col-span-7 bg-surface-level-2 rounded-xl border border-gold-hairline p-space-lg flex flex-col justify-between shadow-xl relative overflow-hidden group">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div>
        <div className="flex items-center justify-between mb-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-code text-label-code text-gold-highlight bg-gold-subtle-fill px-space-xs py-space-2xs rounded border border-gold-hairline">
              {course.dossierId}
            </span>
            <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-tertiary bg-status-success-bg px-space-xs py-space-2xs rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-status-success" /> ACTIVE CLEARANCE
            </span>
          </div>
          <span className="font-label-code text-label-code text-text-muted">ACADEMY ACCREDITED</span>
        </div>
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-space-md bg-surface-base border border-border-neutral">
          <Image
            alt={course.title}
            className="object-cover brightness-95 group-hover:scale-[1.02] transition-transform duration-500"
            fill
            sizes="(min-width: 1024px) 700px, 100vw"
            src={course.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-surface-base/20 to-transparent flex flex-col justify-between p-space-md">
            <div className="self-start px-space-xs py-1 rounded bg-surface-level-1/90 backdrop-blur-md border border-gold-hairline text-gold-highlight font-label-caps text-label-caps uppercase tracking-wider">
              {course.series}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <div className="w-9 h-9 rounded-full bg-primary/90 flex items-center justify-center text-surface-base shadow-[0_0_16px_rgba(217,164,65,0.4)]">
                  <Icon className="text-[20px]" filled name="play_arrow" />
                </div>
                <div>
                  <p className="font-label-interactive text-label-interactive text-text-primary leading-tight">
                    {course.moduleTitle}
                  </p>
                  <p className="font-label-code text-[11px] text-gold-highlight">{course.moduleMeta}</p>
                </div>
              </div>
              <span className="font-label-code text-label-code text-text-secondary bg-surface-level-1/80 px-2 py-0.5 rounded">
                {course.quality}
              </span>
            </div>
          </div>
        </div>
        <h2 className="font-headline-sm text-headline-sm text-text-primary font-bold mb-space-xs leading-snug">
          {course.title}
        </h2>
        <p className="font-body-muted text-body-muted text-text-secondary mb-space-md leading-relaxed">
          Led by <span className="text-text-primary font-medium">{course.instructorName}</span> {course.instructorRole}{" "}
          {course.description}
        </p>
        <div className="grid grid-cols-3 gap-space-sm pt-space-sm border-t border-border-neutral">
          {course.stats.map((stat) => (
            <div key={stat.label} className="bg-surface-level-1 p-space-sm rounded-lg">
              <div className="flex items-center gap-1 text-gold-highlight mb-1">
                <Icon className="text-[16px]" name={stat.icon} />
                <span className="font-label-caps text-label-caps uppercase">{stat.label}</span>
              </div>
              <p className="font-title-card text-title-card text-text-primary">{stat.value}</p>
              <p className="font-body-muted text-[12px] text-text-muted">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-space-lg pt-space-md border-t border-border-neutral flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-sm">
          <Image
            alt={course.advisor.name}
            className="w-10 h-10 rounded-full object-cover border border-gold-hairline"
            height={40}
            src={course.advisor.avatar}
            width={40}
          />
          <div>
            <p className="font-label-interactive text-label-interactive text-text-primary">{course.advisor.name}</p>
            <p className="font-label-code text-[11px] text-text-secondary">{course.advisor.role}</p>
          </div>
        </div>
        <Link
          className="inline-flex items-center gap-space-xs font-label-interactive text-label-interactive text-primary hover:text-gold-hover transition-colors"
          href={course.syllabusHref}
        >
          <span>Open Study Syllabus</span>
          <Icon className="text-[16px]" name="arrow_forward" />
        </Link>
      </div>
    </div>
  );
}
