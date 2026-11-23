import { NotificationBell } from "@/components/layout/NotificationBell";
import { Icon } from "@/components/ui/Icon";

export function StudioTopbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <header className="fixed top-0 left-0 lg:left-[280px] right-0 h-16 bg-surface-level-1/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.5)] flex items-center justify-between px-3 sm:px-space-lg transition-all duration-300">
      <div className="flex items-center gap-2 sm:gap-space-md flex-1 max-w-2xl min-w-0">
        <button
          aria-label="Toggle Studio navigation"
          className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-level-2 transition-colors cursor-pointer flex-shrink-0"
          onClick={onToggleSidebar}
          type="button"
        >
          <Icon className="text-[22px]" name="menu" />
        </button>
        <div className="relative w-full">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[18px]" name="search" />
          <input
            aria-label="Search studio"
            className="w-full bg-surface-container-low text-text-primary placeholder-text-muted pl-9 pr-space-md py-1.5 rounded-lg font-body-default text-body-default focus:outline-none focus:ring-1 focus:ring-primary shadow-inner text-xs sm:text-sm"
            placeholder="Search applicants, dossiers, courses..."
            type="text"
          />
        </div>
        <div className="hidden xl:flex items-center gap-space-xs bg-surface-level-2 px-space-sm py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-tertiary" />
          <span className="font-label-caps text-label-caps text-text-secondary uppercase">Sync: Active</span>
          <span className="font-label-code text-label-code text-text-muted">(BAMF / Auslandsportal Q4 2024)</span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-space-md ml-2 sm:ml-space-md flex-shrink-0">
        <NotificationBell className="hover:bg-surface-level-2 cursor-pointer" dotClassName="top-1.5 right-1.5" />
        <div className="h-8 w-px bg-surface-variant/40 hidden sm:block" />
        <div className="flex items-center gap-space-sm">
          <div className="flex-col text-right hidden sm:flex">
            <span className="font-label-interactive text-label-interactive text-text-primary leading-tight">
              EUVisaAdvice Team
            </span>
            <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase">
              Course Director &amp; Admin
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon className="text-on-primary text-[18px]" name="person" />
          </div>
        </div>
      </div>
    </header>
  );
}
