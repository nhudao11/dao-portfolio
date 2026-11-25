"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { projectFacts, type ProjectFacts } from "@/content/profile";
import type { ProjectCopy, ProjectId, SiteContent } from "@/content/types";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { HouseNowShowcase } from "@/components/graphics/HouseNowShowcase";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

const [featured, ...others] = projectFacts;

type Labels = SiteContent["projects"]["labels"];

export function Projects() {
  const { t } = useI18n();
  const p = t.projects;
  const [open, setOpen] = useState<ProjectId | null>(null);

  // Open a case when arriving via #project-<id> (e.g. from the Experience timeline).
  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#project-(.+)$/);
      if (m && others.some((o) => o.id === m[1])) setOpen(m[1] as ProjectId);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <Section id="projects" labelledBy="projects-title" className="border-t border-line">
      <SectionHeader id="projects-title" index={p.index} title={p.title} lead={p.lead} />

      <FeaturedProject facts={featured} copy={p.items[featured.id]} labels={p.labels} badge={p.featured} shots={p.screenshots} />

      <ol className="mt-12 border-b border-line lg:mt-16">
        {others.map((f, i) => (
          <ProjectRow
            key={f.id}
            index={i + 2}
            facts={f}
            copy={p.items[f.id]}
            labels={p.labels}
            open={open === f.id}
            onToggle={() => setOpen(open === f.id ? null : f.id)}
          />
        ))}
      </ol>
    </Section>
  );
}

