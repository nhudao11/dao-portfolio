"use client";

import { ArrowDownRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { projectById } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  const { t } = useI18n();
  const e = t.experience;

  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeader id="experience-title" index={e.index} title={e.title} lead={e.lead} />

      <ol className="mt-10 space-y-12 lg:mt-14 lg:space-y-16">
        {e.companies.map((c, ci) => (
          <li key={c.company} className="grid-12 border-t border-line pt-5">
            {/* Period rail */}
            <div className="col-span-4 mb-6 md:col-span-3 md:mb-0">
              <div className="md:sticky md:top-[calc(var(--header-h)+24px)]">
                <p className="font-mono text-metric">{c.period}</p>
                <p className="label mt-2 text-muted">{String(ci + 1).padStart(2, "0")} / {String(e.companies.length).padStart(2, "0")}</p>
              </div>
            </div>

            <div className="col-span-4 md:col-span-9">
              <Reveal>
                <h3 className="text-h2">{c.company}</h3>
                <p className="mt-2 font-semibold">{c.role}</p>
                {c.context && <p className="label mt-2 text-muted">{c.context}</p>}
              </Reveal>

              <div className="mt-8">
                {c.projects.map((p) => {
                  const facts = projectById[p.id];
                  return (
                    <Reveal key={p.id} className="grid gap-x-6 border-t border-line py-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,6fr)]">
                      <div>
                        <h4 className="text-h3">{facts.name}</h4>
                        <a
                          href={`#project-${p.id}`}
                          className="label mt-3 inline-flex items-center gap-1 text-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                        >
                          {e.viewCase}
                          <ArrowDownRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                        </a>
                      </div>
                      <div className="mt-4 lg:mt-1">
                        <p className="label text-muted">{p.meta}</p>
                        <ul className="mt-4 space-y-2.5">
                          {p.bullets.map((b) => (
                            <li key={b} className="grid grid-cols-[16px_1fr] gap-2 text-body">
                              <span className="mt-[11px] h-px w-2.5 bg-ink" aria-hidden />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
