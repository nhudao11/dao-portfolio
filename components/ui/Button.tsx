import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "panel";

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  icon?: "right" | "up-right" | "none";
  children: ReactNode;
}

const styles: Record<Variant, string> = {
  primary: "bg-lime border-lime text-[#191b19] hover:bg-ink hover:border-ink hover:text-surface",
  secondary: "border-line-strong text-ink hover:bg-ink hover:text-surface",
  panel: "border-on-panel text-on-panel hover:bg-lime hover:border-lime hover:text-[#191b19]",
};

export function ButtonLink({ variant = "primary", icon = "right", className, children, ...rest }: ButtonLinkProps) {
  const Icon = icon === "up-right" ? ArrowUpRight : icon === "right" ? ArrowRight : null;
  return (
    <a
      className={cn(
        "group inline-flex min-h-12 items-center gap-3 border px-6 text-[15px] font-semibold leading-none transition-colors duration-150 ease-out",
        styles[variant],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden
          strokeWidth={1.75}
          className={cn(
            "h-4 w-4 transition-transform duration-150 ease-out",
            icon === "up-right" ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1",
          )}
        />
      )}
    </a>
  );
}
