"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { VideoPlayer } from "./VideoPlayer";

interface VideoModalProps {
  title: string;
  poster?: string;
  onClose: () => void;
}

/** Dialog that plays the (sample) video; Escape or a backdrop click closes it. */
export function VideoModal({ title, poster, onClose }: VideoModalProps) {
  useEffect(() => {
    // Escape also exits browser fullscreen, so only close the dialog when not fullscreen.
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && !document.fullscreenElement && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      aria-label={title}
      aria-modal="true"
      className="fixed inset-0 z-[70] bg-surface-base/90 backdrop-blur-md flex items-center justify-center p-gutter"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="relative w-full max-w-4xl bg-surface-level-1 border border-gold-hairline rounded-xl overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-space-md border-b border-border-neutral flex items-center justify-between gap-space-sm bg-surface-level-2">
          <div className="flex items-center gap-2 min-w-0">
            <Icon className="text-primary text-[20px]" name="play_circle" />
            <span className="font-title-card text-text-primary text-[0.9375rem] truncate">{title}</span>
          </div>
          <button
            aria-label="Close video"
            className="text-text-muted hover:text-text-primary p-1 rounded transition-colors"
            onClick={onClose}
            type="button"
          >
            <Icon className="text-[22px]" name="close" />
          </button>
        </div>
        <VideoPlayer autoPlay poster={poster} />
      </div>
    </div>
  );
}
