import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import type { CourseDetail } from "@/types/courseDetail";

export function CourseDetailHero({ course }: { course: CourseDetail }) {
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-space-lg flex items-center gap-space-xs font-label-code text-label-code text-text-muted"
      >
        <Link className="hover:text-primary transition-colors flex items-center gap-1" href={ROUTES.home}>
          <Icon className="text-[16px]" name="home" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link className="hover:text-primary transition-colors" href={ROUTES.courses}>
          Courses
        </Link>
        <span>/</span>
        <span className="text-on-surface truncate max-w-xs md:max-w-md">{course.title}</span>
      </nav>

      <section className="space-y-space-md">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-surface-level-2 border border-gold-hairline text-primary font-label-code text-[11px] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span>{course.overline}</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-text-primary tracking-tight leading-tight">
          {course.title}
        </h1>
        <p className="font-body-legal text-body-legal text-on-surface-variant max-w-3xl">{course.subtitle}</p>
        <div className="pt-space-xs flex flex-wrap items-center gap-y-3 gap-x-6 text-body-muted font-body-muted text-text-secondary border-y border-border-neutral/60 py-3">
          <div className="flex items-center gap-1.5">
            <Icon className="text-primary text-[18px]" name="verified_user" />
            <span>
              Lead: <strong className="text-text-primary">{course.lead}</strong> {course.leadCredential}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon className="text-text-muted text-[18px]" name="update" />
            <span>
              Updated: <span className="text-on-surface">{course.updated}</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon className="text-text-muted text-[18px]" name="translate" />
            <span>{course.language}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-1 font-label-code text-[11px] text-text-muted">
          {course.specs.map((spec) => (
            <span key={spec} className="px-2.5 py-1 rounded bg-surface-level-1 border border-border-neutral">
              {spec}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