function MetaGrid({ facts, copy, labels, tone = "surface" }: { facts: ProjectFacts; copy: ProjectCopy; labels: Labels; tone?: "surface" | "panel" }) {
  const rows: [string, string][] = [
    [labels.industry, copy.industry],
    [labels.platform, facts.platforms.join(" · ")],
    [labels.team, labels.teamOf(facts.team)],
    [labels.company, `${facts.company} · ${facts.period}`],
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
      {rows.map(([k, v]) => (
        <div key={k} className={cn("border-t pt-3", tone === "panel" ? "border-panel-line" : "border-line")}>
          <dt className={cn("label", tone === "panel" ? "text-on-panel-muted" : "text-muted")}>{k}</dt>
          <dd className="mt-2 text-small">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseBody({ facts, copy, labels }: { facts: ProjectFacts; copy: ProjectCopy; labels: Labels }) {
  return (
    <div className="grid gap-x-8 gap-y-8 md:grid-cols-2">
      <div>
        <h4 className="label text-muted">{labels.responsibilities}</h4>
        <ul className="mt-4 space-y-2.5">
          {copy.responsibilities.map((r) => (
            <li key={r} className="grid grid-cols-[16px_1fr] gap-2">
              <span className="mt-[11px] h-px w-2.5 bg-ink" aria-hidden />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-8">
        <div>
          <h4 className="label text-muted">{labels.scope}</h4>
          <ul className="mt-4 flex flex-wrap gap-2">
            {copy.scope.map((s) => (
              <li key={s}>
                <Tag>{s}</Tag>
              </li>
            ))}
          </ul>
        </div>
        {copy.testingTypes && (
          <div>
            <h4 className="label text-muted">{labels.testingTypes}</h4>
            <p className="mt-3 font-mono text-metric">{copy.testingTypes.join(" · ")}</p>
          </div>
        )}
        {facts.tools && (
          <div>
            <h4 className="label text-muted">{labels.tools}</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {facts.tools.map((tool, i) => (
                <li key={tool}>
                  <Tag tone={i === 0 ? "lime" : "strong"}>{tool}</Tag>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedProject({ facts, copy, labels, badge, shots }: { facts: ProjectFacts; copy: ProjectCopy; labels: Labels; badge: string; shots: SiteContent["projects"]["screenshots"] }) {
  return (
    <article id={`project-${facts.id}`} aria-labelledby={`title-${facts.id}`} className="mt-10 scroll-mt-[calc(var(--header-h)+16px)] lg:mt-14">
      <div className="grid-12 gap-y-10">
        <div className="col-span-4 md:col-span-12 lg:col-span-5">
          <Reveal>
            <p className="label inline-flex items-center gap-2 bg-lime px-2 py-1 text-[#191b19]">
              01 · {badge}
            </p>
            <h3 id={`title-${facts.id}`} className="mt-6 text-display-l">
              {facts.name}
            </h3>
            <p className="label mt-4 text-muted">{copy.type}</p>
            <p className="mt-6 max-w-prose text-lead">{copy.overview}</p>
            {copy.products && (
              <p className="mt-6 font-mono text-metric">
                <span className="label mr-2 text-muted">{labels.products}</span>
                {copy.products}
              </p>
            )}
          </Reveal>
        </div>
        <Reveal delay={1} className="col-span-4 md:col-span-12 lg:col-span-7">
          <HouseNowShowcase caption={shots.caption} webAlt={shots.webAlt} appAlt={shots.appAlt} />
        </Reveal>
      </div>
      <div className="mt-8">
        <MetaGrid facts={facts} copy={copy} labels={labels} />
      </div>
      <div className="mt-10">
        <CaseBody facts={facts} copy={copy} labels={labels} />
      </div>
    </article>
  );
}

function ProjectRow({
  index,
  facts,
  copy,
  labels,
  open,
  onToggle,
}: {
  index: number;
  facts: ProjectFacts;
  copy: ProjectCopy;
  labels: Labels;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const panelId = `case-${facts.id}`;
  return (
    <li id={`project-${facts.id}`} className="scroll-mt-[calc(var(--header-h)+16px)] border-t border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "group grid w-full grid-cols-[40px_1fr_32px] items-baseline gap-x-4 py-6 text-left transition-[background-color,padding] duration-150 ease-out md:grid-cols-[56px_minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_40px] lg:py-8",
            open ? "bg-ink px-4 text-surface" : "hover:bg-lime hover:px-4 hover:text-[#191b19]",
          )}
        >
          <span className={cn("col-start-1 row-start-1 font-mono text-label", open ? "text-surface/70" : "text-muted group-hover:text-[#191b19]")}>{String(index).padStart(2, "0")}</span>
          <span className="col-start-2 row-start-1 font-display text-[clamp(28px,3.6vw,44px)] font-medium leading-none tracking-[-0.03em]">{facts.name}</span>
          <span className={cn("label col-start-2 row-start-2 mt-2 md:col-start-3 md:row-start-1 md:mt-0", open ? "text-surface/70" : "text-muted group-hover:text-[#191b19]")}>{copy.type}</span>
          <span className={cn("label hidden md:col-start-4 md:row-start-1 md:block", open ? "text-surface/70" : "text-muted group-hover:text-[#191b19]")}>{facts.platforms.join(" · ")}</span>
          <span className="col-start-3 row-start-1 justify-self-end md:col-start-5" aria-hidden>
            {open ? <Minus className="h-5 w-5" strokeWidth={1.5} /> : <Plus className="h-5 w-5 transition-transform duration-150 group-hover:rotate-90" strokeWidth={1.5} />}
          </span>
          <span className="sr-only">{open ? labels.close : labels.open}</span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={facts.name}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.42, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="pb-12 pt-8">
              <div className="grid-12 gap-y-8">
                <div className="col-span-4 md:col-span-12 lg:col-span-5">
                  <h4 className="label text-muted">{labels.overview}</h4>
                  <p className="mt-3 max-w-prose text-lead">{copy.overview}</p>
                </div>
                <div className="col-span-4 md:col-span-12 lg:col-span-7 lg:col-start-6">
                  <MetaGrid facts={facts} copy={copy} labels={labels} />
                </div>
              </div>
              <div className="mt-10">
                <CaseBody facts={facts} copy={copy} labels={labels} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

