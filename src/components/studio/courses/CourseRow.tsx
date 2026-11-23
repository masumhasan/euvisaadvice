import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { StudioCourse } from "@/constants/mock/studioCourses";
import { ROUTES } from "@/constants/routes";

const STATUS_STYLES = {
  published: { badge: "bg-status-success-bg text-status-success", dot: "bg-status-success" },
  draft: { badge: "bg-status-warning-bg text-status-warning", dot: "bg-status-warning animate-ping" },
  archived: { badge: "bg-surface-container-high text-text-muted", dot: "" },
} as const;

const GHOST_BUTTON =
  "px-space-sm py-1.5 rounded bg-surface-level-2 hover:bg-surface-elevated transition-colors font-label-interactive text-label-interactive text-xs";

function CourseThumb({ course }: { course: StudioCourse }) {
  return (
    <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 shadow-md bg-surface-base">
      {course.image ? (
        <Image alt="" className="object-cover" fill sizes="80px" src={course.image} />
      ) : (
        <div
          className={cn(
            "w-full h-full bg-surface-level-2 flex flex-col items-center justify-center",
            course.status === "draft" ? "text-status-warning" : "text-text-muted",
          )}
        >
          <Icon className="text-[24px]" name={course.placeholder?.icon ?? "archive"} />
          {course.placeholder?.label && (
            <span className="font-label-code text-[9px] uppercase tracking-wider mt-0.5">{course.placeholder.label}</span>
          )}
        </div>
      )}
      {course.duration && (
        <span className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-text-primary font-label-code text-[10px] leading-tight">
          {course.duration}
        </span>
      )}
    </div>
  );
}

export function CourseRow({ course }: { course: StudioCourse }) {
  const styles = STATUS_STYLES[course.status];
  const archived = course.status === "archived";
  const muted = archived ? "text-text-secondary" : "text-text-primary";
  const curriculumHref = ROUTES.studio.curriculum(course.id);

  return (
    <tr
      className={cn(
        "hover:bg-surface-level-2/50 transition-colors group",
        course.status === "draft" && "bg-status-warning-bg/5",
        archived && "opacity-75",
      )}
    >
      <td className="py-space-md px-space-md">
        <div className="flex items-center gap-space-md">
          <CourseThumb course={course} />
          <div className="flex flex-col min-w-0 max-w-sm">
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-code text-[11px] font-semibold",
                  styles.badge,
                )}
              >
                {styles.dot && <span className={cn("w-1.5 h-1.5 rounded-full", styles.dot)} />}
                {archived && "▪ "}
                {course.statusLabel}
              </span>
              {course.tier && (
                <span className="font-label-code text-[11px] text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  {course.tier}
                </span>
              )}
            </div>
            <Link
              className={cn(
                "font-title-card text-title-card hover:text-primary transition-colors font-semibold truncate leading-snug",
                muted,
              )}
              href={curriculumHref}
            >
              {course.title}
            </Link>
            <span className="font-body-muted text-body-muted text-text-muted text-xs truncate">{course.author}</span>
          </div>
        </div>
      </td>
      <td className="py-space-md px-space-md">
        <div className="flex flex-col">
          <span className={cn("font-medium text-xs", muted)}>{course.domain}</span>
          <span className={cn("font-label-code text-label-code", archived ? "text-text-muted" : "text-text-secondary")}>
            {course.statute}
          </span>
        </div>
      </td>
      <td className="py-space-md px-space-md">
        <div className="flex flex-col text-xs text-text-secondary">
          <span className={cn("font-semibold", archived ? "text-text-muted" : "text-text-primary")}>{course.depth}</span>
          {course.depthPercent !== undefined ? (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full", course.status === "draft" ? "bg-status-warning" : "bg-primary")}
                  style={{ width: `${course.depthPercent}%` }}
                />
              </div>
              <span
                className={cn(
                  "font-label-code text-[10px]",
                  course.status === "draft" ? "text-status-warning" : "text-text-muted",
                )}
              >
                {course.depthNote}
              </span>
            </div>
          ) : (
            <span className="font-label-code text-[10px] text-text-muted">{course.depthNote}</span>
          )}
        </div>
      </td>
      <td className="py-space-md px-space-md">
        <div className="flex flex-col">
          <span className={cn("font-bold", course.status === "published" ? "text-text-primary" : archived ? "text-text-secondary" : "text-text-muted")}>
            {course.enrollments}
          </span>
          <span className={cn("font-label-code text-[11px]", course.status === "published" ? "text-tertiary" : "text-text-muted")}>
            {course.enrollmentsNote}
          </span>
        </div>
      </td>
      <td className="py-space-md px-space-md">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={cn("font-bold", muted)}>{course.price}</span>
            {course.listPrice && <span className="line-through text-text-muted text-xs">{course.listPrice}</span>}
          </div>
          <span className={cn("font-label-code text-[11px]", course.status === "published" ? "text-primary" : "text-text-muted")}>
            {course.priceNote}
          </span>
        </div>
      </td>
      <td className="py-space-md px-space-md">
        <div className="flex flex-col text-xs">
          <span className={cn("font-medium", archived ? "text-text-muted" : "text-text-primary")}>{course.version}</span>
          <span
            className={cn(
              "font-label-code text-[10px]",
              course.status === "draft" ? "text-status-warning" : course.status === "published" ? "text-text-secondary" : "text-text-muted",
            )}
          >
            {course.versionNote}
          </span>
        </div>
      </td>
      <td className="py-space-md px-space-md text-right">
        <div className="flex items-center justify-end gap-1.5">
          {course.status === "published" && (
            <>
              <Link
                className="px-space-sm py-1.5 rounded bg-primary text-on-primary-fixed hover:bg-gold-hover transition-colors font-label-interactive text-label-interactive text-xs font-semibold"
                href={curriculumHref}
              >
                Edit Curriculum
              </Link>
              <Link
                aria-label="Live preview"
                className="p-1.5 rounded hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
                href={ROUTES.course(course.id)}
                title="Live Preview"
              >
                <Icon className="text-[18px]" name="visibility" />
              </Link>
            </>
          )}
          {course.status === "draft" && (
            <>
              <Link className={cn(GHOST_BUTTON, "text-text-primary font-semibold")} href={curriculumHref}>
                Continue Editing
              </Link>
              <button
                className="px-space-sm py-1.5 rounded bg-status-warning/20 text-status-warning hover:bg-status-warning/30 transition-colors font-label-interactive text-label-interactive text-xs font-semibold"
                type="button"
              >
                Submit for Quality Review
              </button>
            </>
          )}
          {archived && (
            <>
              <button className={cn(GHOST_BUTTON, "text-text-primary font-semibold")} type="button">
                Restore
              </button>
              <button className={cn(GHOST_BUTTON, "text-text-secondary")} type="button">
                Duplicate
              </button>
            </>
          )}
          {!archived && (
            <button
              aria-label="More options"
              className="p-1.5 rounded hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
              title="More Options"
              type="button"
            >
              <Icon className="text-[18px]" name="more_vert" />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
