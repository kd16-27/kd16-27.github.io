import Link from "next/link";
export default function NotFound() {
  return (
    <section className="container not-found">
      <span className="eyebrow" style={{ justifyContent: "center" }}>
        SIGNAL NOT FOUND
      </span>
      <h1>404</h1>
      <h2>This path doesn’t connect.</h2>
      <p>The page may have moved. Let’s get you back to the work.</p>
      <Link className="button" href="/projects/">
        Explore projects →
      </Link>
    </section>
  );
}
