import { HighlightedText } from "@/components/ui/HighlightedText";
import type { OverviewOutcome } from "@/types/learn";

export function OutcomeCards({ outcomes }: { outcomes: OverviewOutcome[] }) {
  return (
    <div className="space-y-space-lg">
      <div className="flex items-baseline justify-between border-b-0 pb-0">
        <div>
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider">
            Outcomes &amp; Competence
          </span>
          <h3 className="font-headline-md text-headline-md text-text-primary mt-1">What you will be able to do</h3>
        </div>
        <span className="hidden sm:inline font-label-code text-[0.75rem] text-text-muted">Direct practical mastery</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {outcomes.map((outcome, index) => (
          <div
            key={outcome.title}
            className="bg-surface-level-1 p-space-lg rounded-xl shadow-md flex items-start gap-space-md group hover:bg-surface-elevated transition-colors"
          >
            <span className="font-headline-md text-headline-sm text-primary font-bold px-2.5 py-1 rounded bg-primary/10">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h4 className="font-title-card text-title-card text-text-primary mb-1">{outcome.title}</h4>
              <p className="font-body-default text-body-muted text-text-secondary leading-relaxed">
                <HighlightedText text={outcome.text} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
