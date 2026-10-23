# Portfolio developer walkthrough — October 23, 2026

This guide explains the preserved website and the local modernization. Read a feature, trace its files, run its test, then make the small exercise in a disposable copy. AI-assisted code delivery is distinct from your independent practice; record the latter in the skills journal.

## How a page becomes a website

`app/page.tsx` composes `components/home.tsx`. `app/layout.tsx` supplies shared navigation, metadata and the page shell. Next.js runs server components at build time and exports HTML into `out/`; the browser downloads those pages and the JavaScript needed for interactive components. There is no application server, portfolio database or AI key in this release candidate.

`content/portfolio.ts` is the typed content model. TypeScript checks interfaces during development, while Zod validates actual content values when imported. A TypeScript type alone cannot reject a malformed JSON payload at runtime. `additional-projects.ts` keeps the three newly added cases separate while the same schema and route template validate/render every case.

Exercise: change a project status to an unsupported value in a disposable copy and run `npm test`. Explain why the content fails before publication. Restore the valid value.

## Project evidence, case studies and GitHub links

`projectSchema` separates lifecycle from delivery evidence. Completed describes a bounded outcome; source, local test records, platform schemas and actual deployed software are different proof. `superRefine` rejects contradictory plans and unsupported deployed labels. The public-evidence URL rule allows only the inspected public repositories, with no credentials/query parameters. Live links have a separate explicit approved-HTTPS-origin allowlist; local, script and unapproved destinations are rejected. A URL format check cannot establish that a claim is true: owner review and source inspection still matter.

`filterProjects(query, category, specialty, delivery)` combines filters with logical AND. `ProjectExplorer` in `components/explorers.tsx` stores current selections with React `useState`, derives the matching list, and resets every selection together. Derived results are calculated from state rather than stored in a second state variable that can become stale.

`ProjectCard` in `components/ui.tsx` renders consistent summaries and delivery labels. `app/projects/[slug]/page.tsx` generates case-study pages from each slug, links the public verification records, and displays review dates and limits. `generateStaticParams` gives Next.js the known URLs for static export. The integration uses curated GitHub links; it does not enumerate private repositories or require a browser token.

Tests: `tests/delivery.test.ts` exercises invalid dates/URLs, deployed requirements, plan contradictions and intersecting filters. Its initial failures proved the missing behavior; malformed URLs also exposed and fixed a thrown URL-parser error. Browser tests select platform prototypes, show no deployed matches, reset, search Cloud Task and follow its verification record.

Exercise: add a case with a unique slug, valid existing category, honest delivery label and approved source. Extend the public source allowlist deliberately if needed. Rebuild and trace how one record creates a card, route, sitemap entry and filter result. Never add an unearned credential or invented test result to make an example pass.

## Skills, credentials and experience

`SkillsExplorer` and `CredentialExplorer` in `components/explorers.tsx` filter the source arrays. Skill evidence distinguishes professional work, labs, coursework and learning. Credential status does not imply independent issuer verification; missing dates/links remain explicit. The exact approved clearance wording is centralized in `profile.clearance` and kept separate from certifications.

`CareerTimeline` uses an active role ID to expand details with `aria-expanded`. Current Mid-Level title/June 2026 start are owner-approved. Earlier junior/intern exact dates are withheld until verified against résumé/employment records. `content/milestones.ts` and `app/journal/page.tsx` add dated technical records without pretending their review dates are original accomplishment dates.

Tests verify filters, unique evidence routes, preserved internship break, role expansion and journal milestones. Exercise: add one source-backed skill, link a real case, and explain why a precise proficiency percentage would need a defined measurement method.

## Navigation, diagrams and responsive CSS

`Header` owns mobile-menu and theme state; `SpecialtyPicker`, `SystemsVisual` and `CareerTimeline` supply meaningful interactions. `ConceptDiagram` is a sanitized logical illustration, not a network export. Links and native controls remain semantic HTML so keyboard and screen-reader behavior does not depend on pointer use.

`app/globals.css` defines dark/light tokens, containers, responsive layout and focus styles. Small screens collapse existing layouts and allow filters to wrap. The theme fix removes a background-color transition from diagram buttons: previously foreground colors switched immediately while backgrounds spent 200 ms in the old palette, producing transient low contrast. Hover movement/border feedback remains.

Tests: desktop/mobile Playwright, 320-pixel overflow checks, keyboard skip link/menu, both themes, axe WCAG scans and an immediate theme-palette regression. Automated axe checks are useful but do not replace human assistive-technology testing. Exercise: navigate without a mouse, toggle the theme and explain why `aria-expanded`, a visible focus outline and meaningful link names each solve a different problem.

## Contact, résumé and errors

`CopyEmail` copies only after a click and provides failure feedback; mail links open the visitor's email client and never send a message automatically. `PrintButton`, `app/resume/page.tsx` and `scripts/postbuild.mjs` provide printing and an explicitly labeled text résumé draft. A separate public-safe PDF/text review copy now uses content/resume.json; publication approval remains pending.

`app/error.tsx` gives runtime failures a retry action; `app/not-found.tsx` and the local static server return a useful 404 route. `scripts/postbuild.mjs` checks internal links/assets after export. Exercise: request an unknown URL and distinguish the HTTP status from the visual page text; then verify the résumé download is the draft you expected.

## Deployment, APIs and security boundaries

`next.config.ts` uses static export; `scripts/serve.mjs` previews it only on loopback. `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` supply metadata. This review copy uses a local canonical origin and noindex. Those are publication safeguards, not authentication. `public/_headers` and `vercel.json` require compatible host support; GitHub Pages does not apply them automatically.

The local build uses supported webpack because this environment blocked Turbopack's CSS-worker socket. Package declarations are pinned to the versions already in the lockfile. `.github/workflows/ci.yml` is a manual-only, unactivated quality-check proposal with read-only permissions, fixed action commits and a time limit. It cannot deploy.

Read RELEASE_REVIEW.md before publishing. The static portfolio needs no paid infrastructure. A future experience assistant requires a server API, approved source retrieval, citations/abstention, a server-held key, request limits and spending approval. The owner dashboard needs real server authorization; hiding a static route cannot protect drafts. See the parent IMPLEMENTATION_PLAN.md for all six future designs.

Exercise: describe what must change to release this candidate at an approved HTTPS origin, how you would verify host headers, and which saved artifact you would restore on rollback. Do not perform the deployment as part of the exercise.

## Project application improvements

Each sibling project has `LOCAL_IMPROVEMENTS.md` with its exact changed functions, tests and exercises:

- AV Suite: finite/nonnegative input validation and positive divisors.
- Integrity: portable check-only Python CLI, deterministic reports, meaningful exit codes; original PowerShell preserved.
- Cloud Task Suite: validate normalized text length before storage/retrieval.
- Vector: unfinished code fences stay literal; all private source remains outside portfolio assets.
- OptiPlex: default-dry-run aggregate Linux health tool and synthetic fixtures; no hardware health claim.
- Command Center: executable model-contract review only; source/runtime changes remain blocked by unavailable export access.
