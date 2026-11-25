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
      <div className="container-page relative pb-8 pt-14 lg:pt-20">
        <div className="grid-12 border-t border-on-panel pt-4">
          <p className="label col-span-4 text-on-panel-muted md:col-span-3">{c.index}</p>
          <div className="col-span-4 mt-6 md:col-span-9 md:mt-0">
            <Reveal>
              <h2 id="contact-title" className="font-display text-[clamp(30px,3.8vw,48px)] font-medium leading-[1.05] tracking-[-0.03em]">
                {c.title}
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="mt-3 max-w-prose text-[16px] leading-6 text-on-panel-muted">{c.lead}</p>
            </Reveal>

            <Reveal delay={2} className="mt-8">
              <div className="grid border-t border-panel-line sm:grid-cols-2">
                <div className="flex items-center justify-between gap-4 border-b border-panel-line py-4 sm:border-b-0 sm:pr-6">
                  <div className="min-w-0">
                    <p className="label text-on-panel-muted">{c.emailLabel}</p>
                    <div className="mt-1.5">
                      <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 whitespace-nowrap text-[16px] font-medium leading-7 sm:text-[19px] underline decoration-lime decoration-2 underline-offset-[6px] hover:text-lime">
                        <Mail className="h-4 w-4 shrink-0 text-on-panel-muted" strokeWidth={1.5} aria-hidden />
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex min-h-10 shrink-0 items-center gap-1.5 border border-panel-line px-3 font-mono text-label uppercase text-on-panel transition-colors hover:border-lime hover:text-lime"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden /> : <Copy className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />}
                    {copied ? c.copied : c.copy}
                  </button>
                  <span className="sr-only" aria-live="polite">
                    {copied ? c.copied : ""}
                  </span>
                </div>
                <div className="py-4 sm:border-l sm:border-panel-line sm:pl-6">
                  <p className="label text-on-panel-muted">{c.phoneLabel}</p>
                  <div className="mt-1.5">
                    <a href={profile.phoneHref} className="inline-flex items-center gap-2 whitespace-nowrap text-[16px] font-medium leading-7 sm:text-[19px] underline decoration-lime decoration-2 underline-offset-[6px] hover:text-lime">
                      <Phone className="h-4 w-4 shrink-0 text-on-panel-muted" strokeWidth={1.5} aria-hidden />
                      {profile.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-panel-line pt-6">
                <ButtonLink href={`mailto:${profile.email}`} variant="primary" icon="right" className="min-h-11 px-5 text-[14px]">
                  {c.write}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>

        <footer className="mt-12 flex flex-col gap-6 border-t border-panel-line pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
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
