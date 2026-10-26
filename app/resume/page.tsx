import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/sections";
import { PrintButton } from "@/components/ui";
import resume from "@/content/resume.json";
export const metadata = {
  title: "Résumé",
  description:
    "Kaden Diaz’s AV systems engineering experience, selected accomplishments, technical projects and completed training.",
  alternates: { canonical: "/resume/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="PROFESSIONAL RÉSUMÉ"
        title="The experience,"
        accent="in one place."
        description="AV systems engineering experience, practical technical accomplishments, and projects across software and infrastructure."
      />
      <section className="container page-content">
        <div className="resume-toolbar">
          <PrintButton />
          <a
            className="button secondary"
            href="/kaden-diaz-resume.pdf"
            download
          >
            Download résumé PDF <ArrowUpRight size={15} />
          </a>
          <a className="text-link" href="/kaden-diaz-resume.txt" download>
            Download text version <ArrowUpRight size={14} />
          </a>
        </div>
        <article className="resume-sheet">
          <h2>{resume.name}</h2>
          <p>
            {resume.title}
            <br />
            {resume.contact}
          </p>
          <h3>Profile</h3>
          <p>{resume.profile}</p>
          <h3>Selected engineering accomplishment</h3>
          {resume.highlights.map((h) => (
            <section key={h.title}>
              <h4>{h.title}</h4>
              <p>{h.text}</p>
              <small>{h.evidence}</small>
            </section>
          ))}
          <h3>Professional experience</h3>
          {resume.experience.map((e) => (
            <section key={e.role}>
              <h4>
                {e.role} — {e.company}
              </h4>
              <small>{e.period}</small>
              <ul>
                {e.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </section>
          ))}
          <h3>Core competencies</h3>
          <p>{resume.competencies}</p>
          <h3>Selected credentials &amp; training</h3>
          <p>{resume.credentialsNote}</p>
          <ul>
            {resume.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <h3>Selected projects</h3>
          {resume.projects.map((p) => (
            <p key={p.name}>
              <strong>{p.name}</strong>
              <br />
              <small>{p.status}</small>
              <br />
              {p.text}
            </p>
          ))}
          <h3>Education</h3>
          {resume.education.map((e) => (
            <p key={e.school}>
              {e.school}
              <br />
              {e.qualification}
            </p>
          ))}
          <h3>Professional links</h3>
          <p>
            <a href={resume.linkedin}>LinkedIn</a> ·{" "}
            <a href="https://github.com/kd16-27">GitHub</a>
          </p>
        </article>
      </section>
    </>
  );
}
