import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const navigationNames = [
  "Home",
  "About",
  "Projects",
  "Skills",
  "Experience",
  "Credentials",
];

test("mobile disclosure follows visual link order and Escape restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/resume/");
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Kaden Diaz home", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Toggle color theme" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Enter");
  const openToggle = page.getByRole("button", { name: "Close navigation" });
  await expect(openToggle).toHaveAttribute("aria-expanded", "true");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  for (const name of navigationNames) {
    await page.keyboard.press("Tab");
    await expect(
      navigation.getByRole("link", { name, exact: true }),
    ).toBeFocused();
  }
  await expect(openToggle).toHaveAttribute(
    "aria-controls",
    (await navigation.getAttribute("id")) ?? "",
  );
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toHaveCount(0);
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Print résumé", exact: true }),
  ).toBeFocused();
});

test("mobile disclosure can close with Space and leave focus on its trigger", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.focus();
  await page.keyboard.press("Space");
  const openToggle = page.getByRole("button", { name: "Close navigation" });
  await expect(openToggle).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  await expect(openToggle).toBeFocused();
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toHaveCount(0);
});

test("same-page and new-route menu links close without stranding hidden focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  for (let index = 0; index < 3; index++) await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
  expect(
    await page.evaluate(
      () => document.activeElement?.closest(".mobile-nav") !== null,
    ),
  ).toBe(false);
});

test("leaving the mobile disclosure continues into content without a focus trap", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/resume/");
  await page.getByRole("button", { name: "Open navigation" }).focus();
  await page.keyboard.press("Enter");
  for (let index = 0; index < 7; index++) await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Print résumé", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("responsive breakpoint changes do not keep focus in hidden navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).focus();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();
  await page.setViewportSize({ width: 1280, height: 900 });
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  await expect(
    navigation.getByRole("link", { name: "Home", exact: true }),
  ).toBeFocused();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toHaveCount(0);
});

test("desktop keyboard order remains brand, navigation, theme and contact", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Kaden Diaz home", exact: true }),
  ).toBeFocused();
  for (const name of navigationNames) {
    await page.keyboard.press("Tab");
    await expect(
      page
        .getByRole("navigation", { name: "Main navigation" })
        .getByRole("link", { name, exact: true }),
    ).toBeFocused();
  }
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("button", { name: "Toggle color theme" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator(".contact-nav")).toBeFocused();
});

for (const width of [320, 390, 640, 680, 681, 768]) {
  for (const theme of ["dark", "light"]) {
    test(`text spacing preserves content at ${width}px in ${theme} theme`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript(
        (theme) => localStorage.setItem("kd-theme", theme),
        theme,
      );
      for (const route of [
        "/experience/",
        "/projects/",
        "/skills/",
        "/certifications/",
        "/about/",
        "/education/",
        "/resume/",
        "/contact/",
        "/journal/",
      ]) {
        await page.goto(route);
        await page.addStyleTag({
          content:
            "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }",
        });
        const bounds = await page.evaluate(() => ({
          viewport: innerWidth,
          document: document.documentElement.scrollWidth,
          body: document.body.scrollWidth,
          headingBoxes: [...document.querySelectorAll("h1")].flatMap(
            (heading) => {
              const range = document.createRange();
              range.selectNodeContents(heading);
              return [...range.getClientRects()].map((rect) => ({
                left: rect.left,
                right: rect.right,
              }));
            },
          ),
        }));
        expect(bounds.document, route).toBeLessThanOrEqual(bounds.viewport);
        expect(bounds.body, route).toBeLessThanOrEqual(bounds.viewport);
        for (const rect of bounds.headingBoxes) {
          expect(rect.left, route).toBeGreaterThanOrEqual(-0.5);
          expect(rect.right, route).toBeLessThanOrEqual(width + 0.5);
        }
        await expect(page.locator("main h1")).toBeVisible();
      }
      await page.goto("/experience/");
      await page.addStyleTag({
        content:
          "* { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; } p { margin-bottom: 2em !important; }",
      });
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    });
  }
}
