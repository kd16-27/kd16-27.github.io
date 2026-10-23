import { additionalProjects } from "./additional-projects";
import { z } from "zod";
import { approvedLinkedIn } from "./professional-links.mjs";
import { siteConfig } from "./site-config";
export const siteUrl = siteConfig.siteUrl;
export const profile = {
  name: "Kaden Diaz",
  title: "Mid-Level AV Systems Engineer",
  email: "KadenDiaz1627@gmail.com",
  github: "https://github.com/kd16-27",
  linkedin: approvedLinkedIn,
  vector: "https://vector-learning-kd.diazkaden789.chatgpt.site",
  clearance: "Active DoD Secret Security Clearance.",
  tagline:
    "Engineering connected systems. Building across AV, infrastructure, cloud, and software.",
};
export const specialties = [
  "All disciplines",
  "AV / UC",
  "Infrastructure",
  "Cloud / DevOps",
  "Software",
] as const;
export type Specialty = (typeof specialties)[number];
export const categories = [
  "AV Engineering",
  "Networking",
  "Linux and Systems Administration",
  "Virtualization",
  "Cloud Infrastructure",
  "DevOps and Automation",
  "Software Development",
  "Cybersecurity",
  "AI and Learning Technology",
  "Engineering Tools",
] as const;
export const deliveryStates = [
  "Completed case study",
  "Hands-on lab",
  "Source available",
  "Platform prototype",
  "Locally tested prototype",
  "Deployed software",
  "Future plan",
  "Evidence pending",
] as const;
export type Delivery = (typeof deliveryStates)[number];
const publicEvidenceUrl = z.url().refine((value) => {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return (
    url.protocol === "https:" &&
    url.hostname === "github.com" &&
    /^\/kd16-27\/(av-portfolio-suite|AV-Integrity-Lab-20260926-175340|cloud-task-suite)(\/|$)/.test(
      url.pathname,
    ) &&
    !url.username &&
    !url.password &&
    !url.port &&
    !url.search &&
    !url.hash
  );
}, "Evidence must link to an approved public project on GitHub");
// Extend this explicit allowlist only after reviewing a project's public destination.
const approvedLiveOrigins = new Set([
  "https://vector-learning-kd.diazkaden789.chatgpt.site",
]);
const publicLiveUrl = z.url().refine((value) => {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return (
    approvedLiveOrigins.has(url.origin) &&
    !url.username &&
    !url.password &&
    !url.search &&
    !url.hash
  );
}, "Live links must use an approved public HTTPS origin without credentials or query data");
export const projectSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    shortName: z.string(),
    category: z.enum(categories),
    categories: z.array(z.enum(categories)),
    status: z.enum(["Completed", "In Progress", "Planned"]),
    delivery: z.enum(deliveryStates),
    reviewedOn: z.iso.date(),
    verificationNote: z.string().min(25),
    evidenceLinks: z.array(publicEvidenceUrl),
    evidence: z.enum([
      "Owner-reported case study",
      "Hands-on lab",
      "Public source",
      "Platform schema review",
      "Product in development",
      "Training record pending",
      "Implemented website",
    ]),
    summary: z.string(),
    technologies: z.array(z.string()),
    specialties: z.array(z.enum(specialties)),
    visual: z.enum([
      "nvx",
      "lab",
      "rack",
      "vector",
      "suite",
      "cloud",
      "portfolio",
    ]),
    overview: z.string(),
    objective: z.string(),
    contributions: z.array(z.string()),
    implementation: z.array(z.string()),
    challenge: z.string(),
    result: z.string(),
    lessons: z.string(),
    nextSteps: z.array(z.string()),
    nodes: z.array(z.string()),
    source: publicEvidenceUrl.optional(),
    live: publicLiveUrl.optional(),
    evidenceNote: z.string(),
  })
  .superRefine((project, ctx) => {
    if (
      project.delivery === "Deployed software" &&
      (!project.live || !project.evidenceLinks.length)
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          "Deployed software requires a live URL and supporting public evidence",
      });
    }
    if (project.delivery === "Source available" && !project.source) {
      ctx.addIssue({
        code: "custom",
        message: "Source available requires a repository URL",
      });
    }
    if (
      (project.delivery === "Future plan" &&
        (project.status !== "Planned" || project.live)) ||
      (project.status === "Planned" && project.delivery !== "Future plan")
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          "Future plans must be planned and cannot advertise a live deployment",
      });
    }
  });
