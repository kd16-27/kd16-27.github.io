import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { PageIntro, EvidenceNote } from "@/components/sections";
import { education } from "@/content/portfolio";
export const metadata = {
  title: "Education",
  description:
    "Associate of Science in Social Sciences, J. Sargeant Reynolds Community College, May 2024.",
  alternates: { canonical: "/education/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="EDUCATION"
        title="A foundation for"
        accent="continued growth."
        description="Formal education is one part of the picture. Vendor training, professional practice, and independent lab work continue the learning."
      />
      <section className="container page-content">
        <article className="education-card">
          <GraduationCap size={36} />
          <div>
            <span className="micro">
              {education.date.toUpperCase()} / COMPLETED
            </span>
            <h2>{education.school}</h2>
            <p>{education.degree}</p>
            <Link className="text-link" href="/certifications/">
              Explore technical training →
            </Link>
          </div>
        </article>
        <EvidenceNote>
          Additional study: Computer Science coursework at Virginia Commonwealth
          University.
        </EvidenceNote>
      </section>
    </>
  );
}
