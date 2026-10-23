import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
export function PageIntro({
  eyebrow,
  title,
  accent,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-intro container">
      <span className="eyebrow">
        <i />
        {eyebrow}
      </span>
      <h1>
        {title}
        {accent ? (
          <>
            <br />
            <span>{accent}</span>
          </>
        ) : null}
      </h1>
      <p>{description}</p>
      {children}
    </section>
  );
}
export function SectionHeading({
  number,
  label,
  title,
  description,
  link,
  href,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
  link?: string;
  href?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          <span className="section-number">{number}</span>
          {label}
        </span>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {href ? (
        <Link className="text-link" href={href}>
          {link}
          <ArrowUpRight size={16} />
        </Link>
      ) : null}
    </div>
  );
}
export function ContactBanner() {
  return (
    <section className="contact-banner">
      <div className="container">
        <div>
          <span className="eyebrow">
            <i />
            LET’S BUILD SOMETHING THAT CONNECTS.
          </span>
          <h2>
            A good conversation
            <br />
            is where it starts.
          </h2>
          <p>
            Engineering opportunities, technical collaboration, or an
            interesting problem.
          </p>
        </div>
        <Link className="button" href="/contact/">
          Let’s connect <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
export function EvidenceNote({ children }: { children: ReactNode }) {
  return (
    <aside className="evidence-note">
      <span className="micro">EVIDENCE & SCOPE</span>
      <p>{children}</p>
    </aside>
  );
}
export function EmptyState() {
  return (
    <div className="empty-state">
      <h3>No matches in this view.</h3>
      <p>Try another keyword or reset the filters to explore all work.</p>
    </div>
  );
}
export function TextArrow() {
  return <ArrowRight size={15} />;
}
