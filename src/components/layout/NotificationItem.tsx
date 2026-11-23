import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { AppNotification } from "@/types/notifications";

interface NotificationItemProps {
  item: AppNotification;
  onDismiss: (id: string) => void;
}

export function NotificationItem({ item, onDismiss }: NotificationItemProps) {
  return (
    <li
      className={cn(
        "flex items-start gap-space-sm px-space-md py-space-sm border-b border-border-neutral last:border-b-0",
        item.unread ? "bg-gold-subtle-fill/40" : "bg-transparent",
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-surface-level-2 flex items-center justify-center text-primary shrink-0 mt-0.5">
        <Icon className="text-[18px]" name={item.icon} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-label-interactive text-label-interactive text-text-primary truncate">{item.title}</p>
          {item.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />}
        </div>
        <p className="font-body-muted text-body-muted text-text-secondary mt-0.5">{item.body}</p>
        <p className="font-label-code text-label-code text-text-muted mt-1">{item.time}</p>
      </div>
      <button
        aria-label={`Dismiss ${item.title}`}
        className="shrink-0 p-1 rounded text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
        onClick={() => onDismiss(item.id)}
        title="Remove notification"
        type="button"
      >
        <Icon className="text-[18px]" name="close" />
      </button>
    </li>
  );
}
