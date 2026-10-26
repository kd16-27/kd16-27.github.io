import { profile } from "@/content/portfolio";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PageIntro,
  SectionHeading,
  ContactBanner,
} from "@/components/sections";
import { CareerTimeline } from "@/components/ui";
export const metadata = {
  title: "About",
  description:
    "Meet Kaden Diaz, an AV systems engineer expanding into Linux, infrastructure, cloud, and software through hands-on work and continued learning.",
  alternates: { canonical: "/about/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="A LITTLE ABOUT ME"
        title="Curiosity is the start."
        accent="The work makes it real."
        description="I’m Kaden Diaz, a cleared AV & IT systems engineer who likes understanding how things connect—and making those connections work."
      />
      <section className="container page-content">
        <div className="about-grid">
          <div className="prose">
            <p>
              My professional path began with an AV Technician internship in May
              2025. After a school-term break and classroom AV work at Virginia
              Commonwealth University, I progressed to Junior AV Technician at
              Geospatial and Cloud Analytics (GCA), then Mid-Level AV Systems
              Engineer in June 2026.
            </p>
            <p>
              Today, my work includes federal and secure-environment AV/VTC
              support, systems integration, endpoint configuration, and
              troubleshooting. I work across signal paths, network connectivity,
              control systems, DSP, video distribution, cameras, and
              conferencing technology.
            </p>
            <p>
              I also value the human side of engineering: coordinating support,
              explaining a diagnosis, mentoring a technician, and helping
              someone understand why a fix works.
            </p>
            <h2>Building beyond the day job.</h2>
            <p>
              My personal OptiPlex lab is where I explore Ubuntu, the command
              line, SSH, and KVM/QEMU virtual machines. Vector Learning and the
              AV Portfolio Suite connect my technical interests with product
              development and software.
            </p>
            <p>
              Cloud, DevOps, cybersecurity, automation, and systems architecture
              are directions I’m actively building toward. This portfolio keeps
              those learning areas separate from established professional
              experience.
            </p>
            <Link className="text-link" href="/projects/">
              Explore the projects <ArrowUpRight size={16} />
            </Link>
          </div>
          <aside className="about-panel">
            <span className="micro">AT A GLANCE</span>
            <dl>
              <div>
                <dt>Current role</dt>
                <dd>Mid-Level AV Systems Engineer</dd>
              </div>
              <div>
                <dt>Organization</dt>
                <dd>Geospatial and Cloud Analytics (GCA)</dd>
              </div>
              <div>
                <dt>Professional foundation</dt>
                <dd>AV · Unified communications · Integration</dd>
              </div>
              <div>
                <dt>Clearance</dt>
                <dd>
                  {profile.clearance}
                  <br />
                  <span className="muted">Owner-reported</span>
                </dd>
              </div>
              <div>
                <dt>Currently exploring</dt>
                <dd>Linux · Virtualization · Cloud · Software · AI systems</dd>
              </div>
              <div>
                <dt>Engineering principle</dt>
                <dd>Understand the path. Test the assumption.</dd>
              </div>
            </dl>
          </aside>
        </div>
        <div className="section-divider">
          <SectionHeading
            number="01"
            label="CAREER PROGRESSION"
            title="Responsibility, earned through practice."
          />
          <CareerTimeline />
        </div>
        <div className="section-divider">
          <SectionHeading
            number="02"
            label="TECHNICAL LEARNING"
            title="A separate track. A connected purpose."
            description="These are learning stages, not a second professional history. Dates are omitted where no milestone date was supplied."
          />
          <div className="learning-timeline">
            <div>
              <span className="micro">FOUNDATION / COMPLETED TRAINING</span>
              <h3>Learning the ecosystem.</h3>
              <p>
                AVIXA, Crestron, Extron, Audinate, AMX, NETGEAR, Cisco, and
                Microsoft training build context for hands-on work.
              </p>
              <Link className="text-link" href="/certifications/">
                Training record <ArrowUpRight size={14} />
              </Link>
            </div>
            <div>
              <span className="micro">NOW / HANDS-ON LABS</span>
              <h3>Building the infrastructure.</h3>
              <p>
                Ubuntu, SSH, and virtual machines on Dell OptiPlex hardware.
                Prometheus, Grafana and Uptime Kuma are installed in the
                personal lab, owner-reported pending artifacts.
              </p>
              <Link className="text-link" href="/projects/optiplex-linux-lab/">
                Explore the lab <ArrowUpRight size={14} />
              </Link>
            </div>
            <div>
              <span className="micro">IN PROGRESS / NEXT STEPS</span>
              <h3>Connecting new disciplines.</h3>
              <p>
                Biamp, Fortinet, and Q-SYS learning tracks, plus technical
                product development and cloud/DevOps foundations.
              </p>
              <Link
                className="text-link"
                href="/projects/cloud-devops-learning/"
              >
                Learning scope <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ContactBanner />
    </>
  );
}
