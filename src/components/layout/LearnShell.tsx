"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { LEARN_SIDEBAR } from "@/constants/learnSidebar";
import { AcademyNavbar } from "./AcademyNavbar";
import { LearnSidebar } from "./LearnSidebar";

/** Student learning chrome: navbar, responsive curriculum sidebar/drawer, content area. */
export function LearnShell({ courseSlug, children }: { courseSlug: string; children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <AcademyNavbar />

      {/* Mobile Curriculum Bar (Sticky beneath the fixed 80px navbar on < lg screens) */}
      <div className="lg:hidden mt-20 sticky top-20 z-30 bg-surface-base/95 backdrop-blur-md border-b border-border-neutral px-4 py-2.5 flex items-center justify-between shadow-sm">
        <button
          aria-label="Open Curriculum Navigator"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-level-2 hover:bg-surface-elevated border border-gold-hairline text-text-primary text-xs font-label-interactive transition-all active:scale-95 cursor-pointer shadow-sm"
          onClick={() => setMobileOpen(true)}
          type="button"
        >
          <Icon className="text-primary text-[18px]" name="menu_book" />
          <span>Curriculum Navigator</span>
        </button>
        <div className="flex items-center gap-2 text-text-muted font-label-code text-xs">
          <span>{LEARN_SIDEBAR.progress}% Done</span>
          <div className="w-16 h-1.5 bg-border-neutral rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${LEARN_SIDEBAR.progress}%` }} />
          </div>
        </div>
      </div>

      <LearnSidebar courseSlug={courseSlug} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content area: 0 left padding on mobile, 320px left padding on desktop */}
      <div className="pl-0 lg:pl-80">
        <main className="relative pt-4 lg:pt-20 bg-surface-base min-h-screen px-4 sm:px-6 lg:px-gutter py-space-lg lg:py-space-xl">
          <div className="flex flex-col w-full">{children}</div>
        </main>
      </div>
    </>
  );
}
