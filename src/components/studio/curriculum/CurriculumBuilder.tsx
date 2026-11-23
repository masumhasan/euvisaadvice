"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BUILDER_MODULES, type BuilderLesson, type BuilderModule } from "@/constants/mock/curriculumBuilder";
import { getInitialCommentary } from "@/lib/commentary";
import { LessonEditor } from "./LessonEditor";
import { ModuleCard } from "./ModuleCard";

function findLesson(modules: BuilderModule[], lessonId: string): BuilderLesson | undefined {
  return modules.flatMap((module) => module.lessons).find((lesson) => lesson.id === lessonId);
}

export function CurriculumBuilder({ courseId }: { courseId: string }) {
  const [modules, setModules] = useState<BuilderModule[]>(BUILDER_MODULES);
  const [expanded, setExpanded] = useState<string[]>(["m0"]);
  const [activeId, setActiveId] = useState("0.1");
  const [draftTitle, setDraftTitle] = useState(() => findLesson(BUILDER_MODULES, "0.1")?.title ?? "");
  const [revision, setRevision] = useState(4);
  const nextLessonSeq = useRef(0);
  /** Saved syllabus HTML per lesson; lessons not listed fall back to the default content. */
  const [savedCommentary, setSavedCommentary] = useState<Record<string, string>>({});
  /** Unsaved syllabus edits for the active lesson (null = untouched). */
  const [commentaryDraft, setCommentaryDraft] = useState<string | null>(null);
  const [editorVersion, setEditorVersion] = useState(0);

  const activeLesson = findLesson(modules, activeId) ?? modules.flatMap((module) => module.lessons)[0];

  function selectLesson(lessonId: string) {
    setActiveId(lessonId);
    setDraftTitle(findLesson(modules, lessonId)?.title ?? "");
    setCommentaryDraft(null);
  }

  function toggle(moduleId: string) {
    setExpanded((current) =>
      current.includes(moduleId) ? current.filter((id) => id !== moduleId) : [...current, moduleId],
    );
  }

  function saveLesson() {
    if (commentaryDraft !== null) {
      setSavedCommentary((current) => ({ ...current, [activeId]: commentaryDraft }));
      setCommentaryDraft(null);
    }
    setModules((current) =>
      current.map((module) => ({
        ...module,
        lessons: module.lessons.map((lesson) => (lesson.id === activeId ? { ...lesson, title: draftTitle } : lesson)),
      })),
    );
    setRevision((value) => value + 1);
  }

  function deleteLesson(lessonId: string) {
    setModules((current) =>
      current.map((module) => ({ ...module, lessons: module.lessons.filter((lesson) => lesson.id !== lessonId) })),
    );
  }

  function addLesson(moduleId: string) {
    const index = modules.findIndex((module) => module.id === moduleId);
    const target = modules[index];
    const lesson: BuilderLesson = {
      id: `new-${nextLessonSeq.current++}`,
      number: `${index}.${target.lessons.length + 1}`,
      title: "Untitled Lesson",
      kind: "video",
      kindLabel: "Video Masterclass",
      detail: "00:00",
    };
    setModules((current) =>
      current.map((module) => (module.id === moduleId ? { ...module, lessons: [...module.lessons, lesson] } : module)),
    );
    setActiveId(lesson.id);
    setDraftTitle(lesson.title);
    setCommentaryDraft(null);
  }

  function addModule() {
    const id = `m${modules.length}`;
    const label = `Module ${String(modules.length).padStart(2, "0")}`;
    setModules((current) => [...current, { id, label, title: "Untitled Module", summary: "0 Lessons • 0 min", lessons: [] }]);
    setExpanded((current) => [...current, id]);
  }

  return (
    <div className="px-4 sm:px-space-lg py-4 sm:py-space-lg grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
      <div className="xl:col-span-4 flex flex-col gap-space-md w-full">
        <div className="bg-surface-level-1 rounded-xl p-space-md flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-space-xs">
            <Icon className="text-primary text-[20px]" name="sort" />
            <span className="font-title-card text-title-card text-text-primary">Curriculum Modules</span>
            <span className="font-label-code text-label-code text-text-muted bg-surface-container-low px-2 py-0.5 rounded">
              {modules.length + 3} TOTAL
            </span>
          </div>
          <button
            className="px-3 py-1.5 rounded-lg bg-surface-level-2 hover:bg-surface-elevated text-primary font-label-interactive text-label-interactive transition-colors flex items-center gap-1 shadow-sm"
            onClick={addModule}
            type="button"
          >
            <Icon className="text-[16px]" name="add" />
            <span>New Module</span>
          </button>
        </div>
        <div className="flex flex-col gap-space-sm">
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              activeLessonId={activeId}
              expanded={expanded.includes(module.id)}
              module={module}
              onAddLesson={() => addLesson(module.id)}
              onDeleteLesson={deleteLesson}
              onSelectLesson={selectLesson}
              onToggle={() => toggle(module.id)}
            />
          ))}
        </div>
        <div className="bg-surface-level-2 rounded-xl p-space-md shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <Icon className="text-primary text-[24px]" name="balance" />
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-text-secondary uppercase">BAMF Compliance Engine</span>
              <span className="font-label-code text-label-code text-on-surface">Curriculum conforms to § 18b &amp; § 81a AufenthG</span>
            </div>
          </div>
          <Icon className="text-tertiary text-[20px]" filled name="check_circle" />
        </div>
      </div>
      <div className="xl:col-span-8 flex flex-col gap-space-md w-full">
        {activeLesson && (
          <LessonEditor
            courseId={courseId}
            lesson={activeLesson}
            commentaryHtml={getInitialCommentary(activeLesson.id, savedCommentary)}
            commentaryKey={`${activeLesson.id}-${editorVersion}`}
            onCommentaryChange={setCommentaryDraft}
            onDiscard={() => {
              setDraftTitle(activeLesson.title);
              setCommentaryDraft(null);
              setEditorVersion((value) => value + 1);
            }}
            onSave={saveLesson}
            onTitleChange={setDraftTitle}
            revision={revision}
            title={draftTitle}
          />
        )}
      </div>
    </div>
  );
}
