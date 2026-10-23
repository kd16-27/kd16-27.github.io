import { describe, it, expect } from "vitest";
import { getSiteConfig } from "../content/site-config";
describe("release configuration", () => {
  it("defaults to a non-indexable local review", () => {
    expect(getSiteConfig({})).toEqual({
      isPublic: false,
      siteUrl: "http://127.0.0.1:3117",
    });
  });
  it("accepts only the reviewed GitHub Pages origin for a public build", () => {
    expect(
      getSiteConfig({ release: "public", origin: "https://kd16-27.github.io" })
        .isPublic,
    ).toBe(true);
    for (const origin of [
      undefined,
      "http://kd16-27.github.io",
      "https://other.example",
      "https://kd16-27.github.io/private",
      "https://kd16-27.github.io?token=secret",
    ]) {
      expect(() => getSiteConfig({ release: "public", origin })).toThrow();
    }
  });
  it("rejects typos rather than creating ambiguous release builds", () => {
    expect(() => getSiteConfig({ release: "publc" })).toThrow();
  });
});
