export const siteConfig = {
  name: "Christopher Egbaaibon",
  title: "Christopher Egbaaibon — Full-Stack Engineer & Software Architect",
  description:
    "Full-Stack Engineer, Backend Specialist, DevOps Engineer & Software Architect. Building scalable systems, high-performance APIs & production-ready platforms.",
  url: "https://chris.egbaaibon.com",
  links: {
    github: "https://github.com/chrisegbaaaibon",
    linkedin: "https://linkedin.com/in/christopher-egbaaibon",
    email: "mailto:chris@uselingu.app",
  },
  roles: [
    "Full-Stack Engineer",
    "Backend / DevOps Engineer",
    "Software Architect",
    "Systems Builder",
  ],
  metrics: [
    { value: 4, suffix: "+", label: "Years Production Experience" },
    { value: 10, suffix: "+", label: "Platforms & Systems Built" },
    { value: 5, suffix: "+", label: "Companies & Startups" },
    { value: 10, suffix: "+", label: "Cloud & SaaS Products Shipped" },
  ],
};

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Experience", href: "/experience" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export const experiences = {
  engineering: [
    {
      company: "Rewrd",
      role: "Senior Software Engineer",
      period: "2025 – Present",
      description: "Collaborated with founding team to build and scale loyalty platform and API services for a merchants and consumer rewards application.",
      tech: ["Typescript", "Node.js", "PostgreSQL", "Docker", "Redis"],
    },
    {
      company: "Crosskudi",
      role: "Technical Co-Founder & CTO",
      period: "2025 - Present",
      description:
        "Leading the technical vision and architecture for a fintech startup focused on financial inclusion. Building core product features, API services, and cloud infrastructure.",
      tech: ["TypeScript", "Node.js", "MongoDB", "GCP", "React", "Docker"],
    },
    {
      company: "Lumofy",
      role: "Software Developer",
      period: "2025",
      description:
        "Built scalable HR technology platforms and contributing to core product features, API development, and infrastructure improvements.",
      tech: ["TypeScript", "Node.js", "React", "PostgreSQL", "AWS"],
    },
    {
      company: "TradeHub",
      role: "Software Engineer",
      period: "Contract",
      description:
        "Engineered internal tools, trading dashboards, and real-time data pipelines. Optimized performance for high-frequency financial operations.",
      tech: ["TypeScript", "Node.js", "Redis", "Docker", "MongoDB", "Typesense"],
    },
    {
      company: "Mbag Microfinance",
      role: "DevOps Engineer",
      period: "Contract",
      description:
        "Designed and managed cloud infrastructure, CI/CD pipelines, and deployment automation for financial services platform.",
      tech: ["AWS", "Docker", "Nginx", "GitHub Actions", "Linux"],
    },
    {
      company: "SaveCircle",
      role: "Software / DevOps Engineer",
      period: "2024",
      description:
        "Built the MVP from ground up — API design, database architecture, payment integration, and full DevOps pipeline. Led the technical vision for a collaborative savings platform.",
      tech: ["Node.js", "TypeScript", "MongoDB", "Docker", "AWS"],
    },
    {
      company: "Daolity",
      role: "Software Developer",
      period: "2024",
      description:
        "Contributed to decentralized application development, smart contract integration, and Web3 product engineering.",
      tech: ["TypeScript", "Solidity", "React", "Node.js"],
    },
    {
      company: "Magicpitch",
      role: "Software Developer",
      period: "2023 – 2024",
      description:
        "Developed AI-powered tools for business intelligence. Built search infrastructure using Typesense and optimized data processing pipelines.",
      tech: ["Python", "TypeScript", "Typesense", "Node.js", "React"],
    },
    {
      company: "MO Group LTD",
      role: "Lead Developer & Ambassador",
      period: "2023",
      description:
        "Led development initiatives, mentored junior developers, and represented the organization in technical communities.",
      tech: ["TypeScript", "Node.js", "React", "MongoDB"],
    },
    {
      company: "Frolancer",
      role: "Backend Developer",
      period: "2022 – 2023",
      description:
        "Designed and built RESTful APIs, authentication systems, and backend services for a freelancer marketplace platform.",
      tech: ["Node.js", "Express", "MongoDB", "Redis"],
    },
  ],
};

