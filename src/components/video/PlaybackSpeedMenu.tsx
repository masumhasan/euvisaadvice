"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { PLAYBACK_RATES } from "@/constants/media";
import { cn } from "@/lib/cn";

interface PlaybackSpeedMenuProps {
  rate: number;
  onRateChange: (rate: number) => void;
  buttonClassName?: string;
}

/** Settings button that opens a small playback-speed popover. */
export function PlaybackSpeedMenu({ rate, onRateChange, buttonClassName }: PlaybackSpeedMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Playback settings"
        className={cn("hover:text-primary transition-colors p-1", buttonClassName)}
        onClick={() => setOpen((value) => !value)}
        title="Playback settings"
        type="button"
      >
        <Icon className="text-[20px]" name="settings" />
      </button>
      {open && (
        <div
          className="absolute bottom-full right-0 mb-2 w-40 rounded-lg bg-surface-level-2 border border-gold-hairline shadow-2xl overflow-hidden z-40"
          role="menu"
        >
          <div className="px-3 py-2 font-label-caps text-label-caps text-text-muted uppercase">Playback speed</div>
          {PLAYBACK_RATES.map((option) => (
            <button
              key={option}
              aria-checked={option === rate}
              className={cn(
                "w-full flex items-center justify-between px-3 py-1.5 font-label-code text-label-code hover:bg-surface-elevated transition-colors",
                option === rate ? "text-primary" : "text-text-primary",
              )}
              onClick={() => {
                onRateChange(option);
                setOpen(false);
              }}
              role="menuitemradio"
              type="button"
            >
              <span>{option === 1 ? "Normal" : `${option}×`}</span>
              {option === rate && <Icon className="text-[16px]" name="check" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
