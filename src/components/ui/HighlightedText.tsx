import { Fragment } from "react";

interface HighlightedTextProps {
  /** Text where `**word**` marks a highlighted phrase. */
  text: string;
  highlightClassName?: string;
}

/** Renders `**marked**` segments of a string with a highlight class. */
export function HighlightedText({ text, highlightClassName = "text-text-primary" }: HighlightedTextProps) {
  return (
    <>
      {text.split("**").map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className={highlightClassName}>
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
