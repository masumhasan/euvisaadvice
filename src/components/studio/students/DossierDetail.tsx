import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { Student } from "@/types/students";
import { SettlementCard } from "./SettlementCard";

const ICON_BUTTON = "p-1.5 rounded-lg bg-surface-level-2 text-text-secondary hover:text-text-primary";
const SECONDARY_ACTION =
  "py-2 px-space-xs rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-label-interactive text-xs transition-all flex items-center justify-center gap-1.5";

function Row({ label, value, valueClass }: { label: string; value: string; valueClass: string }) {
  return (
    <div className="flex items-center justify-between gap-space-sm">
      <span className="font-label-caps text-label-caps text-text-muted uppercase">{label}</span>
      <span className={`font-label-code text-label-code text-right ${valueClass}`}>{value}</span>
    </div>
  );
}

export function DossierDetail({ student }: { student: Student }) {
  const { detail } = student;

  return (
    <div className="bg-surface-level-1 rounded-xl p-space-md flex flex-col gap-space-md shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-surface-level-2 flex-shrink-0">
            <Image alt="" className="object-cover" fill sizes="48px" src={detail.avatar} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="font-title-card text-title-card text-text-primary font-semibold truncate">{student.name}</h2>
              {student.verified && <Icon className="text-primary text-[18px]" name="verified" />}
            </div>
            <span className="font-label-code text-label-code text-primary">{detail.reference}</span>
            <span className="font-label-caps text-label-caps text-status-success uppercase font-semibold mt-0.5">{detail.statusLabel}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button aria-label="Bookmark dossier" className={ICON_BUTTON} title="Bookmark Dossier" type="button">
            <Icon className="text-[18px]" name="bookmark" />
          </button>
          <button aria-label="Dossier action menu" className={ICON_BUTTON} title="More Options" type="button">
            <Icon className="text-[18px]" name="more_vert" />
          </button>
        </div>
      </div>

      <div className="bg-surface-level-2 rounded-lg p-space-sm space-y-space-xs">
        <Row label="Statutory Basis" value={detail.statutoryBasis} valueClass="text-text-primary font-semibold" />
        <Row label="Jurisdiction" value={detail.jurisdiction} valueClass="text-text-secondary" />
        <Row label="Curriculum Modules" value={detail.modules} valueClass="text-primary font-semibold" />
        <Row label="Dossier Completed" value={detail.completed} valueClass="text-text-secondary" />
      </div>

      <SettlementCard student={student} />

      <div className="pt-2">
        <div className="grid grid-cols-2 gap-2">
          <button className={SECONDARY_ACTION} type="button">
            <Icon className="text-[16px]" name="folder_zip" />
            <span>Zip Full Packet</span>
          </button>
          <button className={SECONDARY_ACTION} type="button">
            <Icon className="text-[16px]" name="history" />
            <span>Audit Changelog</span>
          </button>
        </div>
      </div>
    </div>
  );
}
