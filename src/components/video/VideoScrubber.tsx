"use client";

import { cn } from "@/lib/cn";
import { formatClock } from "@/lib/formatTime";

export interface ScrubberMarker {
  left: number;
  title: string;
  active?: boolean;
}

interface VideoScrubberProps {
  current: number;
  duration: number;
  bufferedEnd: number;
  onSeek: (fraction: number) => void;
  markers?: ScrubberMarker[];
}

const RESOLUTION = 1000;

/** Seek bar: a visual track with an invisible range input on top for mouse, touch and keyboard control. */
export function VideoScrubber({ current, duration, bufferedEnd, onSeek, markers = [] }: VideoScrubberProps) {
  const progress = duration > 0 ? Math.min((current / duration) * 100, 100) : 0;
  const buffered = duration > 0 ? Math.min((bufferedEnd / duration) * 100, 100) : 0;

  return (
    <div className="relative w-full flex items-center group/scrubber cursor-pointer py-1">
      <div className="w-full h-1.5 bg-surface-bright/50 rounded-full overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 bg-surface-container-high rounded-full" style={{ width: `${buffered}%` }} />
        <div className="absolute left-0 top-0 bottom-0 bg-primary rounded-full" style={{ width: `${progress}%` }} />
      </div>
      <div
        className="absolute -ml-2 w-4 h-4 rounded-full bg-primary shadow-md shadow-primary/40 transform scale-0 group-hover/scrubber:scale-100 group-focus-within/scrubber:scale-100 transition-transform pointer-events-none"
        style={{ left: `${progress}%` }}
      />
      {markers.map((marker) => (
        <div
          key={marker.title}
          className={cn("absolute -top-1 w-0.5 h-3 rounded-full pointer-events-none", marker.active ? "bg-primary" : "bg-text-secondary/70")}
          style={{ left: `${marker.left}%` }}
          title={marker.title}
        />
      ))}
      <input
        aria-label="Seek"
        aria-valuetext={`${formatClock(current)} of ${formatClock(duration)}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        max={RESOLUTION}
        min={0}
        onChange={(event) => onSeek(Number(event.target.value) / RESOLUTION)}
        step={1}
        type="range"
        value={Math.round(progress * (RESOLUTION / 100))}
      />
    </div>
  );
}
