import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-1.5 rounded-lg font-label-interactive text-label-interactive transition-all duration-200";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary hover:bg-gold-hover text-on-primary",
  secondary:
    "bg-surface-level-2 text-text-primary border border-gold-hairline hover:border-gold-hairline-bright hover:bg-surface-elevated",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5",
};

const SIZES: Record<Size, string> = {
  sm: "px-3 py-1.5",
  md: "px-4 py-2",
  lg: "px-space-lg py-3",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

function classes({ variant = "primary", size = "md", className }: Omit<CommonProps, "children">) {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

/** Single source of truth for buttons. Renders a `Link` when `href` is given. */
export function Button(props: ButtonProps | LinkButtonProps) {
  if (props.href !== undefined) {
    const { href, external, children, ...rest } = props;
    const className = classes(rest);
    return external ? (
      <a className={className} href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    ) : (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }
  const { variant, size, className, children, ...rest } = props;
  return (
    <button className={classes({ variant, size, className })} type="button" {...rest}>
      {children}
    </button>
  );
}
