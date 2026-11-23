"use client";

import { useState } from "react";
import type { StudentCaseNote } from "@/types/students";

const AUTHOR = { name: "EUVisaAdvice Team", initials: "EU" };

/** Case notes for one dossier. Remount with `key` when the selected student changes. */
export function CaseNotePanel({ initialNote }: { initialNote?: StudentCaseNote }) {
  const [notes, setNotes] = useState<StudentCaseNote[]>(initialNote ? [initialNote] : []);
  const [draft, setDraft] = useState("");

  function post() {
    const body = draft.trim();
    if (!body) return;
    setNotes((current) => [{ author: AUTHOR.name, initials: AUTHOR.initials, when: "Just now", body }, ...current]);
    setDraft("");
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="font-label-caps text-label-caps text-text-muted uppercase tracking-wider">Lead Advisor Case Note</span>
      <div className="bg-surface-level-2/60 rounded-lg p-space-sm flex flex-col gap-2">
        {notes.length === 0 && <p className="font-body-muted text-body-muted text-text-muted text-xs">No case notes recorded for this dossier.</p>}
        {notes.map((note, index) => (
          <div key={`${note.when}-${index}`} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[11px] font-bold text-on-primary">{note.initials}</span>
              <span className="font-label-interactive text-label-interactive text-text-primary text-xs">{note.author}</span>
              <span className="font-label-code text-label-code text-text-muted text-xs ml-auto">{note.when}</span>
            </div>
            <p className="font-body-default text-body-default text-text-secondary text-xs italic bg-surface-level-1 p-2 rounded">“{note.body}”</p>
          </div>
        ))}
        <form
          className="flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            post();
          }}
        >
          <input
            aria-label="Add confidential case note"
            className="flex-1 bg-surface-level-1 text-text-primary placeholder-text-muted px-2.5 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add confidential case note..."
            type="text"
            value={draft}
          />
          <button className="px-2.5 py-1.5 rounded bg-primary-container hover:bg-gold-hover text-on-primary-container text-xs font-semibold" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
