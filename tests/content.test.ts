import { describe, it, expect } from "vitest";
import {
  projects,
  credentials,
  skills,
  projectSchema,
  filterProjects,
  experience,
} from "../content/portfolio";
describe("portfolio integrity", () => {
  it("validates unique project routes and all skill evidence links", () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    for (const s of skills)
      expect(projects.some((p) => p.slug === s.project)).toBe(true);
  });
  it("rejects invalid statuses instead of silently publishing them", () => {
    expect(
      projectSchema.safeParse({ ...projects[0], status: "Shipped soon" })
        .success,
    ).toBe(false);
  });
  it("distinguishes owner-reported installations from validated monitoring", () => {
    const lab = projects.find((p) => p.slug === "optiplex-linux-lab")!;
    expect(lab.status).toBe("In Progress");
    expect(lab.result).toContain("owner-reported pending artifacts");
    expect(lab.result).toContain("Installation does not establish");
  });
  it("never labels restricted unearned credentials as earned", () => {
    for (const c of credentials.filter((c) => c.status === "Completed"))
      expect(c.name).not.toMatch(
        /^(CTS|CTS-I|CTS-D|Security\+|CCST Networking|AZ-104|AWS SAA)$/,
      );
  });
  it("preserves the internship break and bounded NVX outcome", () => {
    expect(experience.find((e) => e.id === "intern")!.period).toContain(
      "school-term break",
    );
    expect(
      projects.find((p) => p.slug === "crestron-nvx-troubleshooting")!.status,
    ).toBe("Completed");
  });
  it("combines search, category, and specialty filters", () => {
    expect(
      filterProjects("SSH", "Networking", "Infrastructure").map((p) => p.slug),
    ).toEqual(["optiplex-linux-lab"]);
    expect(filterProjects("no possible match")).toEqual([]);
  });
  it("preserves simulation and product-verification boundaries", () => {
    expect(
      projects.find((p) => p.slug === "av-portfolio-suite")!.live,
    ).toBeUndefined();
    expect(
      projects.find((p) => p.slug === "av-portfolio-suite")!.result,
    ).toContain("simulated");
    expect(
      projects.find((p) => p.slug === "vector-learning")!.evidenceNote,
    ).toContain("unavailable");
  });
  it("does not invent earned dates or credential verification URLs", () => {
    expect(
      credentials.every((c) => c.earnedDate === null && c.url === null),
    ).toBe(true);
  });
});
