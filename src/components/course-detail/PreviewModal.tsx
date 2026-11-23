"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { VideoPlayer } from "@/components/video/VideoPlayer";

interface PreviewModalProps {
  title: string;
  image: string;
  lessonHref: string;
  onClose: () => void;
}

export function PreviewModal({ title, image, lessonHref, onClose }: PreviewModalProps) {
  useEffect(() => {
    // Escape also exits browser fullscreen, so only close the dialog when not fullscreen.
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && !document.fullscreenElement && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[60] bg-surface-base/90 backdrop-blur-md flex items-center justify-center p-gutter"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="relative w-full max-w-4xl bg-surface-level-1 border border-gold-hairline rounded-xl overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="p-space-md border-b border-border-neutral flex items-center justify-between bg-surface-level-2">
          <div className="flex items-center gap-2 min-w-0">
            <Icon className="text-primary text-[20px]" name="play_circle" />
            <span className="font-title-card text-text-primary text-[0.9375rem] truncate">Preview: {title}</span>
          </div>
          <button
            aria-label="Close preview"
            className="text-text-muted hover:text-text-primary p-1 rounded transition-colors"
            onClick={onClose}
            type="button"
          >
            <Icon className="text-[22px]" name="close" />
          </button>
        </div>
        <VideoPlayer autoPlay poster={image} />
        <div className="px-space-md py-space-sm bg-surface-level-2 flex items-center justify-between gap-space-sm flex-wrap">
          <p className="font-body-muted text-text-secondary text-[0.8125rem]">
            You are streaming the introductory lesson preview on consular jurisdiction mapping.
          </p>
          <Link
            className="inline-block px-4 py-2 rounded bg-primary text-on-primary font-label-interactive text-label-interactive hover:bg-gold-hover transition-colors"
            href={lessonHref}
          >
            Open Preview Lesson
          </Link>
        </div>
      </div>
    </div>
  );
}
