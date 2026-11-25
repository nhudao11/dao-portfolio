"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, CircleAlert, RotateCcw } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const STEP_MS = 280;

/** Hero signature graphic: an illustrative test run whose lines "pass" one by one. */
export function TestRunPanel() {
  const { t } = useI18n();
  const run = t.hero.run;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [done, setDone] = useState(0);
  const [started, setStarted] = useState(false);
  const timers = useRef<number[]>([]);

  const play = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (reduce) {
      setDone(run.lines.length);
      return;
    }
    setDone(0);
    run.lines.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setDone(i + 1), 450 + STEP_MS * (i + 1)));
    });
  }, [reduce, run.lines]);

  // Reduced motion: show the finished run straight away.
  useEffect(() => {
    if (reduce) {
      setStarted(true);
      setDone(run.lines.length);
    }
  }, [reduce, run.lines.length]);

  useEffect(() => {
    const el = ref.current;
    if (!el || started) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        play();
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [play, started]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const finished = done >= run.lines.length;

  return (
    <figure ref={ref} className="on-panel relative bg-panel p-5 text-on-panel sm:p-6" aria-label={run.caption}>
      <Corners />
      <div className="flex items-center justify-between gap-4 border-b border-panel-line pb-3 font-mono text-label uppercase text-on-panel-muted">
        <span className="truncate">
          <span className={cn("mr-2 inline-block h-1.5 w-1.5 rounded-pill align-middle", finished ? "bg-lime" : "animate-pulse bg-orange")} aria-hidden />
          {run.title}
        </span>
        <span className={cn("rounded-xs px-1.5 py-0.5 transition-colors duration-300", finished ? "bg-lime text-[#191b19]" : "bg-panel-line text-on-panel-muted")}>
          {finished ? run.status : `${done}/${run.lines.length}`}
        </span>
      </div>

      <ol className="mt-3 space-y-0.5 font-mono text-code">
        {run.lines.map((line, i) => {
          const state = i < done ? (line.investigate ? "investigate" : "pass") : "pending";
          return (
            <li key={line.text}>
              <a
                href={`#${line.target}`}
                className={cn(
                  "group relative grid grid-cols-[20px_1fr] items-start gap-2 py-1 pr-2 transition-colors duration-200",
                  state === "pending" ? "text-on-panel-muted/50" : "text-on-panel",
                )}
              >
                <span className="mt-[3px] flex h-4 w-4 items-center justify-center" aria-hidden>
                  {state === "pass" && <Check className="h-4 w-4 text-lime" strokeWidth={2.25} />}
                  {state === "investigate" && <CircleAlert className="h-4 w-4 text-orange" strokeWidth={2} />}
                  {state === "pending" && <span className="h-1 w-1 rounded-pill bg-on-panel-muted/60" />}
                </span>
                <span className="decoration-lime decoration-1 underline-offset-4 group-hover:underline">{line.text}</span>
              </a>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 flex items-center justify-between gap-4 border-t border-panel-line pt-3">
        <p className="font-mono text-code text-on-panel-muted" aria-live="polite">
          {finished ? run.summary : "…"}
        </p>
        <button
          type="button"
          onClick={play}
          className="inline-flex min-h-9 items-center gap-1.5 px-2 font-mono text-label uppercase text-on-panel-muted transition-colors hover:text-lime"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          {run.rerun}
        </button>
      </div>
      <figcaption className="sr-only">{run.caption}</figcaption>
    </figure>
  );
}

/** Inspector-style corner brackets around the panel. */
function Corners() {
  const base = "pointer-events-none absolute h-3 w-3 border-lime";
  return (
    <span aria-hidden>
      <span className={`${base} -left-2 -top-2 border-l border-t`} />
      <span className={`${base} -right-2 -top-2 border-r border-t`} />
      <span className={`${base} -bottom-2 -left-2 border-b border-l`} />
      <span className={`${base} -bottom-2 -right-2 border-b border-r`} />
    </span>
  );
}
