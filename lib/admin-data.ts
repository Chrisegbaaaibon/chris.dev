import { systems } from "./data";

export type CaseStudyState = "Written" | "Outline only" | "Not started";
export type PublishState = "live" | "draft" | "todo";

export type SystemRow = {
  id: string;
  title: string;
  kind: string;
  caseStudy: CaseStudyState;
  state: PublishState;
};

export type CaseStudy = {
  id: string;
  title: string;
  system: string;
  status: PublishState;
  words: number;
  note: string;
};

export type Enquiry = {
  id: string;
  initials: string;
  subject: string;
  body: string;
  when: string;
  email: string;
  tags: string[];
  read: boolean;
  archived: boolean;
};

export type Task = { id: string; text: string; area: string; done: boolean };
export type Note = { id: string; text: string; when: string };
export type Redirect = { id: string; from: string; to: string; hits: number; on: boolean };

export type Settings = {
  markReadOnOpen: boolean;
  confirmDestructive: boolean;
  showArchived: boolean;
  sampleData: boolean;
};

/** Publishing state per system. Titles and order come from the public list. */
const PUBLISHING: Record<string, { caseStudy: CaseStudyState; state: PublishState; kind?: string }> =
  {
    pandar: { caseStudy: "Written", state: "live", kind: "Fintech" },
    savecircle: { caseStudy: "Written", state: "live" },
    lingu: { caseStudy: "Outline only", state: "draft" },
    tradehub: { caseStudy: "Not started", state: "live" },
    frowork: { caseStudy: "Not started", state: "live", kind: "Marketplace, events" },
    mogroup: { caseStudy: "Not started", state: "live" },
    mbag: { caseStudy: "Not started", state: "todo" },
    dolphjs: { caseStudy: "Not started", state: "todo" },
  };

/**
 * Seeded from the public list, so the admin rows stay in the same order as the
 * page and a system added there cannot go missing here.
 */
export const seedSystems: SystemRow[] = systems.map((s) => {
  const p = PUBLISHING[s.id] ?? { caseStudy: "Not started" as CaseStudyState, state: "todo" as PublishState };
  return {
    id: s.id,
    title: s.title,
    kind: p.kind ?? s.kind,
    caseStudy: p.caseStudy,
    state: p.state,
  };
});

export const seedCaseStudies: CaseStudy[] = [
  {
    id: "cs-pandar",
    title: "Reconciling a wallet against a bank in real time",
    system: "Pandar transaction platform",
    status: "draft",
    words: 780,
    note: "Check what is safe to publish before this goes live.",
  },
  {
    id: "cs-savecircle",
    title: "Designing rotating contribution cycles",
    system: "SaveCircle",
    status: "draft",
    words: 420,
    note: "Schema diagram still to draw.",
  },
];

export const seedEnquiries: Enquiry[] = [
  {
    id: "e1",
    initials: "AO",
    subject: "Backend review before a funding round",
    body: "We have a Node and Postgres API that started as one service and is now four, and nobody is sure where the boundaries went. Looking for an architecture read before we scale the team.",
    when: "2 days ago",
    email: "ao@example.com",
    tags: ["Consulting", "Architecture"],
    read: false,
    archived: false,
  },
  {
    id: "e2",
    initials: "RK",
    subject: "Contract, 3 months, payments integration",
    body: "Fintech, remote. We need someone who has actually shipped a payments flow and can own the reconciliation side of it.",
    when: "4 days ago",
    email: "rk@example.com",
    tags: ["Contract", "Fintech"],
    read: false,
    archived: false,
  },
  {
    id: "e3",
    initials: "JM",
    subject: "Question about DolphJS",
    body: "Is the framework production ready for a mid-sized team, and what is the upgrade story between minor versions?",
    when: "1 week ago",
    email: "jm@example.com",
    tags: ["Open source"],
    read: true,
    archived: false,
  },
  {
    id: "e4",
    initials: "TS",
    subject: "Full-time senior backend role",
    body: "Remote-first, Series A, TypeScript and Postgres. Replied, waiting on their scheduling link.",
    when: "2 weeks ago",
    email: "ts@example.com",
    tags: ["Full-time", "Replied"],
    read: true,
    archived: false,
  },
];

export const seedTasks: Task[] = [
  { id: "t1", text: "Fix homepage counters", area: "site", done: true },
  { id: "t2", text: "Reconcile the site with the current CV", area: "content", done: true },
  { id: "t3", text: "Write the Pandar case study, minus anything under NDA", area: "content", done: false },
  { id: "t4", text: "Give Lingu its own page", area: "content", done: false },
  { id: "t5", text: "Get a reference on the record from Pandar or Frolancer", area: "trust", done: false },
  { id: "t6", text: "Wire the CV download to the current PDF", area: "files", done: false },
];

export const seedNotes: Note[] = [
  {
    id: "n1",
    text: "No named reference anywhere on the site. One named person at Pandar or Frolancer would do more for trust than any layout change.",
    when: "24 Jul 2026",
  },
  {
    id: "n2",
    text: "Rewrd, Crosskudi, Magicpitch and Notch are on the old site but not on the CV. Decide whether they go back in or come off for good.",
    when: "25 Jul 2026",
  },
];

export const seedRedirects: Redirect[] = [
  { id: "r1", from: "/cv", to: "/christopher-egbaaibon-cv.pdf", hits: 148, on: true },
  { id: "r2", from: "/resume", to: "/christopher-egbaaibon-cv.pdf", hits: 92, on: true },
  { id: "r3", from: "/projects", to: "/#systems", hits: 61, on: true },
  { id: "r4", from: "/about", to: "/#practice", hits: 44, on: true },
  { id: "r5", from: "/services", to: "/#practice", hits: 27, on: false },
];

export const seedSettings: Settings = {
  markReadOnOpen: true,
  confirmDestructive: true,
  showArchived: false,
  sampleData: true,
};

/** Read-only sample series. Marked as sample everywhere it renders. */
export const visits14 = [38, 52, 44, 61, 49, 30, 26, 57, 70, 100, 66, 58, 47, 54];
export const visits30 = [
  22, 31, 28, 35, 41, 26, 19, 33, 44, 38, 29, 47, 52, 36, 40, 31, 25, 38, 52, 44, 61, 49, 30, 26,
  57, 70, 100, 66, 58, 47,
];

export const visitLabels = { 14: ["12 Jul", "25 Jul"], 30: ["26 Jun", "25 Jul"] };

export const pageRank = [
  { page: "Projects", note: "most read" },
  { page: "Experience", note: "2nd" },
  { page: "Home", note: "3rd" },
  { page: "Services", note: "4th" },
  { page: "About", note: "5th" },
];

export const deploys = [
  { when: "2h ago", what: "Copy edit, services page", state: "OK", cls: "live" },
  { when: "Fri", what: "Add the Pandar role", state: "OK", cls: "live" },
  { when: "Wed", what: "Counter animation attempt", state: "Regressed", cls: "draft" },
  { when: "Mon", what: "OG image swap", state: "OK", cls: "live" },
] as const;

/** Counts that the sidebar and the overview both read from. */
export const systemCount = systems.length;
