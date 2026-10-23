import { PageIntro, EvidenceNote } from "@/components/sections";
import { ProjectExplorer } from "@/components/explorers";
export const metadata = {
  title: "Engineering Projects",
  description:
    "Explore AV engineering case studies, Linux labs, software products, and cloud learning. Filter by discipline, technology, and project status.",
  alternates: { canonical: "/projects/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="PROJECTS & CASE STUDIES"
        title="The work behind"
        accent="the experience."
        description="Troubleshooting stories, hands-on labs, and products in progress. Explore the problem, the approach, and what the evidence actually shows."
      />
      <section className="container page-content">
        <ProjectExplorer />
        <EvidenceNote>
          Completed means the stated project outcome was reported or
          demonstrated—not that every surrounding system is finished. Personal
          accounts, public source, lab activity, and learning records are
          labeled individually. Delivery evidence distinguishes source, local
          test records and future plans; a project link alone does not prove
          deployment.
        </EvidenceNote>
      </section>
    </>
  );
}
