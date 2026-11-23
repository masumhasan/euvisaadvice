"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { TEXT_LESSON } from "@/constants/mock/textLesson";

export function PrerequisiteCheckpoint({ checkpoint }: { checkpoint: (typeof TEXT_LESSON)["checkpoint"] }) {
  const [checked, setChecked] = useState<boolean[]>(() => checkpoint.items.map(() => false));
  const count = checked.filter(Boolean).length;
  const complete = count === checkpoint.items.length;

  return (
    <div className="p-space-lg rounded-xl bg-surface-level-1 shadow-lg space-y-space-md">
      <div className="flex items-center justify-between pb-space-xs">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-text-primary">{checkpoint.title}</h3>
          <p className="font-body-muted text-body-muted text-text-secondary">{checkpoint.subtitle}</p>
        </div>
        <span
          className={cn(
            "font-label-code text-[11px] px-2.5 py-1 rounded",
            complete ? "bg-status-success-bg text-status-success font-semibold" : "bg-surface-level-2 text-text-muted",
          )}
        >
          {count} / {checkpoint.items.length} Verified
        </span>
      </div>
      <div className="space-y-space-xs">
        {checkpoint.items.map((item, index) => (
          <label
            key={item}
            className="flex items-center gap-space-md p-space-md rounded-lg bg-surface-level-2 hover:bg-surface-elevated transition-colors cursor-pointer group"
          >
            <input
              checked={checked[index]}
              className="w-4 h-4 rounded bg-surface-level-1 accent-primary focus:ring-0 cursor-pointer"
              onChange={() => setChecked((current) => current.map((value, i) => (i === index ? !value : value)))}
              type="checkbox"
            />
            <span className="font-body-default text-[0.875rem] text-on-surface group-hover:text-text-primary transition-colors">
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
