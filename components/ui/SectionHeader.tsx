import { Reveal } from "./Reveal";

interface Props {
  index: string;
  title: string;
  lead?: string;
  id?: string;
  tone?: "surface" | "panel";
}

/** Opens every section: hairline, mono index (cols 1–3), statement + lead (cols 4–12). */
export function SectionHeader({ index, title, lead, id, tone = "surface" }: Props) {
  const panel = tone === "panel";
  return (
    <header className={`grid-12 border-t pt-4 ${panel ? "border-on-panel" : "border-line-strong"}`}>
      <p className={`label col-span-4 mb-6 md:col-span-3 md:mb-0 ${panel ? "text-on-panel-muted" : "text-ink"}`}>{index}</p>
      <div className="col-span-4 md:col-span-9">
        <Reveal>
          <h2 id={id} className="max-w-[24ch] text-h1">
            {title.split(/(?<=[.?!])\s+/).map((sentence, i) => (
              <span key={i} className="block">
                {sentence}
              </span>
            ))}
          </h2>
        </Reveal>
        {lead && (
          <Reveal delay={1}>
            <p className={`mt-5 max-w-prose text-lead ${panel ? "text-on-panel-muted" : "text-muted"}`}>{lead}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
