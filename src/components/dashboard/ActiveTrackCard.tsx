import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { DASHBOARD } from "@/constants/mock/dashboard";

export function ActiveTrackCard() {
  const track = DASHBOARD.activeTrack;

  return (
    <div className="w-full bg-surface-level-2 rounded-xl shadow-xl p-space-lg lg:p-space-xl mb-space-2xl relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold-subtle-fill blur-3xl pointer-events-none" />
      <div className="flex flex-col lg:flex-row items-stretch gap-space-xl relative z-10">
        <Link
          className="w-full lg:w-5/12 rounded-lg overflow-hidden bg-surface-level-1 relative group flex-shrink-0 min-h-[220px]"
          href={track.resumeHref}
        >
          <Image
            alt="Course video preview showing consular services portal curriculum interface"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            src={track.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/40 to-transparent" />
          <div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between">
            <div className="flex items-center gap-space-xs bg-surface-level-1/90 backdrop-blur-md px-2.5 py-1 rounded text-primary font-label-code text-[0.75rem]">
              <Icon className="text-[16px]" name="play_circle" />
              <span>{track.badge}</span>
            </div>
            <span className="bg-surface-base/80 px-2 py-0.5 rounded font-label-code text-[0.75rem] text-text-secondary">
              {track.quality}
            </span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Icon className="text-[28px]" filled name="play_arrow" />
            </div>
          </div>
        </Link>
        <div className="w-full lg:w-7/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-space-xs flex-wrap mb-space-xs">
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-label-caps uppercase text-primary font-semibold tracking-wider">
                  Active Curriculum Track
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-label-code text-label-code text-text-muted">{track.lastActive}</span>
              </div>
              <span className="font-label-code text-label-code text-status-warning bg-status-warning-bg px-2 py-0.5 rounded">
                {track.status}
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight mb-space-2xs">
              {track.title}
            </h2>
            <p className="font-title-card text-title-card text-on-surface-variant font-medium mb-space-sm">
              {track.module}
            </p>
            <div className="bg-surface-level-1 p-space-md rounded-lg mb-space-md">
              <div className="flex items-start gap-space-sm">
                <Icon className="text-primary text-[20px] mt-0.5" name="bookmark_added" />
                <div className="min-w-0">
                  <div className="font-body-default text-body-default text-text-primary font-semibold">
                    {track.lessonTitle}
                  </div>
                  <p className="font-body-muted text-body-muted text-text-secondary">{track.lessonDescription}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-space-2xs font-label-code text-[0.8125rem]">
              <span className="text-text-secondary">{track.progressLabel}</span>
              <span className="text-primary font-semibold">{track.percent}%</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2 mb-space-lg overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-700"
                style={{ width: `${track.percent}%` }}
              />
            </div>
            <div className="flex items-center gap-space-md flex-wrap">
              <Link
                className="bg-primary hover:bg-gold-hover text-on-primary font-label-interactive text-label-interactive px-space-lg py-3 rounded-lg shadow-md transition-all flex items-center gap-space-xs"
                href={track.resumeHref}
              >
                <span>Resume Lesson</span>
                <Icon className="text-[18px]" name="play_arrow" />
              </Link>
              <Link
                className="bg-surface-level-1 hover:bg-surface-elevated text-text-primary font-label-interactive text-label-interactive px-space-md py-3 rounded-lg shadow-sm transition-all flex items-center gap-space-xs"
                href={track.syllabusHref}
              >
                <Icon className="text-[18px] text-text-secondary" name="menu_book" />
                <span>View Course Syllabus</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
