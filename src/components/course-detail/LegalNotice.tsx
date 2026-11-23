import { Icon } from "@/components/ui/Icon";

export function LegalNotice({ text }: { text: string }) {
  return (
    <aside className="p-space-md rounded-lg bg-surface-base border border-border-neutral text-text-muted font-body-muted text-[0.75rem] leading-relaxed space-y-1">
      <div className="flex items-center gap-1.5 text-text-secondary font-label-code text-[11px] uppercase tracking-wider">
        <Icon className="text-[14px]" name="policy" />
        <span>Course Terms &amp; Educational Advisory Notice</span>
      </div>
      <p>{text}</p>
    </aside>
  );
}
