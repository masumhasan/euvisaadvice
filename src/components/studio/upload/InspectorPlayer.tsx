"use client";

import { Icon } from "@/components/ui/Icon";
import { SAMPLE_VIDEO_SRC } from "@/constants/media";
import { INSPECTOR, WAVEFORM } from "@/constants/mock/upload";
import { useVideoController } from "@/hooks/useVideoController";
import { cn } from "@/lib/cn";
import { formatClock } from "@/lib/formatTime";

export function InspectorPlayer() {
  const { videoRef, video } = useVideoController();
  const progress = video.duration > 0 ? video.currentTime / video.duration : 0;
  const playedBars = Math.round(progress * WAVEFORM.length);
  const total = video.duration > 0 ? formatClock(video.duration) : INSPECTOR.totalTime;

  return (
    <div className="bg-surface-base rounded-lg overflow-hidden flex flex-col shadow-inner">
      <div className="relative w-full aspect-video bg-surface-container-low flex items-center justify-center group">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover cursor-pointer"
          onClick={video.toggle}
          playsInline
          poster={INSPECTOR.image}
          preload="metadata"
          src={SAMPLE_VIDEO_SRC}
          {...video.videoProps}
        />
        <button
          aria-label={video.playing ? "Pause video" : "Play video"}
          className={cn(
            "absolute w-12 h-12 rounded-full bg-primary/90 hover:bg-primary text-on-primary flex items-center justify-center transition hover:scale-105 shadow-md",
            video.playing && "opacity-0 group-hover:opacity-100",
          )}
          onClick={video.toggle}
          type="button"
        >
          <Icon className="text-[26px]" name={video.playing ? "pause" : "play_arrow"} />
        </button>
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs font-label-code text-text-primary bg-surface-base/80 backdrop-blur-md px-2 py-1 rounded pointer-events-none">
          <span>{formatClock(video.currentTime)}</span>
          <span>/</span>
          <span className="text-text-muted">{total}</span>
        </div>
      </div>
      <div className="p-space-xs bg-surface-level-2/80 space-y-1">
        <div className="flex items-center justify-between text-[11px] font-label-code text-text-muted">
          <span>{INSPECTOR.audioTrack}</span>
          <span className="text-tertiary">{INSPECTOR.speechLevel}</span>
        </div>
        {/* Waveform doubles as a seek bar: click or use the arrow keys. */}
        <div className="relative w-full h-5 bg-surface-base rounded">
          <div className="absolute inset-0 flex items-center gap-0.5 px-1 pointer-events-none" aria-hidden="true">
            {WAVEFORM.map((bar, index) => (
              <div key={index} className={cn("w-1 rounded-full", bar.h, index < playedBars ? bar.tone : "bg-surface-variant")} />
            ))}
          </div>
          <input
            aria-label="Seek"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            max={1000}
            min={0}
            onChange={(event) => video.seekToFraction(Number(event.target.value) / 1000)}
            step={1}
            type="range"
            value={Math.round(progress * 1000)}
          />
        </div>
      </div>
    </div>
  );
}
