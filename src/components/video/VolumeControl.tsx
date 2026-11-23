"use client";

import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onToggleMute: () => void;
  onVolumeChange: (volume: number) => void;
  buttonClassName?: string;
}

export function VolumeControl({ volume, muted, onToggleMute, onVolumeChange, buttonClassName }: VolumeControlProps) {
  const effective = muted ? 0 : volume;
  const icon = effective === 0 ? "volume_off" : effective < 0.5 ? "volume_down" : "volume_up";

  return (
    <div className="flex items-center gap-1.5">
      <button
        aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
        className={cn("hover:text-primary transition-colors flex items-center justify-center p-1", buttonClassName)}
        onClick={onToggleMute}
        title={muted ? "Unmute" : "Mute"}
        type="button"
      >
        <Icon className="text-[20px]" name={icon} />
      </button>
      <div className="relative w-14 h-1 bg-surface-bright rounded-full hidden sm:block">
        <div className="absolute inset-y-0 left-0 bg-text-primary rounded-full" style={{ width: `${effective * 100}%` }} />
        <input
          aria-label="Volume"
          className="absolute -inset-y-2 w-full h-5 opacity-0 cursor-pointer"
          max={100}
          min={0}
          onChange={(event) => onVolumeChange(Number(event.target.value) / 100)}
          step={1}
          type="range"
          value={Math.round(effective * 100)}
        />
      </div>
    </div>
  );
}
