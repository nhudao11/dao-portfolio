"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/cn";
import { ProcessDiagram } from "@/components/graphics/ProcessDiagram";
import { EASE_OUT } from "@/lib/motion";

export function HowIWork() {
  const { t } = useI18n();
  const p = t.process;
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = p.stages.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    }
  };

  return (
    <Section id="process" labelledBy="process-title" className="border-t border-line bg-raised">
      <SectionHeader id="process-title" index={p.index} title={p.title} lead={p.lead} />

      <div className="lg:ml-[calc(25%+6px)]">
      <p className="label mt-10 text-muted lg:mt-14">{p.hint}</p>
      <div className="mt-4">
        <ProcessDiagram active={active} onSelect={setActive} />
      </div>

      {/* Stage selector for touch / small screens */}
      <div role="tablist" aria-label={p.title} className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:hidden">
        {p.stages.map((s, i) => {
          const isActive = active === i;
          return (
            <button
              key={s.title}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`stage-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`stage-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "flex min-h-11 items-center gap-2 border px-3 text-left text-[14px] font-semibold transition-colors",
                isActive ? "border-ink bg-ink text-surface" : "border-line-strong hover:bg-surface",
              )}
            >
              <span className={cn("font-mono text-label", isActive ? "text-lime" : "text-muted")}>{String(i + 1).padStart(2, "0")}</span>
              {s.title}
            </button>
          );
        })}
      </div>

      <div className="on-panel mt-2 bg-panel text-on-panel">
        <AnimatePresence mode="wait" initial={false}>
          {p.stages.map((s, i) =>
            active === i ? (
              <motion.div
                key={s.title}
                id={`stage-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`stage-tab-${i}`}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="grid gap-6 border-t border-panel-line p-6 md:grid-cols-3 lg:p-8"
              >
                {s.details.map((d, j) => (
                  <div key={d} className="grid grid-cols-[28px_1fr] items-baseline">
                    <span className="font-mono text-label text-on-panel-muted">
                      {i + 1}.{j + 1}
                    </span>
                    <span>{d}</span>
                  </div>
                ))}
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
      </div>
    </Section>
  );
}
