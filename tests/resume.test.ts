import { it, expect } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import resume from "../content/resume.json";
import receipt from "../content/resume-receipt.json";
import { profile, experience } from "../content/portfolio";
it("keeps the checked résumé synchronized with its safe source", () => {
  expect(
    createHash("sha256")
      .update(readFileSync("content/resume.json"))
      .digest("hex"),
  ).toBe(receipt.sourceSha256);
  expect(
    createHash("sha256")
      .update(readFileSync("public/kaden-diaz-resume.pdf"))
      .digest("hex"),
  ).toBe(receipt.pdfSha256);
  expect(resume.profile).toContain(profile.clearance);
  expect(resume.contact).toContain(profile.email);
  expect(resume.experience.map((e) => e.role).sort()).toEqual(
    experience.map((e) => e.role).sort(),
  );
  expect(resume.experience[0].company).toBe(experience[0].company);
  expect(resume.experience[0].period).toBe("June 2026 - Present");
  expect(resume.credentialsNote).toMatch(/owner-reported/i);
});
