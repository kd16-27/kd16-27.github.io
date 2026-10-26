import { Github, Linkedin } from "@/components/brand-icons";
import { ArrowUpRight, Compass, Mail } from "lucide-react";
import { PageIntro } from "@/components/sections";
import { CopyEmail } from "@/components/ui";
import { profile } from "@/content/portfolio";
export const metadata = {
  title: "Contact",
  description:
    "Contact Kaden Diaz about engineering opportunities, technical collaboration, and connected systems.",
  alternates: { canonical: "/contact/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="LET’S CONNECT"
        title="Have a problem"
        accent="worth solving?"
        description="I’d be glad to talk about engineering opportunities, technical collaboration, or the systems you’re building."
      />
      <section className="container page-content">
        <div className="contact-layout">
          <div>
            <span className="eyebrow">THE BEST WAY TO REACH ME</span>
            <a className="email-link" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight size={24} />
            </a>
            <div className="contact-copy">
              <CopyEmail />
            </div>
            <p className="contact-context">
              My professional foundation is AV and unified communications. I’m
              also building toward infrastructure, networking, cloud, and
              technical product roles through lab work and continued learning.
            </p>
            <a
              className="button"
              href={`mailto:${profile.email}?subject=Engineering%20opportunity`}
            >
              <Mail size={16} /> Start a conversation
            </a>
          </div>
          <div className="contact-options">
            {[
              {
                Icon: Github,
                title: "GitHub",
                sub: "Explore public projects and source",
                url: profile.github,
              },
              {
                Icon: Linkedin,
                title: "LinkedIn",
                sub: "Connect professionally",
                url: profile.linkedin,
              },
              {
                Icon: Compass,
                title: "Vector Learning",
                sub: "An independent learning-platform project",
                url: profile.vector,
              },
            ].map(({ Icon, title, sub, url }) => (
              <a
                key={title}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={22} />
                <span>
                  <strong>{title}</strong>
                  <small>{sub}</small>
                </span>
                <ArrowUpRight size={17} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
