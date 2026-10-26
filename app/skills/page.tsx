import { PageIntro, EvidenceNote } from "@/components/sections";
import { SkillsExplorer } from "@/components/explorers";
export const metadata = {
  title: "Skills & Competencies",
  description:
    "Evidence-based AV, networking, Linux, virtualization, cloud, and software competencies. Professional experience is distinguished from labs and training.",
  alternates: { canonical: "/skills/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="SKILLS & COMPETENCIES"
        title="Breadth with"
        accent="a clear foundation."
        description="AV systems engineering is my professional foundation. Here’s how that experience connects to my lab work, technical products, and continued learning."
      />
      <section className="container page-content">
        <SkillsExplorer />
        <EvidenceNote>
          Each area links to a related case study or experience record. Vendor
          training does not imply years of professional use. Code generated for
          this portfolio does not by itself establish independent mastery of its
          tools.
        </EvidenceNote>
      </section>
    </>
  );
}
