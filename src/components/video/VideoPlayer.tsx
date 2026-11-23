"use client";

import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { PlaybackSpeedMenu } from "@/components/video/PlaybackSpeedMenu";
import { VideoScrubber } from "@/components/video/VideoScrubber";
import { VolumeControl } from "@/components/video/VolumeControl";
import { SAMPLE_VIDEO_SRC, SEEK_STEP_SECONDS } from "@/constants/media";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useVideoController } from "@/hooks/useVideoController";
import { cn } from "@/lib/cn";
import { formatClock } from "@/lib/formatTime";

interface VideoPlayerProps {
  poster?: string;
  src?: string;
  autoPlay?: boolean;
  className?: string;
}

const CONTROL = "hover:text-primary transition-colors flex items-center justify-center p-1";

/** Self-contained player (video + control bar) used in modals and previews. */
export function VideoPlayer({ poster, src = SAMPLE_VIDEO_SRC, autoPlay = false, className }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { videoRef, video } = useVideoController();
  const fullscreen = useFullscreen(containerRef);

  return (
    <div ref={containerRef} className={cn("flex flex-col bg-surface-base", fullscreen.isFullscreen && "h-screen justify-center", className)}>
      <div className="relative aspect-video bg-surface-base group">
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          className="absolute inset-0 w-full h-full object-contain cursor-pointer"
          onClick={video.toggle}
          playsInline
          poster={poster}
          preload="metadata"
          src={src}
          {...video.videoProps}
        />
        {!video.playing && (
          <button
            aria-label="Play"
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-primary/90 text-on-primary flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
            onClick={video.toggle}
            type="button"
          >
            <Icon className="text-[32px] ml-1" filled name="play_arrow" />
          </button>
        )}
      </div>
      <div className="px-space-md py-space-sm bg-surface-level-1 text-text-secondary flex flex-col gap-1">
        <VideoScrubber bufferedEnd={video.bufferedEnd} current={video.currentTime} duration={video.duration} onSeek={video.seekToFraction} />
        <div className="flex items-center justify-between gap-space-sm flex-wrap">
          <div className="flex items-center gap-space-sm">
            <button aria-label={video.playing ? "Pause" : "Play"} className={CONTROL} onClick={video.toggle} type="button">
              <Icon className="text-[24px]" name={video.playing ? "pause" : "play_arrow"} />
            </button>
            <button aria-label="Rewind 10 seconds" className={CONTROL} onClick={() => video.seekBy(-SEEK_STEP_SECONDS)} title="Rewind 10s" type="button">
              <Icon className="text-[20px]" name="replay_10" />
            </button>
            <button aria-label="Forward 10 seconds" className={CONTROL} onClick={() => video.seekBy(SEEK_STEP_SECONDS)} title="Forward 10s" type="button">
              <Icon className="text-[20px]" name="forward_10" />
            </button>
            <VolumeControl muted={video.muted} onToggleMute={video.toggleMute} onVolumeChange={video.setVolume} volume={video.volume} />
            <span className="font-label-code text-[0.75rem] text-text-primary tracking-wide">
              {formatClock(video.currentTime)} <span className="text-text-muted">/ {formatClock(video.duration)}</span>
            </span>
          </div>
          <div className="flex items-center gap-space-sm">
            <PlaybackSpeedMenu onRateChange={video.setRate} rate={video.rate} />
            <button
              aria-label={fullscreen.isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              className={CONTROL}
              onClick={fullscreen.toggle}
              title="Fullscreen"
              type="button"
            >
              <Icon className="text-[20px]" name={fullscreen.isFullscreen ? "fullscreen_exit" : "fullscreen"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
