import { describe, expect, it } from "vitest";
import resume from "../content/resume.json";
import { experience, profile, projects } from "../content/portfolio";
import { resumeText } from "../scripts/resume-text.mjs";

describe("recruiter-facing content boundaries", () => {
  it("keeps temporary release notices out of the résumé source and download", () => {
    const content = JSON.stringify(resume) + resumeText(resume);
    expect(content).not.toMatch(
      /review copy|publication approval pending|résumé review|supplied records group|not inferred|degree claimed/i,
    );
    expect(content).toContain(profile.clearance);
    expect(content).toContain(profile.email);
  });
  it("preserves approved employer and combined earlier-role dates without inventing a split", () => {
    expect(resume.experience[0].company).toBe(
      "Geospatial and Cloud Analytics (GCA)",
    );
    expect(resume.experience[0].period).toBe("June 2026 - Present");
    const earlier = resume.experience.find((e) => e.role.includes("Intern"))!;
    expect(earlier.period).toMatch(/May 2025 - June 2026/);
    expect(earlier.period).toContain("school-term break");
    expect(experience.filter((e) => e.company.includes("GCA"))).toHaveLength(2);
    expect(JSON.stringify(experience)).not.toMatch(
      /supplied résumés group|not inferred|grouped résumé dates/i,
    );
  });
  it("leads with a bounded completed result while retaining prototype and future-work labels", () => {
    expect(resume).toHaveProperty("highlights");
    expect(resume.highlights[0].title).toMatch(/NVX/);
    expect(resume.highlights[0].evidence).toContain("owner-reported");
    const nvx = projects.find(
      (p) => p.slug === "crestron-nvx-troubleshooting",
    )!;
    expect(nvx.status).toBe("Completed");
    expect(nvx.delivery).toBe("Completed case study");
    for (const slug of [
      "cloud-task-suite",
      "av-integrity-lab",
      "av-portfolio-suite",
    ]) {
      expect(projects.find((p) => p.slug === slug)!.delivery).toBe(
        "Locally tested prototype",
      );
    }
    expect(projects.some((p) => p.delivery === "Deployed software")).toBe(
      false,
    );
  });
});
