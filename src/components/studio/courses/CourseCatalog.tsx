"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  COURSE_FILTER_TABS,
  STATUTORY_CLUSTERS,
  STUDIO_COURSES,
} from "@/constants/mock/studioCourses";
import { CourseRow } from "./CourseRow";

const TABLE_HEADERS = [
  "Masterclass & Instructor Overview",
  "Topic Domain",
  "Curriculum Depth",
  "Enrollments",
  "Pricing & Gross",
  "Curriculum Version",
  "Actions",
];

export function CourseCatalog() {
  const [tab, setTab] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [clusters, setClusters] = useState<string[]>([STATUTORY_CLUSTERS[0]]);

  const needle = query.trim().toLowerCase();
  const courses = STUDIO_COURSES.filter(
    (course) =>
      (tab === "all" || course.status === tab) &&
      (!needle || `${course.title} ${course.statute} ${course.author}`.toLowerCase().includes(needle)),
  );

  const toggleCluster = (cluster: string) =>
    setClusters((current) =>
      current.includes(cluster) ? current.filter((item) => item !== cluster) : [...current, cluster],
    );

  return (
    <>
      <div className="bg-surface-level-1 p-space-md rounded-xl space-y-space-md shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-surface-base rounded-lg" role="tablist">
            {COURSE_FILTER_TABS.map((item) => {
              const active = item.id === tab;
              return (
                <button
                  key={item.id}
                  aria-selected={active}
                  className={cn(
                    "px-space-md py-2 rounded font-label-interactive text-label-interactive whitespace-nowrap",
                    active
                      ? "text-on-primary-fixed bg-primary font-semibold shadow-sm"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-container-high transition-colors",
                    "badge" in item && "flex items-center gap-1.5",
                  )}
                  onClick={() => setTab(item.id)}
                  role="tab"
                  type="button"
                >
                  <span>{item.label}</span>
                  {"badge" in item && (
                    <span className="bg-status-warning-bg text-status-warning font-label-code text-[11px] px-1.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="relative min-w-[280px] lg:min-w-[340px]">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]" name="search" />
            <input
              aria-label="Search courses"
              className="w-full bg-surface-level-2 text-text-primary placeholder-text-muted pl-9 pr-space-md py-2 rounded-lg font-body-default text-body-default focus:outline-none focus:bg-surface-elevated transition-colors shadow-inner"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search courses by name, topic, or author..."
              type="text"
              value={query}
            />
          </div>
        </div>
        <div className="flex items-center gap-space-xs flex-wrap pt-2">
          <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-wider mr-1">
            Topic Clusters:
          </span>
          {STATUTORY_CLUSTERS.map((cluster) => {
            const active = clusters.includes(cluster);
            return (
              <button
                key={cluster}
                aria-pressed={active}
                className={cn(
                  "px-space-sm py-1 rounded-full transition-colors font-label-code text-label-code",
                  active
                    ? "bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1"
                    : "bg-surface-level-2 text-text-secondary hover:text-text-primary hover:bg-surface-elevated",
                )}
                onClick={() => toggleCluster(cluster)}
                type="button"
              >
                <span>{cluster}</span>
                {active && <Icon className="text-[14px]" name="check" />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-surface-level-1 rounded-xl shadow-xl overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-level-2 text-text-secondary font-label-caps text-label-caps uppercase tracking-wider">
                {TABLE_HEADERS.map((header, index) => (
                  <th
                    key={header}
                    className={cn("py-space-md px-space-md", index === TABLE_HEADERS.length - 1 && "text-right")}
                    scope="col"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high/40 text-body-default font-body-default">
              {courses.map((course) => (
                <CourseRow key={course.id} course={course} />
              ))}
              {courses.length === 0 && (
                <tr>
                  <td className="py-space-xl px-space-md text-center text-text-secondary" colSpan={TABLE_HEADERS.length}>
                    No courses match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-surface-level-2/80 px-space-lg py-space-md flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md flex-wrap text-text-secondary text-xs">
            <span className="font-body-muted text-body-muted">
              Showing <strong className="text-text-primary">1 to {courses.length}</strong> of {courses.length} active
              masterclasses
            </span>
            <span className="h-3 w-px bg-surface-variant/40 hidden sm:inline-block" />
            <div className="flex items-center gap-space-xs font-label-code text-label-code text-text-muted">
              <Icon className="text-[16px] text-primary" name="cloud_done" />
              <span>
                Payoneer Video CDN: <strong className="text-text-primary">42.8 GB / 500 GB</strong> used
              </span>
            </div>
            <span className="h-3 w-px bg-surface-variant/40 hidden sm:inline-block" />
            <div className="flex items-center gap-space-xs font-label-code text-label-code text-text-muted">
              <Icon className="text-[16px] text-tertiary" name="lock" />
              <span>14 Legal Templates hosted on S3 (Frankfurt eu-central-1)</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button aria-label="Previous page" className="p-1.5 rounded text-text-muted opacity-30 pointer-events-none" disabled type="button">
              <Icon className="text-[18px]" name="chevron_left" />
            </button>
            <span className="px-2.5 py-1 rounded bg-primary text-on-primary-fixed font-label-code text-xs font-bold">1</span>
            <button aria-label="Next page" className="p-1.5 rounded text-text-muted opacity-30 pointer-events-none" disabled type="button">
              <Icon className="text-[18px]" name="chevron_right" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
