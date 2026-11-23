import Link from "next/link";
import { HighlightedText } from "@/components/ui/HighlightedText";
import { Icon } from "@/components/ui/Icon";
import { ROUTES } from "@/constants/routes";
import type { OverviewModule } from "@/types/learn";

function ModuleCard({ module, previous, courseSlug }: { module: OverviewModule; previous?: OverviewModule; courseSlug: string }) {
  if (module.unlocked) {
    return (
      <div className="bg-surface-level-2 p-space-lg rounded-xl shadow-md relative overflow-hidden group">
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-primary" />
        <div className="flex items-start justify-between mb-space-xs">
          <span className="font-label-code text-primary font-bold text-headline-sm">{module.index}</span>
          <span className="px-2 py-0.5 rounded text-[0.6875rem] font-label-code bg-primary/10 text-primary">Unlocked</span>
        </div>
        <h4 className="font-title-card text-title-card text-text-primary mb-1 group-hover:text-primary transition-colors">
          {module.title}
        </h4>
        <p className="font-label-code text-[0.75rem] text-text-muted mb-space-sm">
          {module.lessons} LESSONS • {module.minutes} MIN
        </p>
        <p className="font-body-muted text-body-muted text-text-secondary mb-space-md line-clamp-2 leading-relaxed">
          <HighlightedText text={module.description} />
        </p>
        <Link
          className="inline-flex items-center gap-1 font-label-interactive text-label-interactive text-primary hover:underline"
          href={ROUTES.lesson(courseSlug, "0-1")}
        >
          <span>Start Module {module.index}</span>
          <Icon className="text-[16px]" name="arrow_forward" />
        </Link>
      </div>
    );
  }
  return (
    <div className="bg-surface-level-1 p-space-lg rounded-xl shadow-sm hover:bg-surface-elevated transition-colors">
      <div className="flex items-start justify-between mb-space-xs">
        <span className="font-label-code text-text-muted font-bold text-headline-sm">{module.index}</span>
        <span className="px-2 py-0.5 rounded text-[0.6875rem] font-label-code bg-surface-level-2 text-text-muted">
          Prerequisite
        </span>
      </div>
      <h4 className="font-title-card text-title-card text-text-primary mb-1">{module.title}</h4>
      <p className="font-label-code text-[0.75rem] text-text-muted mb-space-sm">
        {module.lessons} LESSONS • {module.minutes} MIN
      </p>
      <p className="font-body-muted text-body-muted text-text-secondary mb-space-md line-clamp-2 leading-relaxed">
        <HighlightedText text={module.description} />
      </p>
      <span className="inline-flex items-center gap-1 text-[0.8125rem] text-text-muted font-label-interactive">
        <Icon className="text-[16px]" name="lock" />
        <span>Unlocks after Module {previous?.index}</span>
      </span>
    </div>
  );
}

export function ModuleCards({ modules, courseSlug }: { modules: OverviewModule[]; courseSlug: string }) {
  return (
    <div className="space-y-space-lg">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-wider">Modular Breakdown</span>
          <h3 className="font-headline-md text-headline-md text-text-primary mt-1">Curriculum &amp; Modules</h3>
        </div>
        <Link
          className="font-label-interactive text-label-interactive text-primary hover:text-gold-hover transition-colors flex items-center gap-1"
          href={ROUTES.course(courseSlug)}
        >
          <span>Expand all syllabi</span>
          <Icon className="text-[16px]" name="unfold_more" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
        {modules.map((module, index) => (
          <ModuleCard key={module.index} courseSlug={courseSlug} module={module} previous={modules[index - 1]} />
        ))}
      </div>
    </div>
  );
}
