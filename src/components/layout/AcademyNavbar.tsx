"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { BrandLogo } from "./BrandLogo";
import { NotificationBell } from "./NotificationBell";

interface NavItem {
  label: string;
  href: string;
  /** Path prefix that marks this item as active. */
  match?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Courses", href: ROUTES.courses, match: ROUTES.courses },
];

const LINK_BASE = "font-label-interactive text-label-interactive py-2 transition-colors";
const LINK_IDLE = "text-on-surface-variant hover:text-on-surface";
const LINK_ACTIVE = "text-primary border-b-2 border-primary";

export function AcademyNavbar() {
  const pathname = usePathname();
  const isActive = (item: NavItem) => !!item.match && pathname.startsWith(item.match);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-base/95 backdrop-blur-md border-b border-[rgba(218,164,65,0.2)]">
      <div className="h-20 max-w-[1440px] mx-auto px-gutter flex items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-xl flex-shrink-0">
          <Link className="flex items-center gap-space-sm" href={ROUTES.courses}>
            <BrandLogo className="h-8" />
            <span className="font-title-card text-title-card text-text-primary tracking-tight hidden sm:inline-block">
              EUVisaAdvice{" "}
              <span className="text-primary font-body-legal text-[0.8125rem] tracking-wider uppercase font-semibold ml-1 px-1.5 py-0.5 rounded bg-gold-subtle-fill border border-gold-hairline">
                Academy
              </span>
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-space-lg">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                aria-current={isActive(item) ? "page" : undefined}
                className={cn(LINK_BASE, isActive(item) ? LINK_ACTIVE : LINK_IDLE)}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-space-md flex-shrink-0">
          <form action={ROUTES.courses} className="hidden xl:flex items-center relative w-64" role="search">
            <Icon className="absolute left-3 text-text-muted text-[18px]" name="search" />
            <input
              aria-label="Search courses"
              className="w-full bg-surface-level-1 text-on-surface font-body-muted text-body-muted pl-9 pr-12 py-2 rounded-lg border border-border-neutral focus:outline-none focus:border-primary-container transition-colors placeholder:text-text-muted"
              name="q"
              placeholder="Search courses, legal modules..."
              type="text"
            />
            <kbd className="absolute right-2.5 px-1.5 py-0.5 bg-surface-level-2 text-text-secondary border border-border-neutral rounded font-label-code text-[11px]">
              ⌘K
            </kbd>
          </form>
          <Link
            className={cn(
              "hidden sm:inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-surface-level-2 border text-on-surface hover:border-gold-hairline-bright hover:bg-surface-elevated font-label-interactive text-label-interactive transition-all",
              pathname.startsWith(ROUTES.myLearning) ? "border-gold-hairline-bright" : "border-gold-hairline",
            )}
            href={ROUTES.myLearning}
          >
            <Icon className="text-primary text-[18px]" name="school" />
            <span>My Learning</span>
          </Link>
          <NotificationBell className="hover:bg-surface-level-1" />
          <Link
            aria-label="Student profile"
            className="relative flex items-center pl-space-xs"
            href={ROUTES.myLearning}
          >
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center ring-1 ring-gold-hairline-bright">
              <Icon className="text-on-primary text-[18px]" name="person" />
            </span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-status-success ring-2 ring-surface-base" />
          </Link>
        </div>
      </div>
    </header>
  );
}
