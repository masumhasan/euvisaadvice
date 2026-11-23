import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import type { FeaturedCourse } from "@/types/course";

function StatItem({ icon, filled, title, caption }: { icon: string; filled?: boolean; title: string; caption: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="text-primary text-[20px]" filled={filled} name={icon} />
      <div>
        <div className="font-label-interactive text-text-primary text-xs">{title}</div>
        <div className="text-[11px] text-text-muted font-label-code">{caption}</div>
      </div>
    </div>
  );
}

export function FeaturedCourseCard({ course }: { course: FeaturedCourse }) {
  return (
    <div className="max-w-[1440px] mx-auto px-gutter mb-space-3xl w-full">
      <div className="relative bg-gradient-to-br from-surface-level-2 via-surface-level-1 to-surface-base border border-gold-hairline-bright rounded-2xl p-space-lg lg:p-space-xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-space-xs mb-space-sm">
                {course.tags.map((tag) =>
                  tag.icon ? (
                    <span
                      key={tag.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gold-subtle-fill border border-gold-hairline text-primary font-label-code text-[11px] font-semibold tracking-wider uppercase"
                    >
                      <Icon className="text-[14px]" name={tag.icon} />
                      {tag.label}
                    </span>
                  ) : (
                    <span
                      key={tag.label}
                      className="px-2.5 py-1 rounded bg-surface-elevated text-text-muted text-[11px] font-label-code"
                    >
                      {tag.label}
                    </span>
                  ),
                )}
              </div>
              <h2 className="font-headline-lg text-headline-lg text-text-primary mb-space-sm leading-tight">
                {course.title}
              </h2>
              <p className="font-body-default text-body-default text-text-secondary mb-space-lg max-w-xl">
                {course.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 border-y border-border-neutral mb-space-lg">
                <StatItem caption={`${course.lessonCount} Lessons`} icon="layers" title={`${course.moduleCount} Modules`} />
                <StatItem caption="On-Demand" icon="timer" title={course.runtime} />
                <StatItem caption="Resources" icon="download" title="14 Blueprints" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-surface-level-2 border border-gold-hairline flex items-center justify-center overflow-hidden">
                  <Icon className="text-primary text-[22px]" name="school" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-label-code">Course Faculty</p>
                  <p className="font-label-interactive text-text-primary text-sm">{course.instructors}</p>
                </div>
              </div>
              <div className="flex items-center gap-space-md">
                <div className="text-right">
                  <div className="font-headline-md text-headline-md text-text-primary font-bold tracking-tight">
                    €{course.price}
                  </div>
                  <div className="text-[11px] text-text-muted font-body-muted">{course.priceNote}</div>
                </div>
                <Button
                  className="shadow-[0_4px_20px_rgba(217,164,65,0.3)]"
                  href={`${ROUTES.course(course.slug)}#curriculum`}
                  size="lg"
                >
                  <span>Explore Syllabus</span>
                  <Icon className="text-[18px]" name="arrow_forward" />
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-gold-hairline bg-surface-level-1 shadow-2xl">
              <div className="relative w-full aspect-video bg-surface-dim overflow-hidden group">
                <Image
                  alt={course.title}
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  src={course.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-level-1 via-transparent to-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    aria-label="Play preview lesson"
                    className="w-16 h-16 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-[0_0_30px_rgba(217,164,65,0.6)] hover:scale-110 transition-transform"
                    href={`${ROUTES.course(course.slug)}#preview`}
                  >
                    <Icon className="text-[32px] ml-1" filled name="play_arrow" />
                  </a>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-label-code text-on-surface">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                    {course.previewLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/40 font-semibold">
                    Free Module
                  </span>
                </div>
              </div>
              <div className="p-4 bg-surface-level-1/90 backdrop-blur-sm space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary font-label-code">Course Syllabus Readiness</span>
                  <span className="text-primary font-label-code font-bold">100% Comprehensive</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-gold-highlight w-full rounded-full" />
                </div>
                <div className="text-[11px] text-text-muted">
                  <span>{course.attachmentsNote}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
