import type { KeyboardEvent, ReactNode } from "react";

/*
 * Whiteboard-style flowchart primitives (SVG). Coordinates are in viewBox units.
 * Text wraps by an approximate character budget so both languages fit.
 */

export function wrap(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (!cur) cur = w;
    else if ((cur + " " + w).length <= maxChars) cur += " " + w;
    else {
      lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

type Tone = "ink" | "surface" | "muted" | "lime";
const fills: Record<Tone, string> = { ink: "var(--ink)", surface: "var(--surface)", muted: "var(--ink-muted)", lime: "var(--lime)" };

export function Text({
  x,
  y,
  text,
  max = 22,
  size = 15,
  lh = 20,
  weight = 500,
  tone = "ink",
  anchor = "middle",
  mono = false,
}: {
  x: number;
  y: number;
  text: string;
  max?: number;
  size?: number;
  lh?: number;
  weight?: number;
  tone?: Tone;
  anchor?: "middle" | "start";
  mono?: boolean;
}) {
  const lines = wrap(text, max);
  const top = y - ((lines.length - 1) * lh) / 2;
  return (
    <text
      x={x}
      y={top}
      textAnchor={anchor}
      dominantBaseline="middle"
      style={{ fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)", fontSize: size, fontWeight: weight, fill: fills[tone] }}
    >
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : lh}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

export type BoxVariant = "process" | "claude" | "draft" | "plain" | "active";

export function Box({ x, y, w, h, variant = "process", children }: { x: number; y: number; w: number; h: number; variant?: BoxVariant; children?: ReactNode }) {
  const style: Record<BoxVariant, { fill: string; stroke: string; dash?: string; sw: number }> = {
    process: { fill: "#E8E5DC", stroke: "var(--ink)", sw: 1.5 },
    claude: { fill: "var(--lime)", stroke: "var(--ink)", sw: 1.5 },
    draft: { fill: "var(--surface-raised)", stroke: "var(--ink)", sw: 1.75, dash: "6 5" },
    plain: { fill: "var(--surface-raised)", stroke: "var(--ink)", sw: 1.5 },
    active: { fill: "var(--ink)", stroke: "var(--ink)", sw: 1.5 },
  };
  const s = style[variant];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4} fill={s.fill} stroke={s.stroke} strokeWidth={s.sw} strokeDasharray={s.dash} />
      {children}
    </g>
  );
}

export function Diamond({ cx, cy, r, variant = "outline", text, max = 10 }: { cx: number; cy: number; r: number; variant?: "outline" | "dark"; text: string; max?: number }) {
  const dark = variant === "dark";
  return (
    <g>
      <path
        d={`M${cx} ${cy - r}L${cx + r} ${cy}L${cx} ${cy + r}L${cx - r} ${cy}Z`}
        fill={dark ? "var(--ink)" : "var(--surface-raised)"}
        stroke={dark ? "var(--ink)" : "var(--orange)"}
        strokeWidth={dark ? 1.5 : 3}
        strokeLinejoin="round"
      />
      <Text x={cx} y={cy} text={text} max={max} size={14} lh={18} weight={700} tone={dark ? "surface" : "ink"} />
    </g>
  );
}

export function Terminal({ x, y, w, h, variant, text, max = 20 }: { x: number; y: number; w: number; h: number; variant: "start" | "end"; text: string; max?: number }) {
  const end = variant === "end";
  return (
    <g>
      {end ? (
        <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="var(--ink)" />
      ) : (
        <ellipse cx={x + w / 2} cy={y + h / 2} rx={w / 2} ry={h / 2} fill="var(--surface-raised)" stroke="var(--ink)" strokeWidth={1.5} />
      )}
      <Text x={x + w / 2} y={y + h / 2} text={text} max={max} size={15} lh={19} weight={600} tone={end ? "surface" : "ink"} />
    </g>
  );
}

export function Edge({ d, variant = "solid", arrow = true }: { d: string; variant?: "solid" | "loop" | "dotted"; arrow?: boolean }) {
  const stroke = variant === "loop" ? "var(--orange)" : variant === "dotted" ? "#A9A79F" : "var(--ink)";
  const dash = variant === "loop" ? "7 6" : variant === "dotted" ? "2 5" : undefined;
  const marker = !arrow ? undefined : variant === "loop" ? "url(#wb-arrow-loop)" : variant === "dotted" ? undefined : "url(#wb-arrow)";
  return <path d={d} fill="none" stroke={stroke} strokeWidth={variant === "dotted" ? 1.75 : 2} strokeDasharray={dash} strokeLinecap="round" strokeLinejoin="round" markerEnd={marker} />;
}

export function EdgePill({ x, y, text, variant = "solid" }: { x: number; y: number; text: string; variant?: "solid" | "loop" }) {
  const w = Math.max(44, text.length * 7.6 + 22);
  const loop = variant === "loop";
  return (
    <g>
      <rect x={x - w / 2} y={y - 13} width={w} height={26} rx={13} fill="var(--surface-raised)" stroke={loop ? "var(--orange)" : "var(--ink)"} strokeWidth={1.5} />
      <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, fill: loop ? "#9A5A1C" : "var(--ink)" }}>
        {text}
      </text>
    </g>
  );
}

