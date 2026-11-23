"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import { STUDIO_NAV } from "@/constants/studioNav";
import { cn } from "@/lib/cn";

export function StudioSidebar({
  mobileOpen = false,
  onClose,
}: {
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
          "fixed top-0 bottom-0 left-0 w-[280px] max-w-[85vw] bg-surface-level-1 z-50 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:shadow-[0_1px_8px_rgba(0,0,0,0.4)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="h-16 px-space-md flex items-center justify-between bg-surface-level-1 border-b border-border-neutral lg:border-none">
            <Link
              className="flex items-center gap-space-sm"
              href={ROUTES.studio.dashboard}
              onClick={onClose}
            >
              <BrandLogo className="h-8" />
              <div className="flex flex-col">
                <span className="font-title-card text-title-card text-text-primary tracking-tight">EUVisaAdvice</span>
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Academy Studio</span>
              </div>
            </Link>
            <button
              aria-label="Close Studio Navigation"
              className="lg:hidden p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-level-2 transition-colors cursor-pointer"
              onClick={onClose}
              type="button"
            >
              <Icon className="text-[20px]" name="close" />
            </button>
          </div>
          <div className="px-space-md py-space-xs">
            <div className="rounded-lg bg-surface-level-2 px-space-sm py-space-xs flex items-center justify-between">
              <div className="flex items-center gap-space-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                <span className="font-label-caps text-label-caps text-text-secondary uppercase tracking-wider">
                  Operations Desk
                </span>
              </div>
              <span className="font-label-code text-label-code text-primary bg-primary-container/20 px-space-2xs py-0.5 rounded">
                ADMIN
              </span>
            </div>
          </div>
          <nav className="flex-1 px-space-xs py-space-xs space-y-1">
            {STUDIO_NAV.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Link
                  key={item.label}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between px-space-sm py-2.5 rounded-lg transition-all",
                    active
                      ? "bg-primary-container text-on-primary-container font-headline-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                  )}
                  href={item.href}
                  onClick={onClose}
                >
                  <div className="flex items-center gap-space-sm">
                    <Icon className="text-[20px]" name={item.icon} />
                    <span className="font-label-interactive text-label-interactive">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-space-md bg-surface-level-2/60 space-y-space-sm">
          <div className="flex items-center gap-space-xs">
            <Icon className="text-primary text-[18px]" name="policy" />
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-text-secondary uppercase">Statutory Protocol</span>
              <span className="font-label-code text-label-code text-on-surface">EU 2024/1983</span>
            </div>
          </div>
          <Link
            className="w-full flex items-center justify-center gap-space-xs py-2 px-space-sm rounded-lg bg-surface-level-1 hover:bg-surface-elevated text-on-surface-variant hover:text-on-surface transition-colors font-label-interactive text-label-interactive cursor-pointer"
            href={ROUTES.courses}
            onClick={onClose}
          >
            <Icon className="text-[16px]" name="visibility" />
            <span>Switch to Student View</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
