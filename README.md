# Kaden Diaz — Engineering Connected Systems

Local release candidate for **kd16-27/kd16-27.github.io**, prepared on a dedicated branch from its existing Git history. The owner authorized development-branch refinements and updates to Draft PR #1. Main merge, hosting changes and public launch remain unapproved. Earlier portfolio checkpoints and original applications remain preserved.

Next.js 16 App Router, React, TypeScript, Tailwind and Zod generate a portable static website. It has ten case studies, evidence filters, technical milestones, accessible navigation and sanitized PDF/text résumé downloads. No database, API key, paid service, analytics or home-lab connection is required.

## Run and verify

Use Node 24 and the committed lockfile.

- Install: `npm ci --ignore-scripts`.
- Review build: `npm run validate`, then `npm run verify:export`. Default metadata is loopback with noindex.
- Pages candidate: `npm run build:pages`, then `npm run verify:export -- --public`. This creates files locally; it does not publish.
- Browser checks: after the Pages candidate build, `npx playwright install chromium`, then `npm run test:e2e`.
- Preview: `npm run preview`, then open http://127.0.0.1:3117/.
- Dependencies: inspect both `npm audit` and `npm audit --omit=dev`.

`npm run validate` checks formatting, types, lint, unit tests and review-mode static export. Browser checks intentionally use the Pages candidate to verify final canonical URLs. Every build verifies internal links. Export verification checks indexing, social metadata, sitemap, résumé hashes and private-data patterns.

## Maintain content

Project and career data: `content/portfolio.ts`, `content/additional-projects.ts`, `content/milestones.ts`. Résumé data: `content/resume.json`; optional `scripts/generate-resume.py` regenerates the checked-in PDF using ReportLab. Render and inspect both pages after changes; the receipt prevents unnoticed PDF/source drift. Text and the web page share that JSON. The supplied source PDFs are excluded.

Owner-reported credentials and lab activity retain evidence gaps. Completed cases, simulations, local prototypes, platform schemas and future work are distinct. Kaden supplied requirements and professional accounts; implementation is AI-assisted. Delivered code does not establish independent mastery.

## Release review

Start with [release verification](docs/release/RELEASE_VERIFICATION.md), [deployment](DEPLOYMENT.md), [ten-case review](docs/release/CASE_STUDY_REVIEW.md), [evidence ledger](EVIDENCE_LEDGER.md) and [security](SECURITY.md). Historical reports remain under `docs/history/` and do not describe the current release. See [learning exercises](docs/release/LEARNING_MILESTONE.md) and the developer journal.

The candidate workflows are manual only. The Pages workflow additionally requires main, an explicit confirmation and the github-pages environment. These checks do not replace owner approval. The local pre-push guard blocks uploads until deliberately removed after approval.

## Final professional candidate

Recruiter copy now leads with the completed NVX case, keeps the verified combined earlier-role range and school break, and labels prototypes/lab work explicitly. Temporary résumé release notices are removed with owner authorization. The sole approved LinkedIn account is enforced in content, metadata, downloads and the build. See docs/release/LINKEDIN_IDENTITY_POLICY.md and docs/release/FINAL_CANDIDATE_REPORT.md. Draft PR #1 updates are authorized; merge and deployment are not.
