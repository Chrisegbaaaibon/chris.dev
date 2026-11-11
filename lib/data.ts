/**
 * Single source of truth for the public site and the admin dashboard.
 * Every figure here comes from the CV, not from the older marketing site.
 */

export const siteConfig = {
  name: "Christopher Egbaaibon",
  seat: "Full-stack and DevOps engineer",
  title: "Christopher Egbaaibon, full-stack and DevOps engineer",
  description:
    "Christopher is a full-stack and DevOps engineer, building software and the systems that keep it running. Currently at Pantech Dynamics and Pandar.",
  url: "https://chris.egbaaibon.com",
  base: "Lagos, Nigeria. Remote friendly",
  email: "christopheregbaaibon@gmail.com",
  cv: "/christopher-egbaaibon-cv.pdf",
  links: {
    linkedin: "https://linkedin.com/in/egbaaibon-christopher-02701120a",
    linktree: "https://linktr.ee/ghostcod3r",
    github: "https://github.com/chrisegbaaaibon",
    email: "mailto:christopheregbaaibon@gmail.com",
  },
} as const;

export const intro = {
  title: "Hi, I'm Christopher. I build software and the systems that keep it running.",
  about:
    "I'm a full-stack and DevOps engineer, working across backend development, cloud infrastructure, and everything in between.",
  /** The company logos sit between these two halves. */
  now: [
    "Currently building at ",
    "Pantech Dynamics and Pandar. Previously worked with Lumofy, TradeHub, Magicpitch, and ",
  ],
};

/** Logo stack in the intro. Files are 64px copies of each site's own icon. */
export const companies = [
  { name: "Pantech Dynamics", url: "https://pantechdynamics.com", logo: "/logos/pantech.png" },
  { name: "Pandar", url: "https://pandar.ng", logo: "/logos/pandar.png" },
  { name: "Lumofy", url: "https://lumofy.ai", logo: "/logos/lumofy.png" },
  { name: "SaveCircle", url: "https://savecircle.app", logo: "/logos/savecircle.png" },
];

export const work = {
  sub: "A few things I've built and worked on.",
  items: [
    {
      title: "Pantech Dynamics",
      line: "Making cloud infrastructure easier to operate, monitor, and manage.",
    },
    {
      title: "Pandar",
      line: "Building financial systems for payments, digital wallets, and everyday transactions.",
    },
    {
      title: "DolphJs",
      line: "An open-source backend framework I co-created to make building applications a little easier.",
    },
    {
      title: "Notch for Windows",
      line: "Bringing a little piece of the Dynamic Island experience to Windows.",
    },
    {
      title: "Magicpitch",
      line: "Making everyday workflows simpler with AI-powered tools and automation.",
    },
  ],
};

export const experience = {
  sub: "Some places I've worked and people I've built with.",
  /** Still in `record` for the dashboard, but only named in passing on the page. */
  earlier: ["Daolity", "MO Group", "Frolancer"],
};

export const bio = {
  sub: "A little more about me.",
  body: [
    "I enjoy figuring out how things work, why they break, and how to make them better.",
    "Most of my time goes into building software, working with infrastructure, and experimenting with ideas that catch my attention.",
    "I've worked on everything from financial platforms to cloud systems and developer tools. Different problems, same curiosity.",
    "I studied Mathematics and Computer Science at the University of Lagos.",
  ],
  more: [
    {
      h: "Lately",
      p: "Building cloud systems at Pantech, working on financial infrastructure at Pandar, and exploring ideas of my own.",
    },
    {
      h: "Things I enjoy working with",
      p: "TypeScript, Python, Go, React, NestJS, Django, AWS, Docker, and whatever else gets the job done.",
    },
  ],
};

export const connect = {
  h: "Let's make something happen.",
  p: "I'm always happy to meet interesting people, exchange ideas, or work on something worth building. Feel free to say hi.",
};

/** Experience. Sort keys are ISO so the table can order itself. */
export const record = [
  {
    org: "Pantech Dynamics",
    where: "Abuja, Nigeria",
    seat: "Founding Engineer",
    dates: "Aug 2026 – Present",
    start: "2026-08",
    stack: "CloudStack, Docker, MySQL, Stripe",
    current: true,
  },
  {
    org: "Pandar",
    where: "Sheridan, Wyoming. Remote",
    seat: "Software Engineer",
    dates: "Nov 2025 – Present",
    start: "2025-11",
    stack: "Node.js, TypeScript, MySQL, AWS",
    current: true,
  },
  {
    org: "SaveCircle",
    where: "United States. Remote",
    seat: "Software & DevOps Engineer",
    dates: "Jun 2024 – Present",
    start: "2024-06",
    stack: "TypeScript, NestJS, AWS",
    current: true,
  },
  {
    org: "Lumofy",
    where: "Bahrain. Remote",
    seat: "Software Engineer",
    dates: "Jun 2025 – Nov 2025",
    start: "2025-06",
    stack: "Django, DRF, Python",
    current: false,
  },
  {
    org: "TradeHub",
    where: "London. Remote, contract",
    seat: "Software Engineer",
    dates: "Mar 2025 – Jun 2025",
    start: "2025-03",
    stack: "TypeScript, Node.js, Typesense",
    current: false,
  },
  {
    org: "Mbag Microfinance",
    where: "Lagos, Nigeria",
    seat: "Senior DevOps Engineer",
    dates: "Oct 2024 – Feb 2025",
    start: "2024-10",
    stack: "AWS, Terraform, GitHub Actions",
    current: false,
  },
  {
    org: "Daolity",
    where: "Lagos, Nigeria",
    seat: "Software Developer",
    dates: "Jan 2024 – Mar 2024",
    start: "2024-01",
    stack: "Django, PostgreSQL",
    current: false,
  },
  {
    org: "Magicpitch",
    where: "UK and UAE. Remote",
    seat: "Software Developer",
    dates: "Jun 2023 – Dec 2023",
    start: "2023-06",
    stack: "Python, Next.js, OpenAI, Azure, AWS",
    current: false,
  },
  {
    org: "MO Group",
    where: "Lagos, Nigeria",
    seat: "Lead Developer",
    dates: "Jan 2023 – Jun 2023",
    start: "2023-01",
    stack: "Express, React, React Native, AWS",
    current: false,
  },
  {
    org: "Frolancer",
    where: "Plymouth, UK. Remote",
    seat: "Backend Developer",
    dates: "Oct 2021 – Dec 2022",
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


/** The longer systems list. The dashboard seeds its rows from this; the home page uses `work`. */
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
