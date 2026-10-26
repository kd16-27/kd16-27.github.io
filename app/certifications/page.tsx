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
          Completions are owner-reported. Certifications, vendor training and
          coursework are labeled separately. Issuer links and earned dates will
          be added when available.
          {profile.clearance} Clearance is listed separately from credentials.
        </EvidenceNote>
        <CredentialExplorer />
      </section>
    </>
  );
}
