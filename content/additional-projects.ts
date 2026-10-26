/** Only inspected public facts and explicit owner-requested plans belong here. */
export const additionalProjects = [
  {
    slug: "av-integrity-lab",
    name: "AV Integrity Lab",
    shortName: "Know what changed.",
    category: "Engineering Tools",
    categories: [
      "Engineering Tools",
      "AV Engineering",
      "Software Development",
      "Cybersecurity",
    ],
    status: "In Progress",
    delivery: "Locally tested prototype",
    reviewedOn: "2026-10-23",
    verificationNote:
      "Public repository contains saved PASS, CHANGED, MISSING and field-difference evidence. A separate Python companion passed 19 local CLI tests; the original PowerShell was not executed.",
    evidenceLinks: [
      "https://github.com/kd16-27/AV-Integrity-Lab-20260926-175340",
    ],
    evidence: "Public source",
    summary:
      "A PowerShell configuration checker that combines SHA-256 fingerprints with top-level JSON field comparisons, using fictional AV data.",
    technologies: ["PowerShell", "SHA-256", "JSON", "Configuration validation"],
    specialties: ["AV / UC", "Software", "Infrastructure"],
    visual: "suite",
    overview:
      "A personal AV configuration-integrity lab. Version 2 retains a byte-level hash and the original top-level settings so a report can identify modified, added and removed fields.",
    objective:
      "Make configuration drift visible through a small, inspectable tool and repeatable fictional test scenarios.",
    contributions: [
      "The repository documents Kaden's practice with PowerShell, file paths, execution-policy troubleshooting and JSON reports.",
      "The public version history and saved evidence are the supporting artifacts; independent execution during this audit is not claimed.",
    ],
    implementation: [
      "Read-Config validates a JSON object before comparison.",
      "Baseline mode refuses to replace an existing version 2 baseline.",
      "Check mode reports PASS, CHANGED, MISSING or INVALID and writes timestamped JSON.",
      "Top-level fields are compared by name; nested values are compared as whole values.",
    ],
    challenge:
      "A byte-level hash detects formatting changes as well as semantic changes. The report must distinguish field differences from changed bytes with matching top-level values.",
    result:
      "The public README and saved reports record unchanged, modified, missing, added and removed cases. Those are historical repository results. A separate local Python companion now passes 19 CLI tests and correctly detects existing byte drift in the supplied configuration: its SHA-256 starts 209AB01F, while baseline-v2 records 1197A628, despite equal top-level values. The cause is unestablished and historical PASS files are retained. The original baseline and PowerShell remain unchanged; no real AV fleet deployment or fresh PowerShell run is claimed.",
    lessons:
      "An integrity check depends on a trusted baseline. An attacker who can edit both baseline and configuration can defeat this tool; it is not an authorization system.",
    nextSteps: [
      "Reproduce the documented checks on the intended PowerShell environment.",
      "Add an automated test harness and protect baseline storage.",
      "Keep future demonstrations synthetic and isolated from employer configurations.",
    ],
    nodes: [
      "Fictional configuration",
      "Trusted baseline",
      "Hash + field comparison",
      "Status report",
      "Human review",
    ],
    source: "https://github.com/kd16-27/AV-Integrity-Lab-20260926-175340",
    evidenceNote:
      "Source and README inspected October 22, 2026 at repository tree a109075471c3c23050c64cb7814e9ac4bfc4e750. Existing test records are historical evidence, not new execution results.",
  },
  {
    slug: "cloud-task-suite",
    name: "Cloud Task Suite",
    shortName: "Four tasks. One practical lab.",
    category: "Software Development",
    categories: [
      "Software Development",
      "Cloud Infrastructure",
      "Cybersecurity",
      "AI and Learning Technology",
    ],
    status: "In Progress",
    delivery: "Locally tested prototype",
    reviewedOn: "2026-10-23",
    verificationNote:
      "The public September 28 verification receipt reports 31 application tests on temporary SQLite databases. AWS, PostgreSQL runtime and browser acceptance remain unverified. An improved separate local copy passed 34 SQLite application tests on October 23.",
    evidenceLinks: [
      "https://github.com/kd16-27/cloud-task-suite/blob/main/evidence/verification-status.json",
      "https://github.com/kd16-27/cloud-task-suite",
    ],
    evidence: "Public source",
    summary:
      "A Flask learning application covering duplicate detection, protected records, atomic reservations and a source-labeled retrieval chatbot.",
    technologies: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "SQLite",
      "Retrieval",
      "CloudFormation",
    ],
    specialties: ["Software", "Cloud / DevOps"],
    visual: "cloud",
    overview:
      "Four assignment modules share a Python application, authentication and storage. The repository includes a local SQLite implementation and an AWS deployment template; the latter is a design artifact rather than a running cloud service.",
    objective:
      "Practice application data integrity, access controls, transaction behavior and retrieval-based support through inspectable implementations.",
    contributions: [
      "The public repository is maintained under Kaden's GitHub account and describes an assignment lab prepared for him.",
      "Individual authorship and independently completed exercises should be logged separately from generated implementation and historical test records.",
    ],
    implementation: [
      "Canonicalization, fingerprints and uniqueness checks support duplicate review.",
      "Bound SQL and account ownership checks protect record operations; the application includes encryption and scoped tokens.",
      "Reservations use server-controlled fares, atomic seat handling and idempotent requests.",
      "The chatbot uses TF-IDF/cosine retrieval with curated support patterns, source labels and an uncertainty fallback; it is not a generative AI assistant.",
    ],
    challenge:
      "A validated cloud template and passing SQLite tests cannot establish PostgreSQL behavior, real scaling or a successful cloud deployment.",
    result:
      "The September 28 repository receipt reports 31 application checks and 25/25 tuned development chatbot cases. The latter is not an independent accuracy benchmark. Browser, Windows, Docker, PostgreSQL runtime and AWS deployment were unverified in that receipt; the separate improved local copy passed 34 SQLite tests on October 23. Those local checks do not upgrade the unverified runtime/deployment statuses.",
    lessons:
      "Match each claim to the environment actually tested. Static infrastructure validation, local application tests and a deployed service are different evidence layers.",
    nextSteps: [
      "Reproduce local tests and complete browser acceptance with fictional records.",
      "Validate the intended PostgreSQL and Windows environments separately.",
      "Review costs and obtain explicit authorization before any AWS deployment.",
    ],
    nodes: [
      "Browser",
      "Flask / Waitress",
      "Application modules",
      "SQLite local storage",
      "Test evidence",
    ],
    source: "https://github.com/kd16-27/cloud-task-suite",
    evidenceNote:
      "README, requirements and verification-status.json inspected October 22, 2026 at tree 13bcb936264f816a1df75147fb8c51838ec29451. No cloud resources created. Historical public records are preserved separately from the new 34-test local run.",
  },
  {
    slug: "av-operations-command-center",
    name: "AV Operations Command Center",
    shortName: "Connecting operations with evidence.",
    category: "AV Engineering",
    categories: [
      "AV Engineering",
      "Software Development",
      "DevOps and Automation",
    ],
    status: "In Progress",
    delivery: "Platform prototype",
    reviewedOn: "2026-10-23",
    verificationNote:
      "Connected Base44 account confirms the existing app and ready status. Seven entity schemas were inspected. Source code and working interactions were unavailable; ready is not proof of public deployment or passing tests.",
    evidenceLinks: [],
    evidence: "Platform schema review",
    summary:
      "An existing Base44 application with data models for AV rooms, devices, incidents, maintenance, knowledge and activity history.",
    technologies: [
      "Base44",
      "Managed entities",
      "JSON schema",
      "Operations modeling",
    ],
    specialties: ["AV / UC", "Software", "Infrastructure"],
    visual: "suite",
    overview:
      "AV Operations Command Center is an existing, separate Base44 application. The connected account exposes seven model definitions: Room, Device, Incident, MaintenanceTask, KnowledgeArticle, ActivityLog and User. This is not one of the Lovable portfolio prototypes.",
    objective:
      "Organize AV operational concepts around rooms, equipment, incident response, maintenance work and reusable knowledge.",
    contributions: [
      "Kaden identifies this as his existing Base44 project and authorized a read-only portfolio audit.",
      "Model structure was inspected through the connected integration; code authorship, implementation details and operational outcomes were not independently established.",
    ],
    implementation: [
      "Room and Device schemas describe health/status and equipment relationships.",
      "Incident defines impact, urgency, priority, response deadlines, resolution and verification notes, with a simulation marker.",
      "MaintenanceTask defines task type, frequency, due date and completion state.",
      "KnowledgeArticle and ActivityLog define troubleshooting records and activity metadata; User defines platform role values.",
      "These are verified schema capabilities, not proof that every screen, workflow or access policy works.",
    ],
    challenge:
      "A platform-ready state, entity schema and screenshot cannot establish the implementation stack, authorization quality or real-world reliability.",
    result:
      "The existing app and seven schemas are verified. No public deployment URL or corresponding GitHub repository was confirmed. Source-reading tools require a higher Base44 plan; no upgrade, builder turn, original-app change or duplicate application was created.",
    lessons:
      "Inspect actual artifacts and distinguish model design from implemented behavior. Labels such as simulated or admin require enforcement in code; a schema alone does not prove it.",
    nextSteps: [
      "Review an owner-provided source export when available, without requiring a paid upgrade.",
      "Use fictional fixtures to verify incident state rules and maintenance dates in a separate local QA package.",
      "Verify server-side access policies, UI flows and sanitized demo evidence before making deployment or operational claims.",
    ],
    nodes: [
      "Room model",
      "Device model",
      "Incident model",
      "Maintenance model",
      "Knowledge + activity",
    ],
    evidenceNote:
      "Base44 project identity, ready state and entity schemas inspected read-only on October 22, 2026. Actual records, addresses, staff details and credentials were not copied. Public deployment, frontend framework and live telemetry remain unverified.",
  },
];
