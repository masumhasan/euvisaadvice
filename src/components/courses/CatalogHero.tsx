"use client";

import { Icon } from "@/components/ui/Icon";
import { COURSE_CATEGORIES } from "@/constants/mock/courses";
import { cn } from "@/lib/cn";
import { useCatalogFilter } from "./CatalogFilterContext";

const CHIP_BASE = "px-4 py-2 rounded-full text-xs font-label-interactive transition-all duration-200";
const CHIP_ACTIVE = "bg-primary text-on-primary font-semibold shadow-[0_2px_12px_rgba(217,164,65,0.25)]";
const CHIP_IDLE =
  "bg-surface-level-1 text-text-secondary hover:text-text-primary border border-border-neutral hover:border-gold-hairline";

export function CatalogHero() {
  const { query, setQuery, category, setCategory } = useCatalogFilter();

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[360px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-gutter pt-space-xl pb-space-2xl relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-subtle-fill border border-gold-hairline mb-space-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-code text-label-code text-primary font-semibold tracking-wide uppercase">
              EUVisaAdvice Academy • Legal &amp; Relocation Frameworks
            </span>
          </div>
          <h1 className="font-display-hero text-display-hero text-text-primary tracking-tight mb-space-sm">
            Visa &amp; Immigration Courses
          </h1>
          <p className="font-body-legal text-body-legal text-text-secondary max-w-2xl text-center mb-space-xl">
            Practical guidance, structured learning, and verified legal blueprints for your European visa journey.
          </p>
          <div className="w-full max-w-3xl relative mb-space-lg">
            <div className="relative flex items-center bg-surface-level-1 border border-border-neutral focus-within:border-primary focus-within:shadow-[0_0_24px_-4px_rgba(217,164,65,0.25)] rounded-xl px-4 py-3.5 transition-all duration-200">
              <Icon className="text-primary text-[24px] mr-3" name="search" />
              <input
                aria-label="Search courses"
                className="w-full bg-transparent text-text-primary placeholder:text-text-muted font-body-default text-body-default focus:outline-none"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search courses, topics (e.g. EU Blue Card, Opportunity Card, Document Apostille)..."
                type="text"
                value={query}
              />
              <span className="hidden sm:inline-flex items-center gap-1.5 bg-surface-level-2 border border-border-neutral text-text-secondary px-2.5 py-1 rounded text-xs font-label-code">
                <span>Filter</span>
                <Icon className="text-[16px]" name="tune" />
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-2 w-full max-w-4xl">
            {COURSE_CATEGORIES.map((item) => (
              <button
                key={item.key}
                aria-pressed={category === item.key}
                className={cn(CHIP_BASE, category === item.key ? CHIP_ACTIVE : CHIP_IDLE)}
                onClick={() => setCategory(item.key)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
