import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { DossierStatus, Student } from "@/types/students";

interface DossierRowProps {
  student: Student;
  selected: boolean;
  onSelect: (id: string) => void;
}

const LABEL_TONE: Record<DossierStatus, string> = {
  active: "text-text-primary",
  completed: "text-primary",
  appeal: "text-status-warning",
};

const BAR_TONE: Record<DossierStatus, string> = {
  active: "bg-primary",
  completed: "bg-primary",
  appeal: "bg-status-warning",
};

function Progress({ student }: { student: Student }) {
  const { status, label, percent, note } = student.progress;
  return (
    <div className="flex flex-col gap-1 w-44">
      {status === "completed" ? (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {label}
        </span>
      ) : (
        <span className={cn("font-label-code text-label-code font-medium", LABEL_TONE[status])}>{label}</span>
      )}
      <div className="w-full h-1.5 bg-surface-level-2 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", BAR_TONE[status])} style={{ width: `${percent}%` }} />
      </div>
      <span className="font-label-code text-label-code text-text-muted truncate">{note}</span>
    </div>
  );
}

export function DossierRow({ student, selected, onSelect }: DossierRowProps) {
  const first = student.name.split(" ")[0];

  return (
    <tr
      className={cn(
        "transition-colors cursor-pointer",
        selected ? "bg-gold-subtle-fill/40 hover:bg-gold-subtle-fill" : "hover:bg-surface-level-2/40",
      )}
      onClick={() => onSelect(student.id)}
    >
      <td className="py-3.5 px-space-md">
        <div className="flex items-center gap-space-sm">
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface-level-2 flex-shrink-0">
            <Image alt="" className="object-cover" fill sizes="36px" src={student.avatar} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-interactive text-label-interactive text-text-primary font-semibold truncate">{student.name}</span>
              {student.verified && <Icon className="text-primary text-[16px]" name="verified" />}
            </div>
            <span className="font-label-code text-label-code text-text-muted truncate">{student.email}</span>
            <span className="font-label-code text-label-code text-text-secondary mt-0.5">{student.location}</span>
          </div>
        </div>
      </td>
      <td className="py-3.5 px-space-sm">
        <div className="flex flex-col">
          <span className="font-label-interactive text-label-interactive text-text-primary leading-snug">{student.courseTitle}</span>
          <span className="font-label-code text-label-code text-primary mt-0.5">{student.pathway}</span>
        </div>
      </td>
      <td className="py-3.5 px-space-sm">
        <Progress student={student} />
      </td>
      <td className="py-3.5 px-space-sm whitespace-nowrap">
        <span className="font-label-code text-label-code text-text-primary">{student.enrolledDate}</span>
        <span className="block font-label-code text-label-code text-text-muted">{student.enrolledTime}</span>
      </td>
      <td className="py-3.5 px-space-sm whitespace-nowrap">
        <div className="flex flex-col">
          <span className="font-label-interactive text-label-interactive text-status-success font-semibold">{student.amount} Settled</span>
          <span className="font-label-code text-label-code text-text-muted">{student.rail}</span>
        </div>
      </td>
      <td className="py-3.5 px-space-md text-right whitespace-nowrap">
        <div className="flex items-center justify-end gap-1.5">
          <button
            className={cn(
              "px-2.5 py-1 rounded font-label-interactive text-xs",
              selected
                ? "bg-primary-container text-on-primary-container shadow-sm"
                : "bg-surface-level-2 hover:bg-surface-elevated text-text-primary",
            )}
            onClick={() => onSelect(student.id)}
            type="button"
          >
            View Dossier
          </button>
          <button
            aria-label={`Download Invoice for ${first}`}
            className="p-1 rounded bg-surface-level-2 hover:bg-surface-elevated text-text-secondary hover:text-text-primary"
            onClick={(event) => event.stopPropagation()}
            title="Download Invoice"
            type="button"
          >
            <Icon className="text-[18px]" name="receipt" />
          </button>
        </div>
      </td>
    </tr>
  );
}
