# Architecture

## Chosen approach

Next.js App Router renders public pages at build time with `output: 'export'` and trailing-slash routes. HTML and assets live in `out/`. The export is portable to Sites, Vercel, Cloudflare Pages, or another static host. This follows the official static-export contract: https://nextjs.org/docs/app/guides/static-exports . Server rendering during the build avoids a browser-only shell; no persistent backend is needed for public portfolio content.

React and strict TypeScript support reusable layouts and interactions. Tailwind CSS is integrated through PostCSS; the custom design system is primarily semantic CSS with shared theme tokens. Lucide supplies consistent SVG icons. No animation framework is needed: small CSS transitions are disabled for reduced-motion preferences.

## Boundaries

- `content/portfolio.ts`: profile, projects, experience, education, credentials, skill evidence, notes, filters, and Zod schemas.
- `app/`: route templates, metadata, sitemap, robots, error states, and shared layout.
- `components/ui.tsx`: navigation, theme, timeline, project visuals, architecture, badges, and copy/print actions.
- `components/explorers.tsx`: search and composable filters.
- `components/home.tsx`: home composition and specialty prioritization.
- `components/sections.tsx`: reusable headings, contact banner, and evidence note.
- `scripts/postbuild.mjs`: shared-source text résumé and exported internal-link/asset check.
- `scripts/serve.mjs`: local static preview with security headers.
- `tests/`: unit integrity tests and browser tests.
- `.github/workflows/ci.yml`: manual quality checks for the existing repository.
- `content/site-config.ts`: fail-closed review/public origin and indexing modes.
- `content/resume.json`: public-safe shared résumé source; receipt pins the generated PDF.
- `.github/workflows/pages.yml`: manual, explicitly gated Pages artifact deployment.

## Data flow

Typed records → Zod validation at import → static route generation → exported HTML + client bundles → static host. Client state controls filters and timeline expansion. Local storage holds only the color-theme preference. Clipboard permission is requested by a direct user click; failure exposes the email as text. Mailto opens the visitor’s mail app.

## Information design

Project status and evidence context are separate. A completed NVX fix does not mark the whole rack restored. The lab’s owner-reported monitoring installations do not prove dashboards, alert delivery or sustained uptime. Public source does not prove executed physical commissioning. Recruiter lenses reprioritize identical records instead of producing alternate histories. The professional résumé inherits the build indexing policy and is included in the sitemap. Draft journal detail pages remain noindex and excluded. Public build files remain local until an authorized deployment.

## Visual system

Deep navy foundations, cyan accents, restrained emerald/amber status cues, consistent spacing, subtle borders, and light theme tokens. Native SVG/CSS diagrams show conceptual connections. Illustrative terminals and dashboards are labeled. No external stock photography, fonts, trackers, or fictional proof points are used.

## Extension

Add records and regenerate static routes. The prepared public-safe review PDF is a static asset; source PDFs are excluded. A future contact backend or AI feature needs a separate threat/cost model, validation, rate limits, and secure server-side secrets. None is exposed by this release.

LinkedIn identity is enforced by content/professional-links.mjs, unit tests and postbuild export scanning. Browser login identity never overrides the approved professional URL.
