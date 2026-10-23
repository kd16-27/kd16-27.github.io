"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import {
  projects,
  categories,
  filterProjects,
  credentials,
  skills,
  type Specialty,
  deliveryStates,
  type Delivery,
} from "@/content/portfolio";
import { SpecialtyPicker, ProjectCard, Badge } from "./ui";
import { EmptyState } from "./sections";
export function ProjectExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All projects");
  const [specialty, setSpecialty] = useState<Specialty>("All disciplines");
  const [status, setStatus] = useState("All statuses");
  const [delivery, setDelivery] = useState<Delivery | "All delivery states">(
    "All delivery states",
  );
  const filtered = filterProjects(query, category, specialty, delivery).filter(
    (p) => status === "All statuses" || p.status === status,
  );
  return (
    <>
      <SpecialtyPicker value={specialty} onChange={setSpecialty} />
      <div className="filter-panel">
        <label className="search-wrap">
          <Search size={16} />
          <input
            aria-label="Search projects"
            placeholder="Search projects, technologies, or topics…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Project category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All projects</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="Project status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {["All statuses", "Completed", "In Progress", "Planned"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          aria-label="Project delivery evidence"
          value={delivery}
          onChange={(e) =>
            setDelivery(e.target.value as Delivery | "All delivery states")
          }
        >
          <option>All delivery states</option>
          {deliveryStates.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>
      </div>
      <div className="results-line">
        <span role="status">
          {filtered.length} of {projects.length} projects · evidence and status
          included
        </span>
        <button
          className="reset-button"
          onClick={() => {
            setQuery("");
            setCategory("All projects");
            setSpecialty("All disciplines");
            setStatus("All statuses");
            setDelivery("All delivery states");
          }}
        >
          Reset filters
        </button>
      </div>
      <div className="project-grid">
        {filtered.length ? (
          filtered.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
}
export function CredentialExplorer() {
  const [query, setQuery] = useState("");
  const [issuer, setIssuer] = useState("All organizations");
  const [status, setStatus] = useState("All statuses");
  const filtered = credentials.filter(
    (c) =>
      (issuer === "All organizations" || c.issuer === issuer) &&
      (status === "All statuses" || c.status === status) &&
      `${c.name} ${c.issuer} ${c.type} ${c.skills.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="filter-panel">
        <label className="search-wrap">
          <Search size={16} />
          <input
            aria-label="Search certifications and training"
            placeholder="Search credentials, organizations, or skills…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Credential organization"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
        >
          <option>All organizations</option>
          {[...new Set(credentials.map((c) => c.issuer))].sort().map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
        <select
          aria-label="Credential status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {["All statuses", "Completed", "In Progress", "Planned"].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="results-line">
        <span role="status">
          {filtered.length} credentials and training records
        </span>
        <button
          className="reset-button"
          onClick={() => {
            setQuery("");
            setIssuer("All organizations");
            setStatus("All statuses");
          }}
        >
          Reset filters
        </button>
      </div>
      <div className="credential-grid">
        {filtered.map((c) => (
          <article className="credential-card" key={`${c.issuer}-${c.name}`}>
            <div className="credential-card-top">
              <span className="issuer">{c.issuer}</span>
              <Badge status={c.status} />
            </div>
            <h3>{c.name}</h3>
            <p>
              {c.type} · {c.skills.join(", ")}
            </p>
            <span className="credential-evidence">
              {c.status === "Completed"
                ? "Owner-reported completion"
                : "Active learning track"}{" "}
              · {c.earnedDate ?? "Date not supplied"}
              <br />
              {c.url ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer">
                  View credential ↗
                </a>
              ) : (
                "Public credential link not supplied"
              )}
            </span>
          </article>
        ))}
        {!filtered.length ? <EmptyState /> : null}
      </div>
    </>
  );
}
export function SkillsExplorer() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<Specialty>("All disciplines");
  const [evidence, setEvidence] = useState("All evidence types");
  const filtered = skills.filter(
    (s) =>
      (specialty === "All disciplines" || s.specialties.includes(specialty)) &&
      (evidence === "All evidence types" || s.evidence === evidence) &&
      `${s.name} ${s.description} ${s.tools.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <SpecialtyPicker value={specialty} onChange={setSpecialty} />
      <div className="filter-panel">
        <label className="search-wrap">
          <Search size={16} />
          <input
            aria-label="Search skills"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills and technologies…"
          />
        </label>
        <select
          aria-label="Skill evidence type"
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
        >
          {[
            "All evidence types",
            "Professional experience",
            "Hands-on lab",
            "Coursework",
            "Active learning",
          ].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="results-line">
        <span role="status">{filtered.length} competency areas</span>
        <button
          className="reset-button"
          onClick={() => {
            setQuery("");
            setSpecialty("All disciplines");
            setEvidence("All evidence types");
          }}
        >
          Reset filters
        </button>
      </div>
      <div className="skills-grid">
        {filtered.map((s, i) => (
          <article className="skill-card" key={s.name}>
            <div className="card-meta">
              <span>0{i + 1} / COMPETENCY</span>
              <span className="skill-evidence">{s.evidence}</span>
            </div>
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <div className="tags">
              {s.tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link className="text-link" href={`/projects/${s.project}/`}>
              Related project & evidence <ArrowUpRight size={14} />
            </Link>
            {s.evidence === "Professional experience" ? (
              <Link
                className="text-link"
                style={{ marginLeft: 16 }}
                href="/experience/"
              >
                Work experience <ArrowUpRight size={14} />
              </Link>
            ) : s.evidence === "Coursework" ||
              s.evidence === "Active learning" ? (
              <Link
                className="text-link"
                style={{ marginLeft: 16 }}
                href="/certifications/"
              >
                Training <ArrowUpRight size={14} />
              </Link>
            ) : null}
          </article>
        ))}
        {!filtered.length ? <EmptyState /> : null}
      </div>
    </>
  );
}
