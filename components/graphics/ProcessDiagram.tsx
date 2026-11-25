"use client";

import { useI18n } from "@/lib/i18n";
import { Box, Canvas, Cursor, Diamond, Edge, EdgePill, Sticky, Terminal, Text, TitleCard, svgButton } from "./Whiteboard";

/** Understand → Investigate → Test & Automate → quality check → Improve loop. Stage boxes are buttons. */
export function ProcessDiagram({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const { t } = useI18n();
  const p = t.process;
  const d = p.diagram;

  const stage = (i: number, x: number, y: number, w = 215, h = 112) => {
    const s = p.stages[i];
    const on = active === i;
    return (
      <g {...svgButton(() => onSelect(i))} aria-pressed={on} aria-label={`${String(i + 1).padStart(2, "0")} ${s.title}: ${s.summary}`}>
        <Box x={x} y={y} w={w} h={h} variant={on ? "active" : i === 3 ? "plain" : "process"}>
          <text x={x + 16} y={y + 26} style={{ fontFamily: "var(--font-mono)", fontSize: 12, fill: on ? "var(--lime)" : "var(--ink-muted)" }}>
            {String(i + 1).padStart(2, "0")}
          </text>
          <Text x={x + 16} y={y + 50} text={s.title} anchor="start" max={30} size={17} weight={700} tone={on ? "surface" : "ink"} />
          <Text x={x + 16} y={y + 84} text={s.summary} anchor="start" max={26} size={13} lh={17} weight={400} tone={on ? "surface" : "muted"} />
        </Box>
        {on && <rect x={x + w - 22} y={y + 14} width={8} height={8} rx={4} fill="var(--lime)" />}
      </g>
    );
  };

  return (
    <Canvas width={1200} height={560} label={`${d.title}: ${p.stages.map((s) => s.title).join(" → ")}`} swipe={p.swipe}>
      <TitleCard title={d.title} subtitle={d.subtitle} w={330} />

      {/* Row 1 */}
      <Terminal x={30} y={150} w={175} h={96} variant="start" text={d.start} max={14} />
      <Edge d="M205 198H233" />
      {stage(0, 235, 142)}
      <Edge d="M450 198H493" />
      {stage(1, 495, 142)}
      <Edge d="M710 198H753" />
      {stage(2, 755, 142)}

      <Cursor x={300} y={262} label={d.me} tone="orange" />

      {/* Quality check */}
      <Edge d="M862 254V334" />
      <Diamond cx={862} cy={410} r={74} variant="dark" text={d.check} max={9} />
      <Edge d="M936 410H1003" />
      <EdgePill x={970} y={410} text={d.yes} />
      <Terminal x={1005} y={378} w={170} h={64} variant="end" text={d.release} max={14} />

      {/* Improve + retest loop */}
      <Edge d="M788 410H712" variant="loop" />
      <EdgePill x={750} y={410} text={d.no} variant="loop" />
      {stage(3, 495, 354)}
      <Edge d="M602 354V318H820V258" variant="loop" />
      <EdgePill x={700} y={318} text={d.retest} variant="loop" />

      <Edge d="M495 410H420" variant="dotted" arrow={false} />
      <Sticky x={130} y={366} w={290} h={88} text={d.sticky} max={30} />
    </Canvas>
  );
}
