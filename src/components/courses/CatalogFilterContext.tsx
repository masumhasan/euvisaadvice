"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CategoryKey, CourseSummary } from "@/types/course";

export const SORT_OPTIONS = [
  "Most Enrolled",
  "Recently Updated",
  "Price: Low to High",
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

interface CatalogFilterValue {
  query: string;
  setQuery: (value: string) => void;
  category: CategoryKey;
  setCategory: (value: CategoryKey) => void;
  sort: SortOption;
  setSort: (value: SortOption) => void;
  visibleCourses: CourseSummary[];
}

const CatalogFilterContext = createContext<CatalogFilterValue | null>(null);

function matches(course: CourseSummary, query: string, category: CategoryKey) {
  if (category !== "all" && !course.categories.includes(category)) return false;
  if (!query) return true;
  const haystack = [course.title, course.badge, course.reference, course.description, ...course.perks]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function sortCourses(courses: CourseSummary[], sort: SortOption) {
  const sorted = [...courses];
  switch (sort) {
    case "Most Enrolled":
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    case "Price: Low to High":
      return sorted.sort((a, b) => a.price - b.price);
    default:
      return sorted;
  }
}

interface ProviderProps {
  courses: CourseSummary[];
  initialQuery?: string;
  children: ReactNode;
}

/** Shares search / category / sort state between the catalog hero and course grid. */
export function CatalogFilterProvider({ courses, initialQuery = "", children }: ProviderProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryKey>("all");
  const [sort, setSort] = useState<SortOption>("Recently Updated");

  const visibleCourses = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    return sortCourses(
      courses.filter((course) => matches(course, normalized, category)),
      sort,
    );
  }, [courses, query, category, sort]);

  const value = { query, setQuery, category, setCategory, sort, setSort, visibleCourses };
  return <CatalogFilterContext.Provider value={value}>{children}</CatalogFilterContext.Provider>;
}

export function useCatalogFilter() {
  const context = useContext(CatalogFilterContext);
  if (!context) throw new Error("useCatalogFilter must be used inside CatalogFilterProvider");
  return context;
}
