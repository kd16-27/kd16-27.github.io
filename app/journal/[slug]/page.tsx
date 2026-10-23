import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { notes, projects } from "@/content/portfolio";
import { PageIntro, EvidenceNote } from "@/components/sections";
import { ConceptDiagram } from "@/components/ui";
export function generateStaticParams() {
  return notes.map((n) => ({ slug: n.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = notes.find((n) => n.slug === slug);
  return {
    title: n ? `${n.title} — Draft` : "Note not found",
    alternates: { canonical: `/journal/${slug}/` },
    robots: { index: false, follow: true },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const n = notes.find((n) => n.slug === slug);
  if (!n) notFound();
  const p = projects.find((p) => p.slug === n.project)!;
  return (
    <>
      <PageIntro
        eyebrow={`DRAFT NOTE / ${n.tag.toUpperCase()}`}
        title={n.title}
        description={`${n.date} · ${n.minutes} min read · Prepared from owner-supplied project information.`}
      />
      <article className="note-body prose">
        {n.body.map((t) => (
          <p key={t}>{t}</p>
        ))}
        <ConceptDiagram nodes={p.nodes} />
        <EvidenceNote>
          Draft for owner review. This diagram is illustrative; no real system
          addresses or workplace configuration are shown. Screenshots will be
          added only when approved and available.
        </EvidenceNote>
        <Link href={`/projects/${p.slug}/`} className="text-link">
          Related project: {p.name} <ArrowUpRight size={15} />
        </Link>
      </article>
    </>
  );
}
