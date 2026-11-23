import { Icon } from "@/components/ui/Icon";
import { Toggle } from "@/components/studio/forms/Field";
import { INSPECTOR } from "@/constants/mock/upload";
import { ChapterList } from "./ChapterList";
import { InspectorPlayer } from "./InspectorPlayer";

const LABEL = "font-label-caps text-label-caps text-text-secondary uppercase";
const FIELD =
  "w-full bg-surface-level-2 text-text-primary px-space-sm py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary shadow-inner";

export function TopicInspector() {
  return (
    <aside className="w-full xl:w-[32%] flex flex-col gap-space-md xl:sticky xl:top-20">
      <div className="bg-surface-level-1 rounded-xl p-space-md shadow-md space-y-space-md">
        <div className="flex items-center justify-between pb-space-xs">
          <div className="flex items-center gap-space-xs">
            <Icon className="text-primary text-[20px]" name="manage_search" />
            <span className="font-title-card text-title-card text-text-primary">Topic Inspector &amp; Engine</span>
          </div>
          <span className="font-label-caps text-label-caps text-primary bg-primary-container/20 px-2 py-0.5 rounded font-semibold">Active Focus</span>
        </div>

        <div className="bg-surface-level-2 px-space-sm py-2 rounded-lg flex items-center justify-between">
          <span className="font-label-interactive text-label-interactive text-text-primary truncate">{INSPECTOR.focusTitle}</span>
          <span className="font-label-code text-label-code text-text-muted ml-2 whitespace-nowrap">{INSPECTOR.focusId}</span>
        </div>

        <InspectorPlayer />

        <div className="space-y-space-sm pt-space-xs">
          <div className="flex flex-col gap-1">
            <label className={LABEL} htmlFor="topic-title">
              Display Topic Title
            </label>
            <input className={`${FIELD} font-body-default text-body-default`} defaultValue={INSPECTOR.displayTitle} id="topic-title" type="text" />
          </div>
          <div className="grid grid-cols-2 gap-space-sm">
            <div className="flex flex-col gap-1">
              <label className={LABEL} htmlFor="topic-statute">
                Primary Statute
              </label>
              <input className={`${FIELD} font-label-code text-label-code`} defaultValue={INSPECTOR.primaryStatute} id="topic-statute" type="text" />
            </div>
            <div className="flex flex-col gap-1">
              <label className={LABEL} htmlFor="topic-tier">
                Access Tier
              </label>
              <select className={`${FIELD} font-body-default text-body-default`} id="topic-tier">
                {INSPECTOR.accessTiers.map((tier) => (
                  <option key={tier}>{tier}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-surface-level-2 px-space-sm py-2.5 rounded-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-interactive text-label-interactive text-text-primary">Free Preview Teaser</span>
              <span className="font-label-code text-label-code text-text-muted">Unauthenticated visitors can stream</span>
            </div>
            <Toggle defaultChecked label="Free preview teaser" size="sm" />
          </div>
        </div>

        <ChapterList />

        <div className="pt-space-sm flex flex-col gap-2">
          <button
            className="w-full py-3 px-space-md rounded-lg bg-primary-container hover:bg-gold-hover text-on-primary-container font-label-interactive text-label-interactive font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            type="button"
          >
            <Icon className="text-[18px]" name="publish" />
            <span>Commit &amp; Publish to Curriculum</span>
          </button>
          <button
            className="w-full py-2 px-space-md rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-label-interactive text-label-interactive transition-colors"
            type="button"
          >
            Save as Draft Master
          </button>
        </div>
      </div>

      <div className="bg-surface-level-1/50 rounded-xl p-space-md space-y-2">
        <div className="flex items-center gap-space-xs text-primary">
          <Icon className="text-[18px]" name="verified" />
          <span className="font-label-caps text-label-caps uppercase tracking-wider font-semibold">Consular Video Standard 2026</span>
        </div>
        <p className="font-body-muted text-body-muted text-text-secondary">
          Ensure all official regulatory citations are overlaid in chapter markers. Video content referencing BAMF and Auswärtiges Amt procedural guidelines must be marked for re-validation
          every 90 days.
        </p>
      </div>
    </aside>
  );
}
