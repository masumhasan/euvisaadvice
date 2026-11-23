"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { VIDEO_LESSON } from "@/constants/mock/videoLesson";
import { VideoNotesTab } from "./VideoNotesTab";
import { VideoOverviewTab } from "./VideoOverviewTab";
import { VideoResourcesTab } from "./VideoResourcesTab";

type Lesson = typeof VIDEO_LESSON;

const TABS = [
  { id: "overview", icon: "overview", label: () => "Overview" },
  { id: "resources", icon: "attachment", label: (l: Lesson) => `Resources (${l.resources.length})` },
  { id: "notes", icon: "edit_note", label: () => "Notes & Bookmarks" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function VideoTabs({ lesson }: { lesson: Lesson }) {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <div className="w-full bg-surface-level-1 rounded-xl p-space-lg shadow-xl mb-space-2xl">
      <div className="flex items-center gap-space-md overflow-x-auto pb-space-sm mb-space-lg" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            aria-selected={active === tab.id}
            className={cn(
              "px-space-md py-space-xs font-label-interactive text-label-interactive border-b-2 transition-all whitespace-nowrap flex items-center gap-2",
              active === tab.id
                ? "text-primary border-primary"
                : "text-text-secondary hover:text-text-primary border-transparent",
            )}
            onClick={() => setActive(tab.id)}
            role="tab"
            type="button"
          >
            <Icon className="text-[18px]" name={tab.icon} />
            <span>{tab.label(lesson)}</span>
          </button>
        ))}
      </div>
      {active === "overview" && <VideoOverviewTab lesson={lesson} />}
      {active === "resources" && <VideoResourcesTab resources={lesson.resources} />}
      {active === "notes" && <VideoNotesTab note={lesson.note} />}
    </div>
  );
}
