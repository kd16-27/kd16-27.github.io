import { describe, expect, it } from "vitest";
import { projects, projectSchema, filterProjects } from "../content/portfolio";

describe("project delivery evidence", () => {
  const sample = () => ({
    ...projects[0],
    delivery: "Source available",
    reviewedOn: "2026-10-22",
    verificationNote:
      "Public source inspected; execution has not been reproduced.",
    evidenceLinks: ["https://github.com/kd16-27/av-portfolio-suite"],
  });
  it("rejects deployed claims without a live URL and supporting evidence", () => {
    expect(
      projectSchema.safeParse({ ...sample(), delivery: "Deployed software" })
        .success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({
        ...sample(),
        delivery: "Deployed software",
        live: "https://vector-learning-kd.diazkaden789.chatgpt.site",
        evidenceLinks: [],
      }).success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({
        ...sample(),
        delivery: "Deployed software",
        live: "https://vector-learning-kd.diazkaden789.chatgpt.site",
      }).success,
    ).toBe(true);
  });
  it("rejects unapproved and unsafe live project links", () => {
    for (const live of [
      "javascript:alert(1)",
      "data:text/html,hello",
      "file:///etc/hosts",
      "http://127.0.0.1/",
      "https://example.com/",
      "https://user:password@vector-learning-kd.diazkaden789.chatgpt.site/",
      "https://vector-learning-kd.diazkaden789.chatgpt.site/?token=private",
    ]) {
      expect(
        projectSchema.safeParse({
          ...sample(),
          delivery: "Deployed software",
          live,
        }).success,
      ).toBe(false);
    }
  });
  it("requires an explanation for locally tested labels", () => {
    expect(
      projectSchema.safeParse({
        ...sample(),
        delivery: "Locally tested prototype",
        verificationNote: "",
      }).success,
    ).toBe(false);
  });
  it("rejects contradictory future delivery labels", () => {
    expect(
      projectSchema.safeParse({
        ...sample(),
        delivery: "Future plan",
        status: "Completed",
      }).success,
    ).toBe(false);
    expect(
      projectSchema.safeParse({
        ...sample(),
        delivery: "Future plan",
        status: "Planned",
        live: "https://vector-learning-kd.diazkaden789.chatgpt.site",
      }).success,
    ).toBe(false);
  });
  it("rejects invalid review dates and unsafe evidence URLs", () => {
    expect(
      projectSchema.safeParse({ ...sample(), reviewedOn: "2026-02-30" })
        .success,
    ).toBe(false);
    for (const url of [
      "not a URL",
      "javascript:alert(1)",
      "http://internal.local/",
      "https://127.0.0.1/",
      "https://vector-learning-kd.diazkaden789.chatgpt.site/",
    ]) {
      expect(
        projectSchema.safeParse({ ...sample(), evidenceLinks: [url] }).success,
      ).toBe(false);
    }
  });
  it("intersects delivery with search, category and specialty", () => {
    expect(
      filterProjects(
        "Cloud Task",
        "Software Development",
        "Software",
        "Locally tested prototype",
      ).map((p) => p.slug),
    ).toEqual(["cloud-task-suite"]);
    expect(
      filterProjects(
        "Cloud Task",
        "AV Engineering",
        "Software",
        "Locally tested prototype",
      ),
    ).toEqual([]);
    expect(
      filterProjects("", "All projects", "All disciplines", "Future plan").map(
        (p) => p.slug,
      ),
    ).toEqual([]);
  });
});
