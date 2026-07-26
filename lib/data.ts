/**
 * Single source of truth for the public site and the admin dashboard.
 * Every figure here comes from the CV, not from the older marketing site.
 */

export const siteConfig = {
  name: "Christopher Egbaaibon",
  seat: "Senior backend engineer",
  title: "Christopher Egbaaibon, senior backend engineer",
  description:
    "Backend engineer, five years in. APIs and services on high-scale systems: a transaction platform for 50,000 users across Nigeria and Ghana, a fintech backend held at six nines, and the infrastructure under both.",
  url: "https://chris.egbaaibon.com",
  base: "Lagos, Nigeria. Remote friendly",
  email: "christopheregbaaibon@gmail.com",
  cv: "/christopher-egbaaibon-cv.pdf",
  links: {
    linkedin: "https://linkedin.com/in/christopheregbaaibon",
    linktree: "https://linktr.ee/ghostcod3r",
    github: "https://github.com/chrisegbaaaibon",
    email: "mailto:christopheregbaaibon@gmail.com",
  },
  availability: {
    headline: "Open to senior roles",
    lines: ["Full-time, contract,", "architecture reviews.", "Lagos, Nigeria.", "Remote friendly."],
  },
} as const;

/** Rail + topbar sections, in document order. */
export const sections = [
  { id: "top", rn: "00", label: "Opening", nav: false },
  { id: "now", rn: "01", label: "Now", nav: true },
  { id: "systems", rn: "02", label: "Systems", nav: true },
  { id: "record", rn: "03", label: "Record", nav: true },
  { id: "practice", rn: "04", label: "Practice", nav: true },
  { id: "toolkit", rn: "05", label: "Toolkit", nav: true },
  { id: "contact", rn: "06", label: "Contact", nav: true },
] as const;

export const opening = {
  headline: ["I own the services that other people's money moves ", "through", "."],
  lede: "Backend engineer, five years in. APIs and services on high-scale systems: a transaction platform for 50,000 users across Nigeria and Ghana, a fintech backend held at six nines, and the infrastructure under both. I lead the work end to end, from the architecture call to the thing still running six months later.",
  who: [
    { dt: "Seat", dd: "Senior backend engineer" },
    { dt: "Now", dd: "Pandar Resources, Lingu" },
    { dt: "Base", dd: "Lagos, Nigeria. Remote friendly" },
  ],
};

export const figures = [
  {
    v: "50,000+",
    k: "users on the transaction API I maintain",
    src: "PANDAR RESOURCES, NIGERIA AND GHANA",
  },
  {
    v: "99.9999%",
    k: "uptime on zero-fee peer-to-peer transfers",
    src: "WALLET TO BANK, REAL-TIME RECONCILIATION",
  },
  {
    v: "~99.9%",
    k: "cut in search response time after moving to Typesense",
    src: "TRADEHUB, CONTRACT",
  },
  {
    v: "5",
    k: "years shipping production backends",
    src: "SINCE 2021, ACROSS 8 TEAMS",
  },
];

/** Section 01, what I am on right now. */
export const now = [
  {
    org: "Pandar Resources",
    where: "Sheridan, Wyoming. Remote",
    remit:
      "Software engineer. I maintain the core transaction API behind crypto to Naira conversions and gift card redemptions, and I built the wallet to bank transfer path with real-time balance reconciliation against Nigerian bank accounts.",
    since: "Nov 2025 ›",
    stack: "Node.js, TypeScript, MySQL, AWS",
  },
  {
    org: "Lingu",
    mark: "founder",
    remit:
      "Agentic AI customer support platform. It reads a ticket, calls the API, resolves it, and keeps the audit trail. In pilot with early customers.",
    since: "ongoing",
    stack: "NestJS, TypeScript",
  },
  {
    org: "DolphJS",
    mark: "open source",
    remit:
      "Co-author of a TypeScript backend framework, written to cut the setup cost for enterprise and small projects alike.",
    since: "ongoing",
    stack: "TypeScript, Node.js",
  },
];