export type Project = z.infer<typeof projectSchema>;
export const projects: Project[] = z.array(projectSchema).parse([
  ...additionalProjects,
  {
    slug: "crestron-nvx-troubleshooting",
    delivery: "Completed case study",
    reviewedOn: "2026-10-17",
    verificationNote:
      "Outcome is owner-reported. No independent workplace evidence or configuration is published.",
    evidenceLinks: [],
    name: "Crestron DM-NVX-360 Troubleshooting",
    shortName: "Restoring the signal.",
    category: "AV Engineering",
    categories: ["AV Engineering", "Networking"],
    status: "Completed",
    evidence: "Owner-reported case study",
    summary:
      "A video-routing failure traced to endpoint roles. A systematic diagnosis, a corrected signal path, and restored video.",
    technologies: [
      "Crestron DM-NVX-360",
      "AV-over-IP",
      "Signal flow",
      "Remote support",
    ],
    specialties: ["AV / UC", "Infrastructure"],
    visual: "nvx",
    overview:
      "A sanitized case study of diagnosing a video-routing failure with Crestron DM-NVX-360 endpoints. Both endpoints were operating as receivers/decoders, leaving no encoder to originate the stream.",
    objective:
      "Restore the expected video path while explaining the diagnosis to the technician receiving remote support.",
    contributions: [
      "Traced the logical source-to-display signal flow.",
      "Identified the conflicting endpoint roles.",
      "Provided remote troubleshooting support and technician mentoring.",
    ],
    implementation: [
      "Compared the intended source and receiver roles with the configured device modes.",
      "Corrected the source endpoint to the encoder role and retained the display endpoint as decoder.",
      "Verified restoration of video following the configuration correction.",
    ],
    challenge:
      "Network connectivity alone did not explain the missing video. Checking device roles exposed the configuration root cause: two receivers and no source encoder.",
    result:
      "Video was restored after the source/receiver configuration was corrected, as reported by Kaden. No internal tickets or employer configurations are included.",
    lessons:
      "Validate the logical signal path before assuming that reachable endpoints are correctly configured. Explain the reasoning so a technician can repeat the method.",
    nextSteps: ["Add an owner-approved, sanitized validation checklist."],
    nodes: [
      "Video source",
      "NVX · encoder",
      "Media network",
      "NVX · decoder",
      "Display",
    ],
    evidenceNote:
      "Technical account supplied by Kaden. Generic diagram; no employer topology or independent service record is published.",
  },
  {
    slug: "optiplex-linux-lab",
    delivery: "Hands-on lab",
    reviewedOn: "2026-10-23",
    verificationNote:
      "Active lab activity is owner-reported. Public screenshots and reproducible configuration evidence are pending.",
    evidenceLinks: [],
    name: "Dell OptiPlex Linux & Virtualization Laboratory",
    shortName: "A lab built to learn.",
    category: "Linux and Systems Administration",
    categories: [
      "Linux and Systems Administration",
      "Virtualization",
      "Networking",
    ],
    status: "In Progress",
    evidence: "Hands-on lab",
    summary:
      "Turning Dell OptiPlex hardware into a practical foundation for Linux, remote access, and virtualized infrastructure.",
    technologies: ["Ubuntu", "KVM / QEMU", "SSH", "Dell OptiPlex"],
    specialties: ["Infrastructure", "Cloud / DevOps"],
    visual: "lab",
    overview:
      "A personal laboratory using a Dell OptiPlex 790 and OptiPlex 7050 Micro to explore Ubuntu, the Linux command line, network configuration, SSH, and virtual machines.",
    objective:
      "Build repeatable systems-administration skills on owned hardware, with a path toward monitoring and AV integration experiments.",
    contributions: [
      "Configured and explored Ubuntu Linux and remote access.",
      "Worked with KVM/QEMU and operational virtual machines.",
      "Developed a practical environment for infrastructure experimentation.",
    ],
    implementation: [
      "Used Linux CLI workflows for system exploration and network configuration.",
      "Practiced SSH access and virtual-machine operation.",
      "Installed Prometheus, Grafana and Uptime Kuma in the personal lab, as reported by the owner; supporting artifacts are pending.",
    ],
    challenge:
      "Separating an installed service from independently evidenced dashboards, alert delivery and sustained operation.",
    result:
      "Hands-on Linux and virtualization work is active. Prometheus, Grafana and Uptime Kuma are installed in the personal lab, owner-reported pending artifacts. Installation does not establish reliable alerts, sustained uptime or production operations.",
    lessons:
      "Small, documented experiments build a stronger foundation than treating an aspirational architecture as a finished system.",
    nextSteps: [
      "Document reproducible VM provisioning.",
      "Capture sanitized monitoring dashboards, service versions and repeatable alert checks.",
      "Continue development of an AV integration lab.",
    ],
    nodes: [
      "OptiPlex hardware",
      "Ubuntu host",
      "KVM / QEMU",
      "Virtual machines",
      "Monitoring · owner-reported",
    ],
    evidenceNote:
      "Hardware and activity supplied by Kaden. Public lab screenshots and reproducible configuration exports are pending review.",
  },
  {
    slug: "vector-learning",
    delivery: "Evidence pending",
    reviewedOn: "2026-10-22",
    verificationNote:
      "The owner supplied a public product URL. Current public release scope has not been verified; private development details are excluded.",
    evidenceLinks: [],
    name: "Vector Learning",
    shortName: "Learning with direction.",
    category: "Software Development",
    categories: ["Software Development", "AI and Learning Technology"],
    status: "In Progress",
    evidence: "Product in development",
    summary:
      "An independent technical-learning and career-development platform, connecting learning goals with practical next steps.",
    technologies: [
      "Product development",
      "UI / UX",
      "Learning design",
      "Career roadmaps",
    ],
    specialties: ["Software"],
    visual: "vector",
    overview:
      "Vector Learning is an independent technology-learning and career-development platform. Its public project URL is supplied by the owner; implemented feature scope has not been independently verified.",
    objective:
      "Develop a coherent learning experience around technical skills, career direction, assessments, guided sequences, hands-on projects, resources, and learner progress.",
    contributions: [
      "Developing the product direction for a technical-learning platform.",
      "Planning learning sequences and a more connected resource experience.",
      "Exploring UI/UX and career-roadmap concepts.",
    ],
    implementation: [
      "An existing public product URL is available.",
      "Assessments, guided learning, progress tracking, and resources are product concepts awaiting a verified feature inventory.",
      "AI assistance and community functionality are future ideas, not shipped capabilities.",
    ],
    challenge:
      "Turning a broad learning vision into a clearly scoped product while keeping the current implementation distinct from the roadmap.",
    result:
      "Product work is in progress. This portfolio makes no claims about learner counts, product adoption, or completed AI capabilities.",
    lessons:
      "A useful product story needs a precise account of what works today and what remains to be built.",
    nextSteps: [
      "Review the current build and publish a verified feature inventory.",
      "Document user journeys and prioritize the next release.",
      "Evaluate AI and community features only after appropriate backend controls.",
    ],
    nodes: [
      "Learning goals",
      "Roadmap concept",
      "Guided learning",
      "Hands-on practice",
      "Progress concept",
    ],
    live: "https://vector-learning-kd.diazkaden789.chatgpt.site",
    evidenceNote:
      "Owner-supplied product and URL. Automated retrieval was unavailable on October 17, 2026; feature claims remain conservative.",
  },
  {
    slug: "av-rack-restoration",
    delivery: "Hands-on lab",
    reviewedOn: "2026-10-17",
    verificationNote:
      "Restoration activity is owner-reported and remains in progress. No complete rack restoration is claimed.",
    evidenceLinks: [],
    name: "Multi-Vendor AV Rack Restoration",
    shortName: "From rack to recovery.",
    category: "AV Engineering",
    categories: ["AV Engineering", "Networking", "Engineering Tools"],
    status: "In Progress",
    evidence: "Hands-on lab",
    summary:
      "Following power, connectivity, and control paths to recover device functionality in a multi-vendor AV rack.",
    technologies: [
      "Crestron",
      "Touchpanels",
      "Network diagnostics",
      "Functional testing",
    ],
    specialties: ["AV / UC", "Infrastructure"],
    visual: "rack",
    overview:
      "An ongoing restoration and systems-integration project involving Crestron integration hardware, touchpanel communication, network connectivity, AV sources, and endpoints.",
    objective:
      "Diagnose individual failures and recover usable device functions with a methodical test process.",
    contributions: [
      "Traced power and device connectivity.",
      "Worked through touchpanel communication and network issues.",
      "Cleaned up cabling and evaluated sources and endpoints.",
    ],
    implementation: [
      "Isolated power, cable, and connectivity paths before device-level diagnosis.",
      "Tested recovered functions individually.",
      "Kept broader system integration work open as restoration continued.",
    ],
    challenge:
      "A rack can contain several independent faults. Recovering one endpoint does not prove that the UPS, every component, or the complete AV system is restored.",
    result:
      "Device functionality has been recovered during troubleshooting. Full rack, UPS, and end-to-end system restoration are not claimed.",
    lessons:
      "Prove one layer at a time and maintain an explicit list of unresolved dependencies.",
    nextSteps: [
      "Continue integration and end-to-end functional tests.",
      "Publish an approved component-level recovery log.",
    ],
    nodes: [
      "Power tracing",
      "Network checks",
      "Control / touchpanel",
      "AV endpoints",
      "Functional tests",
    ],
    evidenceNote:
      "Owner-reported restoration activity. No sensitive configuration files, rack photographs, or workplace identifiers are published.",
  },
  {
    slug: "av-portfolio-suite",
    delivery: "Locally tested prototype",
    reviewedOn: "2026-10-23",
    verificationNote:
      "Public source inspected; 14 calculation tests passed in a separately improved local copy on October 23. Dashboard data remains simulated.",
    evidenceLinks: ["https://github.com/kd16-27/av-portfolio-suite"],
    name: "AV Portfolio Suite",
    shortName: "Engineering, made tangible.",
    category: "Engineering Tools",
    categories: ["Engineering Tools", "AV Engineering", "Software Development"],
    status: "In Progress",
    evidence: "Public source",
    summary:
      "A public conference-room design lab with engineering calculations, documentation, and a simulated health dashboard.",
    technologies: ["Python", "AV design", "Dashboard", "Calculation tests"],
    specialties: ["AV / UC", "Software", "Infrastructure"],
    visual: "suite",
    overview:
      "The public repository describes a networked conference-room lab, engineering calculators, commissioning documentation, and a health dashboard. The repository explicitly identifies device data and test results as simulated until the lab is executed.",
    objective:
      "Organize a reproducible engineering design and validation process around a hypothetical hybrid conference room.",
    contributions: [
      "Public repository attributed to Kaden Diaz.",
      "Personal execution of commissioning procedures and device tests remains to be evidenced.",
    ],
    implementation: [
      "Repository includes calculations, configuration samples, a dashboard, documentation, and tests.",
      "README lists calculators for bandwidth, storage, PoE, display sizing, and audio delay.",
      "Monitoring is simulated; real device adapters are future work.",
    ],
    challenge:
      "Demonstrating design reasoning without presenting simulated dashboard values as measured operational results.",
    result:
      "A separate local copy now validates calculator inputs and passed 14 calculation tests on October 23, 2026. The dashboard remains simulated; no real room deployment or completed commissioning is claimed.",
    lessons:
      "Clearly label assumptions and simulations, then replace them with personal test evidence as it becomes available.",
    nextSteps: [
      "Execute the physical lab and capture personal commissioning evidence.",
      "Replace TBD values and add actual screenshots.",
      "Validate any future real-device integrations.",
    ],
    nodes: [
      "Design requirements",
      "Engineering calculations",
      "Sample configuration",
      "Simulated dashboard",
      "Evidence checklist",
    ],
    source: "https://github.com/kd16-27/av-portfolio-suite",
    evidenceNote:
      "Source: public repository README, inspected October 17, 2026. Simulation status is preserved.",
  },
  {
    slug: "cloud-devops-learning",
    delivery: "Evidence pending",
    reviewedOn: "2026-10-17",
    verificationNote:
      "Detailed module records and practical deployment evidence have not been supplied.",
    evidenceLinks: [],
    name: "Cloud & DevOps Internship Learning",
    shortName: "Building the next layer.",
    category: "Cloud Infrastructure",
    categories: [
      "Cloud Infrastructure",
      "DevOps and Automation",
      "Cybersecurity",
    ],
    status: "In Progress",
    evidence: "Training record pending",
    summary:
      "A developing learning track in cloud foundations, deployment, containers, and delivery workflows. Detailed records are pending.",
    technologies: [
      "Cloud foundations",
      "Linux",
      "Networking",
      "Deployment concepts",
    ],
    specialties: ["Cloud / DevOps"],
    visual: "cloud",
    overview:
      "A place to document cloud/DevOps internship training and associated work once module records and project artifacts have been reviewed.",
    objective:
      "Connect technical training to reproducible practical work without overstating completion or professional cloud experience.",
    contributions: [
      "Continued learning is described by the owner.",
      "Specific module completions, internship duties, and associated deployments require documentation.",
    ],
    implementation: [
      "Microsoft Azure Essentials and Cisco Networking Academy training are recorded separately in the training portfolio.",
      "Docker, CI/CD, cloud deployment, web applications, and monitoring are learning topics awaiting project-specific evidence.",
    ],
    challenge:
      "Course exposure is different from independently deploying and operating infrastructure.",
    result:
      "No live cloud infrastructure, deployment URL, completed internship project, or unissued certificate is claimed here.",
    lessons:
      "Attach a module record or practical artifact before promoting a learning topic to a completed accomplishment.",
    nextSteps: [
      "Add reviewed training records.",
      "Document associated hands-on work.",
      "Link source and deployments only when available.",
    ],
    nodes: [
      "Foundations",
      "Linux / networking",
      "Containers · learning",
      "Delivery · learning",
      "Evidence pending",
    ],
    evidenceNote:
      "Owner-supplied learning direction; detailed internship and completion records pending. Active status describes learning, not a verified deployment.",
  },
  {
    slug: "engineering-portfolio",
    delivery: "Locally tested prototype",
    reviewedOn: "2026-10-23",
    verificationNote:
      "Separate local modernization copy. Fresh release check outcomes are recorded in docs/release/RELEASE_VERIFICATION.md; no new public deployment is claimed.",
    evidenceLinks: [],
    name: "This Engineering Portfolio",
    shortName: "The portfolio is a project.",
    category: "Software Development",
    categories: [
      "Software Development",
      "DevOps and Automation",
      "Engineering Tools",
    ],
    status: "In Progress",
    evidence: "Implemented website",
    summary:
      "A content-driven Next.js portfolio with evidence mapping, accessible interactions, portable static export, and automated checks.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Playwright",
    ],
    specialties: ["Software", "Cloud / DevOps"],
    visual: "portfolio",
    overview:
      "This website brings technical work, professional progression, and continuing learning into one maintainable portfolio. Its implementation is AI-assisted; owner skill proficiency is not inferred from generated code.",
    objective:
      "Give recruiters a clear path from a competency to a relevant project, role, or training record.",
    contributions: [
      "Kaden supplied the detailed requirements, professional history, project accounts, and content constraints.",
      "Codex implemented the initial website and supporting documentation.",
      "Owner review, personal modifications, and ongoing maintenance should be logged separately.",
    ],
    implementation: [
      "Next.js App Router with pre-rendered routes and a portable static export.",
      "Strict TypeScript and Zod validate the central content model.",
      "Client components support search, specialty filters, theme preferences, and accessible mobile navigation.",
      "Automated content and browser checks, CI configuration, and release documentation accompany the source.",
    ],
    challenge:
      "Presenting a broad technical profile while keeping professional experience, lab practice, training, and future work explicit.",
    result:
      "The website and source are the implementation evidence. Build, test, and deployment outcomes are recorded in the repository verification report, rather than assumed.",
    lessons:
      "A portfolio becomes more credible when its own architecture and contribution boundaries are inspectable.",
    nextSteps: [
      "Review personal content and credential evidence.",
      "Approve a current résumé PDF.",
      "Record owner-led development and maintenance milestones.",
    ],
    nodes: [
      "Typed content",
      "Reusable UI",
      "Static generation",
      "Automated checks",
      "Local preview",
    ],
    evidenceNote:
      "Inspect this website and its included source. See docs/release/RELEASE_VERIFICATION.md for measured results and contribution boundaries.",
  },
]);
export const credentialSchema = z.object({
  name: z.string(),
  issuer: z.string(),
  type: z.enum(["Certification", "Vendor training", "Training"]),
  status: z.enum(["Completed", "In Progress", "Planned"]),
  skills: z.array(z.string()),
  earnedDate: z.string().nullable(),
  url: z.url().nullable(),
});
export const credentials = z.array(credentialSchema).parse(
  [
    ["CAVT", "AVIXA", "Certification", "Completed"],
    ["Dante Level 3", "Audinate", "Vendor training", "Completed"],
    ["DMC-E", "Crestron", "Vendor training", "Completed"],
    ["Commercial Technician", "Crestron", "Vendor training", "Completed"],
    ["Residential Technician", "Crestron", "Vendor training", "Completed"],
    ["Modern Workplace", "Crestron", "Vendor training", "Completed"],
    ["NAV Pro AV over IP", "Extron", "Vendor training", "Completed"],
    ["ECS", "Extron", "Vendor training", "Completed"],
    ["ProDSP Principles", "Extron", "Vendor training", "Completed"],
    ["Global Configurator Plus", "Extron", "Vendor training", "Completed"],
    ["GUI Designer", "Extron", "Vendor training", "Completed"],
    ["AV Associate", "Extron", "Vendor training", "Completed"],
    ["Technician Networked AV", "AMX", "Vendor training", "Completed"],
    ["Technician Enova", "AMX", "Vendor training", "Completed"],
    ["Designer Video and Control", "AMX", "Vendor training", "Completed"],
    ["NCE", "NETGEAR", "Vendor training", "Completed"],
    ["NCE-AV", "NETGEAR", "Vendor training", "Completed"],
    ["AV Levels 1–3", "NETGEAR", "Vendor training", "Completed"],
    ["Network Technician Career Path", "Cisco", "Training", "Completed"],
    ["Azure Essentials training", "Microsoft", "Training", "Completed"],
    [
      "AI and Security foundations coursework",
      "Microsoft",
      "Training",
      "Completed",
    ],
    ["Security Copilot training", "Microsoft", "Training", "Completed"],
    ["Level 0", "Q-SYS", "Vendor training", "Completed"],
    ["RF Basics", "Sennheiser", "Training", "Completed"],
    ["Field Engineer track", "Biamp", "Vendor training", "In Progress"],
    ["NSE 1–3 track", "Fortinet", "Training", "In Progress"],
    ["Level 1", "Q-SYS", "Vendor training", "In Progress"],
  ].map(([name, issuer, type, status]) => ({
    name,
    issuer,
    type,
    status,
    skills:
      issuer === "Microsoft"
        ? ["Cloud foundations"]
        : issuer === "Cisco" || issuer === "NETGEAR"
          ? ["Networking"]
          : ["AV systems"],
    earnedDate: null,
    url: null,
  })),
);
export const experience = [
  {
    id: "mid",
    role: "Mid-Level AV Systems Engineer",
    company: "Geospatial and Cloud Analytics (GCA)",
    period: "June 2026 — Present",
    date: "2026-06",
    label: "Current role",
    text: "Engineering and supporting connected AV systems in federal and secure environments.",
    details: [
      "AV systems integration, endpoint configuration, and complex technical troubleshooting.",
      "Signal-flow, HDCP/EDID, DSP, video distribution, cameras, displays, and conferencing systems.",
      "AV drawings, bills of materials, ticket coordination, customer support, and technical mentoring.",
    ],
    tags: ["Systems integration", "AV-over-IP", "Technical leadership"],
  },
  {
    id: "vcu",
    role: "In-Class AV Assistant",
    company: "Virginia Commonwealth University",
    period: "September — December 2025",
    date: "2025-09",
    label: "University experience",
    text: "Helped instructors and participants keep classroom and hybrid sessions connected.",
    details: [
      "Live classroom support and conferencing troubleshooting for Zoom and Microsoft Teams.",
      "Instructor assistance and Executive MBA session support.",
    ],
    tags: ["Unified communications", "Customer support"],
  },
  {
    id: "intern",
    role: "Junior AV Technician / AV Technician Intern",
    company: "Geospatial and Cloud Analytics (GCA)",
    period: "May 2025 — June 2026 · school-term break",
    date: "2025-05",
    label: "Early AV experience",
    text: "Progressed from AV internship support to Junior AV Technician responsibilities.",
    details: [
      "Supported AV/VTC troubleshooting, equipment integration and networked AV endpoints.",
      "Built practical experience with control, conferencing, audio and video systems.",
    ],
    tags: ["AV foundations", "Troubleshooting", "Hands-on learning"],
  },
];
export const education = {
  school: "J. Sargeant Reynolds Community College",
  degree: "Associate of Science — Social Sciences",
  date: "May 2024",
};
export const skillSchema = z.object({
  name: z.string(),
  description: z.string(),
  evidence: z.enum([
    "Professional experience",
    "Hands-on lab",
    "Coursework",
    "Active learning",
  ]),
  tools: z.array(z.string()),
  project: z.string(),
  specialties: z.array(z.enum(specialties)),
});
export const skills = z.array(skillSchema).parse([
  {
    name: "AV systems engineering",
    description:
      "Integrating and troubleshooting connected audio, video, and control systems.",
    evidence: "Professional experience",
    tools: ["Crestron", "Extron", "AMX"],
    project: "crestron-nvx-troubleshooting",
    specialties: ["AV / UC"],
  },
  {
    name: "Unified communications & VTC",
    description: "Classroom, hybrid meeting, and federal AV/VTC support.",
    evidence: "Professional experience",
    tools: ["Microsoft Teams", "Zoom", "Conferencing"],
    project: "crestron-nvx-troubleshooting",
    specialties: ["AV / UC"],
  },
  {
    name: "Control systems & AV programming",
    description:
      "Endpoint configuration and control troubleshooting, supported by vendor training.",
    evidence: "Professional experience",
    tools: ["Crestron", "Global Configurator Plus", "GUI Designer"],
    project: "av-rack-restoration",
    specialties: ["AV / UC", "Software"],
  },
  {
    name: "DSP & audio engineering",
    description:
      "Audio signal paths and DSP troubleshooting; ProDSP training completed.",
    evidence: "Professional experience",
    tools: ["DSP", "Dante", "Biamp"],
    project: "av-rack-restoration",
    specialties: ["AV / UC"],
  },
  {
    name: "Networking & AV-over-IP",
    description:
      "Device connectivity, endpoint roles, and logical media signal paths.",
    evidence: "Professional experience",
    tools: ["TCP/IP", "DM-NVX", "NAV"],
    project: "crestron-nvx-troubleshooting",
    specialties: ["AV / UC", "Infrastructure"],
  },
  {
    name: "Linux & systems administration",
    description:
      "Ubuntu command-line practice, network configuration, and remote access.",
    evidence: "Hands-on lab",
    tools: ["Ubuntu", "CLI", "SSH"],
    project: "optiplex-linux-lab",
    specialties: ["Infrastructure", "Cloud / DevOps"],
  },
  {
    name: "Virtualization & infrastructure",
    description:
      "Virtual machines and host experimentation on personal OptiPlex systems.",
    evidence: "Hands-on lab",
    tools: ["KVM", "QEMU", "OptiPlex"],
    project: "optiplex-linux-lab",
    specialties: ["Infrastructure", "Cloud / DevOps"],
  },
  {
    name: "Cloud platforms",
    description:
      "Foundational Azure training; practical cloud project records are pending.",
    evidence: "Coursework",
    tools: ["Azure Essentials", "Cloud concepts"],
    project: "cloud-devops-learning",
    specialties: ["Cloud / DevOps"],
  },
  {
    name: "DevOps & automation",
    description:
      "Learning containers, deployment workflows, and monitoring concepts.",
    evidence: "Active learning",
    tools: ["Docker concepts", "CI/CD concepts", "Monitoring"],
    project: "cloud-devops-learning",
    specialties: ["Cloud / DevOps", "Software"],
  },
  {
    name: "Software development",
    description:
      "Technical product planning and AI-assisted portfolio development.",
    evidence: "Hands-on lab",
    tools: ["Vector Learning", "Next.js", "TypeScript"],
    project: "engineering-portfolio",
    specialties: ["Software"],
  },
  {
    name: "Cybersecurity fundamentals",
    description:
      "Developing foundational security knowledge through the Fortinet training track.",
    evidence: "Active learning",
    tools: ["NSE 1–3 track", "Security fundamentals"],
    project: "cloud-devops-learning",
    specialties: ["Infrastructure", "Cloud / DevOps"],
  },
  {
    name: "Systems design, documentation & leadership",
    description:
      "AV drawings, bills of materials, technical mentoring, and support coordination.",
    evidence: "Professional experience",
    tools: ["System drawings", "BOMs", "Mentoring"],
    project: "crestron-nvx-troubleshooting",
    specialties: ["AV / UC", "Infrastructure", "Software"],
  },
]);
export const notes = [
  {
    slug: "nvx-signal-flow",
    title: "Start with the signal path.",
    tag: "AV troubleshooting",
    date: "October 17, 2026",
    minutes: 3,
    project: "crestron-nvx-troubleshooting",
    summary:
      "A draft note on why endpoint roles belong early in the troubleshooting process.",
    body: [
      "An endpoint can be reachable and still have the wrong role. In the owner-reported DM-NVX-360 case, both endpoints were operating as receivers.",
      "A generic intended path is source → encoder → network → decoder → display. That conceptual path makes the missing encoder visible.",
      "After correction, Kaden reported restored video. This draft is a reflection on that case, not a field procedure or a record of a specific secure network.",
    ],
  },
  {
    slug: "linux-lab-baseline",
    title: "A baseline before the next service.",
    tag: "Linux & virtualization",
    date: "October 17, 2026",
    minutes: 2,
    project: "optiplex-linux-lab",
    summary:
      "A draft lab checklist for documenting hosts, remote access, and virtual machines.",
    body: [
      "The OptiPlex lab includes Ubuntu, SSH practice, and KVM/QEMU virtual machines.",
      "Suggested documentation for the next iteration: record the host OS, VM resources, access method, and a repeatable validation step. These are proposed notes, not a claim that every item has been captured.",
      "Updated October 23, 2026: Prometheus, Grafana and Uptime Kuma are installed in the personal lab, owner-reported pending artifacts. Capture sanitized configuration and alert evidence before claiming validated monitoring operation.",
    ],
  },
];
export function filterProjects(
  query = "",
  category = "All projects",
  specialty: Specialty = "All disciplines",
  delivery: Delivery | "All delivery states" = "All delivery states",
) {
  return projects.filter(
    (p) =>
      (category === "All projects" ||
        p.categories.includes(category as (typeof categories)[number])) &&
      (specialty === "All disciplines" || p.specialties.includes(specialty)) &&
      (delivery === "All delivery states" || p.delivery === delivery) &&
      `${p.name} ${p.summary} ${p.technologies.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
}
