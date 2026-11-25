import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "strong" | "lime" | "panel"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs border px-2.5 py-1.5 font-mono text-code leading-4",
        tone === "default" && "border-line bg-raised text-ink",
        tone === "strong" && "border-line-strong bg-raised text-ink",
        tone === "lime" && "border-lime bg-lime text-[#191b19]",
        tone === "panel" && "border-panel-line text-on-panel",
        className,
      )}
    >
      {children}
    </span>
  );
}
