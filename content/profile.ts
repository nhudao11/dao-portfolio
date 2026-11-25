import type { ProjectId } from "./types";

/** Language-independent facts, taken from the CV. */
export const profile = {
  name: "Trần Như Đào",
  email: "nhudao1407@gmail.com",
  site: "https://daotn14.com",
  // LinkedIn / GitHub intentionally omitted: no URLs provided.
};

export interface ProjectFacts {
  id: ProjectId;
  name: string;
  company: string;
  period: string;
  platforms: string[];
  team: number;
  tools?: string[];
}

export const projectFacts: ProjectFacts[] = [
  {
    id: "housenow",
    name: "HouseNow",
    company: "The Now Project",
    period: "10/2024 – 11/2026",
    platforms: ["Web", "iOS", "Android"],
    team: 15,
    tools: ["Playwright", "TypeScript", "Linear", "Claude"],
  },
  {
    id: "nowauto",
    name: "NowAuto",
    company: "The Now Project",
    period: "10/2024 – 11/2026",
    platforms: ["iOS", "Android"],
    team: 6,
  },
  {
    id: "yakult-bhtt",
    name: "Yakult BHTT",
    company: "GMO-Z.com RUNSYSTEM",
    period: "03/2022 – 06/2024",
    platforms: ["Web", "iOS", "Android"],
    team: 11,
  },
  {
    id: "yakult-kt",
    name: "Yakult KT",
    company: "GMO-Z.com RUNSYSTEM",
    period: "03/2022 – 06/2024",
    platforms: ["Web", "iOS", "Android"],
    team: 15,
  },
  {
    id: "yakult-td",
    name: "Yakult TD",
    company: "GMO-Z.com RUNSYSTEM",
    period: "03/2022 – 06/2024",
    platforms: ["Web", "iOS", "Android"],
    team: 4,
  },
];

export const projectById = Object.fromEntries(projectFacts.map((p) => [p.id, p])) as Record<ProjectId, ProjectFacts>;
