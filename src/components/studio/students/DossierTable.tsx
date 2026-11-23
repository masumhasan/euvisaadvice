import { Icon } from "@/components/ui/Icon";
import { TOTAL_DOSSIERS } from "@/constants/mock/studioStudents";
import type { Student } from "@/types/students";
import { DossierRow } from "./DossierRow";

interface DossierTableProps {
  title: string;
  students: Student[];
  selectedId: string;
  onSelect: (id: string) => void;
}

const HEADINGS = ["Applicant / Student", "Pathway & Course", "Progress & Checkpoints", "Enrolled Date", "Payoneer Status"];
const PAGES = ["1", "2", "3"];

export function DossierTable({ title, students, selectedId, onSelect }: DossierTableProps) {
  return (
    <div className="bg-surface-level-1 rounded-xl overflow-hidden shadow-sm">
      <div className="px-space-md py-space-sm bg-surface-level-2/60 flex items-center justify-between gap-space-sm flex-wrap">
        <div className="flex items-center gap-space-sm flex-wrap">
          <span className="font-title-card text-title-card text-text-primary">{title}</span>
          <span className="bg-primary/10 text-primary font-label-code text-label-code px-2 py-0.5 rounded-full font-medium">
            {students.length} Dossiers Selected for View
          </span>
        </div>
        <span className="text-text-muted font-label-code text-label-code">
          Showing {students.length === 0 ? 0 : `1-${students.length}`} of {TOTAL_DOSSIERS}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-level-2/30 text-text-secondary font-label-caps text-label-caps uppercase tracking-wider">
              {HEADINGS.map((heading, index) => (
                <th key={heading} className={index === 0 ? "py-3 px-space-md" : "py-3 px-space-sm"}>
                  {heading}
                </th>
              ))}
              <th className="py-3 px-space-md text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-neutral/30 font-body-default text-body-default">
            {students.map((student) => (
              <DossierRow key={student.id} onSelect={onSelect} selected={student.id === selectedId} student={student} />
            ))}
          </tbody>
        </table>
        {students.length === 0 && (
          <p className="text-center text-text-muted font-body-muted text-body-muted py-space-xl">No dossiers match the current filters.</p>
        )}
      </div>
      <div className="px-space-md py-3 bg-surface-level-2/40 flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs text-text-muted font-label-code text-label-code">
          <span className="w-2 h-2 rounded-full bg-status-success shrink-0" />
          <span>All {TOTAL_DOSSIERS} applicant transactions verified against Bundeszentralamt für Steuern (BZSt) registry</span>
        </div>
        <div className="flex items-center gap-1 font-label-code text-label-code">
          <button aria-label="Previous page" className="p-1.5 rounded bg-surface-level-1 text-text-muted hover:text-text-primary disabled:opacity-50" disabled type="button">
            <Icon className="text-[16px]" name="chevron_left" />
          </button>
          <button aria-current="page" className="px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-semibold" type="button">
            1
          </button>
          {PAGES.slice(1).map((page) => (
            <button key={page} className="px-2.5 py-1 rounded bg-surface-level-1 text-text-secondary hover:text-text-primary" type="button">
              {page}
            </button>
          ))}
          <span className="px-1 text-text-muted">...</span>
          <button className="px-2.5 py-1 rounded bg-surface-level-1 text-text-secondary hover:text-text-primary" type="button">
            284
          </button>
          <button aria-label="Next page" className="p-1.5 rounded bg-surface-level-1 text-text-secondary hover:text-text-primary" type="button">
            <Icon className="text-[16px]" name="chevron_right" />
          </button>
        </div>
      </div>
    </div>
  );
}
