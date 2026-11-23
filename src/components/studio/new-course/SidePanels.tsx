import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { IMAGES } from "@/constants/images";
import { Field, SelectField, Toggle } from "../forms/Field";

const CARD = "bg-surface-level-2 rounded-xl p-space-md sm:p-space-lg shadow-md space-y-space-md";
const CHOICE = "flex items-start gap-3 p-2.5 rounded-lg bg-surface-level-1 hover:bg-surface-elevated cursor-pointer transition-colors";

const BADGES = [
  { title: "Statutory Dossier Audit", text: "Structured case compliance with procedural checklist" },
  { title: "14 Downloadable Dossier Templates", text: "DIN 5008 cover letters, Sperrkonto forms, CVs" },
  { title: "Statutory Filing Blueprints", text: "DIN 5008 verified cover letters & declarations" },
  { title: "Consular Checklist Vetted", text: "Audited against 2026 Auslandsportal APIs" },
];
const STATUSES = [
  { label: "Draft (Internal Quality Review)", dot: "bg-status-warning", checked: true },
  { label: "Published (Live in Catalog)", dot: "bg-status-success", checked: false },
  { label: "Scheduled Launch", dot: "bg-secondary", checked: false },
];
const ACCESS = [
  "Public in Marketplace (Self-Enrollment)",
  "Invite Only / Private Enterprise Cohort",
  "Restricted to Premium Enrolled Clients",
];

export function VisualAssetCard() {
  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="text-primary text-[20px]" name="photo_camera_front" />
          <h3 className="font-title-card text-title-card text-text-primary">Visual Asset &amp; Teaser</h3>
        </div>
        <span className="font-label-caps text-label-caps text-text-muted uppercase">16:9 Format</span>
      </div>
      <div className="relative rounded-lg overflow-hidden group shadow-inner bg-surface-base h-44">
        <Image
          alt="Course cover preview"
          className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
          fill
          sizes="400px"
          src={IMAGES.studioNewCourse}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-base via-surface-base/40 to-transparent flex flex-col justify-end p-3">
          <div className="flex items-center justify-between">
            <span className="font-label-code text-label-code text-primary bg-surface-base/80 px-2 py-0.5 rounded backdrop-blur">
              1280 x 720 px (Master)
            </span>
            <button
              aria-label="Replace cover image"
              className="p-1.5 rounded-md bg-surface-level-2/90 hover:bg-primary hover:text-on-primary text-text-primary backdrop-blur transition-all"
              type="button"
            >
              <Icon className="text-[16px]" name="edit" />
            </button>
          </div>
        </div>
      </div>
      <Field label="Introductory Free Preview Lesson">
        <div className="p-2.5 rounded-lg bg-surface-level-1 flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <Icon className="text-primary text-[20px]" name="play_circle" />
            <div className="flex flex-col truncate">
              <span className="font-label-interactive text-label-interactive text-text-primary truncate">Module-01-Teaser-HLS.mp4</span>
              <span className="font-label-code text-label-code text-text-muted">4m 12s • 1080p Encoded</span>
            </div>
          </div>
          <button aria-label="Replace preview lesson" className="text-text-muted hover:text-primary transition-colors shrink-0" type="button">
            <Icon className="text-[18px]" name="cached" />
          </button>
        </div>
      </Field>
    </div>
  );
}

export function BadgesCard() {
  return (
    <div className={CARD}>
      <div className="flex items-center gap-2">
        <Icon className="text-primary text-[20px]" name="verified_user" />
        <h3 className="font-title-card text-title-card text-text-primary">What&apos;s Included Badges</h3>
      </div>
      <p className="font-body-muted text-body-muted text-text-secondary text-xs">
        Select feature badges presented on the public storefront purchase card.
      </p>
      <div className="space-y-2.5">
        {BADGES.map((badge) => (
          <label key={badge.title} className={CHOICE}>
            <input className="mt-1 accent-primary w-4 h-4 rounded" defaultChecked type="checkbox" />
            <div className="flex flex-col">
              <span className="font-label-interactive text-label-interactive text-text-primary">{badge.title}</span>
              <span className="font-body-muted text-body-muted text-text-secondary text-xs">{badge.text}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export function StatusCard() {
  return (
    <div className={CARD}>
      <div className="flex items-center gap-2">
        <Icon className="text-primary text-[20px]" name="tune" />
        <h3 className="font-title-card text-title-card text-text-primary">Status &amp; Visibility</h3>
      </div>
      <div className="space-y-2">
        <span className="font-label-caps text-label-caps text-text-muted uppercase">Lifecycle Status</span>
        <div className="space-y-1.5">
          {STATUSES.map((status) => (
            <label
              key={status.label}
              className="flex items-center justify-between p-2.5 rounded-lg bg-surface-level-1 hover:bg-surface-elevated cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                <span className="font-label-interactive text-label-interactive text-text-primary">{status.label}</span>
              </div>
              <input className="accent-primary" defaultChecked={status.checked} name="publish-status" type="radio" />
            </label>
          ))}
        </div>
      </div>
      <Field htmlFor="access-level" label="Enrollment Access">
        <SelectField className="py-2 text-sm" icon="expand_more" id="access-level" options={ACCESS} />
      </Field>
      <div className="pt-2 border-t border-surface-container-high/60 flex items-center justify-between">
        <div className="flex flex-col pr-2">
          <span className="font-label-interactive text-label-interactive text-text-primary text-sm">Educational Platform Notice</span>
          <span className="font-body-muted text-body-muted text-text-secondary text-xs">
            Append non-law firm educational &amp; advisory disclaimer automatically
          </span>
        </div>
        <Toggle defaultChecked label="Append non-law firm educational notice" size="sm" />
      </div>
    </div>
  );
}
