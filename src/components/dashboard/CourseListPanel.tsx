"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { DASHBOARD } from "@/constants/mock/dashboard";
import { EnrolledCourseRow } from "./EnrolledCourseRow";

/** Tabs + search + enrolled course list (only "In Progress" has mock content). */
export function CourseListPanel() {
  const [tab, setTab] = useState<string>("progress");
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();
  const courses =
    tab === "progress"
      ? DASHBOARD.courses.filter((course) => !normalized || course.title.toLowerCase().includes(normalized))
      : [];
  const activeTab = DASHBOARD.tabs.find((item) => item.id === tab);

  return (
    <>
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-space-xs flex-wrap gap-space-sm">
          <div className="flex items-center gap-space-md overflow-x-auto" role="tablist">
            {DASHBOARD.tabs.map((item) => {
              const active = item.id === tab;
              return (
                <button
                  key={item.id}
                  aria-selected={active}
                  className={cn(
                    "font-label-interactive text-label-interactive pb-space-xs flex items-center gap-2 whitespace-nowrap transition-colors",
                    active
                      ? "text-primary border-b-2 border-primary"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                  onClick={() => setTab(item.id)}
                  role="tab"
                  type="button"
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[11px]",
                      active ? "bg-primary text-on-primary font-bold" : "bg-surface-level-2 text-text-secondary",
                    )}
                  >
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-space-xs text-text-secondary font-label-code text-[0.8125rem]">
            <span>Sort:</span>
            <button className="text-text-primary font-medium hover:text-primary flex items-center gap-1" type="button">
              <span>Recently Accessed</span>
              <Icon className="text-[16px]" name="expand_more" />
            </button>
          </div>
        </div>
        <div className="relative w-full">
          <Icon className="absolute left-3.5 top-3 text-text-muted text-[18px]" name="search" />
          <input
            aria-label="Search my courses"
            className="w-full bg-surface-level-1 text-text-primary pl-10 pr-space-md py-2.5 rounded-lg text-body-muted font-body-muted shadow-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search my courses, lessons, notes, statutory clauses..."
            type="text"
            value={query}
          />
        </div>
      </div>
      <div className="flex flex-col gap-space-lg">
        {courses.map((course) => (
          <EnrolledCourseRow key={course.id} course={course} />
        ))}
        {courses.length === 0 && (
          <div className="bg-surface-level-2 p-space-lg rounded-xl text-center text-text-secondary font-body-muted text-body-muted">
            {tab === "progress"
              ? "No courses match your search."
              : `Nothing to show in “${activeTab?.label}” yet.`}
          </div>
        )}
      </div>
    </>
  );
}
