import { profile } from "@/content/portfolio";
import { PageIntro, EvidenceNote } from "@/components/sections";
import { CredentialExplorer } from "@/components/explorers";
export const metadata = {
  title: "Certifications & Training",
  description:
    "Search Kaden Diaz’s owner-reported certifications, completed vendor training, and active learning tracks across AV and IT.",
  alternates: { canonical: "/certifications/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="CERTIFICATIONS & TRAINING"
        title="Learning that connects"
        accent="to the work."
        description="A growing record of professional credentials, vendor training, and technical coursework. Explore by organization, subject, or completion status."
      />
      <section className="container page-content">
        <EvidenceNote>
          Completion statuses are supplied by Kaden. Dates and public
          verification links have not been supplied. Credential types are
          labeled conservatively; vendor program titles and certificate
          documents should be reviewed before external verification claims.
          {profile.clearance} Clearance is listed separately from credentials.
        </EvidenceNote>
        <CredentialExplorer />
      </section>
    </>
  );
}
