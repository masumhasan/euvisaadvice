import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { DASHBOARD } from "@/constants/mock/dashboard";

type DashboardCourse = (typeof DASHBOARD.courses)[number];

export function EnrolledCourseRow({ course }: { course: DashboardCourse }) {
  return (
    <div className="bg-surface-level-2 p-space-lg rounded-xl shadow-md transition-all hover:shadow-xl flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md">
        <div className="min-w-0">
          <div className="flex items-center gap-space-xs flex-wrap mb-space-2xs">
            <span
              className={cn(
                "font-label-caps text-label-caps uppercase px-2 py-0.5 rounded font-semibold",
                course.categoryClass,
              )}
            >
              {course.category}
            </span>
            <span className="font-label-code text-label-code text-text-muted">{course.module}</span>
          </div>
          <h3 className="font-title-card text-title-card text-text-primary tracking-tight">{course.title}</h3>
          <div className="flex items-center gap-space-sm mt-space-2xs text-text-secondary font-body-muted text-body-muted">
            <span className="flex items-center gap-1">
              <Icon className="text-[16px] text-text-muted" name="person" />
              {course.instructor}
            </span>
            <span>•</span>
            <span>{course.lessons}</span>
          </div>
        </div>
        <div className="flex items-center sm:flex-col sm:items-end justify-between flex-shrink-0">
          <span className={cn("font-headline-sm text-headline-sm font-bold", course.percentClass)}>
            {course.percent}%
          </span>
          <span className="font-label-code text-[0.75rem] text-text-muted">{course.completed}</span>
        </div>
      </div>
      <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
        <div className={cn("h-full rounded-full", course.barClass)} style={{ width: `${course.percent}%` }} />
      </div>
      <div className="bg-surface-level-1 p-space-md rounded-lg flex items-center justify-between gap-space-md flex-wrap">
        <div className="flex items-center gap-space-sm min-w-0">
          <div
            className={cn(
              "w-8 h-8 rounded bg-surface-level-2 flex items-center justify-center flex-shrink-0",
              course.nextIconClass,
            )}
          >
            <Icon className="text-[18px]" name={course.nextIcon} />
          </div>
          <div className="min-w-0">
            <span className="font-label-caps text-[0.6875rem] text-text-muted uppercase">Next Up</span>
            <p className="font-body-muted text-body-muted text-on-surface truncate font-medium">{course.nextUp}</p>
          </div>
        </div>
        <Link
          className={cn(
            "font-label-interactive text-label-interactive px-space-md py-2 rounded-lg shadow-sm transition-all ml-auto flex-shrink-0",
            course.primaryCta
              ? "bg-primary hover:bg-gold-hover text-on-primary"
              : "bg-surface-level-2 hover:bg-surface-elevated text-text-primary",
          )}
          href={course.href}
        >
          Continue Course
        </Link>
      </div>
    </div>
  );
}
