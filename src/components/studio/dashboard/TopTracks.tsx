import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { STUDIO_DASHBOARD } from "@/constants/mock/studioDashboard";
import { ROUTES } from "@/constants/routes";

export function TopTracks() {
  const { tracks } = STUDIO_DASHBOARD;

  return (
    <div className="lg:col-span-5 bg-surface-level-2 p-space-lg rounded-xl border border-gold-hairline flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-space-sm border-b border-border-neutral">
          <div>
            <h2 className="font-title-card text-title-card text-text-primary">Top Performing Tracks</h2>
            <p className="font-body-muted text-body-muted text-text-muted">Enrolled candidates &amp; syllabi retention</p>
          </div>
          <span className="bg-primary/10 text-primary text-xs font-label-code px-2 py-1 rounded">3 Active Modules</span>
        </div>
        {tracks.map((track, index) => (
          <div
            key={track.title}
            className={cn("py-space-md space-y-2", index < tracks.length - 1 && "border-b border-border-neutral/70")}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-label-interactive text-label-interactive text-text-primary leading-snug">{track.title}</div>
              <span className="text-primary font-label-code text-label-code whitespace-nowrap font-bold">{track.amount}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-label-code text-text-muted">
              <span>{track.enrolled}</span>
              <span className={cn("font-medium", track.warn ? "text-status-warning" : "text-status-success")}>
                {track.completion}% Completion
              </span>
            </div>
            <div className="w-full h-1.5 bg-surface-level-1 rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full", track.warn ? "bg-status-warning" : "bg-primary")}
                style={{ width: `${track.completion}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-surface-level-1 p-space-sm rounded-lg border border-border-neutral flex items-center justify-between mt-space-md">
        <div className="flex items-center gap-2">
          <Icon className="text-primary text-[18px]" name="verified" />
          <span className="font-label-caps text-label-caps text-text-secondary uppercase">Accredited Content Index</span>
        </div>
        <Link className="text-primary text-xs font-label-interactive hover:underline flex items-center" href={ROUTES.studio.courses}>
          Review Syllabi <Icon className="text-[14px]" name="chevron_right" />
        </Link>
      </div>
    </div>
  );
}