export type System = {
  id: string;
  title: string;
  kind: string;
  body: string;
  spec?: { b: string; t: string }[];
  outcome?: { text: string; marks: string[] }[];
  chips: string[];
  role: string;
  when: string;
};

/** Section 02, systems and what happened to them. */
export const systems: System[] = [
  {
    id: "pandar",
    title: "Pandar transaction platform",
    kind: "Fintech, crypto and cards",
    body: "The core API converts crypto to Naira and redeems gift cards for 50,000 users across Nigeria and Ghana. I also built the wallet to bank transfer logic, which is the part that has to reconcile an internal wallet balance against a Nigerian bank account in real time, and the backend services provisioning virtual dollar cards.",
    spec: [
      { b: "Own", t: "Core transaction API, transfer logic, card provisioning services" },
      { b: "Hard part", t: "Real-time balance reconciliation across two systems of record" },
      { b: "Worked with", t: "Product and design, end to end on the user flow" },
    ],
    outcome: [
      { text: "Zero-fee peer-to-peer transfers have run at ", marks: [] },
      { text: "99.9999% uptime", marks: ["mark"] },
      { text: ".", marks: [] },
    ],
    chips: ["Node.js", "TypeScript", "MySQL", "AWS"],
    role: "Software engineer",
    when: "Nov 2025 to now",
  },
  {
    id: "lingu",
    title: "Lingu",
    kind: "Founder, agentic AI",
    body: "A customer support platform that resolves tickets rather than summarising them: it reads the ticket, calls the customer's API, does the thing, and leaves an audit trail a human can check. Currently in pilot with early customers. I built it, so the architecture arguments in it are mine to defend.",
    chips: ["NestJS", "TypeScript"],
    role: "Founder",
    when: "In pilot",
  },
  {
    id: "tradehub",
    title: "TradeHub internal tool",
    kind: "Real estate SaaS",
    body: "Contract work on the client platform: an internal tool for bulk-uploading agent data and listing properties, then a search rebuild on Typesense because the existing lookup was the slowest thing in the product.",
    outcome: [
      { text: "Search response time fell by roughly ", marks: [] },
      { text: "99.9%", marks: ["mark"] },
      { text: " after the move to Typesense.", marks: [] },
    ],
    chips: ["TypeScript", "Node.js", "Typesense"],
    role: "Software engineer",
    when: "Mar to Jun 2025",
  },
  {
    id: "savecircle",
    title: "SaveCircle",
    kind: "SaaS platform",
    body: "A collaborative savings platform where a group pools money and members take the pot in turn. I am building the MVP backend from the schema up: data model, API surface, and the AWS infrastructure and storage underneath as the product grows.",
    spec: [
      { b: "Own", t: "Schema design, API implementation, infrastructure" },
      { b: "Shape", t: "Rotating contribution cycles, membership, payouts" },
      { b: "Runtime", t: "AWS" },
    ],
    chips: ["TypeScript", "NestJS", "AWS"],
    role: "Software and DevOps",
    when: "Jun 2024 to April 2025",
  },
  {
    id: "frowork",
    title: "FroWork and Yeve",
    kind: "Marketplace and events",
    body: "Two products at Frolancer. FroWork is a freelance platform for Africa, built in TypeScript and NestJS. Yeve is an event platform, where I built the backend for ticket sales, attendee management and third-party integrations.",
    outcome: [
      { text: "Yeve ticket sales grew ", marks: [] },
      { text: "40%", marks: ["mark"] },
      {
        text: " in year one. Separately, as a Hivend ambassador I helped grow FroWork's freelancer base and supported ",
        marks: [],
      },
      { text: "$30,000", marks: ["mark"] },
      { text: " in platform transactions inside the first three months.", marks: [] },
    ],
    chips: ["TypeScript", "NestJS"],
    role: "Backend developer",
    when: "Oct 2021 to Dec 2022",
  },
  {
    id: "mogroup",
    title: "MO Group platform rebuild",
    kind: "Lead developer",
    body: "Led a cross-functional team through a full platform rebuild, then directed a redesign of the payment system. This is where I learned that leading a rebuild is mostly sequencing and saying no, not architecture.",
    outcome: [
      { text: "Rebuild: ", marks: [] },
      { text: "30%", marks: ["mark"] },
      { text: " higher user satisfaction, ", marks: [] },
      { text: "20%", marks: ["mark"] },
      { text: " better system performance. Payment redesign: ", marks: [] },
      { text: "30%", marks: ["mark"] },
      { text: " fewer payment errors, ", marks: [] },
      { text: "20%", marks: ["mark"] },
      { text: " more successful transactions.", marks: [] },
    ],
    chips: ["Express", "React", "React Native", "AWS"],
    role: "Lead developer",
    when: "Jan to Jun 2023",
  },
  {
    id: "mbag",
    title: "Mbag Microfinance infrastructure",
    kind: "DevOps",
    body: "No product surface, all pipeline. Software infrastructure, internal tools and asset storage on AWS, with microservice deployments automated through GitHub Actions and Terraform so a release stopped being a manual checklist.",
    chips: ["AWS ECR", "ECS", "EC2", "Terraform", "GitHub Actions"],
    role: "DevOps engineer",
    when: "Oct 2024 to Feb 2025",
  },
  {
    id: "dolphjs",
    title: "DolphJS",
    kind: "Open source",
    body: "A TypeScript backend framework I co-authored, aimed at developer productivity on enterprise and small projects alike. Maintaining something in public is the fastest way to find out which of your API decisions were actually opinions.",
    chips: ["TypeScript", "Node.js"],
    role: "Co-founder",
    when: "Ongoing",
  },
];

