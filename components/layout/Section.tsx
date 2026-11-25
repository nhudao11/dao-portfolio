import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({ id, children, className, labelledBy }: { id: string; children: ReactNode; className?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-16 md:py-20 lg:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}
