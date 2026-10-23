import { Github } from "@/components/brand-icons";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { projects, skills, siteUrl } from "@/content/portfolio";
import {
  Badge,
  ProjectVisual,
  ConceptDiagram,
  ProjectCard,
  InPageNavigation,
} from "@/components/ui";
import { EvidenceNote, SectionHeading } from "@/components/sections";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p
    ? {
        title: p.name,
        description: p.summary,
        alternates: { canonical: `/projects/${p.slug}/` },
        openGraph: {
          title: p.name,
          description: p.summary,
          url: `${siteUrl}/projects/${p.slug}/`,
          type: "website",
          siteName: "Kaden Diaz",
          images: [
            {
              url: "/og.png",
              width: 1200,
              height: 630,
              alt: "Kaden Diaz — Engineering connected systems",
            },
          ],
        },
      }
    : { title: "Project not found" };
}
const sections = [
  ["overview", "Overview"],
  ["architecture", "Architecture"],
  ["contributions", "Contributions"],
  ["implementation", "Implementation"],
  ["troubleshooting", "Troubleshooting"],
  ["results", "Results & evidence"],
  ["skills", "Skills demonstrated"],
  ["lessons", "Lessons & next steps"],
];
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = projects
    .filter(
      (x) =>
        x.slug !== p.slug && x.categories.some((c) => p.categories.includes(c)),
    )
    .slice(0, 2);
  const relatedSkills = skills.filter((s) => s.project === p.slug);
  return (
    <>
      <section className="container case-intro">
        <Link href="/projects/" className="breadcrumb">
          <ArrowLeft size={13} /> Back to projects
        </Link>
        <div className="case-heading">
          <div>
            <span className="eyebrow">
              {p.category.toUpperCase()} / CASE STUDY
            </span>
            <Badge status={p.status} />
            <h1>{p.name}</h1>
            <p>{p.summary}</p>
            <div className="tags">
              {p.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <aside className="case-summary">
            <dl>
              <dt>Evidence type</dt>
              <dd>{p.evidence}</dd>
              <dt>Project status</dt>
              <dd>{p.status}</dd>
              <dt>Content reviewed</dt>
              <dd>{p.reviewedOn}</dd>
              <dt>Delivery evidence</dt>
              <dd>{p.delivery}</dd>
            </dl>
          </aside>
        </div>
        <div className="case-visual">
          <ProjectVisual type={p.visual} />
        </div>
      </section>
      <div className="container case-body">
        <InPageNavigation items={sections} />
        <div>
          <section className="case-section" id="overview">
            <h2>Overview & objective</h2>
            <p>{p.overview}</p>
            <p>{p.objective}</p>
          </section>
          <section className="case-section" id="architecture">
            <h2>How the pieces connect.</h2>
            <p>
              This conceptual diagram explains the project’s logical
              relationships. It contains no employer configurations, addresses,
              or sensitive topology.
            </p>
            <ConceptDiagram nodes={p.nodes} />
          </section>
          <section className="case-section" id="contributions">
            <h2>Personal contributions</h2>
            <ul>
              {p.contributions.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section className="case-section" id="implementation">
            <h2>Implementation & approach</h2>
            <ul>
              {p.implementation.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
          <section className="case-section" id="troubleshooting">
            <h2>The troubleshooting challenge</h2>
            <p>{p.challenge}</p>
          </section>
          <section className="case-section" id="results">
            <h2>Results & evidence</h2>
            <p>{p.result}</p>
            <EvidenceNote>{p.evidenceNote}</EvidenceNote>
            <p>{p.verificationNote}</p>
            {p.evidenceLinks.length ? (
              <ul
                className="evidence-links"
                aria-label="Supporting public evidence"
              >
                {p.evidenceLinks.map((url, i) => (
                  <li key={url}>
                    <a
                      className="text-link"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.includes("/blob/")
                        ? "Read verification record"
                        : "Read public project documentation"}{" "}
                      · source {i + 1}
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <p>
              Visuals on this page are purpose-built illustrations, not
              screenshots of live systems. No sensitive workplace images are
              included.
            </p>
            <div className="case-evidence-links">
              {p.source ? (
                <a
                  className="button secondary"
                  href={p.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} /> Inspect source <ArrowUpRight size={14} />
                </a>
              ) : null}
              {p.live ? (
                <a
                  className="button"
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} /> Visit project
                </a>
              ) : null}
              {!p.source && !p.live ? (
                <Link className="text-link" href="/contact/">
                  Discuss the project <ArrowUpRight size={14} />
                </Link>
              ) : null}
            </div>
          </section>
          <section className="case-section" id="skills">
            <h2>Skills demonstrated</h2>
            <div className="tags">
              {p.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p style={{ marginTop: 20 }}>
              Context: {p.evidence.toLowerCase()}. These technologies describe
              the project scope; they are not proficiency scores.
            </p>
            {relatedSkills.map((s) => (
              <p key={s.name}>
                <Link className="text-link" href="/skills/">
                  {s.name} · {s.evidence} <ArrowUpRight size={13} />
                </Link>
              </p>
            ))}
          </section>
          <section className="case-section" id="lessons">
            <h2>Lessons & next steps</h2>
            <p>{p.lessons}</p>
            <ul>
              {p.nextSteps.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <section className="container page-content">
        <SectionHeading
          number="→"
          label="KEEP EXPLORING"
          title="Related work."
        />
        <div className="related-grid">
          {related.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
