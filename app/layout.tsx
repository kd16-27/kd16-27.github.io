import type { Metadata } from "next";
import { Header, Footer } from "@/components/ui";
import { profile, siteUrl } from "@/content/portfolio";
import "./globals.css";
import { siteConfig } from "@/content/site-config";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: siteConfig.isPublic, follow: true },
  title: {
    default: "Kaden Diaz — Engineering Connected Systems",
    template: "%s | Kaden Diaz",
  },
  description:
    "Mid-Level AV Systems Engineer. Explore Kaden Diaz’s AV engineering experience, Linux and virtualization labs, technical products, and continued learning.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kaden Diaz — Engineering Connected Systems",
    description: profile.tagline,
    type: "website",
    siteName: "Kaden Diaz",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kaden Diaz — Engineering connected systems",
      },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    jobTitle: "Mid-Level AV Systems Engineer",
    sameAs: [profile.github, profile.linkedin],
    description: profile.tagline,
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
