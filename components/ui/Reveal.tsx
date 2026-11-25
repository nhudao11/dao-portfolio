import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades content up when it first scrolls into view.
 * Progressive enhancement: content is VISIBLE by default. It is only hidden once the tiny
 * inline script in app/layout.tsx has started an IntersectionObserver (html.js-reveal),
 * so the page never goes blank if React fails to load or is slow.
 */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={cn("reveal", className)} style={{ "--reveal-delay": `${Math.round(delay * 60)}ms` } as CSSProperties} suppressHydrationWarning>
      {children}
    </div>
  );
}
