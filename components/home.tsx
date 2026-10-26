"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Terminal,
  Network,
  Radio,
  Code2,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { projects, type Specialty, credentials } from "@/content/portfolio";
import {
  SystemsVisual,
  ProofStrip,
  SpecialtyPicker,
  ProjectCard,
  CareerTimeline,
  Socials,
} from "./ui";
import { SectionHeading, ContactBanner } from "./sections";
const lenses: Record<
  Specialty,
  { title: string; text: string; ids: string[] }
> = {
  "All disciplines": {
    title: "Different disciplines. One connected approach.",
    text: "Professional AV engineering is my foundation. Hands-on labs, product development, and continued learning are how I build outward.",
    ids: [
      "crestron-nvx-troubleshooting",
      "optiplex-linux-lab",
      "vector-learning",
    ],
  },
  "AV / UC": {
    title: "From the source to the experience.",
    text: "Professional experience integrating, diagnosing, and supporting AV and conferencing systems, backed by multi-vendor training.",
    ids: [
      "crestron-nvx-troubleshooting",
      "av-rack-restoration",
      "av-portfolio-suite",
    ],
  },
  Infrastructure: {
    title: "Following the connection. Understanding the system.",
    text: "Transferable network troubleshooting from professional AV, complemented by personal Linux, SSH, and virtualization labs.",
    ids: [
      "optiplex-linux-lab",
      "crestron-nvx-troubleshooting",
      "av-rack-restoration",
    ],
  },
  "Cloud / DevOps": {
    title: "A foundation for the next layer.",
    text: "Azure fundamentals, Linux lab practice, and developing deployment knowledge. Cloud and DevOps are active learning areas.",
    ids: [
      "optiplex-linux-lab",
      "cloud-devops-learning",
      "engineering-portfolio",
    ],
  },
  Software: {
    title: "Turning technical ideas into useful products.",
    text: "Explore Vector Learning, a public AV engineering toolkit, and the content-driven, AI-assisted website you are using now.",
    ids: ["vector-learning", "av-portfolio-suite", "engineering-portfolio"],
  },
};
export default function Home() {
  const [lens, setLens] = useState<Specialty>("All disciplines");
  const view = lenses[lens];
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <i />
            AV & IT SYSTEMS ENGINEER
          </span>
          <h1>
            Engineering
            <br />
            connected
            <br />
            <span>systems.</span>
          </h1>
          <p className="hero-description">
            I’m Kaden Diaz. I integrate enterprise AV systems, solve complex
            technical problems, and build across infrastructure, cloud, and
            software.
          </p>
          <div className="hero-buttons">
            <Link className="button" href="/projects/">
              Explore my work <ArrowUpRight size={17} />
            </Link>
            <Link className="button secondary" href="/resume/">
              View résumé <ArrowRight size={16} />
            </Link>
          </div>
          <div className="hero-current">
            <span className="status-dot" />
            <span>
              Currently <strong>Mid-Level AV Systems Engineer</strong>
              <br />
              <span className="current-company">
                at Geospatial and Cloud Analytics
              </span>
            </span>
          </div>
        </div>
        <SystemsVisual />
        <a className="scroll-cue" href="#selected-work">
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown size={15} />
        </a>
      </section>
      <section
        className="container proof-section"
        aria-label="Professional foundations"
      >
        <ProofStrip />
      </section>
      <section id="selected-work" className="section container">
        <SectionHeading
          number="01"
          label="SELECTED WORK"
          title="Real problems. Thoughtful solutions."
          description="An inside look at the systems I work on, the tools I build, and the things I’m learning."
          link="All projects"
          href="/projects/"
        />
        <SpecialtyPicker value={lens} onChange={setLens} />
        <div className="lens-summary" aria-live="polite">
          <h3>{view.title}</h3>
          <p>{view.text}</p>
        </div>
        <div className="project-grid">
          {view.ids.map((id, i) => (
            <ProjectCard
              key={id}
              project={projects.find((p) => p.slug === id)!}
              index={i}
            />
          ))}
        </div>
        <div className="work-note">
          <span className="status-dot" /> Every project includes its current
          status, evidence, and what comes next.
        </div>
      </section>
      <section className="approach-section">
        <div className="container approach-grid">
          <div>
            <span className="eyebrow">
              <span className="section-number">02</span>THE WAY I THINK
            </span>
            <h2>
              The details matter.
              <br />
              <span>So does the whole system.</span>
            </h2>
            <p>
              Great engineering lives at the connections. A video issue can be a
              configuration issue. A reliable deployment starts with a solid
              systems foundation.
            </p>
            <p>
              I bring a hands-on troubleshooting mindset to my work—and a
              willingness to keep learning beyond it.
            </p>
            <Link className="text-link" href="/about/">
              A little more about me <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="domain-list">
            {[
              {
                Icon: Radio,
                title: "AV & unified communications",
                text: "My professional foundation",
                label: "PROFESSIONAL",
              },
              {
                Icon: Network,
                title: "Networks & infrastructure",
                text: "Connecting experience with hands-on labs",
                label: "PROFESSIONAL + LAB",
              },
              {
                Icon: Terminal,
                title: "Cloud & DevOps",
                text: "Building the foundations for what’s next",
                label: "LEARNING",
              },
              {
                Icon: Code2,
                title: "Software & technical products",
                text: "Making ideas usable through product work",
                label: "PROJECTS",
              },
            ].map(({ Icon, title, text, label }, i) => (
              <Link key={title} href="/skills/">
                <span className="domain-icon">
                  <Icon size={23} strokeWidth={1.4} />
                </span>
                <span>
                  <small>
                    0{i + 1} / {label}
                  </small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </span>
                <ArrowUpRight size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section container journey-section">
        <div>
          <SectionHeading
            number="03"
            label="PROFESSIONAL JOURNEY"
            title="Growing through the work."
            description="From an AV internship to mid-level systems engineering, with hands-on responsibility at every step."
          />
          <div className="journey-callout">
            <span className="micro">CURRENT FOCUS</span>
            <h3>
              Engineering. Troubleshooting.
              <br />
              Helping others move forward.
            </h3>
            <p>
              Federal AV/VTC support, networked systems, and technical
              mentoring—paired with a growing personal engineering lab.
            </p>
            <Link className="text-link" href="/experience/">
              Explore my experience <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <CareerTimeline compact />
      </section>
      <section className="credential-section">
        <div className="container">
          <SectionHeading
            number="04"
            label="CREDENTIALS & CONTINUED LEARNING"
            title="Built on a learning mindset."
            description="Professional credentials and completed vendor training, with active learning kept in view."
            href="/certifications/"
            link="Explore all credentials"
          />
          <div className="credential-highlights">
            {credentials
              .filter((c) =>
                [
                  "CAVT",
                  "Dante Level 3",
                  "DMC-E",
                  "NAV Pro AV over IP",
                ].includes(c.name),
              )
              .map((c) => (
                <Link href="/certifications/" key={c.name}>
                  <span className="credential-logo">
                    {c.issuer === "Audinate" ? "Dante" : c.issuer.toUpperCase()}
                  </span>
                  <h3>{c.name}</h3>
                  <span>{c.type}</span>
                  <div>
                    <CheckCircle2 size={14} /> Owner-reported completed
                  </div>
                </Link>
              ))}
          </div>
          <div className="learning-line">
            <GraduationCap size={19} />
            <span>
              <b>Still learning, always.</b> Biamp Field Engineer · Fortinet NSE
              1–3 · Q-SYS Level 1 <span className="muted">— in progress</span>
            </span>
          </div>
        </div>
      </section>
      <section className="journal-home container section">
        <SectionHeading
          number="05"
          label="THE LAB JOURNAL"
          title="Notes from the process."
          href="/journal/"
          link="Open the journal"
        />
        <div className="journal-preview">
          <span className="micro">DRAFT / AV TROUBLESHOOTING</span>
          <Link href="/journal/nvx-signal-flow/">
            <h3>Start with the signal path.</h3>
            <p>
              Why endpoint roles belong early in the troubleshooting process.
            </p>
          </Link>
          <span className="journal-read">
            3 min read <ArrowUpRight size={19} />
          </span>
        </div>
      </section>
      <ContactBanner />
      <div className="home-social-note container">
        <span>FIND ME ELSEWHERE</span>
        <Socials />
      </div>
    </>
  );
}
