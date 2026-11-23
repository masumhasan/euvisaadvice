import { Icon } from "@/components/ui/Icon";

const REASONS = [
  {
    icon: "verified_user",
    title: "Accredited Immigration Specialists",
    text: "Curriculums authored and maintained exclusively by experienced European immigration consultants and relocation specialists.",
  },
  {
    icon: "inventory",
    title: "Interactive Checklists & Embassy Templates",
    text: "Bilingual forms, cover letters, and document organizers accepted across consular missions worldwide.",
  },
  {
    icon: "assignment_turned_in",
    title: "Consular Case-Filing Architecture",
    text: "Procedural playbooks structured specifically to meet federal standards of German immigration authorities.",
  },
  {
    icon: "update",
    title: "Continuous Policy & Directive Updates",
    text: "Regularly revised modules reflecting real-time changes in EU immigration directives and consular ordinances.",
  },
];

export function WhyLearnSection() {
  return (
    <div className="max-w-[1440px] mx-auto px-gutter w-full mb-space-2xl">
      <div className="bg-surface-level-1 border border-border-neutral rounded-2xl p-space-xl relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-space-xl">
          <span className="font-label-code text-label-code text-primary uppercase tracking-widest font-semibold">
            Institutional Standard
          </span>
          <h3 className="font-headline-lg text-headline-lg text-text-primary mt-1">Why learn with EUVisaAdvice</h3>
          <p className="font-body-muted text-body-muted text-text-secondary mt-2">
            Designed by seasoned European immigration specialists to replace consular guesswork with proven,
            submission-ready dossiers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="bg-surface-level-2/70 border border-border-neutral rounded-xl p-space-lg hover:border-gold-hairline transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-subtle-fill border border-gold-hairline flex items-center justify-center mb-space-md">
                <Icon className="text-primary text-[28px]" name={reason.icon} />
              </div>
              <h4 className="font-title-card text-title-card text-text-primary mb-space-xs">{reason.title}</h4>
              <p className="font-body-muted text-body-muted text-text-secondary">{reason.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
