import { HighlightedText } from "@/components/ui/HighlightedText";
import type { TEXT_LESSON } from "@/constants/mock/textLesson";

export function OperationalRealities({ realities }: { realities: (typeof TEXT_LESSON)["realities"] }) {
  return (
    <div className="space-y-space-sm">
      <h3 className="font-headline-sm text-headline-sm text-text-primary">Key Operational Realities</h3>
      {realities.map((item) => (
        <div key={item.index} className="p-space-md rounded-xl bg-surface-level-1 shadow-sm flex items-start gap-space-md">
          <span className="w-7 h-7 rounded-full bg-surface-level-2 text-primary font-label-code text-[12px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
            {item.index}
          </span>
          <div className="space-y-1">
            <h4 className="font-title-card text-[0.9375rem] text-text-primary font-semibold">{item.title}</h4>
            <p className="font-body-legal text-[0.875rem] text-on-surface-variant leading-relaxed">
              <HighlightedText highlightClassName="text-text-primary italic" text={item.text} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
