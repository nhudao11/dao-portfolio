"use client";

import { useState } from "react";
import { ArrowUp, Check, Copy, Mail, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { profile } from "@/content/profile";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="on-panel relative overflow-hidden bg-panel text-on-panel">
      <div className="plus-grid-panel pointer-events-none absolute right-0 top-0 h-[60%] w-[38%] [mask-image:linear-gradient(to_bottom,#000_40%,transparent)]" aria-hidden />
      <div className="container-page relative pb-10 pt-16 lg:pt-28">
        <div className="grid-12 border-t border-on-panel pt-4">
          <p className="label col-span-4 text-on-panel-muted md:col-span-3">{c.index}</p>
          <div className="col-span-4 mt-8 md:col-span-9 md:mt-0">
            <Reveal>
              <h2 id="contact-title" className="max-w-[12ch] text-display-l">
                {c.title}
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-6 max-w-prose text-lead text-on-panel-muted">{c.lead}</p>
            </Reveal>

            <Reveal delay={2} className="mt-10">
              <p className="label text-on-panel-muted">{c.emailLabel}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all border-b-2 border-lime font-display text-[clamp(24px,4vw,44px)] font-medium leading-tight tracking-[-0.02em] transition-colors hover:bg-lime hover:text-[#191b19]"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex min-h-11 items-center gap-2 border border-panel-line px-4 font-mono text-label uppercase text-on-panel transition-colors hover:border-lime hover:text-lime"
                >
                  {copied ? <Check className="h-4 w-4" strokeWidth={1.75} aria-hidden /> : <Copy className="h-4 w-4" strokeWidth={1.5} aria-hidden />}
                  {copied ? c.copied : c.copy}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? c.copied : ""}
                </span>
              </div>

              <p className="label mt-8 text-on-panel-muted">{c.phoneLabel}</p>
              <div className="mt-3">
                <a
                  href={profile.phoneHref}
                  className="inline-flex items-center gap-3 border-b-2 border-lime font-display text-[clamp(24px,4vw,44px)] font-medium leading-tight tracking-[-0.02em] transition-colors hover:bg-lime hover:text-[#191b19]"
                >
                  <Phone className="h-[0.6em] w-[0.6em]" strokeWidth={1.5} aria-hidden />
                  {profile.phone}
                </a>
              </div>
              <div className="mt-10">
                <ButtonLink href={`mailto:${profile.email}`} variant="primary" icon="none">
                  <span className="inline-flex items-center gap-3">
                    <Mail className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    {c.write}
                  </span>
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        <footer className="mt-16 flex flex-col gap-6 border-t border-panel-line pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <div className="flex items-center gap-4">
            <Logo className="h-5" dot="var(--lime)" />
            <span className="font-mono text-code text-on-panel-muted">© {new Date().getFullYear()} {profile.name}</span>
          </div>
          <p className="font-mono text-code text-on-panel-muted">{c.footer}</p>
          <a href="#top" className="label inline-flex items-center gap-2 text-on-panel hover:text-lime">
            {c.backToTop}
            <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          </a>
        </footer>
      </div>
    </section>
  );
}
