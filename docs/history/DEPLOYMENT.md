# Deployment and ownership

## Sites

The Site identity is tracked in `.openai/hosting.json`. Publish the `out/` static export through the Sites source workflow using the same project identity. Source synchronization and deployment require short-lived account-bound authorization; do not store credentials in files. New Sites are owner-private by default. A successful private deployment is a review URL, not a publicly crawlable recruiter URL. Change access to public only when the owner requests it.

## Vercel

1. Create an owner-controlled GitHub repository named `kaden-diaz-portfolio` and push this source. The Sites-managed source remote is not a GitHub repository; creation of a personal GitHub remote is a separate owner/account step.
2. Import that repository in the owner’s Vercel account. Use Node 24 and `npm ci`.
3. Set the build command to `npm run build` and output directory to `out`. `vercel.json` provides the static deployment header definitions.
4. Set the final origin in `content/portfolio.ts` before rebuilding; metadata, sitemap, structured data, and canonicals use it. No private environment variables are required.
5. Review the generated provider URL, deep routes, 404 behavior, draft résumé, all contact links, and HTTP headers.

The application’s static export does not use server actions or API routes. Hosting is independent of the OptiPlex lab. An owner can deploy to a provider-issued domain without purchasing a custom domain or paid services. The CI file validates pushes and PRs; automatic deployment requires connecting the host to the owner’s repository.

## Other static hosts

Run `npm ci`, `npm run validate`, and `npm run test:e2e`. Serve `out/` as the root, enable directory index handling (`/projects/name/` → `/projects/name/index.html`), map unknown routes to `404.html` with HTTP 404, and configure HTTPS plus the security headers. Cloudflare-compatible `_headers` is copied from public assets. Check the platform’s support; a header file alone does not confirm response behavior.

## Custom domain later

Purchase only when explicitly authorized. Add the chosen domain in the host dashboard, follow that provider’s exact DNS records, enable HTTPS, update siteUrl, and rebuild. No example domain is asserted available. Do not point a public portfolio at a private lab or employer system.

## Update workflow

Edit central content → review evidence → run checks → build → push to the selected owner-managed source → publish that exact source state. Keep the dependency lockfile. Preserve the site identity and current audience on subsequent Sites updates. Record release outcomes in VERIFICATION.md and CHANGELOG.md.

## Current release status

The owner explicitly approved source upload and owner-private publication at `https://kaden-diaz-portfolio.diazkaden789.chatgpt.site`. The native deployment result establishes whether publication succeeded. Preserve the existing project_id and owner-private audience. Public access requires a separate owner instruction.

A personal GitHub repository remains a separate account/remote choice. The Sites source workflow manages the hosting source repository. For a separate extracted copy, initialize Git, commit the source, add the owner's chosen GitHub remote, and push. Do not commit node_modules, out, test traces, environment files, or credentials. `.gitignore` covers these generated/private paths.
