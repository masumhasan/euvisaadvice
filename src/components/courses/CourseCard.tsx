import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import type { CourseSummary } from "@/types/course";

export function CourseCard({ course }: { course: CourseSummary }) {
  const href = ROUTES.course(course.slug);
  return (
    <div className="course-card group bg-surface-level-2 border border-gold-hairline hover:border-gold-hairline-bright rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)]">
      <div>
        <Link className="relative block w-full aspect-video bg-surface-dim overflow-hidden" href={href}>
          <Image
            alt={course.title}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            src={course.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-level-2 via-transparent to-black/20" />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-label-code font-semibold bg-surface-base/80 text-primary border border-gold-hairline backdrop-blur-sm">
              {course.badge}
            </span>
            {course.format === "ebook" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-label-code font-semibold bg-primary/20 text-primary border border-primary/40 backdrop-blur-sm">
                <Icon className="text-[13px]" name="auto_stories" />
                <span>PDF E-Book</span>
              </span>
            )}
            {course.format === "bundle" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-label-code font-semibold bg-secondary/20 text-secondary border border-secondary/40 backdrop-blur-sm">
                <Icon className="text-[13px]" name="all_inclusive" />
                <span>Bundle</span>
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3">
            <span className="px-2 py-0.5 rounded text-[11px] font-label-code bg-black/60 text-white backdrop-blur-sm">
              {course.format === "ebook"
                ? `${course.pageCount ?? 168} Pages • PDF Guide`
                : `${course.moduleCount} Modules • ${course.lessonCount} Lessons`}
            </span>
          </div>
        </Link>
        <div className="p-space-md flex flex-col gap-space-xs">
          <div className="text-xs text-text-muted font-label-code">
            <span>{course.reference}</span>
          </div>
          <h4 className="font-title-card text-title-card text-text-primary group-hover:text-primary transition-colors">
            <Link href={href}>{course.title}</Link>
          </h4>
          <p className="font-body-muted text-body-muted text-text-secondary line-clamp-2">{course.description}</p>
          <div className="pt-2 border-t border-border-neutral space-y-1.5">
            {course.perks.map((perk) => (
              <div key={perk} className="flex items-center text-xs text-text-muted gap-2">
                <Icon className="text-status-success text-[16px]" name="task_alt" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-space-md pt-0 flex items-center justify-between border-t border-border-neutral/60 mt-3">
        <div>
          <div className="text-[11px] text-text-muted font-label-code uppercase tracking-wider">Tuition</div>
          <div className="font-headline-sm text-headline-sm text-text-primary font-bold">€{course.price}</div>
        </div>
        <Link
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-label-interactive transition-colors shadow-sm"
          href={href}
        >
          <span>Enroll Now</span>
          <Icon className="text-[16px]" name="arrow_forward" />
        </Link>
      </div>
    </div>
  );
}
