import { chromium } from "@playwright/test";
import { writeFileSync, mkdirSync } from "node:fs";
const artifactDir =
  process.env.BROWSER_ARTIFACT_DIR || "test-results/visual-review";
mkdirSync(artifactDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
for (const route of [
  "/",
  "/projects/av-integrity-lab/",
  "/projects/cloud-task-suite/",
  "/projects/av-operations-command-center/",
  "/about/",
  "/projects/",
  "/skills/",
  "/certifications/",
  "/experience/",
  "/education/",
  "/journal/",
  "/resume/",
  "/contact/",
  "/privacy/",
  "/projects/crestron-nvx-troubleshooting/",
  "/projects/optiplex-linux-lab/",
  "/projects/vector-learning/",
  "/projects/av-rack-restoration/",
  "/projects/av-portfolio-suite/",
  "/projects/cloud-devops-learning/",
  "/projects/engineering-portfolio/",
  "/journal/nvx-signal-flow/",
  "/journal/linux-lab-baseline/",
]) {
  const res = await page.goto(`http://127.0.0.1:3117${route}`);
  if (res.status() !== 200) errors.push(`${route}: ${res.status()}`);
}
const missing = await page.goto(
  "http://127.0.0.1:3117/this-route-does-not-exist/",
);
if (missing.status() !== 404)
  errors.push("Unknown path did not return HTTP 404");
await page.goto("http://127.0.0.1:3117/");
await page.screenshot({
  path: `${artifactDir}/home-desktop-final.png`,
  fullPage: true,
});
await page.screenshot({ path: `${artifactDir}/home-hero-final.png` });
await page.getByRole("button", { name: "Toggle color theme" }).click();
await page.waitForFunction(
  () =>
    getComputedStyle(document.querySelector(".system-node")).backgroundColor ===
    "rgb(237, 242, 247)",
);
await page.screenshot({ path: `${artifactDir}/home-light-final.png` });
await page.getByRole("button", { name: "Toggle color theme" }).click();
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: `${artifactDir}/home-mobile-hero.png` });
await page.screenshot({
  path: `${artifactDir}/home-mobile-final.png`,
  fullPage: true,
});
writeFileSync(
  `${artifactDir}/route-check.json`,
  JSON.stringify({ routes: 23, custom404: true, errors }, null, 2),
);
await browser.close();
if (errors.length) throw new Error(errors.join("\n"));
console.log(
  "23 content routes and custom 404 verified. No uncaught browser errors.",
);
