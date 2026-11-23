import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export const INPUT_CLASS =
  "w-full bg-surface-level-1 text-text-primary placeholder-text-muted px-space-md py-2.5 rounded-lg font-body-default text-body-default focus:outline-none focus:bg-surface-container-high transition-all";

interface FieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, required, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="font-label-interactive text-label-interactive text-text-primary flex items-center gap-1.5" htmlFor={htmlFor}>
        <span>{label}</span>
        {required && <span className="text-primary">*</span>}
      </label>
      {children}
      {hint && <p className="font-label-caps text-label-caps text-text-muted uppercase">{hint}</p>}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  options: string[];
  defaultValue?: string;
  className?: string;
  icon?: string;
}

export function SelectField({ id, options, defaultValue, className, icon = "unfold_more" }: SelectFieldProps) {
  return (
    <div className="relative">
      <select
        className={cn(INPUT_CLASS, "appearance-none cursor-pointer pr-10", className)}
        defaultValue={defaultValue ?? options[0]}
        id={id}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <Icon className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted text-[20px]" name={icon} />
    </div>
  );
}

interface ToggleProps {
  label: string;
  defaultChecked?: boolean;
  size?: "md" | "sm";
}

/** Accessible switch built on a visually hidden checkbox. */
export function Toggle({ label, defaultChecked = false, size = "md" }: ToggleProps) {
  const track = size === "md" ? "w-12 h-6 after:h-5 after:w-5" : "w-10 h-5 after:h-4 after:w-4";
  return (
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input aria-label={label} className="sr-only peer" defaultChecked={defaultChecked} type="checkbox" />
      <div
        className={cn(
          "bg-surface-container-highest rounded-full peer peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-checked:bg-primary-container peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-primary after:rounded-full after:transition-all",
          track,
        )}
      />
    </label>
  );
}
