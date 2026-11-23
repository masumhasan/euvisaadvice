"use client";

import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import type { AppNotification } from "@/types/notifications";
import { NotificationItem } from "./NotificationItem";

interface NotificationModalProps {
  items: AppNotification[];
  onClose: () => void;
  onDismiss: (id: string) => void;
}

export function NotificationModal({ items, onClose, onDismiss }: NotificationModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      aria-label="Notifications"
      aria-modal="true"
      className="fixed inset-0 z-[70] bg-surface-base/80 backdrop-blur-md flex items-start justify-center pt-24 sm:pt-28 p-gutter"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="relative w-full max-w-md bg-surface-level-1 border border-gold-hairline rounded-xl overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="px-space-md py-space-sm border-b border-border-neutral flex items-center justify-between bg-surface-level-2">
          <div className="flex items-center gap-2">
            <Icon className="text-primary text-[20px]" name="notifications" />
            <h2 className="font-title-card text-title-card text-text-primary">Notifications</h2>
            <span className="font-label-code text-label-code text-text-muted bg-surface-container-high px-2 py-0.5 rounded">
              {items.length}
            </span>
          </div>
          <button
            aria-label="Close notifications"
            className="text-text-muted hover:text-text-primary p-1 rounded transition-colors"
            onClick={onClose}
            type="button"
          >
            <Icon className="text-[22px]" name="close" />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="px-space-lg py-space-xl text-center">
            <Icon className="text-text-muted text-[32px]" name="notifications_off" />
            <p className="font-title-card text-title-card text-text-primary mt-space-sm">No notifications</p>
            <p className="font-body-muted text-body-muted text-text-secondary mt-1">You are all caught up.</p>
          </div>
        ) : (
          <ul className="max-h-[min(28rem,60vh)] overflow-y-auto">
            {items.map((item) => (
              <NotificationItem key={item.id} item={item} onDismiss={onDismiss} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
