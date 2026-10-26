import { describe, expect, it } from "vitest";
import {
  approvedLinkedIn,
  assertApprovedLinkedInProfiles,
  isApprovedLinkedInProfile,
} from "../content/professional-links.mjs";
import { profile } from "../content/portfolio";
import resume from "../content/resume.json";
import { resumeText } from "../scripts/resume-text.mjs";
describe("authoritative LinkedIn identity", () => {
  const retired =
    ["https://www.linkedin.com", "in", "kaden-diaz"].join("/") + "/";
  it("uses only the current approved account in profile, résumé and download", () => {
    expect(profile.linkedin).toBe(approvedLinkedIn);
    expect(resume.linkedin).toBe(approvedLinkedIn);
    expect(resumeText(resume)).toContain(approvedLinkedIn);
    expect(approvedLinkedIn).toBe(
      "https://www.linkedin.com/in/kaden-diaz-3236b4411/",
    );
  });
  it("rejects the retired account and misleading or unsafe variants", () => {
    for (const value of [
      retired,
      retired.slice(0, -1),
      retired + "?trk=profile",
      "https://www.linkedin.com/in/another-person/",
      approvedLinkedIn + "?secret=value",
      approvedLinkedIn.replace("https:", "http:"),
      "https://user:password@www.linkedin.com/in/kaden-diaz-3236b4411/",
    ]) {
      expect(isApprovedLinkedInProfile(value)).toBe(false);
      expect(() =>
        assertApprovedLinkedInProfiles('<a href="' + value + '">LinkedIn</a>'),
      ).toThrow();
    }
  });
  it("checks escaped metadata as well as visible links", () => {
    expect(() =>
      assertApprovedLinkedInProfiles(JSON.stringify({ sameAs: [retired] })),
    ).toThrow();
    expect(() =>
      assertApprovedLinkedInProfiles(retired.replaceAll("/", "\\/")),
    ).toThrow();
    expect(() =>
      assertApprovedLinkedInProfiles(
        JSON.stringify({ sameAs: [approvedLinkedIn] }),
      ),
    ).not.toThrow();
  });
});
