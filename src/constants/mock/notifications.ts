import type { AppNotification } from "@/types/notifications";

export const SAMPLE_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "Lesson unlocked",
    body: "Module 02 — Auslandsportal lodgement is now available on The German National Visa Playbook.",
    time: "12 min ago",
    icon: "play_circle",
    unread: true,
  },
  {
    id: "n2",
    title: "Regulations update published",
    body: "§ 18g salary thresholds for 2026 have been applied to the EU Blue Card masterclass.",
    time: "1 hour ago",
    icon: "update",
    unread: true,
  },
  {
    id: "n3",
    title: "Live cohort reminder",
    body: "Consular Q&A with Senior Visa Specialist starts Thursday at 18:00 CET.",
    time: "2 days ago",
    icon: "event",
    unread: false,
  },
];
