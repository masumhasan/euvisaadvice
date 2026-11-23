import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export type EditorCommand =
  | { kind: "exec"; command: string; value?: string }
  | { kind: "link" }
  | { kind: "table" }
  | { kind: "advisory" };

interface ToolDef {
  label: string;
  command: EditorCommand;
  icon?: string;
  text?: string;
  highlight?: boolean;
}

const GROUPS: ToolDef[][] = [
  [
    { label: "Bold", icon: "format_bold", command: { kind: "exec", command: "bold" } },
    { label: "Italic", icon: "format_italic", command: { kind: "exec", command: "italic" } },
    { label: "Underline", icon: "format_underlined", command: { kind: "exec", command: "underline" } },
  ],
  [
    { label: "Heading 2", text: "H2", command: { kind: "exec", command: "formatBlock", value: "h2" } },
    { label: "Heading 3", text: "H3", command: { kind: "exec", command: "formatBlock", value: "h3" } },
  ],
  [
    { label: "Quote", icon: "format_quote", command: { kind: "exec", command: "formatBlock", value: "blockquote" } },
    { label: "Insert statutory advisory note", icon: "warning", highlight: true, command: { kind: "advisory" } },
    { label: "Bulleted list", icon: "format_list_bulleted", command: { kind: "exec", command: "insertUnorderedList" } },
    { label: "Numbered list", icon: "format_list_numbered", command: { kind: "exec", command: "insertOrderedList" } },
    { label: "Insert table", icon: "table_chart", command: { kind: "table" } },
    { label: "Insert link", icon: "link", command: { kind: "link" } },
  ],
];

const TOOL = "p-1.5 rounded hover:bg-surface-container-high text-text-secondary hover:text-text-primary transition-colors";

interface CommentaryToolbarProps {
  onCommand: (command: EditorCommand) => void;
}

export function CommentaryToolbar({ onCommand }: CommentaryToolbarProps) {
  return (
    <div aria-label="Formatting" className="bg-surface-level-2 px-space-sm py-2 flex items-center gap-1 flex-wrap shadow-inner" role="toolbar">
      {GROUPS.map((group, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && <div className="h-4 w-px bg-surface-variant mx-1" />}
          {group.map((tool) => (
            <button
              key={tool.label}
              aria-label={tool.label}
              className={cn(tool.highlight ? "p-1.5 rounded bg-primary/20 text-primary hover:bg-primary/30 transition-colors" : TOOL)}
              // Keep the editor selection while clicking toolbar buttons.
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onCommand(tool.command)}
              title={tool.label}
              type="button"
            >
              {tool.icon ? <Icon className="text-[18px]" name={tool.icon} /> : <span className="font-label-code text-label-code font-bold">{tool.text}</span>}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
