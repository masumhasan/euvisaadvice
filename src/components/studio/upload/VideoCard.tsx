"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { VideoModal } from "@/components/video/VideoModal";
import { cn } from "@/lib/cn";
import type { UploadVideo } from "@/types/upload";
import { VideoThumbnail } from "./VideoThumbnail";

const GHOST_BUTTON =
  "px-space-xs py-1 rounded font-label-interactive text-label-interactive transition-colors text-text-muted hover:text-text-primary hover:bg-surface-elevated";
const SOLID_BUTTON =
  "px-space-xs py-1 rounded bg-surface-level-2 hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-label-interactive text-label-interactive transition-colors";

function Tags({ video }: { video: UploadVideo }) {
  return (
    <div className="flex items-center gap-space-xs mt-2.5 flex-wrap">
      <span className="font-label-code text-label-code text-primary bg-primary-container/15 px-2 py-0.5 rounded">{video.statute}</span>
      {video.tags.map((tag) => (
        <span key={tag} className="font-label-code text-label-code text-text-secondary bg-surface-level-2 px-2 py-0.5 rounded">
          {tag}
        </span>
      ))}
      {video.status !== "transcoding" && video.mappedTo && (
        <>
          <span className="text-text-muted text-xs">•</span>
          <span className="font-label-interactive text-label-interactive text-tertiary flex items-center gap-1">
            <Icon className="text-[16px]" name="link" /> {video.mappedTo}
          </span>
        </>
      )}
    </div>
  );
}

/** Actions that open the video player. */
const PLAY_ACTIONS: readonly string[] = ["Preview Source", "View in Player"];

function Footer({ video, onPlay }: { video: UploadVideo; onPlay: () => void }) {
  if (video.status === "transcoding") {
    return (
      <>
        <div className="mt-space-sm">
          <div className="flex items-center justify-between text-xs font-label-code text-text-muted mb-1">
            <span className="text-text-secondary">{video.chunkLabel}</span>
            <span className="text-primary font-semibold">{video.eta}</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary-container rounded-full" style={{ width: `${video.progress}%` }} />
          </div>
        </div>
        <div className="flex items-center justify-between pt-space-xs">
          <span className="font-label-code text-label-code text-text-muted">{video.target}</span>
          <div className="flex items-center gap-space-xs">
            {video.actions.map((action) => (
              <button
                key={action}
                className={action === "Cancel" ? cn(GHOST_BUTTON, "text-status-danger hover:text-error") : GHOST_BUTTON}
                onClick={PLAY_ACTIONS.includes(action) ? onPlay : undefined}
                type="button"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center justify-between pt-space-xs gap-space-sm flex-wrap">
      <span className={cn("font-label-code text-label-code flex items-center gap-1", video.footerWarning ? "text-status-warning" : "text-text-muted")}>
        {video.footerWarning && <Icon className="text-[16px]" name="warning" />} {video.footer}
      </span>
      <div className="flex items-center gap-space-xs">
        {video.actions.map((action) => (
          <button key={action} className={SOLID_BUTTON} onClick={PLAY_ACTIONS.includes(action) ? onPlay : undefined} type="button">
            {action}
          </button>
        ))}
        {video.primaryAction && (
          <button
            className="px-space-md py-1.5 rounded bg-primary-container hover:bg-gold-hover text-on-primary-container font-label-interactive text-label-interactive transition-all font-semibold flex items-center gap-1 shadow-sm"
            type="button"
          >
            <span>{video.primaryAction}</span>
            <Icon className="text-[16px]" name="add" />
          </button>
        )}
        {video.hasMenu && (
          <button
            aria-label="More options"
            className="p-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors"
            title="More options"
            type="button"
          >
            <Icon className="text-[18px]" name="more_vert" />
          </button>
        )}
      </div>
    </div>
  );
}

export function VideoCard({ video }: { video: UploadVideo }) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const openPlayer = () => setPlayerOpen(true);
  const statusLabel = video.status === "transcoding" ? "Transcoding" : video.statusLabel;
  const statusClass =
    video.status === "published"
      ? "text-on-tertiary-container bg-tertiary-container"
      : "text-status-warning bg-status-warning-bg";

  return (
    <div className="bg-surface-level-1 hover:bg-surface-level-2/80 rounded-xl p-space-md transition-all">
      <div className="flex flex-col md:flex-row gap-space-md">
        <VideoThumbnail onPlay={openPlayer} video={video} />
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-space-sm">
              <h4 className="font-title-card text-title-card text-text-primary truncate">{video.title}</h4>
              <span className={cn("font-label-caps text-label-caps px-2 py-0.5 rounded uppercase font-semibold whitespace-nowrap", statusClass)}>
                {statusLabel}
              </span>
            </div>
            <p className="font-label-code text-label-code text-text-muted mt-1">{video.meta}</p>
            <Tags video={video} />
          </div>
          <Footer onPlay={openPlayer} video={video} />
        </div>
      </div>
      {playerOpen && <VideoModal onClose={() => setPlayerOpen(false)} poster={video.image} title={video.title} />}
    </div>
  );
}
