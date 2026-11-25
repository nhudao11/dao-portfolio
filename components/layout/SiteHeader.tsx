"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useActiveSection } from "@/lib/useActiveSection";
import { Logo } from "@/components/ui/Logo";
import { LangSwitch } from "./LangSwitch";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

const SECTION_IDS = ["about", "ai-workflow", "experience", "projects", "process", "contact"];

export function SiteHeader() {
  const { t } = useI18n();
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      menuButton.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <>
      <a href="#main" className="label fixed left-4 top-3 z-[60] -translate-y-20 bg-lime px-4 py-3 text-[#191b19] focus:translate-y-0">
        {t.meta.skip}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b bg-surface transition-colors duration-150",
          scrolled ? "border-line" : "border-transparent",
        )}
      >
        <div className="container-page flex h-full items-center justify-between gap-6">
          <a href="#top" className="-m-2 p-2 text-ink" aria-label="DAO. — Trần Như Đào, back to top">
            <Logo className="h-[22px]" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {t.nav.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "label group inline-flex items-center gap-2 py-2 transition-colors duration-150",
                        isActive ? "text-ink" : "text-muted hover:text-ink",
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-pill bg-ink transition-transform duration-150", isActive ? "scale-100" : "scale-0")} aria-hidden />
                      <span className="text-muted">{String(i + 2).padStart(2, "0")}</span>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch />
            <a
              href="#contact"
              className="hidden min-h-10 items-center border border-line-strong px-4 text-[14px] font-semibold transition-colors duration-150 hover:bg-ink hover:text-surface md:inline-flex"
            >
              {t.contactCta}
            </a>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center border border-line-strong lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              <span className="sr-only">{t.meta.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.meta.menu}
            className="on-panel fixed inset-0 z-[70] flex flex-col bg-panel text-on-panel lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <div className="container-page flex h-[var(--header-h)] items-center justify-between">
              <Logo className="h-[22px]" dot="var(--lime)" />
              <button
                type="button"
                autoFocus
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center border border-on-panel"
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                <span className="sr-only">{t.meta.close}</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="container-page flex-1 overflow-y-auto pt-8">
              <ul className="border-t border-panel-line">
                {[...t.nav, { id: "contact" as const, label: t.contactCta }].map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="border-b border-panel-line"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, ease: EASE_OUT, delay: 0.04 * i }}
                  >
                    <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-4">
                      <span className="label text-on-panel-muted">{String(i + 2).padStart(2, "0")}</span>
                      <span className="font-display text-[clamp(32px,9vw,48px)] font-medium leading-none tracking-[-0.035em]">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="container-page flex items-center justify-between py-6">
              <LangSwitch tone="panel" />
              <span className="label text-on-panel-muted">Trần Như Đào</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
