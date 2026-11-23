import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";

export const metadata: Metadata = { title: "Settings" };

/** No Stitch design exists for this screen yet; it links to the studio areas that are available. */
const SHORTCUTS = [
  { icon: "library_books", title: "Course Management", text: "Publish, archive and version your statutory tracks.", href: ROUTES.studio.courses },
  { icon: "group", title: "Students & Dossiers", text: "Audit applicant progress and statutory dossiers.", href: ROUTES.studio.students },
];

export default function SettingsPage() {
  return (
    <div className="w-full px-space-lg py-space-lg">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-space-lg">
        <div className="flex flex-col gap-1">
          <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Academy Administration</span>
          <h1 className="font-headline-md text-headline-md text-text-primary tracking-tight">Studio Settings</h1>
          <p className="font-body-muted text-body-muted text-text-secondary max-w-3xl">
            Workspace, billing and team preferences will be configured here. This screen is not designed yet — use the shortcuts below in the meantime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {SHORTCUTS.map((item) => (
            <Link
              key={item.href}
              className="bg-surface-level-1 hover:bg-surface-level-2 rounded-xl p-space-md flex items-start gap-space-sm transition-colors shadow-sm"
              href={item.href}
            >
              <div className="w-10 h-10 rounded-lg bg-surface-level-2 flex items-center justify-center text-primary shrink-0">
                <Icon className="text-[20px]" name={item.icon} />
              </div>
              <div className="flex flex-col">
                <span className="font-title-card text-title-card text-text-primary">{item.title}</span>
                <span className="font-body-muted text-body-muted text-text-secondary">{item.text}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
