# Deployment preparation — approval pending

## Recommendation

Use the existing **kd16-27/kd16-27.github.io** repository and GitHub Pages. The application exports one HTML page per route and static assets; filters, theme, navigation and diagrams run in the browser. No required function needs a persistent server. GitHub Free supports Pages for public repositories. No new repository, paid host, custom domain or runtime credential is needed.

Vercel adds no required capability for this release. Reconsider a separate backend only when authenticated administration, server-side AI inference or scheduled private processing is approved. Never put secrets or an owner dashboard's authorization rules into static client code.

## Repository comparison and preservation

Read-only review found main at `0e8b2bcc974fc3fc1aac17764914710e0b7300b8`, with only the original 43-byte README. The release clone retains that history and preserves the README under `docs/history/github-initial-readme.md`. The tested October 23 checkpoint was overlaid after verifying all 67 source hashes. Original portfolio and other application copies are outside this repository. A fresh read-only request returned the existing Pages README landing page (HTTP 200; title kd16-27.github.io | kd16-27); it was not replaced. A local snapshot was retained for review.

The local branch is `codex/portfolio-release-preparation-20261023`. A source commit is prepared locally only. The local pre-push hook is a deliberate convenience guard, not a hosted branch-protection policy.

## Repeatable build

Node 24 → `npm ci --ignore-scripts` → formatting/types/lint/unit checks → `npm run build:pages` → `npm run verify:export -- --public` → Chromium browser suite → full and production audits. The lockfile is retained. Next uses its supported webpack builder and exports to `out/`, with trailing-slash paths, static 404 and `.nojekyll`.

`npm run build` instead creates a local review build with noindex and loopback metadata. Neither command changes any hosting service. Only the reviewed GitHub Pages HTTPS origin is accepted for a public build.

## Approval sequence

1. Owner reviews the complete candidate, downloads, case statuses and exact local commit.
2. Obtain explicit approval to push the dedicated development branch. A push to this **public repository makes source and included documents public** even before website deployment. No raw résumés, private source, local evidence folders or credentials belong in the commit.
3. Review the pushed branch and obtain separate merge approval. The workflow does not run on pushes or merges.
4. Obtain explicit public launch approval for the exact main commit. Only then select GitHub Pages source **GitHub Actions**, configure the `github-pages` environment/review protections where available, verify branch restrictions, and dispatch `Owner-approved GitHub Pages release` on main with its confirmation input.
5. Verify the resulting URL, HTTPS, canonical/robots/sitemap, all ten cases, downloads, responsive navigation, 404 and real response headers. Record the workflow run and artifact/commit identity. Local success is not hosted verification.

All actions are pinned to commits inspected through the GitHub connection. Build has contents/pages read permissions; only deploy has pages-write and OIDC permission. Deployment requires successful checks and uses the verified artifact. No automatic push-triggered deployment is configured.

## Headers and rollback limits

GitHub Pages does not apply the `public/_headers` or `vercel.json` definitions supplied for other hosts. The preview server's stronger headers are local verification behavior, not evidence of Pages response headers. Pages offers HTTPS and its managed headers; inspect the live responses after an authorized launch. There is no server authentication or data collection in this static release.

Before any authorized replacement, record the current Pages settings, deployed commit/artifact and serving behavior. The repository's historical workflow success alone does not establish current content. Restore the previous reviewed commit/artifact via an explicitly approved deployment if rollback is needed; never reset or erase history.

## Official references

[GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) · [Next.js static export](https://nextjs.org/docs/app/guides/static-exports).
