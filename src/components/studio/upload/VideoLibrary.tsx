"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { UPLOAD_CLUSTERS, UPLOAD_FILTERS } from "@/constants/mock/upload";
import type { UploadFilter } from "@/types/upload";
import { VideoCard } from "./VideoCard";

const TOOL_BUTTON = "p-1.5 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors";

export function VideoLibrary() {
  const [filter, setFilter] = useState<UploadFilter>("all");

  const clusters = UPLOAD_CLUSTERS.map((cluster) => ({
    ...cluster,
    videos: cluster.videos.filter((video) => filter === "all" || video.status === filter),
  })).filter((cluster) => cluster.videos.length > 0);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm bg-surface-level-1 px-space-md py-space-sm rounded-xl">
        <div className="flex items-center gap-space-xs overflow-x-auto pb-1 sm:pb-0">
          {UPLOAD_FILTERS.map((item) => (
            <button
              key={item.id}
              aria-pressed={filter === item.id}
              className={cn(
                "px-space-sm py-1.5 rounded-lg font-label-interactive text-label-interactive whitespace-nowrap",
                filter === item.id
                  ? "bg-surface-elevated text-primary"
                  : "hover:bg-surface-level-2 text-text-secondary hover:text-text-primary transition-colors",
              )}
              onClick={() => setFilter(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-space-xs">
          <button aria-label="Sort by ingestion date" className={TOOL_BUTTON} title="Sort by Ingestion Date" type="button">
            <Icon className="text-[18px]" name="sort" />
          </button>
          <button aria-label="Refresh transcode queue" className={TOOL_BUTTON} title="Refresh Transcode Queue" type="button">
            <Icon className="text-[18px]" name="refresh" />
          </button>
        </div>
      </div>

      {clusters.length === 0 && (
        <p className="text-center text-text-muted font-body-muted text-body-muted py-space-xl">No topic videos match this filter.</p>
      )}

      {clusters.map((cluster, index) => (
        <div key={cluster.id} className={cn("flex flex-col gap-space-sm", index > 0 && "pt-space-sm")}>
          <div className="flex items-center justify-between px-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className={cn("w-2 h-2 rounded-full", cluster.dotClass)} />
              <span className="font-label-caps text-label-caps text-text-secondary tracking-widest uppercase font-bold">{cluster.title}</span>
            </div>
            <span className="font-label-code text-label-code text-text-muted">{cluster.track}</span>
          </div>
          {cluster.videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ))}
    </div>
  );
}
