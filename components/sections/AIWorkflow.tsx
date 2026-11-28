"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { AIFlowDiagram } from "@/components/graphics/AIFlowDiagram";

export function AIWorkflow() {
  const { t } = useI18n();
  const a = t.ai;
  const cases = a.useCases;
  const linear = cases[cases.length - 1];
  const rest = cases.slice(0, -1);

  return (
    <Section id="ai-workflow" labelledBy="ai-title" className="border-t border-line bg-raised">
      <SectionHeader id="ai-title" index={a.index} title={a.title} lead={a.lead} />

      <div className="mt-10 lg:mt-14">
        <Reveal>
          <AIFlowDiagram />
        </Reveal>
        {/* The six stages, in reading order, for screen readers and quick scanning */}
        <ol className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] leading-5 text-muted" aria-label={a.railLabel}>
          {a.steps.map((s, i) => (
            <li key={s.title}>
              {String(i + 1).padStart(2, "0")} {s.title}
              {i < a.steps.length - 1 && <span aria-hidden> →</span>}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14 lg:mt-20">
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <p className="label flex items-center gap-2 text-ink">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            {a.useCasesLabel}
          </p>
          <p className="label text-muted">{String(cases.length).padStart(2, "0")}</p>
        </div>
        <div>
          <ol className="mt-2 grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((c, i) => (
              <li key={c.title} className="border-b border-line py-5">
                <Reveal delay={i % 3}>
                  <div className="grid grid-cols-[36px_1fr] items-baseline">
                    <span className="font-mono text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-[22px] font-medium leading-tight tracking-[-0.015em]">{c.title}</h3>
                      <p className="mt-2 text-small text-muted">{c.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* AI + Linear workflow — the one Đào set up herself */}
          <Reveal className="on-panel mt-8 bg-panel p-6 text-on-panel sm:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-md">
                <span className="font-mono text-label text-on-panel-muted">07</span>
                <h3 className="mt-3 text-h3">{linear.title}</h3>
                <p className="mt-2 text-small text-on-panel-muted">{linear.body}</p>
              </div>
              <ol className="flex flex-wrap items-center gap-2 font-mono text-code" aria-label={linear.title}>
                {a.linearFlow.map((step, i) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className={i === 1 ? "rounded-xs bg-lime px-2.5 py-1.5 text-[#191b19]" : "rounded-xs border border-panel-line px-2.5 py-1.5"}>{step}</span>
                    {i < a.linearFlow.length - 1 && <ArrowRight className="h-4 w-4 text-on-panel-muted" strokeWidth={1.5} aria-hidden />}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Honest note */}
          <Reveal className="mt-8 grid grid-cols-[12px_1fr] gap-4">
            <span className="mt-1.5 h-3 w-3 bg-orange" aria-hidden />
            <div>
              <p className="font-semibold">{a.noteTitle}</p>
              <p className="mt-1 text-muted">{a.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
