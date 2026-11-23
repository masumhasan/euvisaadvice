"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { VideoModal } from "@/components/video/VideoModal";
import { LESSON_VIDEO } from "@/constants/mock/curriculumBuilder";
import { ROUTES } from "@/constants/routes";

const ACTION_CLASS =
  "px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-text-primary font-label-interactive text-label-interactive transition-colors flex items-center gap-1.5 text-[13px]";

export function LessonVideoAsset({ courseId }: { courseId: string }) {
  const [playerOpen, setPlayerOpen] = useState(false);

  return (
    <div className="bg-surface-level-2 rounded-xl p-space-md shadow-sm space-y-space-sm">
      <div className="flex items-center justify-between flex-wrap gap-space-xs">
        <div className="flex items-center gap-space-xs">
          <Icon className="text-primary text-[20px]" name="smart_display" />
          <span className="font-title-card text-title-card text-text-primary font-semibold">Video Master Asset (HLS Stream)</span>
        </div>
        <span className="bg-status-success-bg text-status-success font-label-code text-label-code px-2 py-0.5 rounded flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-status-success" /> Transcoded AWS Frankfurt (eu-central-1)
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-center">
        <div className="md:col-span-5 relative rounded-lg overflow-hidden group shadow-md aspect-video bg-surface-container-lowest">
          <Image alt="Video poster" className="object-cover" fill sizes="400px" src={LESSON_VIDEO.poster} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-surface-base/20 to-transparent flex flex-col justify-between p-space-sm pointer-events-none">
            <div className="flex justify-end">
              <span className="bg-surface-base/80 backdrop-blur-md text-text-primary px-1.5 py-0.5 rounded font-label-code text-label-code text-[11px]">
                1080p 60fps
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="font-label-code text-label-code text-text-primary bg-surface-base/70 px-1.5 py-0.5 rounded">
                {LESSON_VIDEO.duration}
              </span>
            </div>
          </div>
          <button
            aria-label="Play master video"
            className="absolute bottom-space-sm left-space-sm w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center text-surface-base shadow-lg hover:scale-110 transition-transform"
            onClick={() => setPlayerOpen(true)}
            type="button"
          >
            <Icon className="text-[20px]" filled name="play_arrow" />
          </button>
        </div>
        <div className="md:col-span-7 flex flex-col justify-between gap-space-sm">
          <div className="space-y-1">
            <div className="font-label-code text-label-code text-primary font-semibold truncate">{LESSON_VIDEO.file}</div>
            <div className="font-label-code text-label-code text-text-muted text-[12px]">{LESSON_VIDEO.meta}</div>
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {LESSON_VIDEO.tags.map((tag) => (
                <span key={tag} className="bg-surface-container-high text-on-surface px-2 py-0.5 rounded font-label-code text-label-code text-[11px]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-space-xs flex-wrap pt-2">
            {LESSON_VIDEO.actions.map((action, index) => {
              const content = (
                <>
                  <Icon className="text-[16px]" name={action.icon} />
                  <span>{action.label}</span>
                </>
              );
              return index === 0 ? (
                <Link key={action.label} className={ACTION_CLASS} href={ROUTES.studio.upload(courseId)}>
                  {content}
                </Link>
              ) : (
                <button key={action.label} className={ACTION_CLASS} type="button">
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {playerOpen && <VideoModal onClose={() => setPlayerOpen(false)} poster={LESSON_VIDEO.poster} title={LESSON_VIDEO.file} />}
    </div>
  );
}
