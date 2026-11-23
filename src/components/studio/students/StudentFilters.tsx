import { Icon } from "@/components/ui/Icon";
import { PATHWAY_OPTIONS, STATUS_OPTIONS } from "@/constants/mock/studioStudents";
import type { PathwayFilter, StatusFilter } from "@/types/students";

interface StudentFiltersProps {
  query: string;
  pathway: PathwayFilter;
  status: StatusFilter;
  onQueryChange: (value: string) => void;
  onPathwayChange: (value: PathwayFilter) => void;
  onStatusChange: (value: StatusFilter) => void;
  onReset: () => void;
}

const PILL = "flex items-center gap-1.5 bg-surface-level-2 px-3 py-1.5 rounded-lg";
const SELECT = "bg-transparent text-text-primary font-label-interactive text-label-interactive focus:outline-none cursor-pointer";
const OPTION = "bg-surface-container-high";

export function StudentFilters({ query, pathway, status, onQueryChange, onPathwayChange, onStatusChange, onReset }: StudentFiltersProps) {
  return (
    <div className="bg-surface-level-1 rounded-xl p-space-sm mb-space-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-sm">
      <div className="flex-1 relative min-w-[280px]">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]" name="search" />
        <input
          aria-label="Search students"
          className="w-full bg-surface-level-2 text-text-primary placeholder-text-muted pl-9 pr-space-md py-2 rounded-lg font-body-default text-body-default focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search student by passport name, dossier ID, or email..."
          type="text"
          value={query}
        />
      </div>
      <div className="flex flex-wrap items-center gap-space-xs">
        <div className={PILL}>
          <Icon className="text-[16px] text-text-muted" name="flag" />
          <select aria-label="Filter by visa pathway" className={SELECT} onChange={(event) => onPathwayChange(event.target.value as PathwayFilter)} value={pathway}>
            {PATHWAY_OPTIONS.map((option) => (
              <option key={option.value} className={OPTION} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={PILL}>
          <Icon className="text-[16px] text-text-muted" name="tune" />
          <select aria-label="Filter by dossier status" className={SELECT} onChange={(event) => onStatusChange(event.target.value as StatusFilter)} value={status}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} className={OPTION} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={PILL}>
          <Icon className="text-[16px] text-text-muted" name="calendar_today" />
          <span className="text-text-primary font-label-interactive text-label-interactive">Q1/Q2 2026</span>
          <Icon className="text-[16px] text-text-muted" name="arrow_drop_down" />
        </div>
        <button
          aria-label="Reset filters and refresh dossier data"
          className="p-2 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-text-secondary hover:text-text-primary transition-colors"
          onClick={onReset}
          type="button"
        >
          <Icon className="text-[18px]" name="refresh" />
        </button>
      </div>
    </div>
  );
}
