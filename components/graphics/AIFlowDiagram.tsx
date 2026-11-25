"use client";

import { useI18n } from "@/lib/i18n";
import { Box, Canvas, Cursor, Diamond, Edge, EdgePill, Sticky, Terminal, Text, TitleCard } from "./Whiteboard";

/**
 * Requirements → AI Analysis → Test Design → Automation → Execution → Defect Investigation,
 * drawn as a whiteboard flowchart. Lime = Claude, orange = loops and my review.
 */
export function AIFlowDiagram() {
  const { t } = useI18n();
  const d = t.ai.diagram;

  return (
    <Canvas width={1200} height={690} label={`${d.title}. ${t.ai.steps.map((s) => s.title).join(" → ")}`} swipe={t.ai.swipe}>
      <TitleCard title={d.title} subtitle={d.subtitle} w={360} />

      {/* Row 1 — left to right */}
      <Terminal x={30} y={150} w={180} h={96} variant="start" text={d.req} max={14} />
      <Edge d="M210 198H243" />
      <Box x={245} y={146} w={205} h={104} variant="claude">
        <Text x={347} y={198} text={d.analysis} max={20} />
      </Box>
      <Edge d="M450 198H483" />
      <Box x={485} y={146} w={200} h={104} variant="draft">
        <Text x={585} y={198} text={d.design} max={19} />
      </Box>
      <Edge d="M685 198H731" />
      <Diamond cx={805} cy={198} r={74} text={d.review} max={9} />
      <Edge d="M879 198H943" />
      <EdgePill x={911} y={198} text={d.yes} />
      <Box x={945} y={146} w={225} h={104} variant="plain">
        <Text x={1057} y={198} text={d.approved} max={20} />
      </Box>

      {/* Review loop */}
      <Edge d="M805 124V84H585V144" variant="loop" />
      <EdgePill x={695} y={84} text={d.refine} variant="loop" />

      {/* Techniques note */}
      <Edge d="M585 250V292" variant="dotted" arrow={false} />
      <Sticky x={470} y={292} w={230} h={66} text={d.stickyDesign} max={24} />

      <Cursor x={862} y={262} label={d.me} tone="orange" />
      <Cursor x={418} y={256} label={d.claude} tone="lime" />

      {/* Down the right side */}
      <Edge d="M1057 250V398" />

      {/* Row 2 — right to left */}
      <Box x={945} y={400} w={225} h={104} variant="process">
        <rect x={957} y={412} width={58} height={20} rx={10} fill="var(--lime)" stroke="var(--ink)" strokeWidth={1} />
        <text x={986} y={423} textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "#191B19" }}>
          +AI
        </text>
        <Text x={1057} y={462} text={d.automation} max={20} />
      </Box>
      <Edge d="M945 452H893" />
      <Box x={680} y={400} w={211} h={104} variant="process">
        <Text x={785} y={452} text={d.execution} max={19} />
      </Box>
      <Edge d="M680 452H596" />
      <Diamond cx={520} cy={452} r={74} variant="dark" text={d.pass} max={8} />
      <Edge d="M446 452H378" />
      <EdgePill x={412} y={452} text={d.yes} />
      <Terminal x={120} y={420} w={255} h={64} variant="end" text={d.release} max={22} />

      {/* Fail loop — defect investigation */}
      <Edge d="M520 526V612H636" variant="loop" />
      <EdgePill x={520} y={566} text={d.fail} variant="loop" />
      <Box x={638} y={566} w={240} h={92} variant="process">
        <Text x={758} y={612} text={d.defect} max={22} />
      </Box>
      <Edge d="M878 612H923" />
      <Box x={925} y={566} w={245} h={92} variant="claude">
        <Text x={1047} y={612} text={d.linear} max={22} />
      </Box>
      <Edge d="M1057 566V506" variant="loop" />
      <EdgePill x={1057} y={536} text={d.retest} variant="loop" />
      <Cursor x={690} y={644} label={d.claude} tone="lime" />

      {/* Human note */}
      <Edge d="M247 484V540" variant="dotted" arrow={false} />
      <Sticky x={110} y={540} w={280} h={78} text={d.stickyHuman} max={28} />
    </Canvas>
  );
}
