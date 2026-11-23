import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { UploadVideo } from "@/types/upload";

const FRAME = "relative w-full md:w-56 h-32 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0";

export function VideoThumbnail({ video, onPlay }: { video: UploadVideo; onPlay: () => void }) {
  if (video.status === "transcoding") {
    return (
      <div className={FRAME}>
        <Image alt="" className="object-cover brightness-75" fill sizes="224px" src={video.image} />
        <div className="absolute inset-0 bg-surface-base/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-2 text-center">
          <Icon className="text-primary text-[28px] animate-spin" name="sync" />
          <span className="font-label-code text-label-code text-text-primary mt-1 font-semibold">Processing {video.progress}%</span>
          <span className="font-label-caps text-label-caps text-gold-highlight tracking-tight uppercase">{video.stageLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(FRAME, "group cursor-pointer")}>
      <Image alt="" className="object-cover group-hover:scale-105 transition-transform" fill sizes="224px" src={video.image} />
      <button
        aria-label={`Play ${video.title}`}
        className="absolute inset-0 bg-surface-base/30 flex items-center justify-center"
        onClick={onPlay}
        type="button"
      >
        <span className="w-10 h-10 rounded-full bg-surface-base/80 backdrop-blur-md flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Icon className="text-[22px]" name="play_arrow" />
        </span>
      </button>
      <span className="absolute bottom-1.5 right-1.5 font-label-code text-label-code bg-surface-base/90 text-text-primary px-1.5 py-0.5 rounded">
        {video.duration}
      </span>
      <span
        className={cn(
          "absolute top-1.5 left-1.5 font-label-caps text-label-caps px-1.5 py-0.5 rounded",
          video.status === "ready" ? "bg-primary-container text-on-primary-container" : "bg-tertiary-container text-on-tertiary-container",
        )}
      >
        {video.badge}
      </span>
    </div>
  );
}
