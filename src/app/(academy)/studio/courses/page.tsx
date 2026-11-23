import type { Metadata } from "next";
import Link from "next/link";
import { CourseCatalog } from "@/components/studio/courses/CourseCatalog";
import { CourseStatCards } from "@/components/studio/courses/CourseStatCards";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Course Management" };

export default function StudioCoursesPage() {
  return (
    <div className="p-4 sm:p-space-lg space-y-space-lg max-w-[1440px] mx-auto w-full">
      <CourseStatCards />
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md bg-surface-level-1 p-space-lg rounded-xl shadow-md">
        <div className="max-w-2xl space-y-1">
          <div className="flex items-center gap-space-xs text-primary font-label-caps text-label-caps uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>Academy Curricula Engine</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight">
            Course Management &amp; Curricula Catalog
          </h1>
          <p className="font-body-default text-body-default text-text-secondary">
            Manage published immigration playbooks, curriculum updates, pricing tiers, and enrollment accessibility across
            international jurisdictions.
          </p>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <button
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-level-2 text-text-primary hover:bg-surface-elevated hover:text-white transition-all shadow-sm font-label-interactive text-label-interactive"
            type="button"
          >
            <Icon className="text-[18px] text-text-secondary" name="file_download" />
            <span>Batch Export CSV</span>
          </button>
          <Link
            className="flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-primary text-on-primary-fixed hover:bg-gold-hover transition-all font-label-interactive text-label-interactive font-semibold shadow-[0_4px_16px_rgba(217,164,65,0.25)]"
            href={ROUTES.studio.newCourse}
          >
            <Icon className="text-[20px] font-bold" name="add" />
            <span>+ Create New Course</span>
          </Link>
        </div>
      </div>
      <CourseCatalog />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
        <div className="bg-surface-level-1 p-space-md rounded-xl shadow-md lg:col-span-2 flex items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Icon className="text-[24px]" name="verified_user" />
            </div>
            <div className="space-y-1">
              <h2 className="font-title-card text-title-card text-text-primary font-semibold">
                Statutory Revisions Protocol Active
              </h2>
              <p className="font-body-muted text-body-muted text-text-secondary text-xs">
                All courses marked with  18a/b AufenthG comply with Germany&apos;s Fachkräfteeinwanderungsgesetz Phase 3
                revisions. Automatic video badge notification broadcast to 904 enrolled candidates is verified.
              </p>
            </div>
          </div>
          <button
            className="shrink-0 px-space-md py-2 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-primary hover:text-gold-hover transition-colors font-label-interactive text-label-interactive text-xs font-semibold whitespace-nowrap"
            type="button"
          >
            Review Audit Trail
          </button>
        </div>
        <div className="bg-surface-level-1 p-space-md rounded-xl shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-text-secondary uppercase">Streaming Infrastructure</span>
            <span className="font-label-code text-label-code text-tertiary">99.98% SLA</span>
          </div>
          <div className="space-y-1 my-2">
            <div className="flex justify-between font-label-code text-xs">
              <span className="text-text-muted">Storage Bandwidth</span>
              <span className="text-text-primary">8.56% Consumed</span>
            </div>
            <div className="w-full h-2 bg-surface-level-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full w-[8.56%]" />
            </div>
          </div>
          <span className="font-body-muted text-body-muted text-text-muted text-[11px]">
            Next quota tier replenishment: 01 Nov 2024
          </span>
        </div>
      </div>
    </div>
  );
}
