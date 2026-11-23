import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface IconProps {
  /** Material Symbols (Outlined) icon name, e.g. "play_circle". */
  name: string;
  /** Render the filled variant of the glyph. */
  filled?: boolean;
  className?: string;
  style?: CSSProperties;
}

const FILLED_STYLE: CSSProperties = { fontVariationSettings: "'FILL' 1" };

export function Icon({ name, filled = false, className, style }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("material-symbols-outlined", className)}
      style={filled ? { ...FILLED_STYLE, ...style } : style}
    >
      {name}
    </span>
  );
}
