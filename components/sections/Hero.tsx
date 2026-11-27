"use client";

import type { CSSProperties } from "react";
import { useI18n } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { ButtonLink } from "@/components/ui/Button";
import { TestRunPanel } from "@/components/graphics/TestRunPanel";

export function Hero() {
  const { t, locale } = useI18n();
  const h = t.hero;
  // Pure-CSS entrance (runs even before/without JavaScript); see .anim-* in globals.css
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

  const last = h.headline[2];
  const cut = last.lastIndexOf(h.highlight);
  const before = cut >= 0 ? last.slice(0, cut) : last;
  const mark = cut >= 0 ? h.highlight : "";

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pb-12 pt-[calc(var(--header-h)+24px)] lg:pb-16 lg:pt-[calc(var(--header-h)+40px)]">
      <div className="plus-grid pointer-events-none absolute right-0 top-[calc(var(--header-h)+150px)] hidden h-[360px] w-[34%] opacity-70 [mask-image:linear-gradient(to_bottom,#000_50%,transparent)] lg:block" aria-hidden />
      <div className="container-page relative">
        {/* Identity row — a spec sheet header */}
        <div className="anim-fade-up grid-12 border-t border-line-strong" style={d(450)}>
          <p className="label col-span-4 pt-4 text-ink md:col-span-3">{h.index}</p>
          <dl className="col-span-4 mt-4 grid grid-cols-2 gap-x-4 gap-y-4 md:col-span-9 md:mt-0 md:grid-cols-4 md:gap-x-6">
            {[
              [h.identity.name, profile.name],
              [h.identity.role, h.role],
              [h.identity.experience, h.identity.years],
              [h.identity.location, h.location],
            ].map(([k, v], i) => (
              <div key={k} className={`flex flex-col pt-4 ${i > 0 ? "md:border-l md:border-line md:pl-5" : ""}`}>
                <dt className="label order-1 text-muted">{k}</dt>
                <dd className={`order-2 mt-1.5 text-[15px] leading-6 ${i === 0 ? "font-display text-[17px] font-medium tracking-[-0.01em]" : "font-medium"}`}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Headline */}
        <h1 id="hero-title" key={locale} className={`mt-10 text-display-xl md:mt-12 lg:mt-14 ${locale === "vi" ? "!leading-[1.04]" : ""}`}>
          {h.headline.map((text, i) => (
            <span key={i} className="-mt-[0.2em] block overflow-hidden pb-[0.06em] pt-[0.2em]">
              <span className="anim-rise block" style={d(100 + i * 90)}>
                {i < 2 ? (
                  text
                ) : (
                  <>
                    {before}
                    <span className="relative isolate inline-block">
                      <span className="absolute inset-x-[-0.06em] bottom-[0.08em] top-[0.18em] -z-10 bg-lime" aria-hidden />
                      {mark}
                    </span>
                  </>
                )}
              </span>
            </span>
          ))}
        </h1>

        {/* Supporting + panel */}
        <div className="grid-12 mt-10 gap-y-12 lg:mt-12">
          <div className="anim-fade-up col-span-4 md:col-span-6 lg:col-span-5" style={d(520)}>
            <p className="max-w-[30rem] text-lead">{h.supporting}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="#projects" variant="primary" icon="up-right">
                {h.ctaWork}
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary">
                {h.ctaContact}
              </ButtonLink>
            </div>
            <div className="mt-8">
              <p className="label mb-3 text-muted">{h.expertiseLabel}</p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {h.expertise.map((item) => (
                  <li key={item} className="font-mono text-metric">
                    <span className="mr-2 text-muted" aria-hidden>+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="anim-fade-up col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7 xl:col-span-5 xl:col-start-8" style={d(590)}>
            <TestRunPanel />
          </div>
        </div>

        {/* Stats */}
        <dl className="anim-fade-up mt-12 grid grid-cols-2 border-t border-line-strong md:grid-cols-4 lg:mt-16" style={d(660)}>
          {h.stats.map((s, i) => (
            <div key={s.label} className={`flex flex-col pb-2 pt-4 ${i % 2 === 1 ? "border-l border-line pl-4" : "pr-4"} ${i >= 2 ? "max-md:mt-6" : ""} md:pr-6 ${i > 0 ? "md:border-l md:border-line md:pl-6" : ""}`}>
              <dt className="label order-2 mt-3 text-muted">
                {s.label}
                {i === 3 && <span className="block normal-case tracking-normal">Web · iOS · Android</span>}
              </dt>
              <dd className="order-1 font-display text-[clamp(40px,4.4vw,56px)] font-medium leading-none tracking-[-0.04em]">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
