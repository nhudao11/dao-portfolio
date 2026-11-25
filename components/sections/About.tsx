"use client";

import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";

export function About() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <Section id="about" labelledBy="about-title">
      <SectionHeader id="about-title" index={a.index} title={a.title} lead={a.lead} />

      {/* Story + skills spec table, full width */}
      <div className="grid-12 mt-10 gap-y-10 lg:mt-14">
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          {a.body.map((p, i) => (
            <Reveal key={i} delay={i}>
              <p className={cn("max-w-prose text-[17px] leading-[28px]", i > 0 && "mt-5")}>{p}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
          <dl className="border-b border-line">
            {a.facts.map((g, i) => (
              <div key={g.label} className="grid gap-x-6 gap-y-2 border-t border-line py-3.5 sm:grid-cols-[150px_1fr] sm:items-baseline">
                <dt className="label text-muted">{g.label}</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {g.items.map((item, j) => (
                    <Tag key={item} tone={i === 1 && j === 0 ? "lime" : "default"}>
                      {item}
                    </Tag>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Expertise — 3 × 3 index, details always visible */}
      <div className="mt-14 lg:mt-20">
        <div className="flex items-baseline justify-between border-t border-line-strong pt-4">
          <p className="label text-ink">{a.expertiseLabel}</p>
          <p className="label text-muted">{String(a.expertise.length).padStart(2, "0")}</p>
        </div>
        <ol className="mt-2 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {a.expertise.map((item, i) => {
            const highlight = i === a.expertise.length - 1;
            return (
              <li key={item.title} className="group border-b border-line py-5">
                <Reveal delay={i % 3}>
                  <div className="grid grid-cols-[36px_1fr] items-baseline">
                    <span className="font-mono text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-[22px] font-medium leading-tight tracking-[-0.015em]">
                        <span className={cn("transition-colors duration-150", highlight ? "bg-lime px-1 text-[#191b19]" : "group-hover:bg-lime group-hover:text-[#191b19]")}>{item.title}</span>
                      </h3>
                      <p className="mt-2 text-small text-muted">{item.detail}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
