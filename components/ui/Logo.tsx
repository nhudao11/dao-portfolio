import { cn } from "@/lib/cn";

/** DAO. wordmark — geometric letters + square full stop. Inherits `color`. */
export function Logo({ className, dot = "currentColor", title = "DAO." }: { className?: string; dot?: string; title?: string }) {
  return (
    <svg viewBox="0 0 176 56" className={cn("h-6 w-auto", className)} role="img" aria-label={title} fill="currentColor">
      <path fillRule="evenodd" d="M0 4h20a24 24 0 0 1 0 48H0zM12 16v24h8a12 12 0 0 0 0-24z" />
      <path fillRule="evenodd" d="M52 52 68 4h12l16 48H83.5l-3.2-10H63.7l-3.2 10zM67.6 31h12.8L74 11.5z" />
      <path fillRule="evenodd" d="M128 4a24 24 0 1 1 0 48a24 24 0 1 1 0-48zm0 12a12 12 0 1 0 0 24a12 12 0 1 0 0-24z" />
      <rect x="160" y="40" width="12" height="12" fill={dot} />
    </svg>
  );
}
