import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { LEDGER_CYCLE, STUDENT_TABS } from "@/constants/mock/studioStudents";
import type { StudentsTab } from "@/types/students";

interface StudentsTabsProps {
  active: StudentsTab;
  onChange: (tab: StudentsTab) => void;
}

export function StudentsTabs({ active, onChange }: StudentsTabsProps) {
  return (
    <div className="flex items-center justify-between bg-surface-level-1 rounded-xl p-1.5 mb-space-md">
      <div className="flex items-center gap-1 overflow-x-auto" role="tablist">
        {STUDENT_TABS.map((tab) => (
          <button
            key={tab.id}
            aria-selected={active === tab.id}
            className={cn(
              "px-space-md py-2 rounded-lg font-label-interactive text-label-interactive flex items-center gap-space-xs transition-all whitespace-nowrap",
              active === tab.id
                ? "bg-primary-container text-on-primary-container shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-level-2",
            )}
            onClick={() => onChange(tab.id)}
            role="tab"
            type="button"
          >
            <Icon className="text-[18px]" name={tab.icon} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="hidden md:flex items-center gap-2 pr-2">
        <span className="font-label-caps text-label-caps text-text-muted">LEDGER CYCLE</span>
        <span className="bg-surface-level-2 text-primary font-label-code text-label-code px-2 py-0.5 rounded">{LEDGER_CYCLE}</span>
      </div>
    </div>
  );
}
