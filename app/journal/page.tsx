import { milestones } from "@/content/milestones";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, EvidenceNote } from "@/components/sections";
import { notes } from "@/content/portfolio";
export const metadata = {
  title: "Technical Lab Journal",
  description:
    "Draft engineering notes on AV troubleshooting and Linux lab documentation, grounded in supplied project accounts.",
  alternates: { canonical: "/journal/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="TECHNICAL LAB JOURNAL"
        title="Learning in the open."
        accent="One note at a time."
        description="Working notes from troubleshooting, lab experiments, and technical product development. These seed entries are explicitly drafts for owner review."
      />
      <section
        className="container page-content"
        aria-labelledby="milestone-heading"
      >
        <h2 id="milestone-heading">Technical milestones</h2>
        <p>
          Public records and portfolio development, with the evidence behind
          each date.
        </p>
        <ol className="milestone-list">
          {milestones.map((milestone) => (
            <li key={milestone.title}>
              <div className="micro">
                <time dateTime={milestone.date}>{milestone.date}</time> ·{" "}
                {milestone.label}
              </div>
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
              <Link className="text-link" href={milestone.href}>
                {milestone.link}
                <ArrowUpRight size={14} />
              </Link>
            </li>
          ))}
        </ol>
        <h2>Working notes</h2>
        <div className="journal-grid">
          {notes.map((n) => (
            <article className="journal-card" key={n.slug}>
              <div className="card-meta">
                <span>{n.tag.toUpperCase()}</span>
                <span className="badge planned">Draft</span>
              </div>
              <h2>
                <Link href={`/journal/${n.slug}/`}>{n.title}</Link>
              </h2>
              <p>{n.summary}</p>
              <span className="micro">
                {n.date} · {n.minutes} MIN READ
              </span>
              <div>
                <Link className="text-link" href={`/journal/${n.slug}/`}>
                  Read draft <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <EvidenceNote>
          Draft dates reflect when the notes were prepared for this portfolio.
          They are not dates of the underlying work. No fictional experiment
          results, workplace screenshots, or unpublished infrastructure details
          are included.
        </EvidenceNote>
      </section>
    </>
  );
}
