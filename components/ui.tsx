"use client";
import { Github, Linkedin } from "@/components/brand-icons";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ArrowRight,
  Sun,
  Moon,
  Menu,
  X,
  Copy,
  Check,
  Mail,
  Network,
  Server,
  Cloud,
  Code2,
  Radio,
  Layers,
  Monitor,
  Activity,
  ShieldCheck,
} from "lucide-react";
import {
  profile,
  specialties,
  type Specialty,
  type Project,
} from "@/content/portfolio";
const nav = [
  ["Home", "/"],
  ["About", "/about/"],
  ["Projects", "/projects/"],
  ["Skills", "/skills/"],
  ["Experience", "/experience/"],
  ["Credentials", "/certifications/"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const mobileToggle = useRef<HTMLButtonElement>(null);
  const mobileNavigation = useRef<HTMLElement>(null);
  const desktopNavigation = useRef<HTMLElement>(null);
  const hiddenBreakpointFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("kd-theme");
    const isLight = stored === "light";
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
  }, []);
  useEffect(() => {
    const mobileViewport = window.matchMedia("(max-width: 680px)");
    function handleBreakpoint(event: MediaQueryListEvent) {
      // Browsers can blur a newly hidden link before delivering the media event.
      const focused =
        document.activeElement === document.body
          ? (hiddenBreakpointFocus.current ?? document.activeElement)
          : document.activeElement;
      hiddenBreakpointFocus.current = null;
      if (
        !event.matches &&
        (focused === mobileToggle.current ||
          mobileNavigation.current?.contains(focused))
      ) {
        desktopNavigation.current?.querySelector("a")?.focus();
      } else if (
        event.matches &&
        desktopNavigation.current?.contains(focused)
      ) {
        mobileToggle.current?.focus();
      }
      setOpen(false);
    }
    mobileViewport.addEventListener("change", handleBreakpoint);
    return () => mobileViewport.removeEventListener("change", handleBreakpoint);
  }, []);
  function closeMenu(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) mobileToggle.current?.focus();
  }
  function navigationLinks(restoreFocus = false) {
    return nav.map(([name, url]) => (
      <Link
        key={url}
        href={url}
        aria-current={path === url ? "page" : undefined}
        onClick={() => closeMenu(restoreFocus)}
      >
        {name}
      </Link>
    ));
  }
  function toggle() {
    const next = document.documentElement.dataset.theme !== "light";
    setLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    localStorage.setItem("kd-theme", next ? "light" : "dark");
  }
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header
        className="header"
        onKeyDown={(event) => {
          if (event.key === "Escape" && open) {
            event.preventDefault();
            closeMenu(true);
          }
        }}
        onBlur={(event) => {
          hiddenBreakpointFocus.current =
            !event.relatedTarget && event.target.getClientRects().length === 0
              ? event.target
              : null;
          if (!event.currentTarget.contains(event.relatedTarget)) {
            closeMenu();
          }
        }}
      >
        <div className="container header-inner">
          <Link
            href="/"
            className="brand"
            onClick={() => setOpen(false)}
            aria-label="Kaden Diaz home"
          >
            <span className="brand-mark">
              k<span> d</span>
              <i />
            </span>
            <span>
              KADEN DIAZ
              <span className="brand-sub">
                ENGINEER · BUILDER · PROBLEM SOLVER
              </span>
            </span>
          </Link>
          <nav
            ref={desktopNavigation}
            aria-label="Main navigation"
            className="nav desktop-nav"
          >
            {navigationLinks()}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-toggle"
              onClick={toggle}
              aria-label="Toggle color theme"
            >
              {light ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <Link className="button small contact-nav" href="/contact/">
              Let’s connect <ArrowUpRight size={14} />
            </Link>
            <button
              ref={mobileToggle}
              className="icon-button mobile-toggle"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
          <nav
            ref={mobileNavigation}
            id="mobile-navigation"
            aria-label="Main navigation"
            className={open ? "nav mobile-nav is-open" : "nav mobile-nav"}
          >
            {navigationLinks(true)}
          </nav>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Link className="brand" href="/">
            <span className="brand-mark">
              k<span> d</span>
              <i />
            </span>
            <span>
              KADEN DIAZ
              <span className="brand-sub">
                CONNECTING SYSTEMS. EXPANDING POSSIBILITIES.
              </span>
            </span>
          </Link>
          <div className="footer-links">
            <Link href="/journal/">Lab journal</Link>
            <Link href="/education/">Education</Link>
            <Link href="/resume/">Résumé</Link>
            <Link href="/contact/">Contact</Link>
          </div>
          <Socials />
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Kaden Diaz. Built with intention.
          </span>
          <span>Conceptual diagrams. Real learning. Documented progress.</span>
          <Link href="/privacy/">Privacy & content</Link>
        </div>
      </div>
    </footer>
  );
}
export function Socials() {
  return (
    <div className="socials">
      <a
        href={profile.github}
        aria-label="Kaden Diaz on GitHub"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={18} />
      </a>
      <a
        href={profile.linkedin}
        aria-label="Kaden Diaz on LinkedIn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin size={18} />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email Kaden Diaz">
        <Mail size={18} />
      </a>
    </div>
  );
}
export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFailed(true);
    }
  }
  return (
    <>
      <button className="button secondary" onClick={copy}>
        {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
        {copied ? "Email copied" : "Copy email"}
      </button>
      <span role="status" className="copy-status">
        {failed ? profile.email : copied ? "Copied to clipboard." : ""}
      </span>
    </>
  );
}
export function SpecialtyPicker({
  value,
  onChange,
}: {
  value: Specialty;
  onChange: (v: Specialty) => void;
}) {
  return (
    <div className="specialty-control">
      <span className="micro">EXPLORE MY WORK THROUGH YOUR LENS</span>
      <div className="tabs" role="group" aria-label="Recruiter specialty view">
        {specialties.map((s) => (
          <button
            key={s}
            aria-pressed={value === s}
            onClick={() => onChange(s)}
          >
            {s === "All disciplines" ? <Layers size={14} /> : null}
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
export function Badge({ status }: { status: string }) {
  return (
    <span
      className={`badge ${status === "Completed" ? "completed" : status === "Planned" ? "planned" : "progress"}`}
    >
      <i />
      {status === "In Progress" ? "In progress" : status}
    </span>
  );
}
export function ProjectCard({
  project: p,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <article className="project-card">
      <Link
        href={`/projects/${p.slug}/`}
        className="project-visual-link"
        aria-label={`Read ${p.name} case study`}
      >
        <ProjectVisual type={p.visual} />
        <span className="visual-num">0{index + 1} / CASE STUDY</span>
        <span className="visual-arrow">
          <ArrowUpRight size={19} />
        </span>
      </Link>
      <div className="project-card-content">
        <div className="card-meta">
          <span>
            {p.category === "Linux and Systems Administration"
              ? "LINUX & INFRASTRUCTURE"
              : p.category.toUpperCase()}
          </span>
          <Badge status={p.status} />
        </div>
        <h3>
          <Link href={`/projects/${p.slug}/`}>{p.name}</Link>
        </h3>
        <p>{p.summary}</p>
        <p className="delivery-context">{p.delivery}</p>
        <div className="tags">
          {p.technologies.slice(0, 3).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <Link className="text-link" href={`/projects/${p.slug}/`}>
          Explore case study <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}
export function ProjectVisual({ type }: { type: Project["visual"] }) {
  return (
    <div className={`project-visual ${type}`} aria-hidden="true">
      {type === "nvx" ? (
        <div className="nvx-flow">
          <div className="device-box">
            <Monitor />
            <span>SOURCE</span>
          </div>
          <span className="flow-line" />
          <div className="device-box">
            <Radio />
            <span>ENCODER</span>
          </div>
          <span className="flow-line" />
          <div className="device-box">
            <Network />
            <span>NETWORK</span>
          </div>
          <span className="flow-line" />
          <div className="device-box">
            <Monitor />
            <span>DECODER</span>
          </div>
          <span className="flow-label">
            SIGNAL PATH / RESTORED <i />
          </span>
        </div>
      ) : type === "lab" ? (
        <div className="lab-visual">
          <div className="terminal">
            <div>
              <i />
              <i />
              <i />
              <span>kaden@optiplex: ~</span>
            </div>
            <p>
              <b>~ $</b> virsh list --all
              <br />
              <span> Id Name State</span>
              <br /> 1 ubuntu-lab <em>running</em>
              <br />
              <b>~ $</b> ssh lab-host<span className="cursor">_</span>
            </p>
          </div>
          <div className="server-tower">
            <Server size={35} />
            <span>790 / 7050</span>
            <i />
          </div>
          <small>ILLUSTRATIVE TERMINAL · NOT A CAPTURE</small>
        </div>
      ) : type === "vector" ? (
        <div className="vector-visual">
          <div className="vector-symbol">
            v<span>↗</span>
          </div>
          <span className="vector-title">
            vector<span>learning</span>
          </span>
          <small>LEARN WITH DIRECTION.</small>
          <div className="vector-path">
            <i />
            <span />
            <i />
            <span />
            <i />
          </div>
        </div>
      ) : type === "rack" ? (
        <div className="rack-visual">
          {[
            "CONTROL PROCESSOR",
            "MEDIA DISTRIBUTION",
            "NETWORK SWITCH",
            "AUDIO PROCESSING",
          ].map((x, i) => (
            <div key={x}>
              <span>0{i + 1}</span>
              <b>{x}</b>
              <i />
              <i />
              <i />
            </div>
          ))}
        </div>
      ) : type === "suite" ? (
        <div className="suite-visual">
          <Activity size={32} />
          <b>ROOM HEALTH</b>
          <span>SIMULATED LAB DASHBOARD</span>
          <div>
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <small>DESIGN → CALCULATE → VALIDATE</small>
        </div>
      ) : type === "cloud" ? (
        <div className="cloud-visual">
          <Cloud size={64} strokeWidth={1} />
          <div>
            <Code2 />
            <span>→</span>
            <Server />
            <span>→</span>
            <Activity />
          </div>
          <small>FOUNDATIONS / LEARNING IN PROGRESS</small>
        </div>
      ) : (
        <div className="portfolio-visual">
          <Code2 size={40} />
          <strong>
            kaden<span>.build</span>
          </strong>
          <span>CONTENT → COMPONENTS → DEPLOY</span>
        </div>
      )}
    </div>
  );
}
const domainInfo = [
  {
    id: "av",
    name: "AV SYSTEMS",
    sub: "Professional experience",
    label:
      "Enterprise AV, control, conferencing, and signal-flow troubleshooting.",
    Icon: Radio,
  },
  {
    id: "net",
    name: "NETWORKING",
    sub: "Professional + lab",
    label:
      "AV-over-IP, endpoint connectivity, TCP/IP, and network configuration.",
    Icon: Network,
  },
  {
    id: "infra",
    name: "INFRASTRUCTURE",
    sub: "Hands-on lab",
    label: "Ubuntu Linux, SSH, KVM/QEMU, and OptiPlex virtual machines.",
    Icon: Server,
  },
  {
    id: "cloud",
    name: "CLOUD",
    sub: "Training + learning",
    label: "Azure fundamentals and a developing cloud/DevOps learning track.",
    Icon: Cloud,
  },
  {
    id: "code",
    name: "SOFTWARE",
    sub: "Products + projects",
    label:
      "Vector Learning, AV Portfolio Suite, and this AI-assisted portfolio.",
    Icon: Code2,
  },
];
export function SystemsVisual() {
  const [selected, setSelected] = useState("av");
  const current = domainInfo.find((x) => x.id === selected)!;
  return (
    <div className="systems-visual">
      <div className="diagram-header">
        <span>
          <i /> CONNECTED SYSTEMS
        </span>
        <span>CONCEPTUAL ARCHITECTURE</span>
      </div>
      <div className="systems-stage">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <svg className="system-lines" viewBox="0 0 560 440" aria-hidden="true">
          <defs>
            <linearGradient id="line">
              <stop stopColor="#2b5673" />
              <stop offset=".5" stopColor="#5bd9e6" />
              <stop offset="1" stopColor="#2b5673" />
            </linearGradient>
          </defs>
          <path d="M280 215 C220 215 160 110 110 110 M280 215 C340 215 400 110 450 110 M280 215 L280 55 M280 215 C220 215 160 335 110 335 M280 215 C340 215 400 335 450 335" />
          <circle cx="280" cy="160" r="3" />
          <circle cx="186" cy="155" r="3" />
          <circle cx="373" cy="280" r="3" />
        </svg>
        <div className="systems-center">
          <div className="center-top">
            <Layers size={39} strokeWidth={1.2} />
          </div>
          <div className="center-label">
            SYSTEMS THINKING<span>ONE CONNECTED APPROACH</span>
          </div>
        </div>
        {domainInfo.map(({ id, name, sub, Icon }) => (
          <button
            className={`system-node node-${id} ${selected === id ? "selected" : ""}`}
            key={id}
            onClick={() => setSelected(id)}
            aria-pressed={selected === id}
          >
            <Icon size={24} strokeWidth={1.4} />
            <strong>{name}</strong>
            <span>{sub}</span>
          </button>
        ))}
        <div className="coordinate coord-a">+ 001.025</div>
        <div className="coordinate coord-b">+ SYS.ARCH</div>
      </div>
      <div className="diagram-caption" role="status">
        <span className="mini-index">
          0{domainInfo.findIndex((x) => x.id === selected) + 1}
        </span>
        <p>
          <strong>{current.name.toLowerCase()}</strong>
          {current.label}
        </p>
        <span className="caption-arrow">↗</span>
      </div>
    </div>
  );
}
export function ConceptDiagram({ nodes }: { nodes: string[] }) {
  return (
    <figure className="concept-diagram">
      <figcaption>
        <span className="micro">LOGICAL ARCHITECTURE</span>
        <span>Illustrative · sanitized</span>
      </figcaption>
      <div>
        {nodes.map((n, i) => (
          <div className="concept-item" key={n}>
            <span className="concept-step">
              <span>0{i + 1}</span>
              {i === 0 ? (
                <Monitor size={21} />
              ) : i === nodes.length - 1 ? (
                <Activity size={21} />
              ) : (
                <Network size={21} />
              )}
              <b>{n}</b>
            </span>
            {i < nodes.length - 1 ? (
              <ArrowRight className="concept-arrow" size={20} />
            ) : null}
          </div>
        ))}
      </div>
    </figure>
  );
}
export function CareerTimeline({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState("mid");
  return (
    <div className={compact ? "timeline compact" : "timeline"}>
      {requireExperience().map((e, i) => (
        <article
          className={active === e.id ? "timeline-item active" : "timeline-item"}
          key={e.id}
        >
          <span className="timeline-dot" />
          <div className="timeline-date">{e.period}</div>
          <button
            onClick={() => setActive(active === e.id ? "" : e.id)}
            aria-expanded={active === e.id}
            aria-controls={`detail-${e.id}`}
          >
            <span className="timeline-index">
              0{requireExperience().length - i}
            </span>
            <span>
              <small>{e.company}</small>
              <h3>{e.role}</h3>
            </span>
            <span className="expand-sign">{active === e.id ? "−" : "+"}</span>
          </button>
          <div id={`detail-${e.id}`} hidden={active !== e.id}>
            <p>{e.text}</p>
            {!compact ? (
              <ul>
                {e.details.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ) : null}
            <div className="tags">
              {e.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
import { experience } from "@/content/portfolio";
function requireExperience() {
  return experience;
}
export function PrintButton() {
  return (
    <button className="button" onClick={() => window.print()}>
      Print résumé <ArrowUpRight size={16} />
    </button>
  );
}
export function ProofStrip() {
  return (
    <div className="proof-strip">
      <div>
        <ShieldCheck size={23} />
        <p>
          <strong>{profile.clearance}</strong>
          <span>Owner-reported clearance</span>
        </p>
      </div>
      <div>
        <Radio size={23} />
        <p>
          <strong>Multi-vendor AV</strong>
          <span>Crestron · Extron · Dante</span>
        </p>
      </div>
      <div>
        <Server size={23} />
        <p>
          <strong>Hands-on infrastructure</strong>
          <span>Linux · SSH · Virtualization</span>
        </p>
      </div>
      <div>
        <Code2 size={23} />
        <p>
          <strong>Always building</strong>
          <span>Labs · Products · Software</span>
        </p>
      </div>
    </div>
  );
}

export function InPageNavigation({ items }: { items: string[][] }) {
  const [active, setActive] = useState("overview");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px", threshold: 0 },
    );
    for (const [id] of items) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);
  return (
    <nav className="case-toc" aria-label="Case study sections">
      <span className="micro">IN THIS CASE STUDY</span>
      {items.map(([id, label]) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? "location" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
