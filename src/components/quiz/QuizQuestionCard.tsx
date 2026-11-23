import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { QuizQuestion } from "@/constants/mock/quiz";

interface QuizQuestionCardProps {
  question: QuizQuestion;
  selected: number | undefined;
  onSelect: (optionIndex: number) => void;
}

const LETTERS = ["A", "B", "C", "D"];

export function QuizQuestionCard({ question, selected, onSelect }: QuizQuestionCardProps) {
  const answered = selected !== undefined;
  const correct = answered && selected === question.correct;

  return (
    <div className="bg-surface-level-1 p-space-xl rounded-xl shadow-xl flex flex-col gap-space-lg relative">
      <div className="flex items-center justify-between pb-space-xs">
        <span
          className={cn(
            "font-label-code text-label-code uppercase tracking-wide",
            answered ? "text-primary" : "text-text-muted",
          )}
        >
          {question.label}
        </span>
        {correct ? (
          <span className="inline-flex items-center gap-1 font-label-code text-[11px] text-status-success bg-status-success-bg px-2 py-0.5 rounded-full">
            <Icon className="text-[13px]" name="check_circle" /> Verified
          </span>
        ) : (
          <span className="font-label-code text-[11px] text-text-secondary bg-surface-base px-2 py-0.5 rounded-full">
            {answered ? "Answer Selected" : "Pending Selection"}
          </span>
        )}
      </div>
      <h3 className="font-headline-sm text-headline-sm text-text-primary leading-snug">{question.prompt}</h3>
      <div aria-label={`${question.label} options`} className="flex flex-col gap-space-sm" role="radiogroup">
        {question.options.map((option, index) => {
          const active = selected === index;
          return (
            <button
              key={option}
              aria-checked={active}
              className={cn(
                "p-space-md rounded-lg flex items-center justify-between gap-space-md text-left transition-colors",
                active
                  ? "bg-gold-subtle-fill text-text-primary shadow-md"
                  : "bg-surface-level-2 text-on-surface-variant hover:bg-surface-elevated",
              )}
              onClick={() => onSelect(index)}
              role="radio"
              type="button"
            >
              <span className="flex items-center gap-space-md min-w-0">
                <span
                  className={cn(
                    "w-7 h-7 rounded font-label-code text-label-code flex items-center justify-center flex-shrink-0",
                    active ? "bg-primary text-on-primary font-bold" : "bg-surface-base text-text-muted",
                  )}
                >
                  {LETTERS[index]}
                </span>
                <span className={cn("font-body-default text-body-default", active && "font-medium")}>{option}</span>
              </span>
              <Icon
                className={cn("text-[20px] flex-shrink-0", active ? "text-primary" : "text-text-muted")}
                name={active ? "radio_button_checked" : "radio_button_unchecked"}
              />
            </button>
          );
        })}
      </div>
      {answered && question.precedent && (
        <div className="bg-status-success-bg p-space-md rounded-lg flex items-start gap-space-sm">
          <Icon className="text-status-success text-[20px] flex-shrink-0 mt-0.5" name="verified" />
          <div className="flex flex-col gap-0.5">
            <span className="font-label-interactive text-[0.8125rem] text-status-success uppercase tracking-wider">
              {question.precedent.title}
            </span>
            <p className="font-body-muted text-body-muted text-on-surface">{question.precedent.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
