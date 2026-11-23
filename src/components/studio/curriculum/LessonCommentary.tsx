import { Icon } from "@/components/ui/Icon";
import { CommentaryEditor } from "./CommentaryEditor";

interface LessonCommentaryProps {
  initialHtml: string;
  onChange: (html: string) => void;
}

export function LessonCommentary({ initialHtml, onChange }: LessonCommentaryProps) {
  return (
    <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <Icon className="text-primary text-[20px]" name="edit_document" />
          <span className="font-title-card text-title-card text-text-primary font-semibold">Statutory Syllabus &amp; Juridical Commentary</span>
        </div>
        <span className="font-label-code text-label-code text-text-muted text-[12px]">Markdown / WYSIWYG Mode</span>
      </div>
      <CommentaryEditor initialHtml={initialHtml} onChange={onChange} />
    </div>
  );
}
