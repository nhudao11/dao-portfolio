import { Reveal } from "./Reveal";

interface Props {
  /** "03 / AI & Workflow" → number "03", name "AI & Workflow" */
  index: string;
  title: string;
  lead?: string;
  id?: string;
}

export function splitIndex(index: string) {
  const [num, ...rest] = index.split(" / ");
  return { num: num.trim(), name: rest.join(" / ").trim() || index };
}

/** Big section name, a strong rule, then the statement and lead — all left-aligned, full width. */
export function SectionHeader({ index, title, lead, id }: Props) {
  const { num, name } = splitIndex(index);
  return (
    <header>
      <SectionTitle num={num} name={name} id={id} as="h2" />
      <Reveal className="mt-6 lg:mt-8">
        <p className="max-w-[36ch] font-display text-h2 font-medium">{title}</p>
        {lead && <p className="mt-3 text-lead text-muted">{lead}</p>}
      </Reveal>
    </header>
  );
}

/** The big name + number + rule. Used by every section header and the hero. */
export function SectionTitle({ num, name, id, as: Tag = "h2" }: { num: string; name: string; id?: string; as?: "h2" | "p" }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <Tag id={id} className="font-display text-[clamp(30px,3.4vw,46px)] font-semibold leading-[1.05] tracking-[-0.03em]">
          {name}
        </Tag>
        <span className="label pb-1.5 text-muted" aria-hidden>
          {num}
        </span>
      </div>
      <div className="mt-4 border-t-2 border-ink lg:mt-5" />
    </div>
  );
}
