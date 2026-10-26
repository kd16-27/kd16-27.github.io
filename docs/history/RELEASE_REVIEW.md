# Release review — local candidate only

This copy has no hosting identity or Git remote and cannot update the existing Sites deployment through its former project ID. Existing public and private sites remain unchanged. The manual GitHub workflow is a candidate configuration, not an activated integration.

## Local use

Use Node 24 and `npm ci`, then `npm run validate` and `npm run test:e2e`. Run `npm run preview` for the built candidate at http://127.0.0.1:3107. The supplied dependency declarations match the lockfile exactly; no dependency versions were upgraded for modernization.

## Before a public import

1. Review the complete public-facing candidate and résumé. The owner has already approved preparation using the professional email, employer GCA, current role/start date and exact clearance wording; that approval is preserved. Replace missing evidence with honest labels, not invented qualifications. Private review content must not be assumed public-approved.
2. Confirm AV Operations Command Center's source, or retain the plan label. Review credential dates/verification links and approve a résumé PDF if desired. The current text download is a review draft.
3. Prepare a source-only archive excluding environment files, Git/hosting metadata, databases, test traces, screenshots, installed dependencies and build output. Secret-scan that exact archive; review public text and diagram contents. Current local checks are not an exhaustive security certification.
4. Read the existing GitHub publishing source/settings and capture rollback refs/artifacts. A source push to this repository could replace the existing Pages site. Request approval for the exact import/branch and deployment configuration before any remote write that can trigger publishing.
5. Set `siteUrl` to the approved canonical HTTPS origin in `content/portfolio.ts`; deliberately update `app/layout.tsx` and `app/robots.ts` indexing for public release. The local candidate uses a loopback canonical URL and noindex. Those are review safeguards, not authentication.
6. Review the manual-only CI candidate and included-minute/spending controls. It uses read-only permissions, fixed action revisions, a 20-minute limit, no secrets and no deployment step. Approval to store source does not activate public deployment or paid infrastructure.
7. Build an immutable artifact. For Pages, serve `out/` with `.nojekyll` so `_next` assets survive; configure Pages/Actions only after approval. A repository name is not evidence that a workflow is configured correctly. For Vercel, use the existing `vercel.json`; no project has been created. Recheck free-plan terms at activation.
8. Verify the actual host: canonical/social tags, HTTP status, asset loading, robots/sitemap, keyboard navigation, mobile layout, CSP and response headers. GitHub Pages does not apply `_headers`/`vercel.json`; configurable headers require a host that supports them. Do not claim the local preview's headers are deployed protections.
9. Save the exact release revision, artifact hash, approved audience and observed deployment result. To roll back, restore the captured prior artifact/ref using the host's approved mechanism and recheck the site. Keep the older private Sites release available until the public release is accepted.

## Cost and future capabilities

The static portfolio needs no database, model API, paid hosting, Sentry ingestion or scheduler. The future AI assistant and private approval dashboard require separate designs and release approvals. Do not put API keys or private drafts in static browser assets. A hidden dashboard URL is not access control.
