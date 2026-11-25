export type Locale = "en" | "vi";

export type SectionId = "about" | "ai-workflow" | "experience" | "projects" | "process" | "contact";

export type ProjectId = "housenow" | "nowauto" | "yakult-bhtt" | "yakult-kt" | "yakult-td";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface ExpertiseItem {
  title: string;
  detail: string;
}

export interface FactGroup {
  label: string;
  items: string[];
}

export interface WorkflowStep {
  title: string;
  note: string;
  kind: "input" | "ai" | "review" | "run";
}

export interface AiUseCase {
  title: string;
  body: string;
}

export interface TimelineProject {
  id: ProjectId;
  meta: string;
  bullets: string[];
}

export interface TimelineCompany {
  company: string;
  role: string;
  period: string;
  context?: string;
  projects: TimelineProject[];
}

export interface ProjectCopy {
  industry: string;
  type: string;
  overview: string;
  products?: string;
  responsibilities: string[];
  scope: string[];
  testingTypes?: string[];
}

export interface ProcessStageCopy {
  title: string;
  summary: string;
  details: string[];
}

export interface SiteContent {
  meta: { skip: string; menu: string; close: string; langLabel: string };
  nav: NavItem[];
  contactCta: string;
  hero: {
    index: string;
    role: string;
    location: string;
    identity: { name: string; role: string; experience: string; location: string; years: string };
    headline: [string, string, string];
    highlight: string;
    supporting: string;
    ctaWork: string;
    ctaContact: string;
    expertiseLabel: string;
    expertise: string[];
    stats: { value: string; label: string }[];
    run: {
      title: string;
      status: string;
      rerun: string;
      lines: { text: string; target: SectionId; investigate?: boolean }[];
      summary: string;
      caption: string;
    };
  };
  about: {
    index: string;
    title: string;
    lead: string;
    body: string[];
    expertiseLabel: string;
    expertise: ExpertiseItem[];
    facts: FactGroup[];
  };
  ai: {
    index: string;
    title: string;
    lead: string;
    railLabel: string;
    diagram: {
      title: string;
      subtitle: string;
      req: string;
      analysis: string;
      design: string;
      review: string;
      approved: string;
      automation: string;
      execution: string;
      pass: string;
      release: string;
      defect: string;
      linear: string;
      yes: string;
      refine: string;
      fail: string;
      retest: string;
      me: string;
      claude: string;
      stickyDesign: string;
      stickyHuman: string;
    };
    swipe: string;
    kindLabels: Record<WorkflowStep["kind"], string>;
    steps: WorkflowStep[];
    useCasesLabel: string;
    useCases: AiUseCase[];
    linearFlow: [string, string, string];
    noteTitle: string;
    note: string;
  };
  experience: {
    index: string;
    title: string;
    lead: string;
    viewCase: string;
    companies: TimelineCompany[];
  };
  projects: {
    index: string;
    title: string;
    lead: string;
    featured: string;
    labels: {
      industry: string;
      platform: string;
      team: string;
      company: string;
      products: string;
      overview: string;
      responsibilities: string;
      scope: string;
      testingTypes: string;
      tools: string;
      open: string;
      close: string;
      teamOf: (n: number) => string;
    };
    screenshots: { caption: string; webAlt: string; appAlt: string };
    items: Record<ProjectId, ProjectCopy>;
  };
  process: {
    index: string;
    title: string;
    lead: string;
    hint: string;
    diagram: { title: string; subtitle: string; start: string; check: string; yes: string; no: string; release: string; retest: string; sticky: string; me: string };
    swipe: string;
    stages: ProcessStageCopy[];
  };
  contact: {
    index: string;
    title: string;
    lead: string;
    emailLabel: string;
    copy: string;
    copied: string;
    write: string;
    footer: string;
    backToTop: string;
  };
}
