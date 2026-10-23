import { writeFileSync, readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { resumeText } from "./resume-text.mjs";
const resume = JSON.parse(readFileSync("content/resume.json", "utf8"));
writeFileSync("out/kaden-diaz-resume.txt", resumeText(resume));
writeFileSync("out/.nojekyll", "");
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
  );
}
const html = walk("out").filter((p) => p.endsWith(".html"));
const broken = [];
for (const file of html) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(
    /(?:href|src)="([^"?#]+)(?:[?#][^"]*)?"/g,
  )) {
    let href = match[1];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    try {
      href = decodeURIComponent(href);
    } catch {}
    const target = path.join("out", href);
    if (!existsSync(target) && !existsSync(`${target}/index.html`))
      broken.push(`${file}: ${href}`);
  }
}
if (broken.length)
  throw new Error(`Broken internal links:\n${[...new Set(broken)].join("\n")}`);
console.log(
  `Export verified: ${html.length} HTML files; internal links and assets resolve. Public-safe review résumé generated.`,
);
