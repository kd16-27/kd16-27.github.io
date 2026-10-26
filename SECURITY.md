# Security and privacy

The portfolio is a static export with no application authentication, API, database, analytics, contact backend or active AI service. It has no connection to government/employer networks or the personal lab. Only approved public contact email and curated public project links are included.

Never commit restricted information, real internal addresses, employer configurations, tickets, colleague details, private phone/home information, credentials or private Vector source. Diagrams are conceptual. Supplied résumé PDFs stay outside the public repository; the separate download omits private details and has a checked source receipt.

## Supply chain

Locked versions and `npm ci --ignore-scripts` support repeatable installs. Both full and production registry audits returned zero on October 23, 2026. The five previously reported development entries traced to one advisory withdrawn that day; no patch, dependency upgrade or override was applied. See [dependency review](docs/release/DEPENDENCY_REVIEW.md) for the exact history and limits. A zero audit is not a guarantee of security.

Workflows are manual and action commits are pinned. Only the deployment job requests pages-write/OIDC; it depends on successful quality checks and requires main plus explicit confirmation. Owner approval is still required. No runtime secret is needed. Non-secret public-build mode/origin values deliberately appear in browser bundles.

## Hosting limits

The local server sends CSP, nosniff, frame-denial and other headers. The CSP permits inline scripts/styles for the current Next payload. These local headers are not GitHub Pages evidence. GitHub Pages ignores `_headers` and Vercel configuration; verify actual hosted HTTPS/headers after an approved launch. A static export cannot enforce private owner access. A future dashboard requires server-enforced identity and authorization.

JSON-LD escapes less-than characters. Typed local content does not render untrusted HTML. External new-tab links use noopener/noreferrer. Email links open the visitor's client; clipboard access follows a click and has failure feedback. Theme preference is the only application local-storage value. Noindex is an indexing policy, not access control.

## Reporting and release

Report issues to KadenDiaz1627@gmail.com without publishing secrets or restricted evidence. Recheck dependencies, source/assets and ownership boundaries before any release. All pushes, merges, public deployment, paid services and original-application changes require explicit owner approval under this project.
