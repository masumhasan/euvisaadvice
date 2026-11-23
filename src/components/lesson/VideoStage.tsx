"use client";

import { useRef, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { PlaybackSpeedMenu } from "@/components/video/PlaybackSpeedMenu";
import { VideoScrubber } from "@/components/video/VideoScrubber";
import { VolumeControl } from "@/components/video/VolumeControl";
import { PLAYBACK_RATES, SAMPLE_VIDEO_SRC, SEEK_STEP_SECONDS } from "@/constants/media";
import type { VIDEO_LESSON } from "@/constants/mock/videoLesson";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useVideoController } from "@/hooks/useVideoController";
import { cn } from "@/lib/cn";
import { formatClock } from "@/lib/formatTime";

type Lesson = typeof VIDEO_LESSON;

const CONTROL = "hover:text-primary transition-colors flex items-center justify-center p-1";

export function VideoStage({ lesson }: { lesson: Lesson }) {
  const stageRef = useRef<HTMLElement>(null);
  const { videoRef, video } = useVideoController();
  const fullscreen = useFullscreen(stageRef);

  const nextRate = () => {
    const index = PLAYBACK_RATES.findIndex((rate) => rate === video.rate);
    video.setRate(PLAYBACK_RATES[(index + 1) % PLAYBACK_RATES.length]);
  };

  // Keyboard shortcuts: Space/K play, ←/→ seek, M mute, F fullscreen. Native controls keep their own keys.
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) return;
    const key = event.key.toLowerCase();
    const handlers: Record<string, () => void> = {
      " ": video.toggle,
      k: video.toggle,
      arrowleft: () => video.seekBy(-SEEK_STEP_SECONDS),
      arrowright: () => video.seekBy(SEEK_STEP_SECONDS),
      m: video.toggleMute,
      f: fullscreen.toggle,
    };
    const handler = handlers[key];
    if (!handler) return;
    event.preventDefault();
    handler();
  };

  const total = video.duration > 0 ? formatClock(video.duration) : lesson.totalTime;

  return (
    <section
      ref={stageRef}
      aria-label="Video player"
      className="relative w-full rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl mb-space-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-space-md py-space-sm bg-gradient-to-b from-surface-base/90 via-surface-base/40 to-transparent pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-danger opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-status-danger" />
          </span>
          <span className="font-label-code text-[0.6875rem] font-semibold tracking-wider text-text-primary uppercase">
            Curriculum Session Recording • Consular Guidance Stream 2026
          </span>
        </div>
        <div className="flex items-center gap-space-sm pointer-events-auto">
          <span className="px-2 py-0.5 rounded bg-surface-elevated/80 text-primary font-label-code text-[0.6875rem] backdrop-blur-md">
            1080p 60fps HD
          </span>
          <button aria-label="Share" className="p-1 rounded text-text-muted hover:text-text-primary transition-colors" type="button">
            <Icon className="text-[18px]" name="share" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "relative w-full bg-surface-base flex items-center justify-center group overflow-hidden",
          fullscreen.isFullscreen ? "h-screen" : "aspect-video max-h-[620px]",
        )}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-contain bg-surface-base cursor-pointer"
          onClick={video.toggle}
          playsInline
          poster={lesson.thumbnail}
          preload="metadata"
          src={SAMPLE_VIDEO_SRC}
          {...video.videoProps}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-transparent to-surface-base/40 pointer-events-none" />
        <button
          aria-label={video.playing ? "Pause" : "Play"}
          className={cn(
            "absolute z-10 w-20 h-20 rounded-full bg-primary-container/90 text-on-primary flex items-center justify-center shadow-xl shadow-primary-container/30 backdrop-blur-sm transform transition hover:scale-110 active:scale-95",
            video.playing ? "opacity-0 group-hover:opacity-90" : "opacity-90",
          )}
          onClick={video.toggle}
          type="button"
        >
          <Icon className="text-[38px] ml-1 text-surface-base font-bold" name={video.playing ? "pause" : "play_arrow"} />
        </button>

        <div className="absolute bottom-0 inset-x-0 z-30 px-space-md py-space-sm bg-gradient-to-t from-surface-base via-surface-base/95 to-transparent flex flex-col gap-2">
          <VideoScrubber
            bufferedEnd={video.bufferedEnd}
            current={video.currentTime}
            duration={video.duration}
            markers={lesson.markers}
            onSeek={video.seekToFraction}
          />
          <div className="flex items-center justify-between text-text-secondary pt-1">
            <div className="flex items-center gap-space-sm">
              <button aria-label={video.playing ? "Pause" : "Play"} className={CONTROL} onClick={video.toggle} title={video.playing ? "Pause (k)" : "Play (k)"} type="button">
                <Icon className="text-[24px]" name={video.playing ? "pause" : "play_arrow"} />
              </button>
              <button aria-label="Rewind 10 seconds" className={CONTROL} onClick={() => video.seekBy(-SEEK_STEP_SECONDS)} title="Rewind 10s (←)" type="button">
                <Icon className="text-[20px]" name="replay_10" />
              </button>
              <button aria-label="Forward 10 seconds" className={CONTROL} onClick={() => video.seekBy(SEEK_STEP_SECONDS)} title="Forward 10s (→)" type="button">
                <Icon className="text-[20px]" name="forward_10" />
              </button>
              <div className="ml-1">
                <VolumeControl muted={video.muted} onToggleMute={video.toggleMute} onVolumeChange={video.setVolume} volume={video.volume} />
              </div>
              <span className="font-label-code text-[0.75rem] text-text-primary ml-2 tracking-wide">
                {formatClock(video.currentTime)} <span className="text-text-muted">/ {total}</span>
              </span>
              <div className="hidden xl:flex items-center gap-1.5 ml-3 px-2.5 py-0.5 rounded-full bg-surface-level-2 text-primary font-label-code text-[0.6875rem]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>{lesson.chapterLabel}</span>
              </div>
            </div>
            <div className="flex items-center gap-space-sm font-label-interactive text-label-interactive">
              <button
                aria-label={`Playback speed ${video.rate}x, click to change`}
                className="px-2 py-1 rounded bg-surface-level-2 hover:bg-surface-elevated text-text-primary text-[0.75rem] font-label-code transition-colors"
                onClick={nextRate}
                title="Playback speed"
                type="button"
              >
                {Number.isInteger(video.rate) ? video.rate.toFixed(1) : video.rate}×
              </button>
              <PlaybackSpeedMenu onRateChange={video.setRate} rate={video.rate} />
              <button
                aria-label={fullscreen.isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                className={CONTROL}
                onClick={fullscreen.toggle}
                title={fullscreen.isFullscreen ? "Exit fullscreen (f)" : "Fullscreen (f)"}
                type="button"
              >
                <Icon className="text-[20px]" name={fullscreen.isFullscreen ? "fullscreen_exit" : "fullscreen"} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
