import { PageIntro } from "@/components/sections";
export const metadata = {
  title: "Privacy & Content",
  alternates: { canonical: "/privacy/" },
};
export default function Page() {
  return (
    <>
      <PageIntro
        eyebrow="PRIVACY & CONTENT"
        title="A considered public footprint."
        description="A short explanation of this portfolio’s content and browser behavior."
      />
      <section className="container page-content prose">
        <h2>Contact and browser preferences</h2>
        <p>
          The application uses no analytics, marketing trackers, contact-form
          backend, or application database. Your color-theme preference is
          stored in your browser’s local storage. Email links open your own mail
          application; no message is sent by this website.
        </p>
        <p>
          The hosting provider may process network requests and manage access to
          the hosted site. GitHub, LinkedIn, and Vector Learning links lead to
          separate services with their own policies.
        </p>
        <h2>Evidence and accuracy</h2>
        <p>
          Professional history, credential completions, and technical accounts
          are supplied by Kaden. Where independent evidence or dates are
          missing, this is stated. Training is distinguished from professional
          work, lab practice, and planned capabilities.
        </p>
        <h2>Professional boundaries</h2>
        <p>
          All system diagrams are generic conceptual illustrations. No
          government or employer systems are connected to this site. Internal
          documents, sensitive configurations, production addresses, facility
          details, and colleague information are excluded.
        </p>
        <h2>Corrections</h2>
        <p>
          For corrections or a current approved résumé, contact{" "}
          <a href="mailto:KadenDiaz1627@gmail.com">KadenDiaz1627@gmail.com</a>.
        </p>
      </section>
    </>
  );
}
