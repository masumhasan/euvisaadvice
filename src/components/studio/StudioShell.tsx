"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { StudioSidebar } from "./StudioSidebar";
import { StudioTopbar } from "./StudioTopbar";

/** Admin chrome: responsive left sidebar/drawer, fixed topbar, scrolling content. */
export function StudioShell({ children }: { children: ReactNode }) {
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
      <StudioSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="pl-0 lg:pl-[280px] min-h-screen flex flex-col transition-all duration-300">
        <StudioTopbar onToggleSidebar={() => setMobileOpen((prev) => !prev)} />
        <main className="w-full pt-16 bg-surface-base flex-1 overflow-x-hidden">{children}</main>
      </div>
    </>
  );
}