/** Section 03, eight teams, five years. Sort keys are ISO so the table can order itself. */
export const record = [
  {
    org: "Pandar Resources",
    where: "Sheridan, Wyoming. Remote",
    seat: "Software engineer",
    dates: "Nov 2025 ›",
    start: "2025-11",
    stack: "Node.js, TypeScript, MySQL, AWS",
    current: true,
  },
  {
    org: "SaveCircle",
    where: "United States. Remote",
    seat: "Software and DevOps engineer",
    dates: "Jun 2024 ›",
    start: "2024-06",
    stack: "TypeScript, NestJS, AWS",
    current: true,
  },
  {
    org: "Lumofy",
    where: "Bahrain. Remote",
    seat: "Software engineer, Performance squad",
    dates: "Jun to Nov 2025",
    start: "2025-06",
    stack: "Django, DRF, Python",
    current: false,
  },
  {
    org: "TradeHub",
    where: "London. Remote, contract",
    seat: "Software engineer",
    dates: "Mar to Jun 2025",
    start: "2025-03",
    stack: "TypeScript, Node.js, Typesense",
    current: false,
  },
  {
    org: "Mbag Microfinance",
    where: "Lagos, Nigeria",
    seat: "DevOps engineer",
    dates: "Oct 2024 to Feb 2025",
    start: "2024-10",
    stack: "AWS, Terraform, GitHub Actions",
    current: false,
  },
  {
    org: "Daolity",
    where: "Lagos, Nigeria",
    seat: "Software developer",
    dates: "Jan to Mar 2024",
    start: "2024-01",
    stack: "Django, PostgreSQL",
    current: false,
  },
  {
    org: "MO Group",
    where: "Lagos, Nigeria",
    seat: "Lead developer",
    dates: "Jan to Jun 2023",
    start: "2023-01",
    stack: "Express, React, React Native, AWS",
    current: false,
  },
  {
    org: "Frolancer",
    where: "Plymouth, UK. Remote",
    seat: "Backend developer",
    dates: "Oct 2021 to Dec 2022",
    start: "2021-10",
    stack: "TypeScript, NestJS",
    current: false,
  },
];

