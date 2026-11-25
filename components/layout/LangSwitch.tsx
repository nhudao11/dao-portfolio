"use client";

import { useI18n } from "@/lib/i18n";
import { locales } from "@/content";
import { cn } from "@/lib/cn";

export function LangSwitch({ tone = "surface", className }: { tone?: "surface" | "panel"; className?: string }) {
  const { locale, setLocale, t } = useI18n();
  const panel = tone === "panel";
  return (
    <div role="group" aria-label={t.meta.langLabel} className={cn("inline-flex gap-0.5 rounded-pill border p-[3px]", panel ? "border-on-panel" : "border-line-strong", className)}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={active}
            onClick={() => setLocale(l)}
            className={cn(
              "min-h-9 min-w-11 rounded-pill px-2 font-mono text-label uppercase transition-colors duration-150",
              active ? (panel ? "bg-on-panel text-panel" : "bg-ink text-surface") : panel ? "text-on-panel hover:bg-panel-line" : "text-ink hover:bg-line",
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
