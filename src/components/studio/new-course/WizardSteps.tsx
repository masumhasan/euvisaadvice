import { Fragment } from "react";
import { cn } from "@/lib/cn";

const STEPS = [
  { title: "Basic Information", note: "In Progress" },
  { title: "Curriculum & Modules", note: "6 Modules Drafted" },
  { title: "Payoneer & Pricing", note: "EUR Billing" },
  { title: "Dossiers & Templates", note: "PDF / DOCX Assets" },
  { title: "Statutory Compliance", note: "§ 2 RDG Notice" },
];

export function WizardSteps() {
  return (
    <div className="w-full bg-surface-level-1 rounded-xl p-2 sm:p-3 mb-space-xl shadow-md overflow-x-auto">
      <div className="flex items-center min-w-[760px] justify-between relative">
        {STEPS.map((step, index) => {
          const active = index === 0;
          return (
            <Fragment key={step.title}>
              {index > 0 && <div className="h-0.5 w-6 bg-surface-container-high rounded-full" />}
              <button
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg group text-left transition-all",
                  active
                    ? "bg-surface-level-2 text-text-primary"
                    : "hover:bg-surface-container-low text-text-secondary hover:text-text-primary",
                )}
                type="button"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-label-code text-label-code",
                    active
                      ? "bg-primary-container text-on-primary font-bold"
                      : "bg-surface-container-high text-text-muted group-hover:text-text-primary",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="flex flex-col">
                  <span className={cn("font-label-interactive text-label-interactive", active && "text-text-primary")}>
                    {step.title}
                  </span>
                  <span
                    className={cn(
                      "font-label-caps text-label-caps uppercase",
                      active ? "text-primary tracking-wider" : "text-text-muted",
                    )}
                  >
                    {step.note}
                  </span>
                </div>
              </button>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
