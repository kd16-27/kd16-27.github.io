/** Public build values contain no secrets. A build never publishes by itself. */
export function getSiteConfig(env: { release?: string; origin?: string }) {
  if (env.release && !["review", "public"].includes(env.release))
    throw new Error("Unknown portfolio release mode");
  const isPublic = env.release === "public";
  if (isPublic && env.origin !== "https://kd16-27.github.io")
    throw new Error("Public builds require the reviewed GitHub Pages origin");
  return {
    isPublic,
    siteUrl: isPublic ? "https://kd16-27.github.io" : "http://127.0.0.1:3117",
  };
}
export const siteConfig = getSiteConfig({
  release: process.env.NEXT_PUBLIC_PORTFOLIO_RELEASE,
  origin: process.env.NEXT_PUBLIC_SITE_URL,
});