export function Sticky({ x, y, w, h, text, rotate = 0, max = 26 }: { x: number; y: number; w: number; h: number; text: string; rotate?: number; max?: number }) {
  return (
    <g transform={`rotate(${rotate} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x + 2} y={y + 4} width={w} height={h} fill="#000" opacity={0.06} />
      <rect x={x} y={y} width={w} height={h} fill="#FFFFFF" stroke="#E3E0D7" strokeWidth={1} />
      <Text x={x + w / 2} y={y + h / 2} text={text} max={max} size={14} lh={19} weight={500} />
    </g>
  );
}

export function Cursor({ x, y, label, tone }: { x: number; y: number; label: string; tone: "lime" | "orange" }) {
  const w = label.length * 8 + 26;
  return (
    <g>
      <path d={`M${x} ${y}l15 6.5-6.5 2.2-2.6 6.6z`} fill="var(--surface-raised)" stroke="var(--ink)" strokeWidth={1.4} strokeLinejoin="round" />
      <rect x={x + 14} y={y + 16} width={w} height={28} rx={14} fill={tone === "lime" ? "var(--lime)" : "var(--orange)"} stroke="var(--ink)" strokeWidth={1.2} />
      <text x={x + 14 + w / 2} y={y + 31} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 600, fill: "#191B19" }}>
        {label}
      </text>
    </g>
  );
}

export function TitleCard({ title, subtitle, w = 330 }: { title: string; subtitle: string; w?: number }) {
  return (
    <g>
      <rect x={24} y={24} width={w} height={62} fill="var(--surface-raised)" stroke="var(--ink)" strokeWidth={1.5} />
      <text x={40} y={49} style={{ fontFamily: "var(--font-sans)", fontSize: 15, fontWeight: 700, fill: "var(--ink)" }}>
        {title}
      </text>
      <text x={40} y={71} style={{ fontFamily: "var(--font-mono)", fontSize: 12, fill: "var(--ink-muted)" }}>
        {subtitle}
      </text>
    </g>
  );
}

/** Dotted canvas + arrow markers. Scrolls sideways on narrow screens. */
export function Canvas({ width, height, label, swipe, children }: { width: number; height: number; label: string; swipe: string; children: ReactNode }) {
  return (
    <figure className="relative">
      <div className="overflow-x-auto border border-line bg-[#F1EEE6] [scrollbar-width:thin]" style={{ backgroundImage: "radial-gradient(#C9C6BC 1.1px, transparent 1.2px)", backgroundSize: "22px 22px" }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto block h-auto w-full min-w-[760px] max-w-[1040px]" role="img" aria-label={label}>
          <defs>
            <pattern id="wb-dots" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill="#C9C6BC" />
            </pattern>
            <marker id="wb-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="var(--ink)" />
            </marker>
            <marker id="wb-arrow-loop" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="var(--orange)" />
            </marker>
          </defs>

          {children}
        </svg>
      </div>
      <figcaption className="label mt-2 text-muted lg:hidden">{swipe}</figcaption>
    </figure>
  );
}

/** Keyboard/click handlers for an SVG group acting as a button. */
export function svgButton(onActivate: () => void) {
  return {
    role: "button",
    tabIndex: 0,
    onClick: onActivate,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onActivate();
      }
    },
    style: { cursor: "pointer" },
  } as const;
}
