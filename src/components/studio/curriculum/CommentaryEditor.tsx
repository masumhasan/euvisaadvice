"use client";

import { useRef, useState, type ClipboardEvent } from "react";
import { advisoryNoteHtml } from "@/lib/commentary";
import { CommentaryToolbar, type EditorCommand } from "./CommentaryToolbar";

interface CommentaryEditorProps {
  /** Content the editor mounts with. Remount (change `key`) to load different content. */
  initialHtml: string;
  onChange: (html: string) => void;
}

/** Styles for elements the author can create with the toolbar. */
const CONTENT_STYLES = [
  "[&_h2]:font-headline-md [&_h2]:text-headline-md [&_h2]:text-text-primary [&_h2]:font-bold",
  "[&_h3]:font-headline-sm [&_h3]:text-headline-sm [&_h3]:text-text-primary [&_h3]:font-bold",
  "[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6",
  "[&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-secondary",
  "[&_a]:text-primary [&_a]:underline",
  "[&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border-neutral [&_td]:p-2 [&_th]:border [&_th]:border-border-neutral [&_th]:p-2 [&_th]:text-left",
].join(" ");

const TABLE_HTML =
  "<table><thead><tr><th>Statutory Requirement</th><th>Reference</th></tr></thead><tbody><tr><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table><p><br></p>";

export function CommentaryEditor({ initialHtml, onChange }: CommentaryEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Uncontrolled on purpose: re-applying innerHTML while typing would reset the caret.
  const [initial] = useState(initialHtml);

  function emit() {
    if (ref.current) onChange(ref.current.innerHTML);
  }

  function run(command: EditorCommand) {
    const editor = ref.current;
    if (!editor) return;
    editor.focus();

    if (command.kind === "exec") {
      document.execCommand(command.command, false, command.value);
    } else if (command.kind === "table") {
      document.execCommand("insertHTML", false, TABLE_HTML);
    } else if (command.kind === "advisory") {
      document.execCommand(
        "insertHTML",
        false,
        advisoryNoteHtml("Statutory Advisory Note (§ …)", "Describe the statutory caveat students must observe.") + "<p><br></p>",
      );
    } else {
      const url = window.prompt("Link URL (https://…)");
      if (url) document.execCommand("createLink", false, url);
    }
    emit();
  }

  // Paste as plain text so foreign styles never leak into the syllabus.
  function onPaste(event: ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    document.execCommand("insertText", false, event.clipboardData.getData("text/plain"));
  }

  return (
    <div className="rounded-xl overflow-hidden shadow-sm">
      <CommentaryToolbar onCommand={run} />
      <div
        ref={ref}
        aria-label="Statutory syllabus and juridical commentary"
        aria-multiline="true"
        className={`bg-surface-container-low p-space-lg font-body-legal text-body-legal text-on-surface space-y-space-md min-h-[220px] focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary ${CONTENT_STYLES}`}
        contentEditable
        dangerouslySetInnerHTML={{ __html: initial }}
        onInput={emit}
        onPaste={onPaste}
        role="textbox"
        suppressContentEditableWarning
      />
    </div>
  );
}
