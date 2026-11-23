import { HighlightedText } from "@/components/ui/HighlightedText";
import { cn } from "@/lib/cn";
import type { TEXT_LESSON } from "@/constants/mock/textLesson";

type Layers = (typeof TEXT_LESSON)["layers"];

const FOOTER_TONES = {
  primary: "text-text-secondary",
  warning: "text-status-warning",
  success: "text-status-success",
} as const;

export function PowerLayers({ layers }: { layers: Layers }) {
  return (
    <div className="space-y-space-md">
      <h3 className="font-headline-sm text-headline-sm text-text-primary">The Architecture of Power</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {layers.map((layer, index) => {
          const filled = index !== 1;
          return (
            <div
              key={layer.index}
              className="bg-surface-level-2 p-space-md rounded-xl shadow-md flex flex-col justify-between gap-space-md group hover:bg-surface-elevated transition-all"
            >
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full font-label-code text-label-code font-bold flex items-center justify-center",
                      filled ? "bg-primary text-on-primary" : "bg-surface-level-1 text-primary",
                    )}
                  >
                    {layer.index}
                  </span>
                  <span className={cn("font-label-code text-[11px]", filled ? "text-primary" : "text-text-secondary")}>
                    {layer.tag}
                  </span>
                </div>
                <h4 className="font-title-card text-title-card text-text-primary font-bold">{layer.title}</h4>
                <p className="font-body-default text-[0.875rem] text-on-surface-variant leading-relaxed">
                  <HighlightedText
                    highlightClassName="font-label-code text-primary bg-surface-level-1 px-1 py-0.5 rounded"
                    text={layer.text}
                  />
                </p>
              </div>
              <div
                className={cn(
                  "bg-surface-level-1 p-space-xs rounded-lg font-label-code text-[11px]",
                  FOOTER_TONES[layer.tone as keyof typeof FOOTER_TONES],
                )}
              >
                {layer.footer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
