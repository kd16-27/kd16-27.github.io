import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CareerTimeline } from "@/components/ui";
import { PageIntro, EvidenceNote } from "@/components/sections";
export const metadata = {
  title: "Professional Experience",
  description:
    "Kaden Diaz’s career progression at GCA and classroom AV experience at Virginia Commonwealth University.",
  alternates: { canonical: "/experience/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="PROFESSIONAL EXPERIENCE"
        title="From hands-on support"
        accent="to systems engineering."
        description="A progression built on troubleshooting, integration, customer support, and growing technical responsibility. Select a role to explore its scope."
      />
      <section className="container page-content">
        <div className="experience-layout">
          <CareerTimeline />
          <aside className="sidebar-panel">
            <span className="micro">PROFESSIONAL FOCUS</span>
            <h3>
              Connected AV.
              <br />
              Reliable experiences.
            </h3>
            <p>
              Federal and secure-environment AV/VTC support, multi-vendor
              systems, and technical mentoring.
            </p>
            <div className="tags">
              {[
                "Crestron",
                "Extron",
                "Biamp",
                "Q-SYS",
                "AMX",
                "Dante",
                "HDCP / EDID",
                "DSP",
                "BOMs",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link
              className="text-link"
              href="/projects/crestron-nvx-troubleshooting/"
            >
              A troubleshooting case <ArrowUpRight size={14} />
            </Link>
          </aside>
        </div>
        <EvidenceNote>
          The current Mid-Level AV Systems Engineer role and June 2026 start are
          owner-approved. The supplied résumés group Junior AV Technician and
          internship experience within May 2025–June 2026; the exact role
          transition is not established and the school-term break is retained.
          Descriptions omit employer systems, customer identifiers, and
          sensitive configuration details.
        </EvidenceNote>
      </section>
    </>
  );
}
