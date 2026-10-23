# Content guide

All public portfolio data is in `content/portfolio.ts`. Keep this file reviewable; do not insert private evidence or workplace identifiers.

## Projects

Copy an existing project object and supply a unique lowercase hyphenated slug, name, summary, categories, status, technologies, specialties, evidence type, overview, objective, contributions, implementation, challenge, result, lessons, next steps, diagram nodes, evidence note, and optional source/live URL. Zod validates required fields and statuses. Images are presently CSS/SVG illustrations; add approved assets in `public/` and descriptive alt text if extending the template. The `visual` field chooses one of the existing visual treatments. Add a new treatment in ProjectVisual for a distinct future design.

Status values: `Completed`, `In Progress`, `Planned`. Completion must be limited to the outcome actually supported. Update EVIDENCE_LEDGER.md when changing a claim. Set a date only when known; current case-study dates are explicitly content-review dates, not invented project dates.

The home-page lens map in `components/home.tsx` controls featured ordering. Each specialty selects the same project records used by the project explorer. Other applicable projects can be added to that map without copying history.

## Credentials

Each record supports name, issuer, type, status, skills, nullable earnedDate, and nullable public URL. Current completed credentials are owner-reported; public documents and dates are not supplied. Review program labels against actual certificates before changing a conservative vendor-training label to a professional certification. Never mark a credential earned based only on a roadmap or course intention.

## Skills and career

Use Professional experience, Hands-on lab, Coursework, or Active learning. Each competency points to a real project slug; unit tests validate these references. Professional competency cards also link to role history. Update company/role dates only with confirmed history. Preserve the May 2025 internship’s school-term break until an accurate interval is available. Clearance remains separate from certifications.

## Notes

The two seed journal entries are drafts. Their dates are preparation dates. Add verified results and approved evidence before changing draft treatment. To publish a verified post, extend the note model with an explicit published status, update the journal and route labels, robots and sitemap, and remove noindex only after review. Do not just remove the word draft.

## Résumé

The public-safe review page, text and PDF use content/resume.json. The original supplied PDFs remain outside the repository. Regenerate the checked PDF/receipt with scripts/generate-resume.py and inspect both pages. The build creates text from the same JSON; unit/export checks reject a stale receipt. Do not remove review labels or publish without explicit owner approval.

## Release

Run `npm run validate`, `npm run test:e2e`, and the production dependency audit. Review rendered pages at desktop and mobile sizes. Check EVIDENCE_LEDGER.md for claims that still require documentation. Rebuild before deploying; the host serves the generated `out/` directory.

## Current release content

Use Geospatial and Cloud Analytics (GCA). Earlier Junior/Intern roles share the supplied May 2025–June 2026 range; preserve the school-term break and do not invent split dates. Monitoring tools are installed in the personal lab, owner-reported pending artifacts. Credential completions are owner-reported; missing issuer dates/links are not invented. The clearance remains exactly “Active DoD Secret Security Clearance.”

Update content/resume.json for the safe résumé, regenerate its PDF and receipt with scripts/generate-resume.py, and inspect both pages. The build generates the text version. Never copy supplied raw PDFs into public/. Only the exact GitHub Pages origin is allowed for public builds; publishing still requires approval.