export const projects = [
  {
    title: "SaveCircle",
    category: "SaaS Platform",
    description:
      "A collaborative savings platform enabling groups to pool resources and manage rotating contributions. Built the complete MVP from API design through deployment.",
    role: "Full-Stack & DevOps Engineer",
    contributions: [
      "Designed and built REST API architecture",
      "Implemented payment gateway integration",
      "Set up CI/CD pipeline and cloud infrastructure",
      "Built real-time notification system",
    ],
    tech: ["Node.js", "TypeScript", "MongoDB", "Docker", "AWS", "Redis"],
    gradient: "from-blue-500/10 to-purple-500/10",
  },
  {
    title: "TradeHub Internal Tools",
    category: "Fintech",
    description:
      "Suite of internal tools for trade monitoring, data analytics, and operational efficiency in a high-frequency trading environment.",
    role: "Software Engineer",
    contributions: [
      "Built real-time trading dashboards",
      "Optimized data pipelines for <50ms latency",
      "Developed internal analytics tools",
      "Implemented WebSocket-based live feeds",
    ],
    tech: ["TypeScript", "Node.js", "Redis", "WebSocket", "Docker"],
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "MagicPitch AI Tools",
    category: "AI / Business Intelligence",
    description:
      "AI-powered business intelligence tools with advanced search capabilities using Typesense for fast, typo-tolerant search across millions of records.",
    role: "Software Developer",
    contributions: [
      "Built Typesense search infrastructure",
      "Developed data processing pipelines",
      "Optimized search relevancy algorithms",
      "Integrated AI/ML models for insights",
    ],
    tech: ["Python", "TypeScript", "Typesense", "Node.js", "React"],
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Frowork / Yeve Platform",
    category: "Productivity Platform",
    description:
      "A productivity and workflow management platform designed for teams. Contributed to core backend services and API development.",
    role: "Backend Developer",
    contributions: [
      "Designed RESTful API architecture",
      "Built authentication & authorization system",
      "Implemented real-time collaboration features",
      "Optimized database queries and indexing",
    ],
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    gradient: "from-rose-500/10 to-pink-500/10",
  },
  {
    title: "DolphJs Framework",
    category: "Open Source",
    description:
      "An open-source Node.js framework designed for building scalable server-side applications with a focus on developer experience and convention over configuration.",
    role: "Co-Founder & Core Maintainer",
    contributions: [
      "Designed the framework architecture",
      "Built plugin system and middleware pipeline",
      "Authored comprehensive documentation",
      "Managed releases and community contributions",
    ],
    tech: ["TypeScript", "Node.js", "Express", "Jest"],
    gradient: "from-violet-500/10 to-indigo-500/10",
  },
  {
    title: "Notch for Windows",
    category: "Desktop Application",
    description:
      "A desktop utility application for Windows built with Python, bringing macOS-style notch functionality to Windows environments.",
    role: "Creator & Developer",
    contributions: [
      "Built custom window management system",
      "Implemented system tray integration",
      "Designed responsive UI components",
      "Handled cross-platform compatibility",
    ],
    tech: ["Python", "Tkinter", "Win32 API"],
    gradient: "from-cyan-500/10 to-sky-500/10",
  },
];

export const services = [
  {
    title: "Backend & API Engineering",
    description:
      "High-performance REST & GraphQL APIs, microservices architecture, database design, and real-time systems built for scale.",
    features: [
      "RESTful & GraphQL API Design",
      "Microservices Architecture",
      "Database Design & Optimization",
      "Real-time Systems & WebSockets",
    ],
    icon: "server",
  },
  {
    title: "Full-Stack Web Applications",
    description:
      "End-to-end product engineering from frontend to backend, built with modern frameworks and deployed for production.",
    features: [
      "React / Next.js Applications",
      "Server-Side Rendering & SSG",
      "Authentication & Authorization",
      "Payment Integration",
    ],
    icon: "layers",
  },
  {
    title: "DevOps & Cloud Infrastructure",
    description:
      "Cloud architecture, CI/CD pipelines, containerization, and infrastructure automation for reliable, scalable deployments.",
    features: [
      "AWS / GCP Infrastructure",
      "Docker & Container Orchestration",
      "CI/CD Pipeline Design",
      "Monitoring & Observability",
    ],
    icon: "cloud",
  },
  {
    title: "Technical Architecture & Consulting",
    description:
      "System design, technical audits, architecture reviews, and strategic guidance for engineering teams and startups.",
    features: [
      "System Design & Planning",
      "Technical Debt Assessment",
      "Performance Optimization",
      "Team Mentorship & Code Review",
    ],
    icon: "compass",
  },
];

export const skills = {
  "Backend & Systems": [
    "Node.js",
    "TypeScript",
    "Python",
    "Express",
    "NestJS",
    "DolphJs",
    "GraphQL",
    "REST APIs",
    "WebSockets",
    "Redis",
    "MongoDB",
    "PostgreSQL",
  ],
  "Frontend & Product": [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "HTML/CSS",
  ],
  "DevOps & Cloud": [
    "Docker",
    "AWS",
    "GCP",
    "Nginx",
    "GitHub Actions",
    "CI/CD",
    "Linux",
    "Terraform",
  ],
  "Tools & Workflow": [
    "Git",
    "VS Code",
    "Postman",
    "Jira",
    "Figma",
    "Typesense",
    "Jest",
    "Vitest",
  ],
};
