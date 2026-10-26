import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/portfolio";
import { siteConfig } from "@/content/site-config";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(siteConfig.isPublic
        ? {
            allow: "/",
            disallow: [
              "/journal/nvx-signal-flow/",
              "/journal/linux-lab-baseline/",
            ],
          }
        : { disallow: "/" }), // Indexing policy is not access control.
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
