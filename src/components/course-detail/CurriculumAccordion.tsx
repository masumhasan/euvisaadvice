"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";
import type { CourseDetail, CurriculumLesson, CurriculumModule, LessonKind } from "@/types/courseDetail";

const LESSON_ICONS: Record<LessonKind, string> = {
  video: "play_circle",
  article: "article",
  quiz: "quiz",
  assignment: "assignment",
};

function LessonRow({ courseSlug, lesson }: { courseSlug: string; lesson: CurriculumLesson }) {
  const preview = lesson.freePreview;
  return (
    <div
      className={cn(
        "flex items-center justify-between p-space-sm rounded-md",
        preview ? "bg-gold-subtle-fill border-l-2 border-primary" : "hover:bg-surface-level-2 transition-colors",
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={cn("text-[18px]", preview ? "text-primary" : "text-text-secondary")}
          name={LESSON_ICONS[lesson.kind]}
        />
        <div>
          <span
            className={cn(
              "font-body-default text-[0.875rem]",
              preview ? "text-text-primary font-medium" : "text-on-surface",
            )}
          >
            {lesson.title}
          </span>
          {lesson.format && (
            <div className="flex items-center gap-2 text-text-muted text-[11px] font-label-code">
              <span>{lesson.format}</span>
              <span>•</span>
              <span>{lesson.duration}</span>
            </div>
          )}
        </div>
      </div>
      {preview ? (
        <Link
          className="px-2.5 py-1 rounded bg-primary text-on-primary font-label-interactive text-[11px] hover:bg-gold-hover transition-colors"
          href={ROUTES.lesson(courseSlug, lesson.id)}
        >
          Watch Free
        </Link>
      ) : (
        <Icon className="text-text-muted text-[16px]" name="lock" />
      )}
    </div>
  );
}

interface ModuleProps {
  courseSlug: string;
  module: CurriculumModule;
  expanded: boolean;
  onToggle: () => void;
}

function ModuleItem({ courseSlug, module, expanded, onToggle }: ModuleProps) {
  return (
    <div
      className={cn(
        "rounded-lg border overflow-hidden bg-surface-level-1",
        module.freePreview ? "border-gold-hairline" : "border-border-neutral",
      )}
    >
      <button
        aria-expanded={expanded}
        className="w-full flex items-center justify-between p-space-md bg-surface-level-2 text-left transition-colors hover:bg-surface-elevated"
        onClick={onToggle}
        type="button"
      >
        <div className="flex items-center gap-space-sm">
          <Icon
            className={cn("text-[20px] transition-transform duration-200", expanded ? "text-primary" : "text-text-secondary")}
            name={expanded ? "expand_circle_down" : "chevron_right"}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-title-card text-[0.9375rem] text-text-primary">{module.title}</span>
              {module.freePreview && (
                <span className="px-2 py-0.5 rounded text-[10px] font-label-code uppercase tracking-wider bg-gold-subtle-fill text-primary border border-gold-hairline">
                  Free Preview
                </span>
              )}
            </div>
            <p className="font-body-muted text-body-muted text-text-muted text-[0.8125rem]">
              {module.lessonCount} lessons • {module.minutes}m total duration
            </p>
          </div>
        </div>
        <span className="font-label-code text-label-code text-text-secondary hidden sm:inline-block">
          {module.minutes} min
        </span>
      </button>
      {expanded && (
        <div className="p-space-xs space-y-1 bg-surface-base/60">
          {module.lessons ? (
            module.lessons.map((lesson) => <LessonRow key={lesson.id} courseSlug={courseSlug} lesson={lesson} />)
          ) : (
            <div className="p-space-sm text-text-muted font-label-code text-[11px]">{module.lockedNote}</div>
          )}
        </div>
      )}
    </div>
  );
}

export function CurriculumAccordion({ course }: { course: CourseDetail }) {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(course.modules.filter((m) => m.freePreview).map((m) => m.id)),
  );
  const allExpanded = expanded.size === course.modules.length;

  const toggle = (id: string) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <section className="space-y-space-md scroll-mt-28" id="curriculum">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs border-b border-border-neutral pb-space-sm">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-text-primary">Masterclass Curriculum</h2>
          <p className="font-body-muted text-body-muted text-text-secondary">
            {course.moduleCount} modules • {course.lessonCount} comprehensive lessons • {course.totalDuration} total
            instructional length
          </p>
        </div>
        <button
          className="self-start sm:self-auto font-label-interactive text-label-interactive text-primary hover:text-gold-hover flex items-center gap-1 transition-colors"
          onClick={() => setExpanded(allExpanded ? new Set() : new Set(course.modules.map((m) => m.id)))}
          type="button"
        >
          <Icon className="text-[16px]" name="unfold_more" />
          <span>{allExpanded ? "Collapse All Modules" : "Expand All Modules"}</span>
        </button>
      </div>
      <div className="space-y-space-xs">
        {course.modules.map((module) => (
          <ModuleItem
            key={module.id}
            courseSlug={course.slug}
            expanded={expanded.has(module.id)}
            module={module}
            onToggle={() => toggle(module.id)}
          />
        ))}
      </div>
    </section>
  );
}
