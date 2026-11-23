"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { SAMPLE_NOTIFICATIONS } from "@/constants/mock/notifications";
import { cn } from "@/lib/cn";
import type { AppNotification } from "@/types/notifications";
import { NotificationModal } from "./NotificationModal";

interface NotificationBellProps {
  className?: string;
  /** Extra classes for the unread-dot, so academy and studio can match their headers. */
  dotClassName?: string;
}

export function NotificationBell({ className, dotClassName }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AppNotification[]>(SAMPLE_NOTIFICATIONS);
  const hasUnread = items.some((item) => item.unread);

  return (
    <>
      <button
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Notifications"
        className={cn(
          "relative flex items-center justify-center p-2 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors",
          className,
        )}
        onClick={() => setOpen(true)}
        type="button"
      >
        <Icon className="text-[22px]" name="notifications" />
        {hasUnread && (
          <span className={cn("absolute w-2 h-2 rounded-full bg-primary", dotClassName ?? "top-2 right-2 ring-2 ring-surface-base")} />
        )}
      </button>
      {open && (
        <NotificationModal
          items={items}
          onClose={() => setOpen(false)}
          onDismiss={(id) => setItems((current) => current.filter((item) => item.id !== id))}
        />
      )}
    </>
  );
}
