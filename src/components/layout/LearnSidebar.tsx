"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { LEARN_SIDEBAR } from "@/constants/learnSidebar";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";

const ITEM_BASE =
  "flex items-center gap-space-sm px-space-md py-space-sm transition-all font-body-muted text-body-muted border-l-[3px]";
const ITEM_IDLE =
  "text-on-surface-variant hover:bg-surface-level-2 hover:text-on-surface border-transparent";
const ITEM_ACTIVE = "border-primary-container bg-gold-subtle-fill text-text-primary";

export function LearnSidebar({
  courseSlug,
  mobileOpen = false,
  onClose,
}: {
  courseSlug: string;
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, onClose]);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          "fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-surface-level-1 border-r border-border-neutral z-50 lg:z-40 flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none",
          "lg:top-20 lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="p-space-md border-b border-border-neutral">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-caps text-label-caps text-primary uppercase">Curriculum Navigator</span>
            <div className="flex items-center gap-2">
              <span className="font-label-code text-[0.75rem] text-text-muted">{LEARN_SIDEBAR.progress}% Completed</span>
              <button
                aria-label="Close Curriculum Navigator"
                className="lg:hidden p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-level-2 transition-colors cursor-pointer"
                onClick={onClose}
                type="button"
              >
                <Icon className="text-[18px]" name="close" />
              </button>
            </div>
          </div>
          <div className="w-full h-1.5 bg-border-neutral rounded-full overflow-hidden">
            <div className="h-full bg-primary-container rounded-full" style={{ width: `${LEARN_SIDEBAR.progress}%` }} />
          </div>
        </div>
        <nav className="flex-1 py-space-sm space-y-1">
          {LEARN_SIDEBAR.items.map((item) => {
            const href = item.href(courseSlug);
            const active = pathname === href;
            return (
              <Link
                key={item.label}
                aria-current={active ? "page" : undefined}
                className={cn(ITEM_BASE, active ? ITEM_ACTIVE : ITEM_IDLE)}
                href={href}
                onClick={onClose}
              >
                <Icon className="text-[18px] text-text-muted" name={item.icon} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-space-md border-t border-border-neutral bg-surface-level-2">
          <Link className="flex items-center gap-space-sm" href={ROUTES.myLearning} onClick={onClose}>
            <Icon className="text-primary text-[20px]" name="verified" />
            <div>
              <p className="font-label-interactive text-[0.8125rem] text-text-primary">Accredited Track</p>
              <p className="font-body-muted text-[0.75rem] text-text-muted">Dossier ID: EU-2025-DE-819</p>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