export const alsoRecord = [
  {
    org: "Lingu",
    what: "Founder. Agentic AI customer support platform, in pilot with early customers.",
    since: "ongoing",
    stack: "NestJS, TypeScript",
  },
  {
    org: "DolphJS",
    what: "Co-founder of an open-source TypeScript backend framework.",
    since: "ongoing",
    stack: "TypeScript",
  },
  {
    org: "Hivend",
    what: "Ambassador. Grassroots campaign that grew FroWork's freelancer base.",
    since: "past",
    stack: "$30,000 in early transactions",
  },
  {
    org: "University of Lagos",
    what: "B.Sc. Mathematics and Computer Science.",
    since: "degree",
    stack: "",
  },
];

/** Section 04, how the work actually goes. */
export const practice = [
  {
    n: "01",
    h: "Own an API end to end",
    p: "Contract first, then the service behind it, then the thing that pages you when it breaks.",
    li: [
      "REST design and documentation",
      "Schema and query optimisation",
      "Testing and monitoring before launch",
    ],
  },
  {
    n: "02",
    h: "Keep it up",
    p: "Six nines is not a slogan, it is a set of boring decisions made early and kept.",
    li: [
      "Reconciliation between systems of record",
      "Deployment automation, Terraform and Actions",
      "Reducing technical debt on purpose",
    ],
  },
  {
    n: "03",
    h: "Lead the piece of work",
    p: "I have run a cross-functional rebuild and a payment redesign. Both were mostly sequencing.",
    li: [
      "Architecture decisions with a written reason",
      "Code review and mentorship",
      "Talking to people who do not write code",
    ],
  },
];

/** Section 05, what I reach for. `b` entries render bold. */
export const toolkit = [
  { dt: "Languages", dd: [{ t: "TypeScript", b: true }, { t: ", JavaScript, Python, Golang" }] },
  {
    dt: "Backend",
    dd: [
      { t: "Node.js", b: true },
      { t: ", " },
      { t: "NestJS", b: true },
      { t: ", Express, Django, FastAPI" },
    ],
  },
  { dt: "Front of house", dd: [{ t: "React, Next.js, React Native" }] },
  {
    dt: "Data",
    dd: [{ t: "MySQL", b: true }, { t: ", PostgreSQL, MongoDB, Redis, Typesense, ElasticSearch" }],
  },
  {
    dt: "Cloud",
    dd: [
      { t: "AWS", b: true },
      { t: " Amplify, Lambda, API Gateway, ECR, ECS, EC2. Google Cloud, familiar" },
    ],
  },
  { dt: "Delivery", dd: [{ t: "Docker, Terraform, GitHub Actions" }] },
  {
    dt: "Practice",
    dd: [
      { t: "REST API design, Swagger and Postman documentation, code review, testing, Agile, Jira" },
    ],
  },
];

export const contact = {
  h: "Tell me what breaks and when.",
  p: "A useful first message says what the system does, where it is falling over or where it is going next, and the date you are working to. I will tell you whether I am the right engineer for it before I tell you anything else.",
  links: [
    { k: "LinkedIn", v: "christopheregbaaibon ›", href: siteConfig.links.linkedin },
    { k: "Links", v: "linktr.ee/ghostcod3r ›", href: siteConfig.links.linktree },
    { k: "GitHub", v: "Code and DolphJS ›", href: siteConfig.links.github },
    { k: "Email", v: "Direct ›", href: siteConfig.links.email },
  ],
};

/** Every distinct chip across the systems list, for the filter control. */
export const systemTags = Array.from(new Set(systems.flatMap((s) => s.chips))).sort((a, b) =>
  a.localeCompare(b)
);
