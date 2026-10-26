import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";
const publicBuild = process.argv.includes("--public");
const origin = publicBuild
  ? "https://kd16-27.github.io"
  : "http://127.0.0.1:3117";
const html = readFileSync("out/index.html", "utf8");
assert(
  html.includes('rel="canonical" href="' + origin + '/"'),
  "Home canonical origin",
);
assert(
  html.includes(
    'name="robots" content="' +
      (publicBuild ? "index, follow" : "noindex, follow") +
      '"',
  ),
  "Home indexing mode",
);
assert(
  html.includes(origin + "/og.png"),
  "Social preview image uses correct origin",
);
const robots = readFileSync("out/robots.txt", "utf8");
assert(
  robots.includes(publicBuild ? "Allow: /" : "Disallow: /"),
  "robots indexing mode",
);
const sitemap = readFileSync("out/sitemap.xml", "utf8");
assert(
  sitemap.includes(origin + "/projects/av-integrity-lab/"),
  "Case study sitemap",
);
assert(
  !sitemap.includes("/journal/nvx-signal-flow/"),
  "Draft journal excluded",
);
assert(existsSync("out/.nojekyll"), "Pages bypass marker");
const receipt = JSON.parse(readFileSync("content/resume-receipt.json", "utf8"));
for (const [file, hash] of [
  ["content/resume.json", receipt.sourceSha256],
  ["out/kaden-diaz-resume.pdf", receipt.pdfSha256],
]) {
  assert.equal(
    createHash("sha256").update(readFileSync(file)).digest("hex"),
    hash,
    "Resume source/PDF receipt mismatch",
  );
}
assert(sitemap.includes(origin + "/resume/"), "Professional résumé in sitemap");
const resumeHtml = readFileSync("out/resume/index.html", "utf8");
assert(
  resumeHtml.includes(
    'name="robots" content="' +
      (publicBuild ? "index, follow" : "noindex, follow") +
      '"',
  ),
  "Résumé inherits build indexing policy",
);
const text = readFileSync("out/kaden-diaz-resume.txt", "utf8");
assert(text.includes("Geospatial and Cloud Analytics (GCA)"));
assert(text.includes("school-term break"));
assert(text.includes("owner-reported pending artifacts"));
assert(text.includes("Restored Crestron NVX video"));
assert(
  !/review copy|publication approval pending|supplied records group|not inferred/i.test(
    text,
  ),
  "No temporary release copy in résumé",
);
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(dir + "/" + e.name) : [dir + "/" + e.name],
  );
}
const pages = walk("out").filter((f) => f.endsWith(".html"));
for (const file of pages) {
  const content = readFileSync(file, "utf8");
  // Reject network addresses and private file paths; approved personal email is intentional.
  assert(
    !/(?:10\.(?:\d{1,3}\.){2}\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|\/Users\/|SF-86|TS\/SCI)/i.test(
      content,
    ),
    "Private/sensitive pattern in " + file,
  );
}
console.log(
  "Export checks passed: " +
    pages.length +
    " HTML files, " +
    (publicBuild ? "public" : "review") +
    " metadata, résumé receipt/download content, sitemap and privacy patterns.",
);
