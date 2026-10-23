import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import resumeReceipt from "../../content/resume-receipt.json";
test("project filters intersect and can reset", async ({ page }) => {
  await page.goto("/projects/");
  await page
    .getByRole("button", { name: "Infrastructure", exact: true })
    .click();
  await page.getByRole("textbox", { name: "Search projects" }).fill("SSH");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText("OptiPlex");
  await page
    .getByRole("textbox", { name: "Search projects" })
    .fill("unmatched");
  await expect(page.getByText("No matches in this view.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".project-card")).toHaveCount(10);
});
test("credentials distinguish learning and completion", async ({ page }) => {
  await page.goto("/certifications/");
  await page.getByLabel("Credential organization").selectOption("Q-SYS");
  await expect(page.locator(".credential-card")).toHaveCount(2);
  await page.getByLabel("Credential status").selectOption("In Progress");
  await expect(page.locator(".credential-card")).toHaveCount(1);
  await expect(page.locator(".credential-card")).toContainText("In progress");
  await page.getByLabel("Credential status").selectOption("Completed");
  await expect(page.locator(".credential-card")).toHaveCount(1);
  await expect(page.locator(".credential-card")).toContainText("Level 0");
});
test("skills filter by actual evidence context", async ({ page }) => {
  await page.goto("/skills/");
  await page.getByLabel("Skill evidence type").selectOption("Hands-on lab");
  await expect(page.locator(".skill-card")).toHaveCount(3);
  await expect(page.locator(".skill-card").first()).toContainText("Linux");
});
test("case studies, timeline, architecture, and professional resume work", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: /CLOUD Training/ }).click();
  await expect(page.locator(".diagram-caption")).toContainText("Azure");
  await page.goto("/experience/");
  const intern = page.getByRole("button", { name: /AV Technician Intern/ });
  await intern.click();
  await expect(intern).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.locator("article").filter({ has: intern }).locator(".timeline-date"),
  ).toContainText("school-term break");
  await expect(page.locator("#detail-intern")).toBeVisible();
  await page.goto("/projects/crestron-nvx-troubleshooting/");
  await expect(
    page.getByRole("heading", { name: "Results & evidence" }),
  ).toBeVisible();
  await expect(page.locator(".concept-step")).toHaveCount(5);
  await page.goto("/resume/");
  await expect(
    page.getByRole("heading", { name: "Restored Crestron NVX video" }),
  ).toBeVisible();
  await expect(page.locator("main")).not.toContainText(
    /draft|review copy|publication approval pending|not inferred|supplied records/i,
  );
  const response = await page.request.get("/kaden-diaz-resume.txt");
  expect(response.ok()).toBe(true);
});
test("theme persists and viewport has no horizontal overflow", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("navigation is keyboard accessible and mobile menu opens", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Projects", exact: true })
      .click();
    await expect(page).toHaveURL(/\/projects\//);
    await expect(
      page.getByRole("button", { name: "Open navigation" }),
    ).toHaveAttribute("aria-expanded", "false");
  }
});
for (const route of [
  "/",
  "/projects/",
  "/skills/",
  "/certifications/",
  "/contact/",
  "/resume/",
  "/about/",
  "/experience/",
  "/education/",
  "/journal/",
  "/privacy/",
  "/projects/crestron-nvx-troubleshooting/",
  "/projects/optiplex-linux-lab/",
  "/projects/av-integrity-lab/",
  "/projects/cloud-task-suite/",
  "/projects/av-operations-command-center/",
  "/journal/nvx-signal-flow/",
])
  test(`accessible structure and contrast: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

for (const route of [
  "/",
  "/projects/",
  "/skills/",
  "/certifications/",
  "/experience/",
  "/contact/",
])
  test(`light theme contrast: ${route}`, async ({ page }) => {
    await page.goto(route);
    await page.getByRole("button", { name: "Toggle color theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
test("contact uses explicit mail actions and copies the email", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/contact/");
  await expect(
    page.getByRole("link", { name: "Start a conversation" }),
  ).toHaveAttribute("href", /^mailto:KadenDiaz1627@gmail.com/);
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(
    page.getByRole("button", { name: "Email copied" }),
  ).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "KadenDiaz1627@gmail.com",
  );
});
test("all main routes fit a narrow viewport and retain unique titles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 760 });
  const titles = new Set<string>();
  for (const route of [
    "/",
    "/projects/",
    "/skills/",
    "/about/",
    "/experience/",
    "/certifications/",
    "/education/",
    "/journal/",
    "/resume/",
    "/contact/",
    "/projects/crestron-nvx-troubleshooting/",
    "/projects/av-integrity-lab/",
    "/projects/cloud-task-suite/",
    "/projects/av-operations-command-center/",
  ]) {
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      route,
    ).toBe(true);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
  }
});

test("delivery evidence filters distinguish platform prototypes, source and deployment", async ({
  page,
}) => {
  await page.goto("/projects/");
  await page
    .getByLabel("Project delivery evidence")
    .selectOption("Platform prototype");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card")).toContainText(
    "AV Operations Command Center",
  );
  await page
    .getByLabel("Project delivery evidence")
    .selectOption("Deployed software");
  await expect(page.getByText("No matches in this view.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".project-card")).toHaveCount(10);
  await expect(page.getByLabel("Project delivery evidence")).toHaveValue(
    "All delivery states",
  );
  await page
    .getByRole("textbox", { name: "Search projects" })
    .fill("Cloud Task");
  await page
    .getByLabel("Project delivery evidence")
    .selectOption("Locally tested prototype");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page
    .getByRole("link", { name: "Read Cloud Task Suite case study" })
    .click();
  await expect(page.locator(".case-summary")).toContainText(
    "Locally tested prototype",
  );
  await expect(
    page.getByRole("link", { name: "Read verification record · source 1" }),
  ).toHaveAttribute(
    "href",
    "https://github.com/kd16-27/cloud-task-suite/blob/main/evidence/verification-status.json",
  );
});

test("milestones identify record dates and unknown routes return 404", async ({
  page,
}) => {
  await page.goto("/journal/");
  await expect(
    page.getByRole("heading", { name: "Technical milestones" }),
  ).toBeVisible();
  await expect(page.locator(".milestone-list time")).toHaveCount(3);
  const response = await page.goto("/missing-project/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "404", exact: true }),
  ).toBeVisible();
});

test("theme changes keep diagram text and backgrounds in the same palette", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle color theme" }).click();
  const background = await page
    .locator(".node-av")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(background).toBe("rgb(237, 242, 247)");
});

for (const slug of [
  "crestron-nvx-troubleshooting",
  "optiplex-linux-lab",
  "vector-learning",
  "av-rack-restoration",
  "av-portfolio-suite",
  "cloud-devops-learning",
  "engineering-portfolio",
  "av-integrity-lab",
  "cloud-task-suite",
  "av-operations-command-center",
]) {
  test(
    "case page, metadata, narrow layout and runtime: " + slug,
    async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const response = await page.goto("/projects/" + slug + "/");
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        "https://kd16-27.github.io/projects/" + slug + "/",
      );
      await expect(page.locator(".case-summary")).toBeVisible();
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        "https://kd16-27.github.io/og.png",
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.setViewportSize({ width: 320, height: 760 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(accessibility.violations).toEqual([]);
      expect(errors).toEqual([]);
    },
  );
}
test("public metadata and safe resume downloads", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByText("at Geospatial and Cloud Analytics", { exact: true }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "index, follow",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    "https://kd16-27.github.io/og.png",
  );
  const pdf = await page.request.get("/kaden-diaz-resume.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toBe("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const text = await page.request.get("/kaden-diaz-resume.txt");
  expect(await text.text()).toContain("Geospatial and Cloud Analytics (GCA)");
  expect(await text.text()).toContain("Active DoD Secret Security Clearance.");
});

for (const [name, file, mime] of [
  ["Download résumé PDF", "kaden-diaz-resume.pdf", "application/pdf"],
  [
    "Download text version",
    "kaden-diaz-resume.txt",
    "text/plain; charset=utf-8",
  ],
]) {
  test("resume download click: " + file, async ({ page }) => {
    await page.goto("/resume/");
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("link", { name, exact: true }).click(),
    ]);
    expect(download.suggestedFilename()).toBe(file);
    expect(await download.failure()).toBeNull();
    const path = await download.path();
    expect(path).not.toBeNull();
    const data = readFileSync(path!);
    const response = await page.request.get("/" + file);
    expect(response.headers()["content-type"]).toBe(mime);
    if (file.endsWith(".pdf"))
      expect(createHash("sha256").update(data).digest("hex")).toBe(
        resumeReceipt.pdfSha256,
      );
    else {
      expect(data.toString()).toContain("Restored Crestron NVX video");
      expect(data.toString()).not.toMatch(
        /review copy|publication approval pending|supplied records group/i,
      );
    }
  });
}

test("outgoing LinkedIn links and Person metadata use only the current account", async ({
  page,
}) => {
  await page.goto("/");
  const links = page.locator('a[href*="linkedin.com/in/"]');
  expect(await links.count()).toBeGreaterThan(0);
  for (const href of await links.evaluateAll((nodes) =>
    nodes.map((n) => n.getAttribute("href")),
  ))
    expect(href).toBe("https://www.linkedin.com/in/kaden-diaz-3236b4411/");
  const person = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ||
      "{}",
  );
  expect(person.sameAs).toContain(
    "https://www.linkedin.com/in/kaden-diaz-3236b4411/",
  );
  await page.goto("/resume/");
  await expect(
    page.getByRole("link", { name: "LinkedIn", exact: true }).first(),
  ).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/kaden-diaz-3236b4411/",
  );
});
