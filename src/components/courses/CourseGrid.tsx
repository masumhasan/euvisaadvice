"use client";

import { SORT_OPTIONS, useCatalogFilter, type SortOption } from "./CatalogFilterContext";
import { CourseCard } from "./CourseCard";

export function CourseGrid() {
  const { visibleCourses, sort, setSort } = useCatalogFilter();

  return (
    <div className="max-w-[1440px] mx-auto px-gutter mb-space-3xl w-full">
      <div className="flex items-center justify-between mb-space-lg">
        <div>
          <h3 className="font-headline-md text-headline-md text-text-primary">Curriculum Directory</h3>
          <p className="font-body-muted text-body-muted text-text-secondary">
            Video masterclasses, comprehensive E-Books &amp; PDFs, and expert-reviewed petition blueprints.
          </p>
        </div>
        <label className="hidden sm:flex items-center gap-2">
          <span className="text-xs text-text-muted font-label-code">Sort By:</span>
          <select
            className="bg-surface-level-1 border border-border-neutral text-text-primary text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-primary"
            onChange={(event) => setSort(event.target.value as SortOption)}
            value={sort}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
      {visibleCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {visibleCourses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      ) : (
        <p className="py-space-2xl text-center font-body-default text-body-default text-text-muted">
          No courses match your search.
        </p>
      )}
    </div>
  );
}
