import { LESSON_COMMENTARY as C } from "@/constants/mock/curriculumBuilder";

/** Class names are written out in full so Tailwind can detect them. */
const CARD = "bg-surface-level-2 p-space-sm rounded-lg shadow-inner";

function organCard(title: string, text: string): string {
  return `<div class="${CARD}"><div class="font-label-caps text-label-caps text-primary uppercase font-bold">${title}</div><div class="font-body-muted text-body-muted text-text-secondary text-[13px] pt-1">${text}</div></div>`;
}

/** Statutory advisory callout; also inserted by the toolbar's warning button. */
export function advisoryNoteHtml(title: string, body: string): string {
  return `<div class="bg-surface-level-2 rounded-xl p-space-md flex gap-space-sm items-start shadow-md my-space-sm"><span contenteditable="false" class="material-symbols-outlined text-primary text-[22px] flex-shrink-0 mt-0.5 select-none" style="font-variation-settings:'FILL' 1">policy</span><div class="space-y-1"><div class="font-title-card text-title-card text-primary font-semibold">${title}</div><p class="font-body-default text-body-default text-text-primary text-[14px] leading-relaxed">${body}</p></div></div>`;
}

/** Default syllabus content for a lesson (mock content from the design). */
export const DEFAULT_COMMENTARY_HTML = [
  `<h3 class="font-headline-sm text-headline-sm text-text-primary font-bold">${C.heading}</h3>`,
  `<p class="leading-relaxed">${C.intro}<span class="text-primary font-label-code text-label-code font-medium">${C.statute}</span>${C.introEnd}</p>`,
  `<div class="grid grid-cols-1 md:grid-cols-3 gap-space-sm my-space-sm">${C.organs.map((organ) => organCard(organ.title, organ.text)).join("")}</div>`,
  advisoryNoteHtml(C.noteTitle, `${C.noteBefore}<strong class="text-primary">${C.noteStrong}</strong>${C.noteAfter}`),
].join("");

/** Blank document for lessons added in the builder. */
export const EMPTY_COMMENTARY_HTML = `<h3 class="font-headline-sm text-headline-sm text-text-primary font-bold">Untitled Syllabus</h3><p class="leading-relaxed">Start writing the syllabus guidance and procedural notes for this lesson…</p>`;

export function getInitialCommentary(lessonId: string, saved: Record<string, string>): string {
  return saved[lessonId] ?? (lessonId.startsWith("new-") ? EMPTY_COMMENTARY_HTML : DEFAULT_COMMENTARY_HTML);
}
